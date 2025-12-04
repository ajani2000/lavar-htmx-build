import React from 'react';
import { Plus, Search, ChevronDown, MessageSquare } from 'lucide-react';

const books = [
    { id: 'midnight-library', title: 'The Midnight Library', author: 'Matt Haig', coverColor: '#5eead4', description: 'A novel about a woman who gets to experience alternative lives she could have lived.' },
    { id: 'project-hail-mary', title: 'Project Hail Mary', author: 'Andy Weir', coverColor: '#fde047', description: 'A lone astronaut must save Earth from a catastrophic threat, with help from an unexpected ally.' },
    { id: 'klara-and-the-sun', title: 'Klara and the Sun', author: 'Kazuo Ishiguro', coverColor: '#fcd34d', description: 'An Artificial Friend with outstanding observational qualities explores the nature of love.' },
    { id: 'atomic-habits', title: 'Atomic Habits', author: 'James Clear', coverColor: '#34d399', description: 'An easy and proven way to build good habits and break bad ones.' }
];

export function Library({ onChat }) {
    return (
        <div className="library-view">
            <div className="library-container">
                <div className="library-header">
                    <div>
                        <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>Your Book Library</h1>
                        <p style={{ color: 'var(--color-text-secondary)' }}>Explore, read, and chat with your collection of books.</p>
                    </div>
                    <button className="btn btn-primary">
                        <Plus size={20} />
                        Add New Book
                    </button>
                </div>

                {/* Search & Filter */}
                <div className="search-bar">
                    <div className="search-input-wrapper">
                        <Search style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-secondary)' }} size={20} />
                        <input type="text" placeholder="Search by title, author, keyword..." className="search-input" />
                    </div>
                    <div className="flex gap-2">
                        <button className="btn btn-ghost" style={{ backgroundColor: 'var(--color-bg-sidebar)', border: '1px solid var(--color-border)' }}>
                            Sort by
                            <ChevronDown size={16} />
                        </button>
                        <button className="btn btn-ghost" style={{ backgroundColor: 'var(--color-bg-sidebar)', border: '1px solid var(--color-border)' }}>
                            Genre
                            <ChevronDown size={16} />
                        </button>
                    </div>
                </div>

                {/* Grid */}
                <div className="books-grid">
                    {books.map(book => (
                        <div key={book.id} className="book-card">
                            <div className="book-cover" style={{ backgroundColor: book.coverColor }}>
                                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', textAlign: 'center' }}>
                                    <span style={{ fontFamily: 'var(--font-serif)', color: '#0f172a', fontWeight: 700, fontSize: '1.25rem', opacity: 0.8 }}>{book.title}</span>
                                </div>
                            </div>

                            <h3 style={{ fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.25rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{book.title}</h3>
                            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>{book.author}</p>
                            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-dim)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', marginBottom: '1rem', flex: 1 }}>{book.description}</p>

                            <button
                                className="btn btn-primary chat-btn"
                                style={{ width: '100%' }}
                                onClick={() => onChat(book)}
                            >
                                <MessageSquare size={16} />
                                Chat with this Book
                            </button>
                            <div className="flex gap-2 mt-2">
                                <button className="btn btn-ghost" style={{ flex: 1, fontSize: '0.75rem', backgroundColor: 'var(--color-bg-card)' }}>View Notes</button>
                                <button className="btn btn-ghost" style={{ flex: 1, fontSize: '0.75rem', backgroundColor: 'var(--color-bg-card)' }}>More Info</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
