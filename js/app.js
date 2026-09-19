// Get staf from doc
const navLinks = document.querySelector('header').querySelectorAll('a');
const eventForm = document.getElementById('eventForm');

// Important vars
let events = [];
let ids = 0;

// Nav
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (link.dataset.view == "novo-evento") {
            UnloadEvents(link.dataset.view);
        }
        else{
            UnloadEvents(link.dataset.view);
            LoadEvents(link.dataset.view);
        }
        navLinks.forEach(navLink => {
            document.getElementById(navLink.dataset.view).classList.add('d-none');
        });
        document.getElementById(link.dataset.view).classList.remove('d-none');
    });
});

// Events

// Load events
function LoadEvents(dataView) {
    events.forEach(event => {
        // This is the filter func, it will return a array of elements that meet 
        // a certain condition. This method works with arrays of any datatype. Very usefull (:o
        // in this case, it will return a array of objects that have the "Realizado" status
        const attendedCount = events.filter(event => event.status == "Realizado").length;
        document.querySelectorAll('#event-info').forEach(element => {
            element.textContent = `Total de eventos: ${events.length}. 
                                            ${attendedCount} eventos realizados e 
                                            ${events.length - attendedCount} eventos agendados`;
        });

        const eventCard = document.createElement('div');
        eventCard.classList.add('card-body', 'shadow-sm', 'mb-4', 'row');
        eventCard.id = "eventCard";

        const eventTittle = document.createElement('h2');
        eventTittle.classList.add('h4', 'text-danger');
        eventTittle.textContent = event.tittle;
        eventTittle.id = "eventTittle";

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
        eventStatus.id = "eventStatus";

        eventColum.append(eventLocal, eventDate);
        eventCard.append(eventTittle, eventDescription, eventColum, eventStatus);

        document.getElementById(dataView).appendChild(eventCard);
    });
}

// Unload events
function UnloadEvents(dataView) {
    const eventCards = document.getElementById(dataView).querySelectorAll('#eventCard');
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
            status: "Não realizado",
        }
        events.push(event);
        document.getElementById('subtituloNewEvent').textContent = "Evento cadastrado com sucesso";
        document.getElementById('eventForm').reset();
    }
});

// Remove event


// Attend event


// Filters
document.getElementById('txtFilter').addEventListener('keypress', () => {
    const eventCards = document.querySelectorAll('#eventCard');
    if (eventCards.length != 0) {
        eventCards.forEach(eventCard => {
            if (eventCard.querySelector('#eventTittle').textContent.includes(document.getElementById('txtFilter').value)){
                eventCard.classList.remove('d-none');

                return;
            }
            eventCard.classList.add('d-none');
        });
    }
});

document.getElementById('selectFilter').addEventListener('change', () => {
    const eventCards = document.querySelectorAll('#eventCard');
    if (eventCards.length != 0) {
        eventCards.forEach(eventCard => {
            if (eventCard.querySelector('#eventStatus').textContent.includes(document.getElementById('selectFilter').value)){
                eventCard.classList.remove('d-none');

                return;
            }
            eventCard.classList.add('d-none');
        });
    }
});

document.getElementById('txtFilterE').addEventListener('keypress', () => {
    const eventCards = document.querySelectorAll('#eventCard');
    if (eventCards.length != 0) {
        eventCards.forEach(eventCard => {
            if (eventCard.querySelector('#eventTittle').textContent.includes(document.getElementById('txtFilterE').value)){
                eventCard.classList.remove('d-none');

                return;
            }
            eventCard.classList.add('d-none');
        });
    }
});

document.getElementById('selectFilterE').addEventListener('change', () => {
    const eventCards = document.querySelectorAll('#eventCard');
    if (eventCards.length != 0) {
        eventCards.forEach(eventCard => {
            if (eventCard.querySelector('#eventStatus').textContent.includes(document.getElementById('selectFilterE').value)){
                eventCard.classList.remove('d-none');

                return;
            }
            eventCard.classList.add('d-none');
        });
    }
});