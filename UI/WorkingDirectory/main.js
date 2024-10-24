// Ensure that the Inter font is loaded and applied to the body
document.head.innerHTML += `
<link href='https://fonts.googleapis.com/css?family=Inter' rel='stylesheet'>
<meta charset="UTF-8">
`;

// Get the correct container (framemiddle)
var framemiddle = document.getElementsByClassName('framemiddle')[0];

// Set framemiddle's overflow to visible to allow elements to extend outside its boundaries
framemiddle.style.overflow = 'visible';

// Create a container for all profile items inside framemiddle
let profileContainer = document.createElement("div");
framemiddle.appendChild(profileContainer); // Append to the framemiddle container

// Add CSS to the container (using a simple inline style)
profileContainer.style.cssText = `
    position: absolute; top: -45px; left: 0; right: 0; bottom: 0; align-items: center;
    gap: 20px; display: flex; flex-wrap: wrap; flex-direction: column;
    font-family: 'Inter', sans-serif; /* Apply the Inter font to the container */
    overflow: visible; /* Ensure items outside the container are visible */
`;

// Function to add profile items
function addProfileItem(name, defaultValue) {
    let itemFrame = document.createElement("div");
    profileContainer.appendChild(itemFrame);

    // Add styles to itemFrame
    itemFrame.style.cssText = `
        box-sizing: border-box; 
        height: 60px; width: 100%;
        background: #FFFFFF; border: 1px solid #2C2C2C; border-radius: 5px;
        position: relative;
        display: flex;
        padding-left: 30px;
        font-style: normal; font-weight: 400; font-size: 13px; line-height: 120%; 
        align-items: center;
        overflow: visible; /* Ensures no overflow cutting off text */
        z-index: 1; /* Bring text forward */
    `;

    // Create and style the itemName (make the label bold and use Inter font)
    let itemName = document.createElement("div");
    itemName.textContent = name;
    itemFrame.appendChild(itemName);

    itemName.style.cssText = `
        position: absolute; height: 18px; left: 0px; top: -10px; 
        border-radius: 10px;
        display: flex; padding: 4px 10px;
        font-family: 'Inter', sans-serif; /* Apply Inter font */
        font-style: normal; font-weight: bold; /* Make it bold */
        font-size: 13px; line-height: 120%;
        background: #FFFFFF;
        color: #000000; /* Text color changed to black */
        z-index: 2; /* Make sure the label is in front */
    `;

    // Create and style the inputField
    let inputField = document.createElement("input");
    inputField.type = "text";
    inputField.placeholder = defaultValue;

    inputField.style.cssText = `
        width: 100%; height: 100%;
        background: transparent;
        border: none;
        font-size: 13px;
        color: #000000; /* Change input text color to black */
        padding-left: 10px;
        font-family: 'Inter', sans-serif; /* Apply Inter font */
        box-sizing: border-box;
        outline: none;
    `;

    // Ensure placeholder text is gray and visible
    inputField.style.setProperty("color", "#000000"); // Black text inside input
    inputField.style.setProperty("--placeholder-color", "rgba(0, 0, 0, 0.5)");

    inputField.style.cssText += `
        ::placeholder {
            color: rgba(0, 0, 0, 0.5); /* Set placeholder color to gray */
        }
    `;

    // Add event listeners for placeholder handling
    inputField.addEventListener("focus", function () {
        inputField.placeholder = ''; // Remove placeholder text on focus
    });

    inputField.addEventListener("blur", function () {
        if (inputField.value === '') {
            inputField.placeholder = defaultValue; // Restore placeholder if no input
        }
    });

    itemFrame.appendChild(inputField);

    // Add hover effect
    itemFrame.onpointerenter = () => {
        itemFrame.style.border = "1px solid #4A90E2";
    };
    itemFrame.onpointerleave = () => {
        itemFrame.style.border = "1px solid #2C2C2C";
    };

    return itemFrame;
}

// Example of adding profile items
addProfileItem('Username', 'penguin');
addProfileItem('Email', 'penguin@penguin.com');
addProfileItem('Password', 'Password');



// Define the function to add hover effect
function addHoverEffect(element) {
    element.style.cursor = 'pointer';
    element.addEventListener('mouseenter', function () {
        element.style.opacity = '0.65';  // Reduce opacity on hover
    });
    element.addEventListener('mouseleave', function () {
        element.style.opacity = '1';  // Restore original opacity when not hovered
    });
}

// Get references to the required elements
var signinbutton1 = document.getElementsByClassName('signinbutton1')[0];  // Sign in button
var singupbutton1 = document.getElementsByClassName('singupbutton1')[0];  // Sign up button

// Set explicit z-index for buttons to ensure they are clickable and visible
signinbutton1.style.zIndex = '10';
singupbutton1.style.zIndex = '10';

// Add hover effect to both buttons
addHoverEffect(signinbutton1);
addHoverEffect(singupbutton1);

// Create the 'Fill in all fields' message element and add it dynamically
var validationMessage = document.createElement('div');
validationMessage.className = 'validation-message';
validationMessage.style.position = 'absolute';
validationMessage.style.top = '300px';
validationMessage.style.left = '50%';
validationMessage.style.transform = 'translateX(-50%)';
validationMessage.style.color = 'red';
validationMessage.style.fontSize = '16px';
validationMessage.style.display = 'none'; // Hidden by default
validationMessage.textContent = 'Fill in all fields.';

// Append the validation message to the body
document.body.appendChild(validationMessage);

// Set up click event for signinbutton1 to redirect to login page
signinbutton1.addEventListener('click', function () {
    window.location.href = 'login.html';  // Redirect to login page
    console.log("Redirecting to login page");
});

// Set up click event for singupbutton1 to handle registration logic
singupbutton1.addEventListener('click', function () {
    // Assuming you have input fields for Username, Email, and Password
    var username = document.querySelector('input[placeholder="Username"]');
    var email = document.querySelector('input[placeholder="Email"]');
    var password = document.querySelector('input[placeholder="Password"]');

    // Check if any of the fields are empty
    if (!username || username.value === '' ||
        !email || email.value === '' ||
        !password || password.value === '') {
        validationMessage.style.display = 'block';  // Show 'Fill in all fields' message
    } else {
        validationMessage.style.display = 'none';  // Hide validation message
        console.log("All fields are filled. Proceed with registration.");
        // Add your registration logic here (e.g., send the registration request to the server)
    }
});
