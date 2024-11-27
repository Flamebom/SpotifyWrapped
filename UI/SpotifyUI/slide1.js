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
    const backgroundImage = document.querySelector('.backgroundslide1');
    if (backgroundImage) {
        backgroundImage.src = 'img/christmasmode.png'; // Set the new image source
    } else {
        console.error('Background image with class "backgroundslide1" not found!');
    }

    // Change text color to white for the welcome message
    const welcomeText = document.querySelector('.welcometo');
    if (welcomeText) {
        welcomeText.style.color = '#FFFFFF'; // Set text color to white
    } else {
        console.error('Welcome text with class "welcometo" not found!');
    }

    // Change text color to white for the summary
    const summaryText = document.querySelector('.spotifysummary');
    if (summaryText) {
        summaryText.style.color = '#FFFFFF'; // Set text color to white
    } else {
        console.error('Summary text with class "spotifysummary" not found!');
    }
}

// Function to activate Halloween mode
function activateHalloweenMode() {
    const backgroundImage = document.querySelector('.backgroundslide1');
    if (backgroundImage) {
        backgroundImage.src = 'img/halloweenversion1.png'; // Set the new image source
    } else {
        console.error('Background image with class "backgroundslide1" not found!');
    }
    console.log("Activating Halloween Mode!");
}

// Testing
console.log("Global Time:", thistime);
console.log("Global Language:", thislanguage);
checkSpecialDate(thistime);





// Ensure that the Inter font is loaded and applied to the body
document.head.innerHTML += `
<link href='https://fonts.googleapis.com/css?family=Inter' rel='stylesheet'>
<meta charset="UTF-8">
`;

function setBackgroundImageCover() {
    // Select the image with the class 'backgroundslide1'
    const img = document.querySelector('.backgroundslide1');
    if (!img) {
        console.error('Element with class "backgroundslide1" not found.');
        return;
    }

    // Apply styles to make the image cover the entire background
    Object.assign(img.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: '-1', // Ensure it stays in the background
    });
}

// Call the function to apply the styles
setBackgroundImageCover();

// Wait for the font to load and then apply the changes
window.onload = () => {
    const spotifySummaryElement = document.querySelector('.spotifysummary');
    if (spotifySummaryElement) {
        // Apply Inter font and extra bold weight
        spotifySummaryElement.style.fontFamily = "'Inter', sans-serif";
        spotifySummaryElement.style.fontWeight = '800'; // Extra bold
    } else {
        console.error('Element with class "spotifysummary" not found.');
    }
};


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
        }, 1000); // Match the duration of the fade
    }, 100); // Slight delay to ensure smooth transition
};

// Fade to black on click
document.body.addEventListener('click', () => {
    fadeOverlay.style.display = 'block'; // Ensure the overlay is visible
    fadeOverlay.style.opacity = '1'; // Fade in to black

    window.location.href = 'story2slide2.html';
});



// Select the background image element
const backgroundImage = document.querySelector('.backgroundslide1');

// Disable drag behavior
backgroundImage.setAttribute('draggable', 'false'); // Prevent the image from being dragged
backgroundImage.onmousedown = (event) => {
    event.preventDefault(); // Disable the default drag behavior
};
