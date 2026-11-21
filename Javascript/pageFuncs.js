export async function ChangePage(pageName) {
    (document.getElementById("site")).innerHTML = await (await fetch(`../Pages/${pageName}.html`)).text();
}