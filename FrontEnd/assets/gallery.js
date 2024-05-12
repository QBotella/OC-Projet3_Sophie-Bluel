export function createWorks(works, categoryId) {
    try {
        const gallerySection = document.querySelector(".gallery");
        gallerySection.innerHTML = ""; // Clear previous content from gallery

        for (let i = 0; i < works.length; i++) {
            const article = works[i];

            // If categoryId is defined, filter works by category
            //   Otherwise, display all works
            if (categoryId === undefined || article.categoryId === categoryId) {
                const worksElement = document.createElement("figure");
                const imageElement = document.createElement("img");
                const nameElement = document.createElement("figcaption");

                imageElement.src = article.imageUrl;
                nameElement.textContent = article.title;

                gallerySection.appendChild(worksElement);
                worksElement.appendChild(imageElement);
                worksElement.appendChild(nameElement);
            }
        }
    } catch (err) {
        console.error(err);
    }
}

