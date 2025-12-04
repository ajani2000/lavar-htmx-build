export class Sidebar extends HTMLElement {
    constructor() {
        super();
        this.books = [
            { id: 'art-of-war', title: 'The Art of War', author: 'Sun Tzu' },
            { id: 'meditations', title: 'Meditations', author: 'Marcus Aurelius', selected: true },
            { id: 'sapiens', title: 'Sapiens', author: 'Yuval Noah Harari' }
        ];
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        this.innerHTML = `
            <div class="flex flex-col h-full">
                <!-- Navigation -->
                <nav class="nav-list" style="margin-top: 0; padding-top: var(--space-md);">
                    <button class="nav-item" data-view="library">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                        Library
                    </button>
                    <button class="nav-item active" data-view="chat">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                        Chat
                    </button>
                    <button class="nav-item" data-view="notes">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                        My Notes
                    </button>
                </nav>

                <!-- Book Selector -->
                <div class="book-section">
                    <h3 class="section-title">Source Book</h3>
                    <div class="book-list" id="book-list">
                        ${this.books.map(book => `
                            <div class="book-item ${book.selected ? 'selected' : ''}" data-id="${book.id}">
                                <span class="book-item-title">${book.title}</span>
                                <div class="radio-indicator">
                                    ${book.selected ? '<div class="radio-dot"></div>' : ''}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Footer -->
                <div style="margin-top: auto; padding: var(--space-md);">
                    <button class="nav-item">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                        Settings
                    </button>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        // Navigation
        this.querySelectorAll('.nav-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const view = e.currentTarget.dataset.view;
                if (view) {
                    this.updateActiveNav(view);
                    this.dispatchEvent(new CustomEvent('navigate', {
                        detail: { view },
                        bubbles: true
                    }));
                }
            });
        });

        // Book Selection
        this.querySelectorAll('.book-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const bookId = e.currentTarget.dataset.id;
                this.selectBook(bookId);
            });
        });
    }

    updateActiveNav(viewName) {
        this.querySelectorAll('.nav-item').forEach(btn => {
            const isTarget = btn.dataset.view === viewName;
            if (isTarget) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    selectBook(bookId) {
        this.books.forEach(b => b.selected = (b.id === bookId));
        this.render(); // Re-render to update UI
        this.setupEventListeners(); // Re-attach listeners after re-render

        this.dispatchEvent(new CustomEvent('book-changed', {
            detail: { book: this.books.find(b => b.id === bookId) },
            bubbles: true
        }));
    }
}

customElements.define('app-sidebar', Sidebar);
