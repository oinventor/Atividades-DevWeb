export async function GoTo(pageName, scriptSrc = null) {
    let frontScript = document.createElement("script");
    frontScript.type = "module";
    frontScript.src = scriptSrc;
    document.body.appendChild(frontScript);
    frontScript = null;
    window.history.pushState({}, '', `/${pageName}`);
    (document.getElementById("site")).innerHTML = await (await fetch(`../Pages/${pageName}.html`)).text();
}