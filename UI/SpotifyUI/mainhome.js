// Scroll to the very Buttom for FullStack Section
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





// Full Stacks Section:
// Example usage
updateNamePlaceholder('penguin'); // Changes the text to "ALEX"

