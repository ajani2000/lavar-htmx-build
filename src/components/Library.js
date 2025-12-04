export class Library extends HTMLElement {
    constructor() {
        super();
        this.books = [
            { id: 'midnight-library', title: 'The Midnight Library', author: 'Matt Haig', coverColor: '#5eead4', description: 'A novel about a woman who gets to experience alternative lives she could have lived.' },
            { id: 'project-hail-mary', title: 'Project Hail Mary', author: 'Andy Weir', coverColor: '#fde047', description: 'A lone astronaut must save Earth from a catastrophic threat, with help from an unexpected ally.' },
            { id: 'klara-and-the-sun', title: 'Klara and the Sun', author: 'Kazuo Ishiguro', coverColor: '#fcd34d', description: 'An Artificial Friend with outstanding observational qualities explores the nature of love.' },
            { id: 'atomic-habits', title: 'Atomic Habits', author: 'James Clear', coverColor: '#34d399', description: 'An easy and proven way to build good habits and break bad ones.' }
        ];
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        this.innerHTML = `
            <div class="library-container">
                <div class="library-header">
                    <div>
                        <h1 style="font-size: 1.875rem; font-weight: 700; color: var(--color-text-primary); margin-bottom: 0.5rem;">Your Book Library</h1>
                        <p style="color: var(--color-text-secondary);">Explore, read, and chat with your collection of books.</p>
                    </div>
                    <button class="btn btn-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                        Add New Book
                    </button>
                </div>

                <!-- Search & Filter -->
                <div class="search-bar">
                    <div class="search-input-wrapper">
                        <svg style="position: absolute; left: 0.75rem; top: 50%; transform: translateY(-50%); color: var(--color-text-secondary);" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        <input type="text" placeholder="Search by title, author, keyword..." class="search-input">
                    </div>
                    <div class="flex gap-2">
                        <button class="btn btn-ghost" style="background-color: var(--color-bg-sidebar); border: 1px solid var(--color-border);">
                            Sort by
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                        </button>
                        <button class="btn btn-ghost" style="background-color: var(--color-bg-sidebar); border: 1px solid var(--color-border);">
                            Genre
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                        </button>
                    </div>
                </div>

                <!-- Grid -->
                <div class="books-grid">
                    ${this.books.map(book => `
                        <div class="book-card">
                            <div class="book-cover" style="background-color: ${book.coverColor}">
                                <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; padding: 1rem; text-align: center;">
                                    <span style="font-family: var(--font-serif); color: #0f172a; font-weight: 700; font-size: 1.25rem; opacity: 0.8;">${book.title}</span>
                                </div>
                            </div>
                            
                            <h3 style="font-weight: 700; color: var(--color-text-primary); margin-bottom: 0.25rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${book.title}</h3>
                            <p style="font-size: 0.875rem; color: var(--color-text-secondary); margin-bottom: 0.5rem;">${book.author}</p>
                            <p style="font-size: 0.75rem; color: var(--color-text-dim); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; margin-bottom: 1rem; flex: 1;">${book.description}</p>
                            
                            <button class="btn btn-primary chat-btn" style="width: 100%;" data-id="${book.id}" data-title="${book.title}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                                Chat with this Book
                            </button>
                            <div class="flex gap-2 mt-2">
                                <button class="btn btn-ghost" style="flex: 1; font-size: 0.75rem; background-color: var(--color-bg-card);">View Notes</button>
                                <button class="btn btn-ghost" style="flex: 1; font-size: 0.75rem; background-color: var(--color-bg-card);">More Info</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        this.querySelectorAll('.chat-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const book = {
                    id: e.currentTarget.dataset.id,
                    title: e.currentTarget.dataset.title
                };
                this.dispatchEvent(new CustomEvent('open-chat', {
                    detail: { book },
                    bubbles: true
                }));
            });
        });
    }
}

customElements.define('library-view', Library);
