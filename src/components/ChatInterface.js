export class ChatInterface extends HTMLElement {
    constructor() {
        super();
        this.currentBook = { title: 'Meditations' };
        this.messages = [
            { role: 'assistant', text: "Hello! I'm ready to answer questions based on 'Meditations.' What would you like to know?" }
        ];
        this.isListening = false;
        this.recognition = null;

        if ('webkitSpeechRecognition' in window) {
            this.recognition = new webkitSpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.interimResults = false;

            this.recognition.onresult = (event) => {
                const text = event.results[0][0].transcript;
                this.setInputText(text);
            };

            this.recognition.onend = () => {
                this.isListening = false;
                this.updateMicButton();
            };
        }
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
        this.scrollToBottom();
    }

    setBook(book) {
        this.currentBook = book;
        this.messages = [
            { role: 'assistant', text: `Hello! I'm ready to answer questions based on '${book.title}.' What would you like to know?` }
        ];
        this.render();
        this.setupEventListeners();
    }

    render() {
        this.innerHTML = `
            <!-- Header -->
            <div class="chat-header">
                <h2 style="font-size: 1.125rem; font-weight: 600; color: var(--color-text-primary);">Chat with '${this.currentBook.title}'</h2>
                <div class="flex items-center gap-2">
                    <button class="icon-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                    </button>
                    <div class="avatar" style="width: 32px; height: 32px; font-size: 0.75rem;">
                        JW
                    </div>
                </div>
            </div>

            <!-- Messages Area -->
            <div class="messages-container" id="messages-container">
                ${this.messages.map(msg => this.createMessageHTML(msg)).join('')}
                
                <!-- Suggested Prompts (Only show if few messages) -->
                ${this.messages.length <= 1 ? `
                    <div class="flex flex-col gap-2 mt-4 px-4">
                        <p class="text-xs text-slate-500 font-medium uppercase tracking-wider mb-2">Suggested Questions</p>
                        <div class="flex flex-wrap gap-2">
                            ${this.getSuggestedPrompts().map(prompt => `
                                <button class="suggested-prompt-btn" style="padding: 0.5rem 1rem; background-color: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: 99px; font-size: 0.875rem; color: var(--color-text-secondary); transition: all 0.2s; cursor: pointer;">
                                    ${prompt}
                                </button>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
            </div>

            <!-- Input Area -->
            <div class="input-area">
                <div class="input-container">
                    <input type="text" id="chat-input" placeholder="Ask a question about the selected book..." 
                        class="chat-input">
                    
                    <button id="mic-btn" class="icon-btn ${this.isListening ? 'text-red-500 animate-pulse' : ''}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
                    </button>
                    
                    <button id="send-btn" class="btn btn-primary" style="padding: 0.5rem;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                    </button>
                </div>
            </div>
        `;
    }

    createMessageHTML(msg) {
        const isAI = msg.role === 'assistant';
        // Basic markdown parsing (bold, italic) - for full support we'd use 'marked' library
        // Since we can't easily import npm modules in this setup without a bundler, 
        // I'll implement a simple parser or assume 'marked' is available globally via CDN if requested.
        // For now, let's do a simple replace for bolding to demonstrate.
        let content = msg.text;

        // If it's not the typing effect (which passes empty string initially), parse it
        if (content) {
            content = this.parseMarkdown(content);
        }

        return `
            <div class="message ${isAI ? 'assistant' : 'user'}">
                <div class="avatar">
                    ${isAI
                ? '<img src="https://api.dicebear.com/7.x/bottts/svg?seed=bookwise" alt="AI" style="width: 100%; height: 100%;">'
                : '<div style="font-size: 0.75rem; color: white;">You</div>'}
                </div>
                <div class="message-content">
                    <span class="message-sender">${isAI ? 'Bookwise AI' : 'You'}</span>
                    <div class="message-bubble">
                        ${content}
                    </div>
                </div>
            </div>
        `;
    }

    getSuggestedPrompts() {
        // Simple logic to return prompts based on book title or generic ones
        const title = this.currentBook.title.toLowerCase();
        if (title.includes('meditations')) {
            return ["What is Stoicism?", "How to deal with anxiety?", "Explain the concept of Nature"];
        } else if (title.includes('war')) {
            return ["What is the supreme art of war?", "Explain 'Know your enemy'", "Strategies for deception"];
        } else {
            return ["Summarize the main theme", "Who are the key characters?", "What is the moral of the story?"];
        }
    }

    parseMarkdown(text) {
        // Simple regex for bold and italic
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>');
    }

    setupEventListeners() {
        const input = this.querySelector('#chat-input');
        const sendBtn = this.querySelector('#send-btn');
        const micBtn = this.querySelector('#mic-btn');

        const sendMessage = () => {
            const text = input.value.trim();
            if (!text) return;

            // Add user message
            this.addMessage('user', text);
            input.value = '';

            // Simulate AI response
            this.dispatchEvent(new CustomEvent('message-sent', {
                detail: { text, book: this.currentBook },
                bubbles: true
            }));
        };

        sendBtn.addEventListener('click', sendMessage);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });

        micBtn.addEventListener('mousedown', () => this.startListening());
        micBtn.addEventListener('mouseup', () => this.stopListening());
        micBtn.addEventListener('touchstart', (e) => { e.preventDefault(); this.startListening(); });
        micBtn.addEventListener('touchend', (e) => { e.preventDefault(); this.stopListening(); });

        // Suggested Prompts
        this.querySelectorAll('.suggested-prompt-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const text = e.target.innerText;
                this.setInputText(text);
                // Optional: Auto-send?
                // sendMessage(); 
                // Let's just set it for now so user can confirm
            });
        });
    }

    startListening() {
        if (this.recognition) {
            this.isListening = true;
            this.updateMicButton();
            try {
                this.recognition.start();
            } catch (e) {
                console.error(e);
            }
        } else {
            alert('Speech recognition not supported in this browser.');
        }
    }

    stopListening() {
        if (this.recognition) {
            this.recognition.stop();
        }
    }

    updateMicButton() {
        const btn = this.querySelector('#mic-btn');
        if (this.isListening) {
            btn.style.color = '#ef4444'; // Red
        } else {
            btn.style.color = '';
        }
    }

    setInputText(text) {
        const input = this.querySelector('#chat-input');
        input.value = text;
    }

    addMessage(role, text) {
        this.messages.push({ role, text });
        const container = this.querySelector('#messages-container');

        // Create DOM element to manipulate it before/after appending
        const tempDiv = document.createElement('div');
        // For assistant, start empty for typing effect
        tempDiv.innerHTML = this.createMessageHTML({ role, text: role === 'assistant' ? '' : text });
        const messageEl = tempDiv.firstElementChild;

        container.appendChild(messageEl);
        this.scrollToBottom();

        if (role === 'assistant') {
            const bubble = messageEl.querySelector('.message-bubble');
            // Start typing and speaking concurrently
            this.typeText(bubble, text);
            this.speak(text);
        }
    }

    async typeText(element, text) {
        // Simple typewriter effect
        const chars = text.split('');
        for (const char of chars) {
            element.textContent += char;
            // Scroll to bottom periodically to keep latest text in view
            if (element.textContent.length % 5 === 0) this.scrollToBottom();
            await new Promise(resolve => setTimeout(resolve, 15)); // 15ms per char
        }
        this.scrollToBottom();
    }

    scrollToBottom() {
        const container = this.querySelector('#messages-container');
        if (container) container.scrollTop = container.scrollHeight;
    }

    speak(text) {
        if ('speechSynthesis' in window) {
            // Cancel any current speech to avoid overlap
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(utterance);
        }
    }
}

customElements.define('chat-interface', ChatInterface);
