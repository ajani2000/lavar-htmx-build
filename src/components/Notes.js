import { NotesList } from './NotesList.js';
import { NoteEditor } from './NoteEditor.js';

export class Notes extends HTMLElement {
    constructor() {
        super();
        this.currentView = 'list'; // 'list' or 'editor'
        this.activeNoteId = null;
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        this.innerHTML = ''; // Clear current content

        if (this.currentView === 'list') {
            const list = new NotesList();
            this.appendChild(list);
        } else {
            const editor = new NoteEditor();
            // In a real app, we would pass the note ID to the editor to load content
            // editor.setAttribute('note-id', this.activeNoteId);
            this.appendChild(editor);
        }
    }

    setupEventListeners() {
        // Listen for selection from list
        this.addEventListener('note-selected', (e) => {
            this.activeNoteId = e.detail.noteId;
            this.currentView = 'editor';
            this.render();
        });

        // Listen for back from editor
        this.addEventListener('back-to-list', () => {
            this.currentView = 'list';
            this.activeNoteId = null;
            this.render();
        });
    }
}

customElements.define('notes-view', Notes);
