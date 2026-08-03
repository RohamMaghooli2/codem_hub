const mainImage = document.querySelector(".main-image");
const thumbs = document.querySelectorAll(".thumbs img");

thumbs.forEach(img => {

    img.addEventListener("click", () => {

        mainImage.src = img.src;

    });

});