import React from 'react';
import { Book, MessageSquare, FileText, Settings, HelpCircle } from 'lucide-react';

export function Sidebar({ currentView, onNavigate, currentBook, onSelectBook }) {
    const books = [
        { id: 'art-of-war', title: 'The Art of War', author: 'Sun Tzu' },
        { id: 'meditations', title: 'Meditations', author: 'Marcus Aurelius' },
        { id: 'sapiens', title: 'Sapiens', author: 'Yuval Noah Harari' }
    ];

    return (
        <div className="sidebar">
            {/* Header */}
            <div className="sidebar-header">
                <div className="app-icon">
                    <Book color="white" size={20} />
                </div>
                <div>
                    <h1 className="text-sm font-bold" style={{ color: 'var(--color-text-primary)', fontSize: '0.875rem', fontWeight: 700 }}>Laver</h1>
                    <p className="text-xs" style={{ color: 'var(--color-text-secondary)', fontSize: '0.75rem' }}>AI Knowledge Assistant</p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="nav-list">
                <button
                    className={`nav-item ${currentView === 'library' ? 'active' : ''}`}
                    onClick={() => onNavigate('library')}
                >
                    <Book size={18} />
                    Library
                </button>
                <button
                    className={`nav-item ${currentView === 'chat' ? 'active' : ''}`}
                    onClick={() => onNavigate('chat')}
                >
                    <MessageSquare size={18} />
                    Chat
                </button>
                <button
                    className={`nav-item ${currentView === 'notes' ? 'active' : ''}`}
                    onClick={() => onNavigate('notes')}
                >
                    <FileText size={18} />
                    My Notes
                </button>
            </nav>

            {/* Book Selector */}
            <div className="book-section">
                <h3 className="section-title">Source Book</h3>
                <div className="book-list">
                    {books.map(book => (
                        <div
                            key={book.id}
                            className={`book-item ${currentBook?.id === book.id ? 'selected' : ''}`}
                            onClick={() => onSelectBook(book)}
                        >
                            <span className="book-item-title">{book.title}</span>
                            <div className="radio-indicator">
                                {currentBook?.id === book.id && <div className="radio-dot"></div>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div style={{ marginTop: 'auto', padding: 'var(--space-md)' }}>
                <button className="nav-item">
                    <Settings size={18} />
                    Settings
                </button>
            </div>
        </div>
    );
}
