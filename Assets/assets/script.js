// Function to load credentials from the JSON file
async function loadCredentials() {
    try {
        const response = await fetch('credentials.json'); // Ensure this path is correct
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const credentials = await response.json();
        console.log('Loaded credentials:', credentials); // Debugging log
        return credentials;
    } catch (error) {
        console.error('Error loading credentials:', error);
        return []; // Return an empty array if loading fails
    }
}

// Function to validate user credentials
async function validateCredentials(username, password) {
    const credentials = await loadCredentials();
    if (credentials.length === 0) {
        console.error('No credentials loaded.');
        return false;
    }

    console.log('Validating credentials for username:', username); // Log username
    const isValid = credentials.some(credential => {
        console.log(`Checking against: ${credential.username}:${credential.password}`); // Log each credential
        return credential.username === username && credential.password === password;
    });

    console.log(`Validation result: ${isValid}`); // Log result of validation
    return isValid;
}

// Event listener for form submission
document.getElementById('dataForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(this);
    const username = formData.get('username');
    const password = formData.get('password');

    // Validate credentials
    const isValid = await validateCredentials(username, password);

    const messageElement = document.getElementById('message'); // Get the message element

    if (isValid) {
        messageElement.textContent = 'Valid credentials'; // Show success message
        messageElement.style.color = 'green'; // Optional: Set text color to green

        // Optionally, simulate form submission to a server
        try {
            const response = await fetch('https://your-server-endpoint.com/submit', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: { 'Content-Type': 'application/json' }
            });
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Success:', data);
        } catch (error) {
            console.error('Error during form submission:', error);
        }

    } else {
        messageElement.textContent = 'Invalid username or password'; // Show error message
        messageElement.style.color = 'red'; // Optional: Set text color to red
    }
});
