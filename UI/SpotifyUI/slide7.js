// Listening habits data
const listening_habits = {
    "Last 4 Weeks": {
        tracks: [
            { name: "Track A", artist: "Artist A", album_cover: "https://via.placeholder.com/50", preview_url: "https://example.com/previewA" },
            { name: "Track B", artist: "Artist B", album_cover: "https://via.placeholder.com/50", preview_url: "https://example.com/previewB" },
            { name: "Track A", artist: "Artist A", album_cover: "https://via.placeholder.com/50", preview_url: "https://example.com/previewA" },
            { name: "Track B", artist: "Artist B", album_cover: "https://via.placeholder.com/50", preview_url: "https://example.com/previewB" },
            { name: "Track A", artist: "Artist A", album_cover: "https://via.placeholder.com/50", preview_url: "https://example.com/previewA" }
        ]
    },
    "Last 6 Months": {
        tracks: [
            { name: "Track C", artist: "Artist C", album_cover: "https://via.placeholder.com/50", preview_url: "https://example.com/previewC" },
            { name: "Track C", artist: "Artist C", album_cover: "https://via.placeholder.com/50", preview_url: "https://example.com/previewC" },
            { name: "Track C", artist: "Artist C", album_cover: "https://via.placeholder.com/50", preview_url: "https://example.com/previewC" },
            { name: "Track C", artist: "Artist C", album_cover: "https://via.placeholder.com/50", preview_url: "https://example.com/previewC" },
            { name: "Track C", artist: "Artist C", album_cover: "https://via.placeholder.com/50", preview_url: "https://example.com/previewC" }
        ]
    },
    "All Time": {
        tracks: [
            { name: "Track D", artist: "Artist D", album_cover: "https://via.placeholder.com/50", preview_url: "https://example.com/previewD" }, 
            { name: "Track D", artist: "Artist D", album_cover: "https://via.placeholder.com/50", preview_url: "https://example.com/previewD" }, 
            { name: "Track D", artist: "Artist D", album_cover: "https://via.placeholder.com/50", preview_url: "https://example.com/previewD" }, 
            { name: "Track D", artist: "Artist D", album_cover: "https://via.placeholder.com/50", preview_url: "https://example.com/previewD" }, 
            { name: "Track D", artist: "Artist D", album_cover: "https://via.placeholder.com/50", preview_url: "https://example.com/previewD" }
        ]
    }
};

// Function to create listening habits frames
function createListeningHabitsFrames(listeningHabits) {
    const body = document.body;


        // Select all relevant elements
    const element4Weeks = document.querySelector('.last4Weeks');
    const element6Months = document.querySelector('.last6Months');
    const elementAllTime = document.querySelector('.allTime');

    // Get the computed styles
    const leftValue4 = window.getComputedStyle(element4Weeks).left;
    const leftValue6 = window.getComputedStyle(element6Months).left;
    const leftValueAllTime = window.getComputedStyle(elementAllTime).left;

    // Define positions for frames
    const framePositions = {
        "Last 4 Weeks": { left: leftValue4, top: "220px" },
        "Last 6 Months": { left: leftValue6, top: "220px" },
        "All Time": { left: leftValueAllTime, top: "220px" }
    };



    Object.keys(listeningHabits).forEach((timeLabel) => {
        const data = listeningHabits[timeLabel];

        // Create a frame container
        const frame = document.createElement("div");
        frame.style.cssText = `
            position: absolute;
            left: ${framePositions[timeLabel].left};
            top: ${framePositions[timeLabel].top};
            width: 300px;
            padding: 20px;
        `;

        // Add the tracks
        const tracksList = document.createElement("ul");
        data.tracks.forEach((track) => {
            const trackItem = document.createElement("li");
            trackItem.style.cssText = `
                margin-bottom: 30px;
                margin-left: -20px;
                display: flex;
                align-items: center;
            `;

            trackItem.addEventListener("click", () => {
                event.stopPropagation();
                if (track.preview_url) {
                    window.open(track.preview_url, "_blank");
                }
            });

            // Album cover (clickable)
            if (track.album_cover) {
                const albumCover = document.createElement("img");
                albumCover.src = track.album_cover;
                albumCover.alt = track.name;
                albumCover.style.cssText = `
                    width: 50px;
                    height: 50px;
                    border-radius: 4px;
                    margin-right: 10px;
                    cursor: pointer;
                `;
                trackItem.appendChild(albumCover);
            }


            // Track details (clickable name)
            const trackDetails = document.createElement("div");
            const trackName = document.createElement("a");
            trackName.textContent = track.name;
            trackName.href = track.preview_url || "#";
            trackName.target = "_blank";
            trackName.style.cssText = `
                font-size: 18px;
                font-weight: bold;
                text-decoration: none;
                color: white;
                cursor: pointer;
            `;
            trackDetails.appendChild(trackName);

            const artistName = document.createElement("div");
            artistName.textContent = `by ${track.artist}`;
            artistName.style.cssText = `
                font-size: 16px;
                color: white;
            `;
            trackDetails.appendChild(artistName);

            trackItem.appendChild(trackDetails);

            tracksList.appendChild(trackItem);
        });

        frame.appendChild(tracksList);

        // Append the frame to the body
        body.appendChild(frame);
    });
}

// Call the function to create frames
createListeningHabitsFrames(listening_habits);









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

    window.location.href = 'story2slide8.html';
});

