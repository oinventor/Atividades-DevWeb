export async function GoTo(pageName, scriptSrc = null) {
    window.history.pushState({}, '', `/${pageName}`);
    (document.getElementById("site")).innerHTML = await (await fetch(`../Pages/${pageName}.html`)).text();

    if (scriptSrc) {
        const pageScript = document.createElement("script");
        pageScript.type = "module";
        pageScript.src = `${scriptSrc}?reload=${Date.now()}`;
        document.body.appendChild(pageScript);
    }
}

window.addEventListener("popstate", () => {
    if (window.location.pathname === "/Front") {
        GoTo("Front", "./Javascript/frontScript.js");
    }
    else if (window.location.pathname === "/Login") {
        GoTo("Login");
    }
});