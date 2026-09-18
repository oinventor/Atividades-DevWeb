const navLinks = document.querySelector('header').querySelectorAll('a')
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.forEach(navLink => {
            document.getElementById(navLink.dataset.view).classList.add('d-none');
        });
        document.getElementById(link.dataset.view).classList.remove('d-none');
    });
});