/// No full stack work for slide 8



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

