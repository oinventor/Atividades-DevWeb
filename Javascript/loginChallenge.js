import { SimpleGet } from "./apiConections.js";
import { GoTo } from "./pageFuncs.js";

await GoTo("Login");

const email = document.getElementById("inputEmail");
const senha = document.getElementById("inputPassword");

window.addEventListener("keypress", async(event) => {
    switch (event.key) {
        case "Enter":
            Response(await Chalenge());
            break;
        default:
            break;
    }
});

window.addEventListener("click", async(event) => {
    switch (event.target.id) {
        case "btn-submit":
            Response(await Chalenge());
            break;
        default:
            break;
    }
});

function Response(chalengeResult) {
    switch (chalengeResult) {
        case true:
            GoTo("Front", "./Javascript/frontScript.js");
            break;
        default:
            email.value || senha.value ? window.alert("Senha ou email estao errados") : window.alert("Senha ou email vazios");
            break;
    }
}

async function Chalenge() { 
    return (await SimpleGet("https://jsonplaceholder.typicode.com/users")).some((user) => {
        return user.email == email.value && user.username == senha.value; 
    });
}