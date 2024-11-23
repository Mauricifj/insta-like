import fetchImages from "./fetchApis";

let { API_BASE_URL } = process.env;

const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const captionText = document.getElementById("caption");
const closeBtn = document.querySelector(".close");
modal.style.display = "none";

const imageGrid = document.querySelector(".image-grid");

async function displayImages() {
  const data = await fetchImages();
    try {
        const postsList = data.map(item => {
          return `
            <article data-description="${item.description}">
              <figure>
                <img src="${process.env.API_BASE_URL}/${item.imageUrl}" alt="${item.alt}" />
              </figure>
            </article>
          `
        }).join('');
        imageGrid.insertAdjacentHTML('beforeend', postsList)

        addImageClickEvents();
    } catch (error) {
        console.error("Error displaying images:", error);
    }
}

function addImageClickEvents() {
    const images = document.querySelectorAll(".image-grid img");
    images.forEach(img => {
        img.addEventListener("click", function () {
            captionText.textContent = "";
            modal.style.display = "block";
            modalImg.src = this.src;

            const article = this.closest("article");
            const description = article ? article.dataset.description : '';
            const caption = description || this.alt;

            captionText.innerHTML = `<p>${caption}</p>`;
        });
    });
}

closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
});

window.addEventListener("click", function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

document.addEventListener("DOMContentLoaded", displayImages);
