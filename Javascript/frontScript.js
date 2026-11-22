import { SimpleGet } from "./apiConections.js";

const imagesUrls = (await SimpleGet("https://jsonplaceholder.typicode.com/photos")).map(element => [element.thumbnailUrl, element.title]);

const imgLibrary = document.getElementById("imgLibrary");
const imgContainerTemplate = document.getElementById("imgContainer");

imgContainerTemplate.remove();

for (let index = 0; index < imagesUrls.length; index++) {
    const imageId = `img${index + 1}`;

    imgContainerTemplate.id = imageId;
    imgContainerTemplate.querySelector("a").id = imageId;
    imgContainerTemplate.querySelector("a").href = imagesUrls[index][0];
    imgContainerTemplate.querySelector("img").src = imagesUrls[index][0];
    imgContainerTemplate.querySelector("label").htmlFor = imageId;
    imgContainerTemplate.querySelector("label").textContent = imagesUrls[index][1];

    imgLibrary.insertAdjacentHTML("beforeend", imgContainerTemplate.outerHTML);
}
