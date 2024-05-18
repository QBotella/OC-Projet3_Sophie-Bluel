async function login(email, password) {
    try {
        // Create a POST request to your login endpoint
        const response = await fetch('http://localhost:5678/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, password: password })
        });

        // Check if the request was successful
        if (response.ok) {
            const data = await response.json();
            // Stocke le token dans la session
            window.sessionStorage.setItem('token', data.token);
            // Redirect to another page
            window.location.href = "index.html";
        } else {
            // If the request fails, display an error message
            console.error('Erreur de connexion', response.status);
             // Display an error message to the user
            alert('Erreur dans l’identifiant ou le mot de passe');
        }
    } catch (error) {
        console.error('Erreur de connexion', error);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById('loginForm');

    // Function to handle form submission
    function handleFormSubmit(event) {
        event.preventDefault(); // Prevent the form from submitting normally

        // Get the values of the email and password fields
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Call the login function
        login(email, password);
    }

    loginForm.addEventListener('submit', handleFormSubmit);
});
