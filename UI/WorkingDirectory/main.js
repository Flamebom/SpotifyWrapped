
// Global variable to track the current selected mode
let currentMode = 'homebar';

// Function to set opacity for a given element
function setOpacity(element, opacity) {
    element.style.opacity = opacity;
}

// Function to handle mode change
function changeMode(newModeElement, newModeName) {
    // Set current mode opacity to 0.7
    const previousModeElement = document.getElementsByClassName(currentMode)[0];
    setOpacity(previousModeElement, 0.7);

    // Set new mode opacity to 1
    setOpacity(newModeElement, 1);

    // Update the global currentMode
    currentMode = newModeName;
}

// Add event listeners to each bar
document.addEventListener('DOMContentLoaded', () => {
    const homebar = document.getElementsByClassName('homebar')[0];
    const searchbara = document.getElementsByClassName('searchbara')[0];
    const youraccountbar = document.getElementsByClassName('youraccountbar')[0];
    const discoverybar = document.getElementsByClassName('discoverybar')[0];

    // Initialize default selected mode
    setOpacity(homebar, 1);
    setOpacity(searchbara, 0.7);
    setOpacity(youraccountbar, 0.7);
    setOpacity(discoverybar, 0.7);

    // Add click event listeners
    homebar.addEventListener('click', () => changeMode(homebar, 'homebar'));
    searchbara.addEventListener('click', () => changeMode(searchbara, 'searchbara'));
    youraccountbar.addEventListener('click', () => changeMode(youraccountbar, 'youraccountbar'));
    discoverybar.addEventListener('click', () => changeMode(discoverybar, 'discoverybar'));
});
