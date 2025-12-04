import React, { useState } from 'react';
import { X, Download, Plus, ArrowLeft } from 'lucide-react';

export function NoteEditor({ onBack }) {
    const [title, setTitle] = useState('Reflections on Chapter 5: The Market Economy');
    const [tags, setTags] = useState(['Economics', 'Philosophy', 'Exam Prep']);
    const [cues, setCues] = useState([
        { id: 1, content: 'What is supply and demand?' },
        { id: 2, content: "Adam Smith's theory" },
        { id: 3, content: 'Invisible Hand concept' }
    ]);
    const [notes, setNotes] = useState([
        { id: 1, content: 'The concepts of supply and demand form the bedrock of modern economics. Supply refers to the amount of a good or service that producers are willing and able to sell at a given price, while demand represents the quantity that consumers are willing and able to purchase.' },
        { id: 2, content: 'Adam Smith, in "The Wealth of Nations," introduced the idea that self-interest and competition in a free market would lead to economic prosperity. His theory posits that individuals pursuing their own self-interest inadvertently contribute to the economic well-being of society.', highlight: true },
        { id: 3, content: 'Central to Smith\'s theory is the concept of the "Invisible Hand." This metaphor describes the unseen forces that move the free market economy. Through individual self-interest and freedom of production and consumption, the best interests of society, as a whole, are fulfilled.' }
    ]);
    const [summary, setSummary] = useState('');

    const removeTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const addTag = () => {
        const newTag = prompt('Enter new tag:');
        if (newTag) setTags([...tags, newTag]);
    };

    const addCue = () => {
        setCues([...cues, { id: Date.now(), content: 'New Cue...' }]);
    };

    const addNote = () => {
        setNotes([...notes, { id: Date.now(), content: 'Start typing your note...' }]);
    };

    const updateCue = (id, newContent) => {
        setCues(cues.map(cue => cue.id === id ? { ...cue, content: newContent } : cue));
    };

    const updateNote = (id, newContent) => {
        setNotes(notes.map(note => note.id === id ? { ...note, content: newContent } : note));
    };

    const exportToMarkdown = () => {
        const cuesText = cues.map(c => `- ${c.content}`).join('\n');
        const notesText = notes.map(n => n.content + '\n').join('\n');
        const content = `# ${title}\n\n## Cues\n${cuesText}\n\n## Notes\n${notesText}\n\n## Summary\n${summary}`;

        const blob = new Blob([content], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${title.replace(/\s+/g, '_').toLowerCase()}.md`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Header */}
            <div style={{ padding: 'var(--space-lg)', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={{ background: 'transparent', border: 'none', fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-primary)', width: '100%', outline: 'none', marginBottom: '0.25rem' }}
                        placeholder="Note Title"
                    />
                    <div className="flex gap-2" id="tags-container">
                        {tags.map(tag => (
                            <span key={tag} className="tag-chip" style={{ padding: '0.125rem 0.5rem', borderRadius: '0.25rem', backgroundColor: 'var(--color-bg-sidebar)', fontSize: '0.75rem', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)', display: 'inline-flex', alignItems: 'center', gap: '4px', cursor: 'default' }}>
                                {tag}
                                <button onClick={() => removeTag(tag)} style={{ cursor: 'pointer' }}><X size={12} /></button>
                            </span>
                        ))}
                        <button onClick={addTag} style={{ fontSize: '0.75rem', color: 'var(--color-primary)', opacity: 0.8 }}>+ Add Tag</button>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="btn btn-ghost" onClick={onBack}>
                        <ArrowLeft size={16} />
                        Back to List
                    </button>
                    <button className="btn" style={{ backgroundColor: 'var(--color-bg-card)', color: 'var(--color-text-primary)' }} onClick={exportToMarkdown}>
                        <Download size={16} />
                        Export
                    </button>
                </div>
            </div>

            {/* Cornell Layout */}
            <div className="notes-layout">
                {/* Cues Column (Left) */}
                <div className="cues-column">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="section-title" style={{ marginBottom: 0 }}>Cues</h3>
                        <button className="icon-btn" title="Add Cue" onClick={addCue}><Plus size={16} /></button>
                    </div>
                    <div className="cue-list space-y-4">
                        {cues.map(cue => (
                            <div
                                key={cue.id}
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(e) => updateCue(cue.id, e.target.innerText)}
                                style={{ color: 'var(--color-text-secondary)', fontWeight: 500, padding: '4px', borderRadius: '4px', outline: 'none', border: '1px solid transparent', transition: 'border-color 0.2s', marginBottom: '1rem' }}
                            >
                                {cue.content}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Notes Column (Right) */}
                <div className="notes-column">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="section-title" style={{ marginBottom: 0 }}>Main Notes</h3>
                        <button className="icon-btn" title="Add Note Block" onClick={addNote}><Plus size={16} /></button>
                    </div>
                    <div className="notes-list" style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                        {notes.map(note => (
                            <div
                                key={note.id}
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(e) => updateNote(note.id, e.target.innerText)}
                                style={{
                                    marginBottom: '1.5rem',
                                    outline: 'none',
                                    padding: '4px',
                                    borderRadius: '4px',
                                    backgroundColor: note.highlight ? 'var(--color-bg-sidebar)' : 'transparent',
                                    padding: note.highlight ? 'var(--space-md)' : '4px',
                                    borderLeft: note.highlight ? '4px solid var(--color-primary)' : 'none'
                                }}
                            >
                                {note.content}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Summary (Bottom) */}
            <div className="summary-section">
                <h3 className="section-title">Summary</h3>
                <textarea
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    style={{ width: '100%', height: '100%', background: 'transparent', border: 'none', resize: 'none', color: 'var(--color-text-primary)', outline: 'none', fontFamily: 'inherit', lineHeight: 1.6 }}
                    placeholder="Write a brief summary of these notes..."
                />
            </div>
        </div>
    );
}
