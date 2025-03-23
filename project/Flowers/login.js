// login.js
// Select the form and message elements
const loginForm = document.getElementById('loginForm');
const messageDiv = document.getElementById('message');

// Handle form submission
loginForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Get email and password values from the form
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        // Send login data to the backend
        const response = await fetch('http://localhost:3001/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            // Store the token (optional)
            localStorage.setItem('authToken', data.token);

            // Redirect to index.html
            window.location.href = 'index.html';
        } else {
            // Display error message
            messageDiv.textContent = data.message || 'Login failed.';
            messageDiv.style.color = 'red';
        }
    } catch (error) {
        console.error('Error:', error);
        messageDiv.textContent = 'An error occurred. Please try again later.';
        messageDiv.style.color = 'red';
    }
});
