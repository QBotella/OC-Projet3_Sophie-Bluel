import { createButton, createButtonAll } from "./button.js";
import { createWorks } from "./gallery.js";

// Retrieve works data from the API
const reponse = await fetch("http://localhost:5678/api/works");
works = await reponse.json();
console.log(works)

// Retrieve categories data from the API
const res = await fetch("http://localhost:5678/api/categories")
category = await res.json()
console.log(category)

// Display all works by default
createWorks(works)

// Create "All" button first
createButtonAll()

// Create buttons for each category
createButton(category)

