// Import necessary functions and modules
import {
  openModal,
  closeModal,
  populateCategory,
  addWorks,
  checkImage,
  checkFormValidity,
} from "../utils/modale.js";
import { setLoggedHomePage } from "./login.js";

// Select elements from the DOM
const projectModificationButton = document.getElementById(
  "projectModificationButton"
);
const closeModalButton = document.querySelector(".close-modal");
const modalProjectModification = document.getElementById(
  "modalProjectModification"
);
const buttonOpenAddWorks = document.querySelector(".button-addWorks");
const modalAddProject = document.getElementById("modalAddProject");
const addProject = document.getElementById("addProject");
const modalBackButton = document.querySelector(".back-icon");
const closeModal2Button = document.querySelector(".close-modal2");
const image = document.getElementById("image");
const imageAfficher = document.querySelector(".image-afficher");
const uploadButton = document.querySelector(".upload-file-trigger");
const uploadButtonText = document.querySelector(".image-form-group>p");
const uploadTitle = document.getElementById("title");
const uploadCategory = document.getElementById("category");

// Initialize the home page
setLoggedHomePage();

// Set up event listeners for opening and closing modals
openModal(projectModificationButton, modalProjectModification);
openModal(modalBackButton, modalProjectModification);
closeModal(closeModalButton, modalProjectModification);
closeModal(buttonOpenAddWorks, modalProjectModification);

openModal(buttonOpenAddWorks, modalAddProject);
closeModal(closeModal2Button, modalAddProject);
closeModal(modalBackButton, modalAddProject);

// Populate the category dropdown
populateCategory(category);

image.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  // Check if the file is a valid image
  if (!checkImage(file)) return;

  // Read the image file and display it
  const reader = new FileReader();
  reader.addEventListener("load", (e) => {
    imageAfficher.innerHTML = "";
    const img = document.createElement("img");
    img.src = e.target.result;
    imageAfficher.append(img);
    uploadButton.style.display = "none";
    uploadButtonText.style.display = "none";
  });
  reader.readAsDataURL(file);
});

// Event listeners for form input changes to check form validity
if (uploadTitle) {
  uploadTitle.addEventListener("input", checkFormValidity);
}

if (uploadCategory) {
  uploadCategory.addEventListener("change", checkFormValidity);
}

// Event listener for form submission to add a new work
addProject.addEventListener("submit", (e) => {
  e.preventDefault();
  addWorks(image.files[0], uploadTitle.value, uploadCategory.value);
});
