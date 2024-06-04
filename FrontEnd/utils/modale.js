import { getData } from "../utils/fetch.js";
import { createWorks } from "../utils/gallery.js";

// Function to open the modal
export const openModal = (button, modal) => {
  button.addEventListener("click", () => {
    modal.style.display = "block";
    populateGallery();
  });
};

// Function to close the modal
export const closeModal = (button, modal) => {
  button.addEventListener("click", () => {
    modal.style.display = "none"; // Hide the modal
  });
  window.addEventListener("click", (e) => {
    if (e.target == modal) {
      modal.style.display = "none"; // Hide the modal if user clicks outside of it
    }
  });
};

// Function to delete a project
const deleteWorks = async (workId) => {
  try {
    // Function to delete work from the server
    await fetch(`http://localhost:5678/api/works/${workId}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
      },
    });
    // Refresh the gallery after deletion
    const works = await getData("http://localhost:5678/api/works");
    createWorks(works, 0);
    // Refresh the modal's gallery after deletion
    populateGallery();
  } catch (error) {
    console.error(error);
  }
};

// Function to populate the Gallery
const populateGallery = async () => {
  const gallery = document.querySelector(".modal-gallery");
  const works = await getData("http://localhost:5678/api/works");
  gallery.innerHTML = "";

  works.forEach((work) => {
    const imageElement = document.createElement("img");
    imageElement.src = work.imageUrl;

    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fas", "fa-trash-alt", "trash-icon");

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("btn-delete");
    deleteButton.addEventListener("click", (e) => {
      e.preventDefault();
      deleteWorks(work.id);
    });

    deleteButton.append(deleteIcon);

    const imageContainer = document.createElement("div");
    imageContainer.classList.add("image-container");
    imageContainer.append(imageElement);
    imageContainer.append(deleteButton);

    gallery.append(imageContainer);
  });
};

// Function to populate the Category selector
export const populateCategory = async (preselectedCategory) => {
  const categorySelect = document.getElementById("category");
  const categories = await getData("http://localhost:5678/api/categories");
  categorySelect.innerHTML = "";

  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.id;
    option.textContent = category.name;
    if (category.name === preselectedCategory) {
      option.selected = true;
    }
    categorySelect.appendChild(option);
  });
};

export const addWorks = async (e) => {
  e.preventDefault();
  const formData = new FormData(event.target);
  const title = formData.get("title");
  const categoryId = formData.get("category");
  const imageFile = formData.get("image");

  const projectData = new FormData();
  projectData.append("image", imageFile);
  projectData.append("title", title);
  projectData.append("categoryId", categoryId);

  try {
    const response = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
      },
      body: projectData,
    });

    if (response.ok) {
      alert("Projet ajouté avec succès !");
      document.getElementById("modalAddProject").style.display = "none";
    } else {
      alert("Erreur lors de l'ajout du projet.");
    }
  } catch (error) {
    console.error("Erreur:", error);
    alert("Une erreur est survenue.");
  }
};

export const checkImage = (file) => {
  // Check whether the file is a PNG or JPEG image
  if (!(file.type.includes("image/png") || file.type.includes("image/jpeg"))) {
    alert("Le fichier doit être une image au format PNG ou JPEG");
    return false;
  }

  // Check file size is less than 4MB
  if (file.size > 4 * 1024 * 1024) {
    alert("Le fichier ne doit pas dépasser 4 Mo");
    return false;
  }

  return true;
};

export const checkTitle = (title) => {
  return title.length > 2;
};

export const checkCategory = (category) => {
  return category !== "";
};

export const checkFormValidity = () => {
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
