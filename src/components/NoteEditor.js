export class NoteEditor extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    setNoteData(note) {
        if (!note) {
            // Reset to blank state
            this.querySelector('input').value = '';
            this.querySelector('#tags-container').innerHTML = `
                <button id="add-tag-btn" style="font-size: 0.75rem; color: var(--color-primary); opacity: 0.8;">+ Add Tag</button>
            `;
            this.querySelector('.cue-list').innerHTML = '';
            this.querySelector('.notes-list').innerHTML = `
                <div class="note-block" contenteditable="true" style="margin-bottom: 1.5rem; outline: none; padding: 4px; border-radius: 4px; min-height: 1.5em;">
                    Start typing your note...
                </div>
            `;
            this.querySelector('#summary-text').value = '';
        } else {
            // Load note data (mock implementation for now)
            // In a real app, we'd populate fields from the note object
            this.querySelector('input').value = note.title || 'Untitled Note';
            // ... populate other fields
        }
    }

    render() {
        this.innerHTML = `
            <div style="height: 100%; display: flex; flex-direction: column;">
                <!-- Header -->
                <div style="padding: var(--space-lg); border-bottom: 1px solid var(--color-border); display: flex; justify-content: space-between; align-items: center;">
                    <div style="flex: 1;">
                        <input type="text" value="Reflections on Chapter 5: The Market Economy" 
                            style="background: transparent; border: none; font-size: 1.5rem; font-weight: 700; color: var(--color-text-primary); width: 100%; outline: none; margin-bottom: 0.25rem;"
                            placeholder="Note Title">
                        <div class="flex gap-2" id="tags-container">
                            ${['Economics', 'Philosophy', 'Exam Prep'].map(tag => `
                                <span class="tag-chip" style="padding: 0.125rem 0.5rem; border-radius: 0.25rem; background-color: var(--color-bg-sidebar); font-size: 0.75rem; color: var(--color-text-secondary); border: 1px solid var(--color-border); display: inline-flex; align-items: center; gap: 4px; cursor: default;">
                                    ${tag}
                                    <button onclick="this.parentElement.remove()" style="hover:text-red-400">&times;</button>
                                </span>
                            `).join('')}
                            <button id="add-tag-btn" style="font-size: 0.75rem; color: var(--color-primary); opacity: 0.8;">+ Add Tag</button>
                        </div>
                    </div>
                    <div class="flex gap-2">
                        <button id="back-btn" class="btn btn-ghost">Back to List</button>
                        <button id="export-btn" class="btn" style="background-color: var(--color-bg-card); color: var(--color-text-primary);">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                            Export
                        </button>
                    </div>
                </div>

                <!-- Cornell Layout -->
                <div class="notes-layout">
                    <!-- Cues Column (Left) -->
                    <div class="cues-column" id="cues-container">
                        <div class="flex justify-between items-center mb-4">
                            <h3 class="section-title" style="margin-bottom: 0;">Cues</h3>
                            <button id="add-cue-btn" class="icon-btn" title="Add Cue">+</button>
                        </div>
                        <div class="cue-list space-y-4">
                            <div class="cue-item group" contenteditable="true" style="color: var(--color-text-secondary); font-weight: 500; padding: 4px; border-radius: 4px; outline: none; border: 1px solid transparent; transition: border-color 0.2s;">What is supply and demand?</div>
                            <div class="cue-item group" contenteditable="true" style="color: var(--color-primary); font-weight: 500; padding: 4px; border-radius: 4px; outline: none; border: 1px solid transparent; transition: border-color 0.2s;">Adam Smith's theory</div>
                            <div class="cue-item group" contenteditable="true" style="color: var(--color-text-secondary); font-weight: 500; padding: 4px; border-radius: 4px; outline: none; border: 1px solid transparent; transition: border-color 0.2s;">Invisible Hand concept</div>
                        </div>
                    </div>

                    <!-- Notes Column (Right) -->
                    <div class="notes-column" id="notes-container">
                        <div class="flex justify-between items-center mb-4">
                            <h3 class="section-title" style="margin-bottom: 0;">Main Notes</h3>
                            <button id="add-note-btn" class="icon-btn" title="Add Note Block">+</button>
                        </div>
                        <div class="notes-list" style="color: var(--color-text-secondary); line-height: 1.7;">
                            <div class="note-block" contenteditable="true" style="margin-bottom: 1.5rem; outline: none; padding: 4px; border-radius: 4px;">
                                The concepts of supply and demand form the bedrock of modern economics. Supply refers to the amount of a good or service that producers are willing and able to sell at a given price, while demand represents the quantity that consumers are willing and able to purchase.
                            </div>
                            
                            <div class="note-block" contenteditable="true" style="background-color: var(--color-bg-sidebar); padding: var(--space-md); border-radius: var(--radius-md); border-left: 4px solid var(--color-primary); margin-bottom: 1.5rem; outline: none;">
                                Adam Smith, in "The Wealth of Nations," introduced the idea that self-interest and competition in a free market would lead to economic prosperity. His theory posits that individuals pursuing their own self-interest inadvertently contribute to the economic well-being of society.
                            </div>

                            <div class="note-block" contenteditable="true" style="margin-bottom: 1.5rem; outline: none; padding: 4px; border-radius: 4px;">
                                Central to Smith's theory is the concept of the "Invisible Hand." This metaphor describes the unseen forces that move the free market economy. Through individual self-interest and freedom of production and consumption, the best interests of society, as a whole, are fulfilled.
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Summary (Bottom) -->
                <div class="summary-section">
                     <div class="flex justify-between items-center mb-2">
                        <h3 class="section-title" style="margin-bottom: 0;">Summary</h3>
                        <div class="flex gap-2">
                            <button id="edit-summary-btn" class="btn btn-ghost" style="font-size: 0.75rem; padding: 0.25rem 0.5rem;">Edit</button>
                            <button id="save-summary-btn" class="btn btn-primary" style="font-size: 0.75rem; padding: 0.25rem 0.5rem; display: none;">Save</button>
                        </div>
                     </div>
                     <textarea id="summary-text" disabled style="width: 100%; height: 100%; background: transparent; border: none; resize: none; color: var(--color-text-primary); outline: none; font-family: inherit; line-height: 1.6; opacity: 0.7;" placeholder="Write a brief summary of these notes..."></textarea>
                </div>
            </div>
        `;

        this.setupInteractiveFeatures();
    }

    setupInteractiveFeatures() {
        // Back Button
        this.querySelector('#back-btn').addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('back-to-list', { bubbles: true }));
        });

        // Add Cue
        this.querySelector('#add-cue-btn').addEventListener('click', () => {
            const list = this.querySelector('.cue-list');
            const newCue = document.createElement('div');
            newCue.className = 'cue-item';
            newCue.contentEditable = true;
            newCue.style.cssText = 'color: var(--color-text-secondary); font-weight: 500; padding: 4px; border-radius: 4px; outline: none; border: 1px solid transparent; margin-top: 1rem;';
            newCue.textContent = 'New Cue...';
            list.appendChild(newCue);
            newCue.focus();
        });

        // Add Note
        this.querySelector('#add-note-btn').addEventListener('click', () => {
            const list = this.querySelector('.notes-list');
            const newNote = document.createElement('div');
            newNote.className = 'note-block';
            newNote.contentEditable = true;
            newNote.style.cssText = 'margin-bottom: 1.5rem; outline: none; padding: 4px; border-radius: 4px; min-height: 1.5em;';
            newNote.textContent = 'Start typing your note...';
            list.appendChild(newNote);
            newNote.focus();
        });

        // Export
        this.querySelector('#export-btn').addEventListener('click', () => this.exportToMarkdown());

        // Summary Edit/Save
        const summaryText = this.querySelector('#summary-text');
        const editBtn = this.querySelector('#edit-summary-btn');
        const saveBtn = this.querySelector('#save-summary-btn');

        editBtn.addEventListener('click', () => {
            summaryText.disabled = false;
            summaryText.style.opacity = '1';
            summaryText.focus();
            editBtn.style.display = 'none';
            saveBtn.style.display = 'inline-flex';
        });

        saveBtn.addEventListener('click', () => {
            summaryText.disabled = true;
            summaryText.style.opacity = '0.7';
            saveBtn.style.display = 'none';
            editBtn.style.display = 'inline-flex';
            // Here you would typically save the content to backend/storage
        });

        // Focus effects for editable blocks
        this.addEventListener('focusin', (e) => {
            if (e.target.getAttribute('contenteditable') === 'true') {
                e.target.style.backgroundColor = 'rgba(255,255,255,0.05)';
            }
        });

        this.addEventListener('focusout', (e) => {
            if (e.target.getAttribute('contenteditable') === 'true') {
                e.target.style.backgroundColor = 'transparent';
            }
        });
    }

    exportToMarkdown() {
        const title = this.querySelector('input').value;
        const cues = Array.from(this.querySelectorAll('.cue-item')).map(el => `- ${el.innerText}`).join('\n');
        const notes = Array.from(this.querySelectorAll('.note-block')).map(el => el.innerText + '\n').join('\n');
        const summary = this.querySelector('#summary-text').value;

        const content = `# ${title}\n\n## Cues\n${cues}\n\n## Notes\n${notes}\n\n## Summary\n${summary}`;

        const blob = new Blob([content], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${title.replace(/\s+/g, '_').toLowerCase()}.md`;
        a.click();
        URL.revokeObjectURL(url);
    }
}

customElements.define('note-editor', NoteEditor);
