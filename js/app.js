// Get staf from doc
const navLinks = document.querySelector('header').querySelectorAll('a');
const eventForm = document.getElementById('eventForm');

// Important vars
let events = [];
let ids = 0;

// Nav
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        let eventNumber
        if (link.dataset.view == "dashboard") {
            if (eventNumber != events.length) {
                LoadEvents();
                eventNumber = events.length
            }
        }
        else{
            UnloadEvents();
        }
        navLinks.forEach(navLink => {
            document.getElementById(navLink.dataset.view).classList.add('d-none');
        });
        document.getElementById(link.dataset.view).classList.remove('d-none');
    });
});

// Events

// Load events
function LoadEvents() {
    events.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.classList.add('card-body', 'shadow-sm', 'mb-4', 'row');
        eventCard.id = "eventCard";

        const eventTittle = document.createElement('h2');
        eventTittle.classList.add('h4', 'text-danger');
        eventTittle.textContent = event.tittle;

        const eventDescription = document.createElement('span');
        eventDescription.classList.add('h6', 'text-muted', 'mb-2');
        eventDescription.textContent = event.description;

        const eventColum = document.createElement('div');
        eventColum.classList.add('col-sm');

        const eventLocal = document.createElement('span');
        eventLocal.classList.add('h4', 'text-black', 'mb-2');
        eventLocal.textContent = event.local;

        const eventDate = document.createElement('span');
        eventDate.classList.add('h5', 'text-black', 'mb-2');
        eventDate.textContent = `   /${event.date}`;

        const eventStatus = document.createElement('span');
        eventStatus.classList.add('h5', 'text-black', 'mb-2');
        eventStatus.textContent = event.status;

        eventColum.append(eventLocal, eventDate);
        eventCard.append(eventTittle, eventDescription, eventColum, eventStatus);

        document.getElementById('dashboard').appendChild(eventCard);
    });
}

// Unload events
function UnloadEvents() {
    const eventCards = document.getElementById('dashboard').querySelectorAll('#eventCard');
    if (eventCards.length !=0 ) {
        eventCards.forEach(card => card.remove());
    }
}

// Add new event
document.getElementById('btnNewEvent').addEventListener('click', () => {
    let check = 0;
    eventForm.querySelectorAll('[id*="event"]').forEach(element => {
        element.value == "" ? document.getElementById('subtituloNewEvent').textContent = "Todos os itens devem estar preenchidos"
         : check++;
    });
    if (check == 5) {
        ids++;
        const event = {
            id: ids,
            tittle: document.getElementById('eventName').value.trim(),
            type: document.getElementById('eventType').value,
            local: document.getElementById('eventLocal').value.trim(),
            date: document.getElementById('eventDate').value,
            description: document.getElementById('eventDescription').value.trim(),
            status: "Não Realizado",
        }
        events.push(event);
        document.getElementById('subtituloNewEvent').textContent = "Evento cadastrado com sucesso";
        document.getElementById('eventForm').reset();
    }
});

// Remove Events

// Realize events