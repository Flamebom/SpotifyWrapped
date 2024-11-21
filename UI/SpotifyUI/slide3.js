// Full stack work
// I have provided sample data structure for you

// This might be a bit more work but it should make things very clear to understand. Just writea function that parses the data
// into a list like the following and just call the method.


const tracks_data = [
    {
        name: "Song Title 1",
        artist: "Artist Name 1",
        album_cover: "https://via.placeholder.com/50",
        minutes: 3,
        seconds: 45,
        preview_url: "https://example.com/preview1"
    },
    {
        name: "Song Title 2",
        artist: "Artist Name 2",
        album_cover: "https://via.placeholder.com/50",
        minutes: 4,
        seconds: 12,
        preview_url: "https://example.com/preview2"
    },
    {
        name: "Song Title 3",
        artist: "Artist Name 3",
        album_cover: "https://via.placeholder.com/50",
        minutes: 5,
        seconds: 30,
        preview_url: "https://example.com/preview3"
    },
    {
        name: "Song Title 4",
        artist: "Artist Name 4",
        album_cover: "https://via.placeholder.com/50",
        minutes: 2,
        seconds: 50,
        preview_url: "https://example.com/preview4"
    },
    {
        name: "Song Title 5",
        artist: "Artist Name 5",
        album_cover: "https://via.placeholder.com/50",
        minutes: 4,
        seconds: 20,
        preview_url: "https://example.com/preview5"
    }
];



// Dynamically populate the song details
tracks_data.forEach((track, index) => {
    const songClass = `song${index + 1}`;
    const songDiv = document.querySelector(`.${songClass}`);
    if (songDiv) {
        // Set up the song element content
        songDiv.innerHTML = `
            <div style="width: 90px; height: 50px; color: #22306D; font-size: 40px; font-family: Inter; font-weight: 700; line-height: 40px; word-wrap: break-word">#${index + 1}</div>
            ${track.album_cover ? `<img src="${track.album_cover}" alt="${track.name}" width="50">` : ''}
            <div>
                <div style="font-family: Inter; font-weight: 700; font-size: 18px;">${track.name}</div>
                <div style="font-family: Inter; font-weight: 600; font-size: 14px;">Duration: ${track.minutes} min ${track.seconds} sec</div>
            </div>
        `;

        // Make the entire div clickable if `preview_url` is available
        if (track.preview_url) {
            songDiv.style.cursor = "pointer";
            songDiv.addEventListener("click", () => {
                window.open(track.preview_url, "_blank");
            });
        }
    }
});







// Example `artists_data` array
const artists_data = [
    {
        name: "Artist Name 1",
        image: "https://via.placeholder.com/50",
        genres: ["Pop", "Rock"],
        top_track_name: "Top Track 1",
        top_track_preview: "https://example.com/preview1"
    },
    {
        name: "Artist Name 2",
        image: "https://via.placeholder.com/50",
        genres: ["Jazz", "Blues"],
        top_track_name: "Top Track 2",
        top_track_preview: "https://example.com/preview2"
    },
    {
        name: "Artist Name 3",
        image: "https://via.placeholder.com/50",
        genres: ["Classical", "Instrumental"],
        top_track_name: "Top Track 3",
        top_track_preview: "https://example.com/preview3"
    },
    {
        name: "Artist Name 4",
        image: "https://via.placeholder.com/50",
        genres: ["Hip-Hop", "Rap"],
        top_track_name: "Top Track 4",
        top_track_preview: "https://example.com/preview4"
    },
    {
        name: "Artist Name 5",
        image: "https://via.placeholder.com/50",
        genres: ["Electronic", "Dance"],
        top_track_name: "Top Track 5",
        top_track_preview: "https://example.com/preview5"
    }
];

// Dynamically populate artist details
artists_data.forEach((artist, index) => {
    const artistClass = `artist${index + 1}`;
    const artistDiv = document.querySelector(`.${artistClass}`);
    if (artistDiv) {
        artistDiv.innerHTML = `
            <div style="width: 90px; height: 50px; color: #3C00E4; font-size: 40px; font-family: Inter; font-weight: 700; line-height: 40px; word-wrap: break-word">#${index + 1}</div>
            ${artist.image ? `<img src="${artist.image}" alt="${artist.name}" width="50">` : ''}
            <div>
                <div style="font-family: Inter; font-weight: 900; font-size: 14px;">${artist.name}</div>
                <div style="font-family: Inter; font-weight: 600; font-size: 10px;">Genres: ${artist.genres.join(", ")}</div>
                ${artist.top_track_name ? `
                    <div style="font-family: Inter; font-weight: 600; font-size: 10px;">
                        Top Track: ${artist.top_track_name}
                    </div>
                ` : ''}
            </div>
        `;

        // Make the entire div clickable if `top_track_preview` exists
        if (artist.top_track_preview) {
            artistDiv.style.cursor = "pointer";
            artistDiv.addEventListener("click", () => {
                event.stopPropagation();
                window.open(artist.top_track_preview, "_blank");
            });
        }
    }
});




// Example `top_genres` array
const top_genres = ["Pop", "Rock", "Jazz", "Hip-Hop", "Electronic"];

// Dynamically populate genres
top_genres.forEach((genre, index) => {
    const genreClass = `genre${index + 1}`;
    const genreDiv = document.querySelector(`.${genreClass}`);
    if (genreDiv) {
        genreDiv.innerHTML = `
            <div style="width: 90px; height: 40px; color: #22306D; font-size: 40px; font-family: Inter; font-weight: 700; line-height: 40px; word-wrap: break-word">#${index + 1}</div>
            <div style="font-family: Inter; font-weight: 900; font-size: 32px;">${genre}</div>
        `;
    }
});





















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

    window.location.href = 'story2slide4.html';
});
