export class Header extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        this.innerHTML = `
            <header class="app-header">
                <div class="flex items-center gap-4">
                    <button id="sidebar-toggle" class="icon-btn" aria-label="Toggle Sidebar">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                    </button>
                    <div class="flex items-center gap-3">
                        <div class="app-icon-small">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                        </div>
                        <h1 class="text-lg font-bold" style="color: var(--color-text-primary)">Laver</h1>
                    </div>
                </div>

                <div class="flex items-center gap-4">
                    <button class="user-profile-btn">
                        <div class="avatar">
                            <span style="font-size: 0.75rem; font-weight: 600; color: var(--color-text-primary);">JW</span>
                        </div>
                    </button>
                </div>
            </header>
        `;
    }

    setupEventListeners() {
        this.querySelector('#sidebar-toggle').addEventListener('click', () => {
            document.dispatchEvent(new CustomEvent('toggle-sidebar'));
        });
    }
}

customElements.define('app-header', Header);
