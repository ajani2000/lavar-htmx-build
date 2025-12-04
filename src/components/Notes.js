import { NotesList } from './NotesList.js';
import { NoteEditor } from './NoteEditor.js';
import { NotesSidebar } from './NotesSidebar.js';

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
        this.innerHTML = `
            <div class="notes-list-container">
                <notes-sidebar></notes-sidebar>
                <div id="notes-content-wrapper" style="flex: 1; overflow: hidden; display: flex; flex-direction: column;">
                    <!-- Content injected here -->
                </div>
            </div>
        `;

        this.updateContent();
    }

    updateContent() {
        const container = this.querySelector('#notes-content-wrapper');
        if (!container) return;

        container.innerHTML = ''; // Clear current content

        if (this.currentView === 'list') {
            const list = new NotesList();
            container.appendChild(list);
        } else {
            const editor = new NoteEditor();
            container.appendChild(editor);

            // Wait for render
            setTimeout(() => {
                if (this.activeNoteId === null) {
                    editor.setNoteData(null); // New Note
                } else {
                    // In a real app, fetch note by ID
                    editor.setNoteData({ title: 'Reflections on Chapter 5: The Market Economy' }); // Mock existing
                }
            }, 0);
        }
    }

    setupEventListeners() {
        // Listen for selection from list
        this.addEventListener('note-selected', (e) => {
            this.activeNoteId = e.detail.noteId;
            this.currentView = 'editor';
            this.updateContent();
        });

        // Listen for back from editor
        this.addEventListener('back-to-list', () => {
            this.currentView = 'list';
            this.activeNoteId = null;
            this.updateContent();
        });

        // Listen for new note creation
        this.addEventListener('create-new-note', (e) => {
            this.currentView = 'editor';
            this.activeNoteId = null; // null indicates new note
            this.updateContent();
        });
    }
}

customElements.define('notes-view', Notes);
