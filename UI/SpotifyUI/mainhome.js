// Full Stacks Section:
// Example Usage:
updateNamePlaceholder('penguin'); // Use Actual Username similar to Accounthome.js

// Notes:
// - Use `defaultLanguage` to access the current language setting.
// - Refer to the `if` statement at line 139 to handle API queuing and ensure the returned data is correctly saved to the Django database.
// - Ensure Django redirects are functioning properly. The `href` logic has already been implemented robustly.
// - Remember: The page utilizes local cached memory to determine which SpotifyStats entry is queued (based on time) and the requested language.

// TODO: Full Stack Implementation Tasks:
// 1. Implement API queue functionality:
//    - Refer to the `if` statement at line 122 for existing logic.
//    - Queue the API calls appropriately and handle asynchronous responses.
// 2. Save returned data into the Django database:
//    - Process the API response.
//    - Serialize and save the data to the appropriate Django model.
// 3. Test the integration between the frontend and backend:
//    - Validate that saved data can be retrieved and displayed accurately.
// 4. Fix Username display with actual username



// UI Code
// Global variable to track the current selected mode
let currentMode = 'homebar';

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
    setOpacity(homebar, 1);
    setOpacity(youraccountbar, 0.7);

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

  const gostatsImage = document.querySelector('.gostats1');
  function adjustGoStatsImageHeight() {
    const newFeaturesFrame = document.querySelector('.newfeaturesframe');
    const gostatsImage = document.querySelector('.gostats1');

    // Get the height of the newfeaturesframe
    const newFeaturesFrameHeight = parseFloat(window.getComputedStyle(newFeaturesFrame).height);

    // Set the height of the gostats1 image to match
    gostatsImage.style.height = `${newFeaturesFrameHeight}px`;
    gostatsImage.style.objectFit = 'cover'; // Ensures it fills the width even if cropped
    gostatsImage.style.width = '100%'; // Make it span the full width of its parent (frame36)
}

// Call the function after the page loads
window.addEventListener('load', adjustGoStatsImageHeight);

// Adjust on window resize
window.addEventListener('resize', adjustGoStatsImageHeight);



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

            if (elementSelector === '.gostats1' && redirectUrl === 'story2slide1.html') {
                const currentDate = new Date();
                const atlantaTimeString = currentDate.toLocaleString('en-US', { timeZone: 'America/New_York' });
                sessionStorage.setItem("GlobalTime", atlantaTimeString);
                const thislanguage = defaultLanguage;
                sessionStorage.setItem("GlobalLanguage", thislanguage);

                // Full Stacks Section. Make it so that API generates new summary and is saved in Django Database
                // This will ensure code compatibility onwards.
            }


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
addHoverEffectWithRedirect('.newfeaturesframe', hoverStyles, defaultStyles, 'account.html');
addHoverEffectWithRedirect('.gotostats', hoverStyles, defaultStyles, 'account.html');
addHoverEffectWithRedirect('.gostats1', hoverStyles, defaultStyles, 'story2slide1.html');
addHoverEffectWithRedirect('.youraccountbar', hoverStyles, defaultStyles, 'account.html');



function updateNamePlaceholder(newName) {
    // Select the nameplaceholder element
    const namePlaceholder = document.querySelector('.nameplaceholder');

    // Update the text content and ensure it is centered
    if (namePlaceholder) {
        namePlaceholder.textContent = newName.toUpperCase(); // Ensures the name is uppercase

        // Apply centering styles dynamically (if not already in your CSS)
        const parentElement = namePlaceholder.parentElement; // The wrapper element
        if (parentElement) {
            parentElement.style.justifyContent = 'center'; // Horizontal centering
            parentElement.style.alignItems = 'center'; // Vertical centering
        }
    } else {
        console.error('Element with class "nameplaceholder" not found.');
    }
}

// Global variable for language
defaultLanguage = "English";

// Function to initialize click handlers
function initializeLanguageSelectors() {
    const languageDivs = document.querySelectorAll("div.English, div.Spanish, div.Chinese");

    languageDivs.forEach(div => {
        div.style.opacity = div.classList.contains(defaultLanguage) ? "1.0" : "0.7";

        div.addEventListener("click", () => {
            // Update global variable
            defaultLanguage = div.className;

            // Update opacity for all language divs
            languageDivs.forEach(innerDiv => {
                innerDiv.style.opacity = innerDiv.className === defaultLanguage ? "1.0" : "0.7";
            });
        });
    });
}

// Call the function to set up the event listeners
initializeLanguageSelectors();







