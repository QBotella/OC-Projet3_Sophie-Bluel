import { createButton } from "../utils/button.js";
import { openModal, closeModal } from "../utils/modale.js";

// Create Filter Button and Start with button "tous" use
createButton();

document.addEventListener("DOMContentLoaded", () => {
    const openModalButton = document.getElementById("projectModificationButton");
    const closeModalButton = document.querySelector(".close-modal");
    const modal = document.getElementById("modalProjectModification");

    openModal(openModalButton, modal);
    closeModal(closeModalButton, modal);
});