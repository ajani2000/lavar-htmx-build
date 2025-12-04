import React from 'react';
import { Book, FileText, Plus } from 'lucide-react';

export function NotesList({ onSelectNote, onBackToChat }) {
    const notes = [
        { id: 1, title: 'Reflections on The Market Economy', description: 'A deep dive into Adam Smith\'s theory of the "Invisible Hand" and its implications on modern economic thought, questioning the assumption of perfect rationality leading to collective good.', book: 'Principles of Economics', chapter: 'Chapter 5' },
        { id: 2, title: 'Core Principles Overview', description: 'Summary of the fundamental concepts introduced in the first chapter, focusing on scarcity, opportunity cost, and the production possibilities frontier. These concepts form the bedrock of microeconomics.', book: 'Principles of Economics', chapter: 'Chapter 1' },
        { id: 3, title: 'Allegory of the Cave Analysis', description: 'An exploration of Plato\'s Allegory of the Cave from "The Republic", discussing its relevance to epistemology, education, and the nature of reality. It examines the journey from ignorance to enlightenment.', book: 'The Republic', chapter: 'Book VII' },
        { id: 4, title: 'Cognitive Biases in Decision Making', description: 'Notes on heuristics and biases as described by Kahneman. Focus on System 1 vs. System 2 thinking, anchoring, and availability heuristic, with examples from personal and professional life.', book: 'Thinking, Fast and Slow', chapter: 'Part 2' }
    ];

    return (
        <div className="notes-list-container">
            {/* Left Sidebar (Filters) */}
            <div className="notes-sidebar">
                <div className="notes-sidebar-header">
                    <Book style={{ color: 'var(--color-primary)' }} size={24} />
                    Laver
                </div>

                <div className="notes-sidebar-section">
                    <h3 className="notes-sidebar-title">Books</h3>
                    <div className="flex flex-col gap-1">
                        <button className="notes-nav-item">
                            <Book size={16} style={{ color: 'var(--color-text-secondary)' }} />
                            Principles of Economics
                        </button>
                        <button className="notes-nav-item">
                            <Book size={16} style={{ color: 'var(--color-text-secondary)' }} />
                            The Republic
                        </button>
                        <button className="notes-nav-item">
                            <Book size={16} style={{ color: 'var(--color-text-secondary)' }} />
                            Thinking, Fast and Slow
                        </button>
                    </div>
                </div>

                <div className="notes-sidebar-section">
                    <h3 className="notes-sidebar-title">Chapters</h3>
                    <div className="flex flex-col gap-1">
                        <button className="notes-nav-item active">
                            <FileText size={16} />
                            All Notes
                        </button>
                        <button className="notes-nav-item">
                            <FileText size={16} style={{ color: 'var(--color-text-secondary)' }} />
                            Introduction
                        </button>
                        <button className="notes-nav-item">
                            <FileText size={16} style={{ color: 'var(--color-text-secondary)' }} />
                            Chapter 1
                        </button>
                        <button className="notes-nav-item">
                            <FileText size={16} style={{ color: 'var(--color-text-secondary)' }} />
                            Chapter 3
                        </button>
                        <button className="notes-nav-item">
                            <FileText size={16} style={{ color: 'var(--color-text-secondary)' }} />
                            Chapter 4
                        </button>
                        <button className="notes-nav-item">
                            <FileText size={16} style={{ color: 'var(--color-text-secondary)' }} />
                            Chapter 5
                        </button>
                    </div>
                </div>

                <button className="new-note-btn" onClick={() => onSelectNote(null)}>
                    <Plus size={16} />
                    New Note
                </button>
            </div>

            {/* Main List Area */}
            <div className="notes-main">
                {/* Header */}
                <div className="notes-header">
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>All Notes</h1>
                    <div className="flex gap-2">
                        <button className="btn btn-ghost text-sm" onClick={onBackToChat}>Back to Chat</button>
                        <button className="btn" style={{ backgroundColor: 'var(--color-bg-card)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}>Export All</button>
                    </div>
                </div>

                {/* List Container (Centered & Vertical) */}
                <div className="notes-content-area">
                    <div className="notes-list-wrapper">
                        {notes.map(note => (
                            <div key={note.id} className="note-card" onClick={() => onSelectNote(note)}>
                                <h3 className="note-card-title">{note.title}</h3>
                                <p className="note-card-desc">{note.description}</p>
                                <div className="note-card-meta">
                                    <div className="meta-item">
                                        <Book size={16} />
                                        {note.book}
                                    </div>
                                    <div className="meta-item">
                                        <FileText size={16} />
                                        {note.chapter}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
