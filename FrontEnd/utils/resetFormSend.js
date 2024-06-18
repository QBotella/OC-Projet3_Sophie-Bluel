export function resetFormSend() {
  // Reset the image preview area to show the default icon
  document.querySelector(".image-afficher").innerHTML =
    '<i class="fa-regular fa-image"></i>';

  // Show the file upload trigger and the associated text
  document.querySelector(".upload-file-trigger").style.display = "block";
  document.querySelector(".image-form-group>p").style.display = "block";

  // Disable the submit button and remove the 'enabled' class
  document.querySelector(".btn-valid").disabled = true;
  document.querySelector(".btn-valid").classList.remove("enabled");

  // Reset the form fields
  document.getElementById("addProject").reset();
}
