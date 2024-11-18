// FULL STACK SECTION
// NO need for full stacks probably











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
