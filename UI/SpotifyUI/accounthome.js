// TODO: Implement the Full Stacks Section
// This section should function similarly to the Home Page.

// Responsibilities for the Full Stack Section:
// 1. Retrieve data from the Django database.
// 2. Load the username from the database into the `updateNamePlaceholder` function.
// 3. Parse the creation dates of stored data and populate `placeholderDates` accordingly.
// 4. Look through the different HREFs and see if any of them need to be reworked

// Additional Task: Implement account deletion (Refer to line 269 for the delete account function).
// Replace the current alert mechanism with a call to notify the Django database to delete the account.

 // Changes the text to "penguin"
let defaultLanguage = "English"; // Not For FullStacks
// Comment this out. For Simplicity I would recommend you to just make a list of the same name. 
// Don't need to care about the function and everything if you do that.
const placeholderDates = [
    "2024-10-31 12:00",
    "2024-11-20 12:00",
    "2024-11-21 14:30",
    "2024-11-21 15:30",
    "2024-11-21 16:30",
    "2024-11-21 17:30",
    "2024-11-21 18:30",
    "2024-11-21 19:30",
    "2024-11-21 20:30",
    "2024-11-22 16:45",
    "2024-11-22 17:45",
    "2024-11-22 18:45",
    "2024-11-22 19:45",
    "2024-12-25 19:45"
];

// Global variable to track the current selected mode
let currentMode = 'youraccountbar';

// Function to set opacity for a given element
function setOpacity(element, opacity) {
    element.style.opacity = opacity;
}

// Function to handle mode change
function changeMode(newModeElement, newModeName) {
    // Set current mode opacity to 0.7
    const previousModeElement = document.getElementsByClassName(currentMode)[0];
    setOpacity(previousModeElement, 0.7);

    // Set new mode opacity to 1
    setOpacity(newModeElement, 1);

    // Update the global currentMode
    currentMode = newModeName;
}

// Add event listeners to each bar
document.addEventListener('DOMContentLoaded', () => {
    const homebar = document.getElementsByClassName('homebar')[0];
    const youraccountbar = document.getElementsByClassName('youraccountbar')[0];

    // Initialize default selected mode
    setOpacity(homebar, 0.7);
    setOpacity(youraccountbar, 1.0);

    // Add click event listeners
    homebar.addEventListener('click', () => changeMode(homebar, 'homebar'));
    youraccountbar.addEventListener('click', () => changeMode(youraccountbar, 'youraccountbar'));
});

function addHoverEffect70(element) {
    element.style.cursor = 'pointer';
    element.addEventListener('mouseenter', function () {
        element.style.opacity = '0.5';  // Reduce opacity on hover
    });
    element.addEventListener('mouseleave', function () {
        element.style.opacity = '0.7';  // Restore original opacity when not hovered
    });
}

function addHoverEffect100(element) {
    element.style.cursor = 'pointer';
    element.addEventListener('mouseenter', function () {
        element.style.opacity = '0.8';  // Reduce opacity on hover
    });
    element.addEventListener('mouseleave', function () {
        element.style.opacity = '1.0';  // Restore original opacity when not hovered
    });
}



document.addEventListener("DOMContentLoaded", function() {
    // Select the element
    const goToTeamWebsite = document.querySelector(".goteamwebsite");
    addHoverEffect70(goToTeamWebsite);
  
    // Set a high z-index value
    goToTeamWebsite.style.zIndex = "1000";
  
    // Make it clickable and redirect to a specified website
    goToTeamWebsite.addEventListener("click", function() {
      window.location.href = "https://kharanshsingh.wixsite.com/atlfoodfinder-team-w";
    });
  });

function addHoverEffectWithRedirect(elementSelector, hoverStyles, defaultStyles, redirectUrl) {
    // Select the element
    const element = document.querySelector(elementSelector);

    if (element) {
        // Add hover effect
        element.addEventListener('mouseenter', () => {
            Object.assign(element.style, hoverStyles);
        });

        // Remove hover effect on mouse leave
        element.addEventListener('mouseleave', () => {
            Object.assign(element.style, defaultStyles);
        });

        // Add redirection on click
        element.addEventListener('click', () => {
            window.location.href = redirectUrl;
        });
    } else {
        console.error(`Element with selector "${elementSelector}" not found.`);
    }
}

// Define hover and default styles
const hoverStyles = {
    transform: 'scale(1.05)', // Slightly enlarge on hover
    transition: 'transform 0.3s ease', // Smooth animation
    cursor: 'pointer' // Change cursor to pointer
};

const defaultStyles = {
    transform: 'scale(1)', // Reset scale
    transition: 'transform 0.3s ease' // Smooth animation
};

// Apply hover effect and redirection
addHoverEffectWithRedirect('.homebar', hoverStyles, defaultStyles, "/profile-page/");

// Function to update and center the name placeholder
function updateNamePlaceholder(newName) {
    // Select the nameplaceholder element
    const namePlaceholder = document.querySelector('.nameplaceholder');

    // Update the text content and ensure it is centered
    if (namePlaceholder) {
        namePlaceholder.textContent = newName.toUpperCase(); // Ensures the name is uppercase

        // Ensure centering by applying CSS rules
        namePlaceholder.style.display = 'flex';
        namePlaceholder.style.justifyContent = 'center'; // Horizontal centering
        namePlaceholder.style.alignItems = 'center'; // Vertical centering
        namePlaceholder.style.textAlign = 'center';
        namePlaceholder.style.height = '100%'; // Ensure it takes up the full height of its parent
        namePlaceholder.style.top = '0px'; // Ensure it takes up the full height of its parent
    } else {
        console.error('Element with class "nameplaceholder" not found.');
    }
}

// Function to set z-index for account frame
function bringAccountFrameToFront() {
    const accountFrame = document.querySelector(".accountframing");
    if (accountFrame) {
        accountFrame.style.zIndex = "1000";
    }
}

// Function to create a scrollable list inside account frame
function createScrollableList() {
    const accountFrame = document.querySelector(".accountframing");
    if (!accountFrame) return;

    const listContainer = document.createElement("div");
    listContainer.style.overflowY = "scroll";
    listContainer.style.height = "70%"; // Adjust as needed
    listContainer.style.width = "90%";
    listContainer.style.margin = "30px auto"; // Increased spacing
    listContainer.style.fontFamily = "'Inter', sans-serif";
    listContainer.style.fontWeight = "200"; // Thinner font
    listContainer.style.fontSize = "14px";
    listContainer.style.top = "80px";
    listContainer.style.left = "34px";
    listContainer.style.position = "absolute";
    listContainer.style.color = "#FFFFFF";
    listContainer.style.padding = "10px";
    listContainer.style.letterSpacing = "10%"; // Increased character spacing

    placeholderDates.forEach(date => {
        const listItem = document.createElement("div");
        addHoverEffect100(listItem);
        listItem.textContent = date;
        listItem.style.padding = "16px 0"; // Increased spacing between list items
        listItem.style.cursor = "pointer";
        listItem.style.borderBottom = "1px solid #333";

        listItem.addEventListener("click", () => {
            // The Most Important Full Stacks Part. This passes the date to the rest of the pages

            console.log("Parsed date for Django: ", new Date(date).toLocaleString('en-US', {timeZone: 'America/New_York'}));
            // Set data in sessionStorage
            const thistime = new Date(date).toLocaleString('en-US', {timeZone: 'America/New_York'});
            sessionStorage.setItem("GlobalTime", thistime);

            const thislanguage = defaultLanguage;
            sessionStorage.setItem("GlobalLanguage", thislanguage);

            window.location.href = 'story2slide1.html';

        });
        listContainer.appendChild(listItem);
    });

    accountFrame.appendChild(listContainer);
}

// Call the functions
bringAccountFrameToFront();
createScrollableList();

// Global variable for language
// Function to initialize click handlers
function initializeLanguageSelectors() {
    const languageDivs = document.querySelectorAll(".English, .Spanish, .Chinese"); // Fixed query selector

    languageDivs.forEach(div => {
        div.style.opacity = div.classList.contains(defaultLanguage) ? "1.0" : "0.7";

        div.addEventListener("click", () => {
            // Update global variable
            defaultLanguage = div.classList[0]; // Retrieve the first class as language identifier

            // Update opacity for all language divs
            languageDivs.forEach(innerDiv => {
                innerDiv.style.opacity = innerDiv.classList.contains(defaultLanguage) ? "1.0" : "0.7";
            });
        });
    });
}

// Initialize the language selectors
initializeLanguageSelectors();

function makeDeleteAccountClickable() {
    const deleteAccountDiv = document.querySelector('.deleteaccount');
    addHoverEffect100(deleteAccountDiv);
    if (deleteAccountDiv) {
        deleteAccountDiv.style.cursor = 'pointer'; // Add a pointer cursor for better UX
        deleteAccountDiv.onclick = function () {
            alert('Delete Account clicked!'); // Replace with desired functionality
        };

    } 
}

// Call the function
makeDeleteAccountClickable();
