// Ensure that the Inter font is loaded and applied to the body
document.head.innerHTML += `
<link href='https://fonts.googleapis.com/css?family=Inter' rel='stylesheet'>
<meta charset="UTF-8">
`;

// Get the correct container (framemiddle)
var framemiddle = document.getElementsByClassName('framemiddle')[0];

// Create a container for all profile items inside framemiddle
let profileContainer = document.createElement("div");
framemiddle.appendChild(profileContainer); // Append to the framemiddle container

// Add CSS to the container (using a simple inline style)
profileContainer.style.cssText = `
    position: absolute; top: 5px; left: 0; right: 0; bottom: 0; align-items: center;
    gap: 20px; display: flex; flex-wrap: wrap; flex-direction: column;
    font-family: 'Inter', sans-serif; /* Apply the Inter font to the container */
`;

// Function to add profile items with name attributes

function addProfileItem(name, defaultValue, inputName) {
    let itemFrame = document.createElement("div");
    profileContainer.appendChild(itemFrame);

    // Add styles to itemFrame
    itemFrame.style.cssText = `
        box-sizing: border-box; 
        height: 60px; width: 100%;
        background: #FFFFFF; border: 1px solid #2C2C2C; border-radius: 5px;
        position: relative;
        display: flex;
        padding-left: 30px;
        font-style: normal; font-weight: 400; font-size: 13px; line-height: 120%; 
        align-items: center;
        overflow: visible; /* Ensures no overflow cutting off text */
        z-index: 1; /* Bring text forward */
    `;

    // Create and style the itemName (make the label bold and use Inter font)
    let itemName = document.createElement("div");
    itemName.textContent = name;
    itemFrame.appendChild(itemName);

    itemName.style.cssText = `
        position: absolute; height: 18px; left: 0px; top: -10px; 
        border-radius: 10px;
        display: flex; padding: 4px 10px;
        font-family: 'Inter', sans-serif; /* Apply Inter font */
        font-style: normal; font-weight: bold; /* Make it bold */
        font-size: 13px; line-height: 120%;
        background: #FFFFFF;
        color: #000000; /* Text color changed to black */
        z-index: 2; /* Make sure the label is in front */
    `;

    // Create and style the inputField with name attribute
    let inputField = document.createElement("input");
    inputField.type = "text";
    inputField.placeholder = defaultValue;
    inputField.name = inputName;  // Set unique name for each input

    inputField.style.cssText = `
        width: 100%; height: 100%;
        background: transparent;
        border: none;
        font-size: 13px;
        color: #000000; /* Change input text color to black */
        padding-left: 10px;
        font-family: 'Inter', sans-serif; /* Apply Inter font */
        box-sizing: border-box;
        outline: none;
    `;

    itemFrame.appendChild(inputField);

    // Add hover effect
    itemFrame.onpointerenter = () => {
        itemFrame.style.border = "1px solid #4A90E2";
    };
    itemFrame.onpointerleave = () => {
        itemFrame.style.border = "1px solid #2C2C2C";
    };

    return itemFrame;
}

// Add profile items with unique names
addProfileItem('Email', 'penguin@penguin.com', 'email');
addProfileItem('Password', 'Password', 'password');

// Define the function to add hover effect to buttons
function addHoverEffect(element) {
    element.style.cursor = 'pointer';
    element.addEventListener('mouseenter', function () {
        element.style.opacity = '0.65';  // Reduce opacity on hover
    });
    element.addEventListener('mouseleave', function () {
        element.style.opacity = '1';  // Restore original opacity when not hovered
    });
}

// Get references to the required buttons
var login1 = document.getElementsByClassName('login1')[0];
var signup1 = document.getElementsByClassName('signup1')[0];
var forgotyourpass = document.getElementsByClassName('forgotyourpass')[0];

// Explicitly set z-index to avoid overlap issues
login1.style.zIndex = '10';    // Set z-index for login button
signup1.style.zIndex = '10';   // Set z-index for signup button
forgotyourpass.style.zIndex = '10'; // Set z-index for forgot password text

// Create the wrong password message element and add it dynamically
var wrongPasswordMessage = document.createElement('div');
wrongPasswordMessage.className = 'wrong-password';
wrongPasswordMessage.style.position = 'absolute';
wrongPasswordMessage.style.top = '280px';
wrongPasswordMessage.style.left = '50%';
wrongPasswordMessage.style.transform = 'translateX(-50%)';
wrongPasswordMessage.style.color = 'red';
wrongPasswordMessage.style.fontSize = '16px';
wrongPasswordMessage.style.display = 'none';
wrongPasswordMessage.textContent = 'Wrong password. Please try again.';

// Append the wrong password message to the body
document.body.appendChild(wrongPasswordMessage);

// Add hover effect to the signup, login, and forgot your password elements
addHoverEffect(signup1);       // Hover effect for signup
addHoverEffect(login1);        // Hover effect for login
addHoverEffect(forgotyourpass);  // Hover effect for forgot your password

// Set up click event for signup button to redirect to signup page
signup1.addEventListener('click', function () {
    window.location.href = 'register.html'; // Redirect to signup page
    console.log("Redirecting to signup page");
});

// Set up click event for forgot password link to redirect to forgot password page
forgotyourpass.addEventListener('click', function () {
    window.location.href = 'resetpassword.html'; // Redirect to forgot password page
    console.log("Redirecting to forgot password page");
});

// Set up click event for login button to handle login logic
login1.addEventListener('click', function () {
    // Selecting input fields by name attributes
    var email = document.querySelector('input[name="email"]');
    var password = document.querySelector('input[name="password"]');

    // Log values for debugging
    console.log("Email:", email ? email.value : "Not found");
    console.log("Password:", password ? password.value : "Not found");

    // Display the top one if login FAILED. Buttom One if Login Sucessful
    if (!email || email.value.trim() === '' || !password || password.value.trim() === '') {
        wrongPasswordMessage.style.display = 'block';  // Show wrong password message
        console.log("Validation failed: One or more fields are empty.");
    } else {
        wrongPasswordMessage.style.display = 'none';  // Hide validation message
        console.log("All fields are filled. Proceeding with login.");
        window.location.href = "http://localhost:8000/spotify-auth/";

    }
});
