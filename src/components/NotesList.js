export class NotesList extends HTMLElement {
    constructor() {
        super();
        this.notes = [
            { id: 1, title: 'Reflections on The Market Economy', description: 'A deep dive into Adam Smith\'s theory of the "Invisible Hand" and its implications on modern economic thought, questioning the assumption of perfect rationality leading to collective good.', book: 'Principles of Economics', chapter: 'Chapter 5' },
            { id: 2, title: 'Core Principles Overview', description: 'Summary of the fundamental concepts introduced in the first chapter, focusing on scarcity, opportunity cost, and the production possibilities frontier. These concepts form the bedrock of microeconomics.', book: 'Principles of Economics', chapter: 'Chapter 1' },
            { id: 3, title: 'Allegory of the Cave Analysis', description: 'An exploration of Plato\'s Allegory of the Cave from "The Republic", discussing its relevance to epistemology, education, and the nature of reality. It examines the journey from ignorance to enlightenment.', book: 'The Republic', chapter: 'Book VII' },
            { id: 4, title: 'Cognitive Biases in Decision Making', description: 'Notes on heuristics and biases as described by Kahneman. Focus on System 1 vs. System 2 thinking, anchoring, and availability heuristic, with examples from personal and professional life.', book: 'Thinking, Fast and Slow', chapter: 'Part 2' }
        ];
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        this.innerHTML = `
            <div class="notes-list-container">
                <!-- Left Sidebar (Filters) -->
                <div class="notes-sidebar">
                    <div class="notes-sidebar-header">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--color-primary);"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                        Laver
                    </div>

                    <div class="notes-sidebar-section">
                        <h3 class="notes-sidebar-title">Books</h3>
                        <div class="space-y-1">
                            <button class="notes-nav-item">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--color-text-secondary);"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                                Principles of Economics
                            </button>
                            <button class="notes-nav-item">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--color-text-secondary);"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                                The Republic
                            </button>
                            <button class="notes-nav-item">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--color-text-secondary);"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                                Thinking, Fast and Slow
                            </button>
                        </div>
                    </div>

                    <div class="notes-sidebar-section">
                        <h3 class="notes-sidebar-title">Chapters</h3>
                        <div class="space-y-1">
                            <button class="notes-nav-item active">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path></svg>
                                All Notes
                            </button>
                            <button class="notes-nav-item">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--color-text-secondary);"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path></svg>
                                Introduction
                            </button>
                            <button class="notes-nav-item">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--color-text-secondary);"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path></svg>
                                Chapter 1
                            </button>
                             <button class="notes-nav-item">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--color-text-secondary);"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path></svg>
                                Chapter 3
                            </button>
                             <button class="notes-nav-item">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--color-text-secondary);"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path></svg>
                                Chapter 4
                            </button>
                             <button class="notes-nav-item">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--color-text-secondary);"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path></svg>
                                Chapter 5
                            </button>
                        </div>
                    </div>

                    <button class="new-note-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        New Note
                    </button>
                </div>

                <!-- Main List Area -->
                <div class="notes-main">
                    <!-- Header -->
                    <div class="notes-header">
                        <h1 style="font-size: 1.5rem; font-weight: 700; color: var(--color-text-primary);">All Notes</h1>
                        <div class="flex gap-2">
                            <button class="btn btn-ghost text-sm">Back to Chat</button>
                            <button class="btn" style="background-color: var(--color-bg-card); color: var(--color-text-primary); border: 1px solid var(--color-border);">Export All</button>
                        </div>
                    </div>

                    <!-- List Container (Centered & Vertical) -->
                    <div class="notes-content-area">
                        <div class="notes-list-wrapper">
                            ${this.notes.map(note => `
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
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        this.querySelectorAll('.note-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const noteId = e.currentTarget.dataset.id;
                this.dispatchEvent(new CustomEvent('note-selected', {
                    detail: { noteId },
                    bubbles: true
                }));
            });
        });
    }
}

customElements.define('notes-list', NotesList);
