const newNote = document.querySelector('#newNote');
const notes = document.querySelector('#notes');
const buttons = document.querySelector('#buttons');

window.addEventListener("DOMContentLoaded", () => {
    loadNotes();
    setupEventDelegation();
    updateEmptyState();
});

buttons.addEventListener("click", (e) => {

    if (e.target.id === 'heading') {
        const heading = document.createElement('h2');
        heading.textContent = "Heading";
        heading.setAttribute('contenteditable', 'true');
        heading.setAttribute('data-placeholder', 'Enter your heading...');
        heading.style.backgroundColor = 'yellow';
        notes.appendChild(heading);

        heading.focus();
    }

    if (e.target.id === 'list') {
        const ul = document.createElement('ul');
        const liElement = document.createElement('li');
        liElement.textContent = "add item";
        liElement.setAttribute('contenteditable', 'true');
        liElement.setAttribute('data-placeholder', 'Enter list item...');
        ul.appendChild(liElement);
        notes.appendChild(ul);

        liElement.focus();
    }

    if (e.target.id === 'delete') {
        if (confirm('Are you sure you want to delete all notes?')) {
        notes.textContent = "";
        localStorage.removeItem('notes');
        updateEmptyState();
        }
        return;
    }

    saveNotes();
    updateEmptyState();
});

function setupEventDelegation() {
    notes.addEventListener('input', (e) => {
        if (e.target.hasAttribute('contenteditable')) {
            saveNotes();
        }
    });


    notes.addEventListener("keydown", (e) => {
        if ((e.target.tagName === 'H2' || e.target.tagName === 'LI') && 
            e.key === 'Backspace' && e.target.textContent.trim() === '') {
            e.preventDefault();
            const elementToRemove = e.target.tagName === 'LI' ? e.target.closest('ul') : e.target;
            elementToRemove.remove();
            saveNotes();
            updateEmptyState();
        }

    });

}                

function saveNotes() {
    localStorage.setItem('notes', notes.innerHTML);
}

function loadNotes() {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
        notes.innerHTML = savedNotes;
    }
}

function updateEmptyState() {
    if (notes.children.length === 0) {
        notes.innerHTML = '<div class="empty-state">Your notes will appear here. Start by adding a heading or list.</div>';
    } else {
        const emptyState = notes.querySelector('.empty-state');
        if (emptyState) {
            emptyState.remove();
        }
    }
}
