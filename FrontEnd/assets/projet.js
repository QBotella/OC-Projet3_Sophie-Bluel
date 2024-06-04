import {
  openModal,
  closeModal,
  populateCategory,
  addWorks,
  //checkImage,
  //checkFormValidity,
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
const modalBackButton = document.querySelector(".back-icon");
const closeModal2Button = document.querySelector(".close-modal2");
const image = document.getElementById("image");
const imageAfficher = document.querySelector(".image-afficher");
const uploadButton = document.querySelector(".upload-file-trigger");
const uploadButtonText = document.querySelector(".image-form-group>p");
const uploadTitle = document.getElementById("#title");
const uploadCategory = document.getElementById("#category");
const submitBtn = document.querySelector(".btn-valid");

setLoggedHomePage();

openModal(projectModificationButton, modalProjectModification);
openModal(modalBackButton, modalProjectModification);
closeModal(closeModalButton, modalProjectModification);
closeModal(buttonOpenAddWorks, modalProjectModification);

openModal(buttonOpenAddWorks, modalAddProject);
closeModal(closeModal2Button, modalAddProject);
closeModal(modalBackButton, modalAddProject);

populateCategory(category);

// if (
//   addProject &&
//   image &&
//   imageAfficher &&
//   uploadButton &&
//   uploadButtonText &&
//   uploadTitle &&
//   uploadCategory &&
//   submitBtn
// ) {
//   image.addEventListener("change", (e) => {
//     const file = e.target.files[0];

//     if (!file) {
//       return;
//     }

//     if (!checkImage(file)) {
//       return;
//     }

//     const reader = new FileReader();

//     reader.addEventListener("load", (e) => {
//       imageAfficher.innerHTML = "";

//       const img = document.createElement("img");

//       img.src = e.target.result;
//       imageAfficher.append(img);

//       uploadButton.style.display = "none";
//       uploadButtonText.style.display = "none";
//     });

//     reader.readAsDataURL(file);
//     checkFormValidity();
//   });

//   // if (uploadTitle) {
//   //   uploadTitle.addEventListener(
//   //     "change",
//   //     checkFormValidity(uploadTitle, uploadCategory, image)
//   //   );
//   // }

//   // if (uploadCategory === true) {
//   //   uploadCategory.addEventListener(
//   //     "change",
//   //     checkFormValidity(uploadTitle, uploadCategory, image)
//   //   );
//   // }

//   // if (image === true) {
//   //   image.addEventListener(
//   //     "change",
//   //     checkFormValidity(uploadTitle, uploadCategory, image)
//   //   );
//   // }

//   // Si je change ça
//   // if (submitBtn === ".enabled")
//   //   addProject.addEventListener("submit", () => {
//   //     addWorks();
//   //   });

//   // Par ça

//   uploadTitle.addEventListener("input", checkFormValidity);
//   uploadCategory.addEventListener("change", checkFormValidity);

//   addProject.addEventListener("submit", (e) => {
//     e.preventDefault();
//     addWorks(e);
//   });
// }

const checkImage = (file) => {
  if (!(file.type.includes("image/png") || file.type.includes("image/jpeg"))) {
    alert("Le fichier doit être une image au format PNG ou JPEG");
    return false;
  }
  if (file.size > 4 * 1024 * 1024) {
    alert("Le fichier ne doit pas dépasser 4 Mo");
    return false;
  }
  return true;
};

const checkTitle = (title) => {
  return title.length > 2;
};

const checkCategory = (category) => {
  return category !== "";
};

image.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  if (!checkImage(file)) return;

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

if (image && uploadTitle && uploadCategory) {
  const checkFormValidity = () => {
    const file = image.files[0];
    const title = uploadTitle.value;
    const category = uploadCategory.value;

    if (
      file &&
      checkImage(file) &&
      checkTitle(title) &&
      checkCategory(category)
    ) {
      submitBtn.disabled = false;
      submitBtn.classList.add("enabled");
    } else {
      submitBtn.disabled = true;
      submitBtn.classList.remove("enabled");
    }
  };
  if (uploadTitle) {
    uploadTitle.addEventListener("input", checkFormValidity);
  }
  if (uploadCategory) {
    uploadCategory.addEventListener("change", checkFormValidity);
  }

  addProject.addEventListener("submit", (e) => {
    e.preventDefault();
    addWorks(e);
  });
}
