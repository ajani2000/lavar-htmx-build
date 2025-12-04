import { Sidebar } from './components/Sidebar.js';
import { ChatInterface } from './components/ChatInterface.js';
import { Library } from './components/Library.js';
import { Notes } from './components/Notes.js';

class App {
    constructor() {
        this.mainContent = document.getElementById('main-content');
        this.sidebar = document.querySelector('app-sidebar');
        this.currentView = 'library'; // Default view

        this.init();
    }

    init() {
        // Initialize Sidebar
        if (!document.querySelector('app-sidebar')) {
            const sidebar = new Sidebar();
            document.getElementById('app').prepend(sidebar);
        }

        // Initial Render
        this.navigate('library');

        // Event Listeners
        document.addEventListener('navigate', (e) => this.navigate(e.detail.view));
        document.addEventListener('book-changed', (e) => this.handleBookChange(e.detail.book));
        document.addEventListener('open-chat', (e) => {
            this.handleBookChange(e.detail.book);
            this.navigate('chat');
            // Update sidebar selection visually if needed
            const sidebar = document.querySelector('app-sidebar');
            if (sidebar) sidebar.selectBook(e.detail.book.id);
        });
    }

    navigate(viewName) {
        this.currentView = viewName;
        this.mainContent.innerHTML = '';

        switch (viewName) {
            case 'library':
                this.mainContent.appendChild(new Library());
                break;
            case 'chat':
                const chat = new ChatInterface();
                this.mainContent.appendChild(chat);
                // If we have a selected book in sidebar, pass it to chat
                // For now, ChatInterface defaults to Meditations, but we could sync it
                break;
            case 'notes':
                this.mainContent.appendChild(new Notes());
                break;
            default:
                this.mainContent.appendChild(new Library());
        }
    }

    handleBookChange(book) {
        // If we are in chat view, update the chat
        const chatInterface = this.mainContent.querySelector('chat-interface');
        if (chatInterface) {
            chatInterface.setBook(book);
        } else {
            this.navigate('chat');
            setTimeout(() => {
                const newChat = this.mainContent.querySelector('chat-interface');
                if (newChat) newChat.setBook(book);
            }, 0);
        }
    }

    getMockResponse(text, book) {
        const responses = [
            `That's an interesting question about ${book.title}. Based on the text, I would say that...`,
            "The author discusses this in the later chapters, emphasizing the importance of...",
            "Could you elaborate on that? It connects deeply to the central theme of...",
            `In '${book.title}', this concept is pivotal. It suggests that...`
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }
}

// Start the app
document.addEventListener('DOMContentLoaded', () => {
    const app = new App();

    // Mock Backend Listener
    document.addEventListener('message-sent', (e) => {
        const { text, book } = e.detail;
        const chat = document.querySelector('chat-interface');
        if (chat) {
            // User message is already added by ChatInterface
            // Simulate typing/network delay
            setTimeout(() => {
                const response = app.getMockResponse(text, book);
                chat.addMessage('assistant', response);
            }, 1500);
        }
    });
});
