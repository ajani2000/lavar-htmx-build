export class NotesList extends HTMLElement {
    constructor() {
        super();
        this.notes = [
            { id: 1, title: 'Reflections on The Market Economy', description: 'A deep dive into Adam Smith\'s theory of the "Invisible Hand" and its implications on modern economic thought, questioning the assumption of perfect rationality leading to collective good.', book: 'Principles of Economics', chapter: 'Chapter 5' },
            { id: 2, title: 'Core Principles Overview', description: 'Summary of the fundamental concepts introduced in the first chapter, focusing on scarcity, opportunity cost, and the production possibilities frontier. These concepts form the bedrock of microeconomics.', book: 'Principles of Economics', chapter: 'Chapter 1' },
            { id: 3, title: 'Allegory of the Cave Analysis', description: 'An exploration of Plato\'s Allegory of the Cave from "The Republic", discussing its relevance to epistemology, education, and the nature of reality. It examines the journey from ignorance to enlightenment.', book: 'The Republic', chapter: 'Book VII' },
            { id: 4, title: 'Cognitive Biases in Decision Making', description: 'Notes on heuristics and biases as described by Kahneman. Focus on System 1 vs. System 2 thinking, anchoring, and availability heuristic, with examples from personal and professional life.', book: 'Thinking, Fast and Slow', chapter: 'Part 2' }
        ];
        this.searchQuery = '';
        this.chapterFilter = 'All Chapters';
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    getFilteredNotes() {
        return this.notes.filter(note => {
            const matchesSearch = note.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                note.description.toLowerCase().includes(this.searchQuery.toLowerCase());
            const matchesChapter = this.chapterFilter === 'All Chapters' || note.chapter === this.chapterFilter;
            return matchesSearch && matchesChapter;
        });
    }

    getUniqueChapters() {
        const chapters = new Set(this.notes.map(note => note.chapter));
        return ['All Chapters', ...Array.from(chapters)];
    }

    render() {
        const filteredNotes = this.getFilteredNotes();
        const chapters = this.getUniqueChapters();

        this.innerHTML = `
            <!-- Main List Area -->
            <div class="notes-main" style="height: 100%;">
                <!-- Header -->
                <div class="notes-header" style="flex-direction: column; align-items: stretch; height: auto; gap: 1rem; padding-bottom: 1rem;">
                    <div class="flex justify-between items-center">
                        <h1 style="font-size: 1.5rem; font-weight: 700; color: var(--color-text-primary);">All Notes</h1>
                        <div class="flex gap-2">
                            <button class="btn btn-ghost text-sm">Back to Chat</button>
                            <button class="btn" style="background-color: var(--color-bg-card); color: var(--color-text-primary); border: 1px solid var(--color-border);">Export All</button>
                        </div>
                    </div>
                    
                    <!-- Filters Row -->
                    <div class="flex gap-4">
                        <div class="search-input-wrapper" style="max-width: 400px;">
                            <input type="text" id="notes-search" class="search-input" placeholder="Search notes..." value="${this.searchQuery}" style="padding-left: 1rem;">
                        </div>
                        <select id="chapter-filter" style="background-color: var(--color-bg-sidebar); border: 1px solid var(--color-border); color: var(--color-text-primary); padding: 0.5rem 1rem; border-radius: var(--radius-md); outline: none;">
                            ${chapters.map(chapter => `
                                <option value="${chapter}" ${this.chapterFilter === chapter ? 'selected' : ''}>${chapter}</option>
                            `).join('')}
                        </select>
                    </div>
                </div>

                <!-- List Container (Centered & Vertical) -->
                <div class="notes-content-area">
                    <div class="notes-list-wrapper">
                        ${filteredNotes.length > 0 ? filteredNotes.map(note => `
                            <div class="note-card" data-id="${note.id}">
                                <h3 class="note-card-title">${note.title}</h3>
                                <p class="note-card-desc">${note.description}</p>
                                <div class="note-card-meta">
                                    <div class="meta-item">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                                        ${note.book}
                                    </div>
                                    <div class="meta-item">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path></svg>
                                        ${note.chapter}
                                    </div>
                                </div>
                            </div>
                        `).join('') : `
                            <div style="text-align: center; color: var(--color-text-secondary); padding: 2rem;">
                                No notes found matching your filters.
                            </div>
                        `}
                    </div>
                </div>
            </div>
        `;

        // Re-attach listeners after render
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Note Card Clicks
        this.querySelectorAll('.note-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const noteId = e.currentTarget.dataset.id;
                this.dispatchEvent(new CustomEvent('note-selected', {
                    detail: { noteId },
                    bubbles: true
                }));
            });
        });

        // Search Input
        const searchInput = this.querySelector('#notes-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchQuery = e.target.value;
                this.render();
                // Restore focus after re-render
                const newInput = this.querySelector('#notes-search');
                newInput.focus();
                newInput.setSelectionRange(newInput.value.length, newInput.value.length);
            });
        }

        // Chapter Filter
        const chapterSelect = this.querySelector('#chapter-filter');
        if (chapterSelect) {
            chapterSelect.addEventListener('change', (e) => {
                this.chapterFilter = e.target.value;
                this.render();
            });
        }
    }
}

customElements.define('notes-list', NotesList);
