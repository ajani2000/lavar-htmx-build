import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Library } from './components/Library';
import { ChatInterface } from './components/ChatInterface';
import { NotesList } from './components/NotesList';
import { NoteEditor } from './components/NoteEditor';
import './index.css';

function App() {
  const [currentView, setCurrentView] = useState('library');
  const [currentBook, setCurrentBook] = useState({ id: 'meditations', title: 'Meditations', author: 'Marcus Aurelius' });
  const [currentNote, setCurrentNote] = useState(null);

  const renderContent = () => {
    switch (currentView) {
      case 'library':
        return <Library onChat={(book) => { setCurrentBook(book); setCurrentView('chat'); }} />;
      case 'chat':
        return <ChatInterface book={currentBook} />;
      case 'notes':
        return <NotesList onSelectNote={(note) => { setCurrentNote(note); setCurrentView('note-editor'); }} onBackToChat={() => setCurrentView('chat')} />;
      case 'note-editor':
        return <NoteEditor note={currentNote} onBack={() => setCurrentView('notes')} />;
      default:
        return <Library onChat={(book) => { setCurrentBook(book); setCurrentView('chat'); }} />;
    }
  };

  const showMainSidebar = currentView === 'library' || currentView === 'chat';

  return (
    <div id="app">
      {showMainSidebar && (
        <Sidebar
          currentView={currentView}
          onNavigate={setCurrentView}
          currentBook={currentBook}
          onSelectBook={setCurrentBook}
        />
      )}
      <main id="main-content">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
