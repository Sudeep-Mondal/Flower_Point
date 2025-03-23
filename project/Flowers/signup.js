// Select the form and message elements
const signupForm = document.getElementById('signupForm');
const messageDiv = document.getElementById('message');

// Handle form submission
signupForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Get username, email, and password values from the form
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        // Send signup data to the backend
        const response = await fetch('http://localhost:3001/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            // Display success message
            messageDiv.textContent = data.message;
            messageDiv.style.color = 'green';

            // Redirect to login page
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);
        } else {
            // Display error message
            messageDiv.textContent = data.message || 'Signup failed.';
            messageDiv.style.color = 'red';
        }
    } catch (error) {
        console.error('Error:', error);
        messageDiv.textContent = 'An error occurred. Please try again later.';
        messageDiv.style.color = 'red';
    }
});
