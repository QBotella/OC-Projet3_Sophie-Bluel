import { getData } from "../utils/fetch.js";
import { createWorks } from "./gallery.js";

export async function createButton() {
	try {
		category = await getData("http://localhost:5678/api/categories");
		works = await getData("http://localhost:5678/api/works");

		category.unshift({ id: 0, name: "Tous" });

		for (let i = 0; i < category.length; i++) {
			const article = category[i];
			const { id: categoryId, name: categoryName } = article;

			let button = document.createElement("button");
			button.innerText = categoryName;
			button.classList.add("myButton");

			// Add event listener for button click
			button.addEventListener("click", () => {
				removeClickedClass(); // Remove "clicked" class from all buttons
				button.classList.add("clicked");
				document.querySelector(".gallery").innerHTML = "";
				createWorks(works, categoryId);
			});
			clickFirstElement();
			document.querySelector(".Btn-Filter").append(button);
		}
	} catch (error) {
		console.error(error);
	}
}

function clickFirstElement() {
	const button = document.querySelector(".myButton");
	if (button !== null) {
		button.click();
	}
}

function removeClickedClass() {
	const buttons = document.querySelectorAll(".myButton");
	buttons.forEach((button) => {
		button.classList.remove("clicked");
	});
}