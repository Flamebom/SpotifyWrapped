import re
import os


def read_file(file_path):
    """Read the content of a file."""
    with open(file_path, 'r', encoding='utf-8') as file:
        return file.readlines()


DEBUG = False  # print debug messages
IGNORE_FONT_FAMILY = True  # force using Apple font for ALL text
# folder path
# this is the folder name to place everything or a single web page
FOLDER_PATH = "WorkingDirectory"


def parse_css_like_file(css_like_lines):
    """Parse CSS-like file and return a dictionary mapping class names to styles."""
    css_dict = {}
    current_class_name = None
    css_count = 0
    line_num = 0
    for line in css_like_lines:
        try:
            match = re.match(r'/\*\s*(.*?)\s*\*/', line)

            if match:
                css_count += 1
                org_name = match.group(1).strip().lower()
                words = org_name.split()
                words = [word.capitalize() for word in words]
                words[0] = words[0].lower()  # Lowercase the first word
                suspected_name = ''.join(words)

                if DEBUG:
                    print(
                        "\033[94m{}\033[00m".format(
                            "processing class name: " +
                            suspected_name),
                    )

                if org_name.find("auto layout") != -1 or org_name.find("inside auto layout") != - \
                        1 or org_name.find("identical to box") != -1 or org_name.find("or ") != -1:
                    if DEBUG:
                        print(
                            "\033[92m{}\033[00m".format(
                                "skiped Figma auto comments: " +
                                suspected_name),
                        )
                    continue  # skip this line

                current_class_name = suspected_name
                # Found a new class name, normalize and prepare for styles
                if current_class_name not in css_dict:
                    css_dict[current_class_name] = {}
                    css_dict[current_class_name]["overflow"] = "hidden"
                    css_dict[current_class_name]["position"] = "absolute"
                    if css_count == 1:  # force width and height to 100% for the first css class
                        css_dict[current_class_name]["width"] = "100%"
                        # css_dict[current_class_name]["height"] = "100%"
                else:
                    print(
                        "\033[93m{}\033[00m".format(
                            "ERROR: duplicate CSS class name: " +
                            current_class_name),
                    )

            elif current_class_name:
                # Process the styles for the current class
                style_match = re.match(r'(.*?):\s*(.*?);', line)
                if style_match:
                    property_name = style_match.group(1).strip()
                    property_value = style_match.group(2).strip()
                    if css_count == 1 and (
                            property_name == "width" or property_name == "position"):
                        continue
                    if property_name == "background" and property_value.startswith(
                            "url"):
                        # check for image file in img folder
                        org_file = property_value.split(
                            "url(")[1].split(")")[0]
                        # property_value.split("url(")[1].split(")")[0]
                        img_file = current_class_name + ".png"
                        property_value = "url(img/" + img_file + \
                            property_value.split(org_file)[1]
                        if not os.path.exists(
                                FOLDER_PATH + "/img/" + img_file):
                            print(
                                "\033[91m{}\033[00m".format(
                                    "ERROR: background file not found: " +
                                    property_value +
                                    " for " +
                                    current_class_name),
                            )
                            property_value = "#FF00FF"

                    if IGNORE_FONT_FAMILY and property_name == "font-family":
                        continue
                    css_dict[current_class_name][property_name] = property_value
        except Exception as e:
            print(
                "\033[91m{}\033[00m".format(
                    "ERROR: processing css input at line " +
                    line_num +
                    ": " +
                    line),
            )
            print(e)
            exit(1)

    return css_dict


def update_html_with_css(html_lines, css_dict):
    """Update the HTML file with correct CSS styles from the CSS dictionary and print out img src values."""
    updated_lines = []
    found_html_names = set()
    line_num = 0
    for line in html_lines:
        try:
            line_num += 1
            # Check for class name and inline style
            class_match = re.search(r'class="(.*?)".*?style="(.*?)"', line)
            # Check for img elements and replace src values if necessary
            img_match = re.search(r'<img.*?src="(.*?)".*?>', line)
            if class_match:
                class_name = class_match.group(
                    1).strip()  # Normalize class name
                # Lowercase the first letter
                class_name = class_name[0].lower() + class_name[1:]
                inline_style = class_match.group(2)

                if class_name not in found_html_names:
                    found_html_names.add(class_name)
                else:
                    print(
                        "\033[95m{}\033[00m".format(
                            "ERROR: duplicate HTML class name: " +
                            class_name))

                # Try to find the class name in the CSS dictionary
                if class_name in css_dict:
                    if img_match and "background" in css_dict[
                            class_name] and "url" in css_dict[class_name]["background"]:
                        print(
                            "WARNING: remove background:url(...) from img ele:" +
                            class_name)
                        del css_dict[class_name]["background"]
                    new_style = css_dict[class_name]
                    new_style = '; '.join(
                        [f'{k}: {v}' for k, v in new_style.items()]) + ";"
                    # Replace the old style with the new updated style
                    updated_line = re.sub(
                        r'style=".*?"', f'style="{new_style}"', line)
                    updated_line = '<div class="' + class_name + \
                        '" style=' + updated_line.split("style=")[1]
                    updated_lines.append(updated_line)
                else:
                    # No match, keep the original line
                    updated_lines.append(line)
                    print(
                        "\033[91m{}\033[00m".format(
                            "ERROR: style not found for: " +
                            class_name))
            else:
                # No inline style, keep the original line
                updated_lines.append(line)

            if img_match:
                updated_lines.pop()  # Remove the last line since we will replace it
                img_src = img_match.group(1)
                # Construct image path based on class name
                img_path = f"img/{class_name}.png"
                if not os.path.exists(FOLDER_PATH + "/" + img_path):
                    print("\033[91m{}\033[00m".format(
                        f"ERROR: Image src not found for {img_src}, looking for {img_path}"))

                updated_line = re.sub(
                    r'src=".*?"', f'src="{img_path}"', updated_line)
                updated_line = '<img class="' + class_name + \
                    '" style=' + updated_line.split("style=")[1]
                updated_lines.append(updated_line)
        except BaseException:
            print(
                "\033[91m{}\033[00m".format(
                    "ERROR: processing html input at line " +
                    line_num +
                    ": " +
                    line))
            exit(1)

    return updated_lines, found_html_names


def write_file(file_path, lines):
    """Write the updated lines to a new HTML file."""
    with open(file_path, 'w', encoding='utf-8') as file:
        file.writelines(lines)


print("=============================================")
print("=============================================")
print("=============================================")


# File paths
HTML_SRC = 'mainframe.html'
CSS_SRC = 'styles.txt'
HEADER_SRC = '/header.html'
JS_SRC = 'accounthome.js'
OUTPUT_NAME = 'account.html'

# Read the files
html_lines = read_file(FOLDER_PATH + "/" + HTML_SRC)
css_like_lines = read_file(FOLDER_PATH + "/" + CSS_SRC)
header_lines = read_file(FOLDER_PATH + "/" + HEADER_SRC)

# Parse the CSS-like file and store it in a dictionary
css_dict = parse_css_like_file(css_like_lines)
for key, value in css_dict.items():
    print("\033[92m{}\033[00m".format(key + ": " + str(value)))

# Update the HTML with the correct styles
updated_html_lines, html_elements = update_html_with_css(html_lines, css_dict)
updated_html_lines[0] = "<body style=" + \
    updated_html_lines[0].split("style=")[1]
updated_html_lines.pop()
updated_html_lines.append("<script>\n")
for ele in html_elements:
    if ele not in css_dict:
        continue
    del css_dict[ele]
    updated_html_lines.append(
        "var " + ele + " = document.getElementsByClassName('" + ele + "')[0];\n")

for key in css_dict:
    print("\033[91m{}\033[00m".format("ERROR: style " + key + " not used"))
updated_html_lines.append("</script>\n")
updated_html_lines.append("<script src='" + JS_SRC + "'></script>\n")
updated_html_lines.append("</body>\n")

updated_html_lines = header_lines + updated_html_lines + ["</html>"]
# Write the updated HTML to a new file
write_file(FOLDER_PATH + "/" + OUTPUT_NAME, updated_html_lines)

print("Updated HTML has been written to " + FOLDER_PATH + "/" + "OUTPUT_PATH")
