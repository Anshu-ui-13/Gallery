const fileInput = document.getElementById("fileInput");
    const gallery = document.getElementById("gallery");

    // Load images from localStorage
    let images = JSON.parse(localStorage.getItem("galleryImages")) || [];

    function displayImages() {
      gallery.innerHTML = "";
      images.forEach((src, index) => {
        const imageCard = document.createElement("div");
        imageCard.classList.add("image-card");
        imageCard.innerHTML = `
          <img src="${src}" alt="Gallery Image">
          <button class="delete-btn">&times;</button>
        `;
        gallery.appendChild(imageCard);

        // Delete functionality
        const deleteBtn = imageCard.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          images.splice(index, 1);
          saveImages();
          displayImages();
        });
      });
    }

    // Save images to localStorage
    function saveImages() {
      localStorage.setItem("galleryImages", JSON.stringify(images));
    }

    // Upload image
    fileInput.addEventListener("change", (event) => {
      const file = event.target.files[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = function (e) {
          images.unshift(e.target.result); // add new image to start
          saveImages();
          displayImages();
        };
        reader.readAsDataURL(file);
      }
      fileInput.value = "";
    });

    // Initial render
    displayImages();