export async function GoTo(pageName, scriptSrc = null) {
    window.history.pushState({}, '', `/${pageName}`);
    (document.getElementById("site")).innerHTML = await (await fetch(`../Pages/${pageName}.html`)).text();

    if (scriptSrc) {
        const pageScript = document.createElement("script");
        pageScript.type = "module";
        pageScript.src = scriptSrc;
        document.body.appendChild(pageScript);
    }
}