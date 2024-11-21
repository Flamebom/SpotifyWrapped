// Check example usage, you are only updating those values this should be simple
// Function to update the text for "YouListenedTo242MinutesOfMusicThisYear"
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

// Example usage:
updateMusicMinutes(500); // Update music minutes to 500
updateFavoriteTrack("Bohemian Rhapsody"); // Update favorite track to "Bohemian Rhapsody"
updateNewArtists(10); // Update new artists discovered to 10






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

