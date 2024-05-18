import { getData } from "../utils/fetch.js";

export const openModal = (button, modal) => {
    button.addEventListener("click", () => {
        modal.style.display = "block"
        populateGallery()
    })
}

export const closeModal = (button, modal) => {
    button.addEventListener("click", () => {
        modal.style.display = "none"
    })
    window.addEventListener("click", (e) => {
        if (e.target == modal) {
            modal.style.display = "none"
        }
    })
}

const deleteWorks = async (workId) => {
    // Function to delete work from the server
    await fetch(`http://localhost:5678/api/works/${workId}`, {
        method: 'DELETE',
        headers: {
            'authorization': `Bearer ${window.sessionStorage.getItem("token")}`,
          }
    });
    populateGallery(); // Refresh the gallery after deletion
};

const populateGallery = async () => {
    const gallery = document.querySelector(".modal-gallery")
    const works = await getData("http://localhost:5678/api/works");
    gallery.innerHTML = ""

    works.forEach(work => {
        const imageElement = document.createElement("img")
        imageElement.src = work.imageUrl

        const deleteIcon = document.createElement("i")
        deleteIcon.classList.add("fas", "fa-trash-alt", "trash-icon")

        const deleteButton = document.createElement("button")
        deleteButton.classList.add("btn-delete")
        deleteButton.addEventListener("click", () => {
            deleteWorks(work.id)
        })
        
        deleteButton.append(deleteIcon)

        const imageContainer = document.createElement("div")
        imageContainer.classList.add("image-container")
        imageContainer.append(imageElement)
        imageContainer.append(deleteButton)

        gallery.append(imageContainer)
    });
}
   

