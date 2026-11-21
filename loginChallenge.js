import { SimpleGet } from "./apiConections.js";
window.addEventListener("keypress", async(event) => {
    switch (event.key) {
        case "Enter":
            const email = (document.getElementById("inputEmail")).value;
            const senha = (document.getElementById("inputEmail")).value;
            console.log(email, senha);
            (await SimpleGet("https://jsonplaceholder.typicode.com/users"))
            console.log();
            break;
        default:
            break;
    }
});