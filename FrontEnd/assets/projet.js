import { createButton } from "../utils/button.js";
import { openModal, closeModal, populateCategory } from "../utils/modale.js";

// Create Filter Button and Start with button "tous" use
createButton();

document.addEventListener("DOMContentLoaded", () => {
    const projectModificationButton = document.getElementById("projectModificationButton");
    const closeModalButton = document.querySelector(".close-modal");
    const modalProjectModification = document.getElementById("modalProjectModification");
    const buttonOpenAddWorks = document.querySelector(".button-addWorks");
    const modalAddProject = document.getElementById("modalAddProject");

    openModal(projectModificationButton, modalProjectModification);
    closeModal(closeModalButton, modalProjectModification);
    closeModal(buttonOpenAddWorks, modalProjectModification);

    openModal(buttonOpenAddWorks, modalAddProject);
    closeModal(closeModalButton, modalAddProject);

    populateCategory(category)
});