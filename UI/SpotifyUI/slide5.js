// TODO: Full Stack Implementation (Code Here)
// 1. Use `thistime` and `thislanguage` from session storage to query the Django database.
// 2. Fetch the recommended tracks data and parse it into the following structure:
//    {
//        name: "Track Name",
//        artist: "Artist Name",
//        album_cover: "URL to Album Cover",
//        preview_url: "URL to Track Preview" (or `null` if no preview is available)
//    }
// 3. Ensure the property names and structure match `recommended_tracks` for consistency.
// 4. Pass the parsed data to the relevant frontend update function and test thoroughly.

// Example of `recommended_tracks` structure:
// Can comment this out after implementation
const recommended_tracks = [
    {
        name: "Track 1",
        artist: "Artist 1",
        album_cover: "https://via.placeholder.com/50",
        preview_url: "https://example.com/preview1"
    },
    {
        name: "Track 2",
        artist: "Artist 2",
        album_cover: "https://via.placeholder.com/50",
        preview_url: "https://example.com/preview2"
    },
    {
        name: "Track 3",
        artist: "Artist 3",
        album_cover: "https://via.placeholder.com/50",
        preview_url: null // No preview available. Simulating no preview
    }
];


// UI Part
// Function to populate recommended tracks directly to the body
function populateRecommendedTracks(tracks) {
    const body = document.body; // Target the <body> element

    if (tracks && tracks.length > 0) {
        tracks.forEach((track, index) => {
            // Create the track container
            const trackContainer = document.createElement('div');
            trackContainer.style.cssText = `
                padding: 10px;
                display: flex;
                align-items: center;
                position: absolute;
                top: ${266 + index * 120}px; /* Adjust position for each track */
                left: 159px;
                width: 505px;
                height: 100px;
                cursor: ${track.preview_url ? 'pointer' : 'default'};
            `;

            // Add click event if preview_url exists
            if (track.preview_url) {
                trackContainer.addEventListener('click', () => {
                    event.stopPropagation();
                    window.open(track.preview_url, '_blank');
                });
            }

            // Add album cover
            if (track.album_cover) {
                const albumCover = document.createElement('img');
                albumCover.src = track.album_cover;
                albumCover.alt = track.name;
                albumCover.width = 70; // Set the width of the image
                albumCover.style.marginRight = "10px";
                trackContainer.appendChild(albumCover);
            }

            // Add track details
            const detailsDiv = document.createElement('div');
            detailsDiv.innerHTML = `
                <strong>${track.name}</strong><br>
                by ${track.artist}
            `;
            trackContainer.appendChild(detailsDiv);

            // Append the track container to the body
            body.appendChild(trackContainer);
        });
    } else {
        // Show a fallback message if no tracks are available
        const noRecommendations = document.createElement('p');
        noRecommendations.textContent = 'No recommendations available at this time.';
        noRecommendations.style.cssText = `
            position: absolute;
            top: 266px;
            left: 159px;
        `;
        body.appendChild(noRecommendations);
    }
}

// Call the function with sample data
populateRecommendedTracks(recommended_tracks);

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
document.body.addEventListener('click', () => {
    fadeOverlay.style.display = 'block'; // Ensure the overlay is visible
    fadeOverlay.style.opacity = '1'; // Fade in to black

    window.location.href = '/page/6/';
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
    const backgroundImage = document.querySelector('.landingpage');
    if (backgroundImage) {
        backgroundImage.src = 'img/christmasversion.png'; // Set the new image source
    } else {
        console.error('Background image with class "backgroundslide1" not found!');
    }
}

// Function to activate Halloween mode
function activateHalloweenMode() {
    const backgroundImage = document.querySelector('.landingpage');
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

