import React, { useState, useEffect, useRef } from 'react';
import { MoreVertical, Mic, Send } from 'lucide-react';
import { marked } from 'marked';

export function ChatInterface({ book }) {
    const [messages, setMessages] = useState([
        { role: 'assistant', text: `Hello! I'm ready to answer questions based on '${book.title}.' What would you like to know?` }
    ]);
    const [input, setInput] = useState('');
    const [isListening, setIsListening] = useState(false);
    const messagesEndRef = useRef(null);
    const recognitionRef = useRef(null);

    useEffect(() => {
        if ('webkitSpeechRecognition' in window) {
            const recognition = new window.webkitSpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;

            recognition.onresult = (event) => {
                const text = event.results[0][0].transcript;
                setInput(text);
            };

            recognition.onend = () => {
                setIsListening(false);
            };

            recognitionRef.current = recognition;
        }
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage = { role: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');

        // Simulate AI response
        setTimeout(() => {
            const aiResponseText = `I am simulating a response about "${book.title}" for your question: "${input}"`;
            const aiMessage = { role: 'assistant', text: aiResponseText };
            setMessages(prev => [...prev, aiMessage]);
            speak(aiResponseText);
        }, 1000);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSend();
    };

    const toggleListening = () => {
        if (recognitionRef.current) {
            if (isListening) {
                recognitionRef.current.stop();
            } else {
                recognitionRef.current.start();
                setIsListening(true);
            }
        } else {
            alert('Speech recognition not supported in this browser.');
        }
    };

    const speak = (text) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(utterance);
        }
    };

    const getSuggestedPrompts = () => {
        const title = book.title.toLowerCase();
        if (title.includes('meditations')) {
            return ["What is Stoicism?", "How to deal with anxiety?", "Explain the concept of Nature"];
        } else if (title.includes('war')) {
            return ["What is the supreme art of war?", "Explain 'Know your enemy'", "Strategies for deception"];
        } else {
            return ["Summarize the main theme", "Who are the key characters?", "What is the moral of the story?"];
        }
    };

    return (
        <div className="chat-interface">
            {/* Header */}
            <div className="chat-header">
                <h2 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>Chat with '{book.title}'</h2>
                <div className="flex items-center gap-2">
                    <button className="icon-btn">
                        <MoreVertical size={20} />
                    </button>
                    <div className="avatar" style={{ width: '32px', height: '32px', fontSize: '0.75rem' }}>
                        JW
                    </div>
                </div>
            </div>

            {/* Messages Area */}
            <div className="messages-container">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.role}`}>
                        <div className="avatar">
                            {msg.role === 'assistant' ? (
                                <img src="https://api.dicebear.com/7.x/bottts/svg?seed=bookwise" alt="AI" style={{ width: '100%', height: '100%' }} />
                            ) : (
                                <div style={{ fontSize: '0.75rem', color: 'white' }}>You</div>
                            )}
                        </div>
                        <div className="message-content">
                            <span className="message-sender">{msg.role === 'assistant' ? 'Bookwise AI' : 'You'}</span>
                            <div className="message-bubble" dangerouslySetInnerHTML={{ __html: marked.parse(msg.text) }} />
                        </div>
                    </div>
                ))}

                {messages.length <= 1 && (
                    <div className="flex flex-col gap-2 mt-4 px-4">
                        <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-2">Suggested Questions</p>
                        <div className="flex flex-wrap gap-2">
                            {getSuggestedPrompts().map((prompt, i) => (
                                <button
                                    key={i}
                                    className="suggested-prompt-btn"
                                    style={{ padding: '0.5rem 1rem', backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: '99px', fontSize: '0.875rem', color: 'var(--color-text-secondary)', transition: 'all 0.2s', cursor: 'pointer' }}
                                    onClick={() => setInput(prompt)}
                                >
                                    {prompt}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="input-area">
                <div className="input-container">
                    <input
                        type="text"
                        placeholder="Ask a question about the selected book..."
                        className="chat-input"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />

                    <button
                        className={`icon-btn ${isListening ? 'text-red-500 animate-pulse' : ''}`}
                        onClick={toggleListening}
                        style={{ color: isListening ? '#ef4444' : '' }}
                    >
                        <Mic size={20} />
                    </button>

                    <button className="btn btn-primary" style={{ padding: '0.5rem' }} onClick={handleSend}>
                        <Send size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}
