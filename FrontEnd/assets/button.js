import { createWorks, } from "./gallery.js"

export function createButtonAll(){
    let newButton = document.createElement("button")
    newButton.innerText = "Tous"
    newButton.classList.add("myButton"); // Add class "myButton"

    // Add event listener for button click
    newButton.addEventListener("click", () => {
        removeClickedClass(); // Remove "clicked" class from all buttons
        newButton.classList.add("clicked"); // Add "clicked" class to the clicked button
        document.querySelector(".gallery").innerHTML = ""
        createWorks(works)
    })
    document.querySelector(".Btn-Filter").append(newButton)
}

export function createButton(category) {
    try {
        for( let i = 0; i < category.length; i++) {
            const article = category[i]
            const categoryId = article.id
            const categoryName = article.name
            let newButton = document.createElement("button")
    newButton.innerText = categoryName
    newButton.classList.add("myButton"); // Add class "myButton"

    // Add event listener for button click
    newButton.addEventListener("click", () => {
        removeClickedClass(); // Remove "clicked" class from all buttons
        newButton.classList.add("clicked"); // Add "clicked" class to the clicked button
        document.querySelector(".gallery").innerHTML = ""
        createWorks(works, categoryId)
    })
    document.querySelector(".Btn-Filter").append(newButton)
        }
    } catch (error) {
        console.error("error")
    }
}

function removeClickedClass() {
    const buttons = document.querySelectorAll('.myButton');
    buttons.forEach(button => {
        button.classList.remove('clicked');
    });
} 