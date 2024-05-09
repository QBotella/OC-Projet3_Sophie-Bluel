const works = fetch("http://localhost:5678/api/works")
  .then(res => res.json())
  .then(works => {
    console.log(works);

    createWorks(works);
})
  .catch(err => console.error(err))

function createWorks(works){
    try {
        for( let i = 0; i < works.length; i++) {
            const article = works[i];
            const gallerySection = document.querySelector(".gallery");
            const worksElement = document.createElement("figure");

            const imageElement = document.createElement("img");
            const nameElement = document.createElement("figcaption");

            imageElement.src = article.imageUrl;
            nameElement.textContent = article.title;

            gallerySection.appendChild(worksElement);
            worksElement.appendChild(imageElement);
            worksElement.appendChild(nameElement);
        }
    } catch (err) {
        console.error(err)
    }
}

createWorks(works)

