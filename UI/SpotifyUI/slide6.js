// TODO: Full Stack Implementation (Code Here)
// 1. Use `thistime` and `thislanguage` from session storage to query the Django database.
// 2. Parse the retrieved data and update the following values using the provided functions:
//    - Total minutes listened: `updateMusicMinutes(minutes)`
//    - Favorite track: `updateFavoriteTrack(trackName)`
//    - Number of new artists discovered: `updateNewArtists(artistCount)`
// 3. Ensure the integration is smooth and test for edge cases (e.g., no data or invalid values).

// Example usage:
updateMusicMinutes(500); // Update total minutes listened to 500
updateFavoriteTrack("Bohemian Rhapsody"); // Update favorite track to "Bohemian Rhapsody"
updateNewArtists(10); // Update new artists discovered to 10




function updateMusicMinutes(minutes) {
    const element = document.querySelector(".YouListenedTo242MinutesOfMusicThisYear");
    if (element) {
        element.textContent = `You listened to ${minutes} minutes of music this year!`;
    }
}

// Function to update the text for "YourFavoriteTrack16WasPlayedManyTimes"
function updateFavoriteTrack(trackName) {
    const element = document.querySelector(".YourFavoriteTrack16WasPlayedManyTimes");
    if (element) {
        element.textContent = `Your favorite track, ${trackName}, was played many times!`;
    }
}

// Function to update the text for "YouDiscovered5NewArtistsThisYearAlwaysExploring"
function updateNewArtists(count) {
    const element = document.querySelector(".YouDiscovered5NewArtistsThisYearAlwaysExploring");
    if (element) {
        element.textContent = `You discovered ${count} new artists this year—always exploring!`;
    }
}





// Not full stacks part
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

    window.location.href = 'story2slide7.html';
});



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
    const backgroundImage = document.querySelector('.story2slide6background1');
    if (backgroundImage) {
        backgroundImage.src = 'img/christmasversion.png'; // Set the new image source
    } else {
        console.error('Background image with class "backgroundslide1" not found!');
    }
}

// Function to activate Halloween mode
function activateHalloweenMode() {
    const imgElement = document.querySelector('.story2slide6background1');
    if (imgElement) {
        imgElement.src = 'img/halloweenversion3.png'; // Set the new image source
        imgElement.style.width = '100vw'; // Match the viewport width
        imgElement.style.height = '100vh'; // Match the viewport height
        imgElement.style.objectFit = 'contain'; // Prevent cropping by scaling the image proportionally
        imgElement.style.position = 'absolute'; // Position to cover the screen
        imgElement.style.top = '0';
        imgElement.style.left = '0';
        imgElement.style.backgroundColor = "#EE6A26";
        imgElement.style.zIndex = '-1'; // Push it behind other elements
        console.log("Halloween image applied without cropping!");

    } else {
        console.error('Background image with class "backgroundslide1" not found!');
    }
}

// Testing
console.log("Global Time:", thistime);
console.log("Global Language:", thislanguage);


