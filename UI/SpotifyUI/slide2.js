// FULL STACK SECTION
// Time 1 is top tracks, Time 2 is recent
function updateTimes(time1Minutes, time1Seconds, time2Minutes, time2Seconds) {
    // Select the elements for time1 and time2
    const time1Element = document.querySelector('.time1');
    const time2Element = document.querySelector('.time2');

    // Format the new times
    const formattedTime1 = `${time1Minutes} minutes and ${time1Seconds} seconds`;
    const formattedTime2 = `${time2Minutes} minutes and ${time2Seconds} seconds`;

    // Update the content of time1
    if (time1Element) {
        time1Element.textContent = formattedTime1;
    } else {
        console.error('Element .time1 not found!');
    }

    // Update the content of time2
    if (time2Element) {
        time2Element.textContent = formattedTime2;
    } else {
        console.error('Element .time2 not found!');
    }
}

// Example usage: Update time1 to "5000 minutes and 30 seconds" and time2 to "2000 minutes and 45 seconds"
updateTimes(5000, 30, 2000, 45);

















// Ensure that the Inter font is loaded and applied to the body
document.head.innerHTML += `
<link href='https://fonts.googleapis.com/css?family=Inter' rel='stylesheet'>
<meta charset="UTF-8">
`;

function setBackgroundImageCover() {
    // Select the image with the class 'backgroundslide1'
    const img = document.querySelector('.backgroundslide2');
    if (!img) {
        console.error('Element with class "backgroundslide2" not found.');
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
        }, 800); // Match the duration of the fade
    }, 100); // Slight delay to ensure smooth transition
};

// Fade to black on click
document.body.addEventListener('click', () => {
    fadeOverlay.style.display = 'block'; // Ensure the overlay is visible
    fadeOverlay.style.opacity = '1'; // Fade in to black

    window.location.href = 'story2slide3';
});


// Select the background image element
const backgroundImage = document.querySelector('.backgroundslide2');

// Disable drag behavior
backgroundImage.setAttribute('draggable', 'false'); // Prevent the image from being dragged
backgroundImage.onmousedown = (event) => {
    event.preventDefault(); // Disable the default drag behavior
};
