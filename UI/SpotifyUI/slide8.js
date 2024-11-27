// No real full-stack work is required for slide 1 and slide 8. (Code Here)
// Ensure that the redirection using `href` functions correctly. Check Line 128






// UI Work
// Function to access global settings from sessionStorage
const thistime = sessionStorage.getItem("GlobalTime");
// sample time: 12/25/2024, 7:45:00 PM
const thislanguage = sessionStorage.getItem("GlobalLanguage");

function getGlobalSettings() {
    if (!thistime || !thislanguage) {
        console.warn("Global settings are not set in sessionStorage. Make sure the other script initializes these values.");
        return { time: null, language: null };
    }
    console.log("Retrieved global settings:", { time: thistime, language: thislanguage });
    return { time: thistime, language: thislanguage };
}

// Function to check if the date is on Christmas or Halloween
function checkSpecialDate(dateString) {
    // Parse the date string into a Date object
    const parsedDate = new Date(dateString);

    // Ensure the date is valid
    if (isNaN(parsedDate)) {
        console.error("Invalid date format:", dateString);
        return;
    }

    // Extract the month and day from the parsed date
    const month = parsedDate.getMonth() + 1; // Months are zero-based
    const day = parsedDate.getDate();

    // Check for Christmas or Halloween
    if (month === 12 && day === 25) {
        activateChristmasMode();
    } else if (month === 10 && day === 31) {
        activateHalloweenMode();
    }
}

// Function to activate Christmas mode
function activateChristmasMode() {
    const backgroundImage = document.querySelector('.lastpagebackground');
    if (backgroundImage) {
        backgroundImage.src = 'img/christmasmode.png'; // Set the new image source
    } else {
        console.error('Background image with class "backgroundslide1" not found!');
    }
}

// Function to activate Halloween mode
function activateHalloweenMode() {
    const backgroundImage = document.querySelector('.lastpagebackground');
    if (backgroundImage) {
        backgroundImage.src = 'img/halloweenversion2.png'; // Set the new image source
    } else {
        console.error('Background image with class "backgroundslide1" not found!');
    }
}

// Testing
console.log("Global Time:", thistime);
console.log("Global Language:", thislanguage);
checkSpecialDate(thistime);




// Not full stacks part

function adjustLandingPageImage() {
    const landingPageImage = document.querySelector('.landingpage');

    if (landingPageImage) {
        landingPageImage.style.position = "absolute"; // Position image to cover viewport
        landingPageImage.style.top = "0";
        landingPageImage.style.left = "0";
        landingPageImage.style.width = "100vw"; // Set width to 100% of the viewport
        landingPageImage.style.height = "100vh"; // Set height to 100% of the viewport
        landingPageImage.style.objectFit = "cover"; // Ensure the image scales proportionally
        landingPageImage.style.zIndex = "-1"; // Place the image behind other elements
    }
}

// Call the function to adjust the landing page image
adjustLandingPageImage();


const fadeOverlay = document.createElement('div');
document.body.appendChild(fadeOverlay);

// Apply initial styles through JavaScript
Object.assign(fadeOverlay.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    zIndex: '1000',
    opacity: '1', // Fully opaque at the start
    transition: 'opacity 1s ease', // Smooth fade effect
    pointerEvents: 'none', // Prevent it from blocking clicks
});

// Fade from black when the page loads
window.onload = () => {
    setTimeout(() => {
        fadeOverlay.style.opacity = '0'; // Fade out
        setTimeout(() => {
            fadeOverlay.style.display = 'none'; // Remove overlay from view after fade
        }, 800); // Match the duration of the fade
    }, 100); // Slight delay to ensure smooth transition
};

// Fade to black on click
const landingPageImage = document.querySelector('.listeningtaste2');
document.body.addEventListener('click', () => {
    fadeOverlay.style.display = 'block'; // Ensure the overlay is visible
    fadeOverlay.style.opacity = '1'; // Fade in to black

    window.location.href = 'mainhome.html';
});

