import {
  openModal,
  closeModal,
  populateCategory,
  addWorks,
  checkFormValidity,
} from "../utils/modale.js";
import { setLoggedHomePage } from "./login.js";

const projectModificationButton = document.getElementById(
  "projectModificationButton"
);
const closeModalButton = document.querySelector(".close-modal");
const modalProjectModification = document.getElementById(
  "modalProjectModification"
);
const buttonOpenAddWorks = document.querySelector(".button-addWorks");
const modalAddProject = document.getElementById("modalAddProject");
const addProject = document.getElementById("#addProject");

setLoggedHomePage();

openModal(projectModificationButton, modalProjectModification);
closeModal(closeModalButton, modalProjectModification);
closeModal(buttonOpenAddWorks, modalProjectModification);

openModal(buttonOpenAddWorks, modalAddProject);
closeModal(closeModalButton, modalAddProject);

populateCategory(category);

addProject.addEventListener("submit", () => {
  addWorks();
});

checkFormValidity();
