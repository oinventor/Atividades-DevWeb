// Get staf from doc
const navLinks = document.querySelector('header').querySelectorAll('a');

// Important vars
let events = [];
let ids = 0;

// Nav
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.forEach(navLink => {
            document.getElementById(navLink.dataset.view).classList.add('d-none');
        });
        document.getElementById(link.dataset.view).classList.remove('d-none');
    });
});

// Events
document.getElementById('btnNewEvent').addEventListener('click', () => {
    ids++
    const event = {
        id: ids,
        tittle: document.getElementById('eventName').value,
        type: document.getElementById('eventType').value,
        local: document.getElementById('eventLocal').value,
        data: document.getElementById('eventDate').value,
        description: document.getElementById('eventDescription').value,
        status: 1,
    }
    console.log(event);
});