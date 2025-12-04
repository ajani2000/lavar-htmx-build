export class NotesSidebar extends HTMLElement {
    constructor() {
        super();
        this.currentBook = null;
        this.mockChapters = {
            'art-of-war': ['Introduction', 'Laying Plans', 'Waging War', 'Attack by Stratagem', 'Tactical Dispositions'],
            'meditations': ['Book I', 'Book II', 'Book III', 'Book IV', 'Book V'],
            'sapiens': ['Part One: The Cognitive Revolution', 'Part Two: The Agricultural Revolution', 'Part Three: The Unification of Humankind']
        };
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();

        // Check for currently selected book in main sidebar if available
        const sidebar = document.querySelector('app-sidebar');
        if (sidebar && sidebar.books) {
            const selected = sidebar.books.find(b => b.selected);
            if (selected) {
                this.setBook(selected);
            }
        }
    }

    setBook(book) {
        this.currentBook = book;
        this.render();
        this.setupEventListeners();
    }

    render() {
        this.style.display = 'contents';

        const chapters = this.currentBook && this.mockChapters[this.currentBook.id]
            ? this.mockChapters[this.currentBook.id]
            : [];

        this.innerHTML = `
            <div class="notes-sidebar">
                <div class="notes-sidebar-header">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--color-primary);"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                    Laver
                </div>

                <div class="notes-sidebar-section">
                    <h3 class="notes-sidebar-title">Chapters</h3>
                    <div class="space-y-1" id="chapters-list">
                        <button class="notes-nav-item active">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path></svg>
                            All Notes
                        </button>
                        ${chapters.map(chapter => `
                            <button class="notes-nav-item">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--color-text-secondary);"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path></svg>
                                ${chapter}
                            </button>
                        `).join('')}
                    </div>
                </div>

                <button class="new-note-btn" id="new-note-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    New Note
                </button>
            </div>
        `;
    }

    setupEventListeners() {
        // Listen for global book changes
        document.addEventListener('book-changed', (e) => {
            this.setBook(e.detail.book);
        });

        // Navigation items
        this.querySelectorAll('.notes-nav-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.querySelectorAll('.notes-nav-item').forEach(b => b.classList.remove('active'));
                this.querySelectorAll('.notes-nav-item svg').forEach(svg => svg.style.color = 'var(--color-text-secondary)');

                e.currentTarget.classList.add('active');
                e.currentTarget.querySelector('svg').style.color = '';
            });
        });

        // New Note Button
        const newNoteBtn = this.querySelector('#new-note-btn');
        if (newNoteBtn) {
            newNoteBtn.addEventListener('click', () => {
                this.dispatchEvent(new CustomEvent('create-new-note', {
                    bubbles: true,
                    detail: { book: this.currentBook }
                }));
            });
        }
    }
}
