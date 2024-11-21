// Full stacks job
// parse the geminiReponse to the following function. I have an example down there. Just fill it into there.

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

// Example usage of the function
updateMusicalPersonality("You are a vibrant music explorer who thrives on rhythm and melody, embracing diverse genres with an open heart.");















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

    window.location.href = 'story2slide5.html';
});

