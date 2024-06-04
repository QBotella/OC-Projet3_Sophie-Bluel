import { createWorks } from "../utils/gallery.js";
import { getData } from "../utils/fetch.js";
import { createButton } from "../utils/button.js";

async function login(email, password) {
  try {
    // Create a POST request to your login endpoint
    const response = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });

    // Check if the request was successful
    if (response.ok) {
      const data = await response.json();
      // Store the token in the session
      window.sessionStorage.setItem("token", data.token);
      // Redirect to another page
      window.location.href = "index.html";
    } else {
      // If the request fails, display an error message
      console.error("Erreur de connexion", response.status);
      // Display an error message to the user
      alert("Erreur dans l’identifiant ou le mot de passe");
    }
  } catch (error) {
    console.error("Erreur de connexion", error);
  }
}

const loginForm = document.getElementById("loginForm");

// Function to handle form submission
function handleFormSubmit(event) {
  event.preventDefault(); // Prevent the form from submitting normally

  // Get the values of the email and password fields
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Call the login function
  login(email, password);
}

// Add an event listener for form submission
loginForm?.addEventListener("submit", handleFormSubmit);

// Function to set up the home page after login
export const setLoggedHomePage = async () => {
  const works = await getData("http://localhost:5678/api/works");
  const logged = window.sessionStorage.getItem("token");
  const editionBanner = document.getElementById("editionBanner");
  const loginLink = document.querySelector(".loginLink");
  const btnFilter = document.getElementById("btnFilter");
  const projectModificationButton = document.getElementById(
    "projectModificationButton"
  );

  if (logged) {
    // Change login link text to logout
    loginLink.textContent = "logout";

    // Add event listener to logout link
    loginLink.addEventListener("click", () => {
      window.sessionStorage.removeItem("token");
      window.location.reload();
    });

    // Show elements for logged-in users
    editionBanner.style.display = "flex";
    projectModificationButton.style.display = "flex";
    btnFilter.style.display = "none";

    // Show element for logged-in users
    createWorks(works, 0);
  } else {
    // Show elements for non-logged-in users
    createButton();
    loginLink.addEventListener("click", () => {
      window.location.href = "login.html";
    });
  }
};
