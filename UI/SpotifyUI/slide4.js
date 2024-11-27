// Full Stacks Section (Code Here)
// 1. Query the Django database using `thistime` and `thislanguage` to get the Gemini Response.
//    - Ensure the query is efficient and handles errors gracefully.
// 2. Parse the `GeminiResponse` string from the database and pass it to the `updateMusicalPersonality` function.
//    - This should be straightforward, as only the result string needs to be processed.
// 3. Call the `updateMusicalPersonality` function with the parsed result string.
const thistime = sessionStorage.getItem("GlobalTime"); // sample time: 12/25/2024, 7:45:00 PM
const thislanguage = sessionStorage.getItem("GlobalLanguage");

// Example usage of the `updateMusicalPersonality` function:
updateMusicalPersonality("You are a vibrant music explorer who thrives on rhythm and melody, embracing diverse genres with an open heart.");







// UI Sections
/**
 * Function to update the musical personality section with Gemini's response
 * @param {string} geminiResponse - The Gemini response text
 */
function updateMusicalPersonality(geminiResponse) {
    const youSpentDiv = document.querySelector('.youspent');

    if (youSpentDiv) {
        youSpentDiv.innerHTML = `
            <div class="section">
                <p style="
                    font-family: 'Inter';
                    font-style: normal;
                    font-weight: 700;
                    font-size: 40px;
                    line-height: 100%;
                    text-align: center;
                    letter-spacing: -0.05em;
                ">
                    Gemini said -- "${geminiResponse}"
                </p>
            </div>
        `;

        // Adjust div position and other styles
        youSpentDiv.style.position = "relative"; // Ensure positioning for top adjustment
        youSpentDiv.style.top = "250px"; // Move div 10px upwards
    }
}

// Not full stacks part
checkSpecialDate(thistime);
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
document.body.addEventListener('click', () => {
    fadeOverlay.style.display = 'block'; // Ensure the overlay is visible
    fadeOverlay.style.opacity = '1'; // Fade in to black

    window.location.href = 'story2slide5.html';
});



// Function to access global settings from sessionStorage
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
    const backgroundImage = document.querySelector('.rectanglebackwhite');
    if (backgroundImage) {
        backgroundImage.style.background = '#173842'; // Set background color to #173842
    } else {
        console.error('Background element with class "rectanglebackwhite" not found!');
    }

    // Change the text color of .youspent to white
    const welcomeText = document.querySelector('.youspent');
    if (welcomeText) {
        welcomeText.style.color = '#FFFFFF'; // Set text color to white
        console.log('Text color changed to white!');
    } else {
        console.error('Text element with class "youspent" not found!');
    }
}

// Function to activate Halloween mode
function activateHalloweenMode() {
    const backgroundImage = document.querySelector('.rectanglebackwhite');
    if (backgroundImage) {
        backgroundImage.style.background = "#E66C2C"; // Set background color to #173842
    } else {
        console.error('Background element with class "rectanglebackwhite" not found!');
    }

    // Change the text color of .youspent to white
    const welcomeText = document.querySelector('.youspent');
    if (welcomeText) {
        welcomeText.style.color = '#FFFFFF'; // Set text color to white
        console.log('Text color changed to white!');
    } else {
        console.error('Text element with class "youspent" not found!');
    }
}

// Testing
console.log("Global Time:", thistime);
console.log("Global Language:", thislanguage);


