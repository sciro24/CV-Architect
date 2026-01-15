import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Sparkles, AlertCircle } from 'lucide-react';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

interface ChatInterfaceProps {
    onGenerateCV: (textHistory: string) => void;
    isGenerating: boolean;
    language: string;
    initialMessage: string;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ onGenerateCV, isGenerating, language, initialMessage }) => {
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: initialMessage }
    ]);

    // Update initial message when language changes if chat hasn't started
    useEffect(() => {
        if (messages.length === 1 && messages[0].role === 'assistant') {
            setMessages([{ role: 'assistant', content: initialMessage }]);
        }
    }, [initialMessage]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMsg: Message = { role: 'user', content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: [...messages, userMsg], language }),
            });

            if (!response.ok) throw new Error('Failed to get response');

            const data = await response.json();
            const botMsg: Message = { role: 'assistant', content: data.content };
            setMessages(prev => [...prev, botMsg]);
        } catch (err) {
            setError('Failed to send message. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handeGenerate = () => {
        // Convert history to a text format for the CV parser
        const conversationText = messages.map(m => `${m.role.toUpperCase()}: ${m.content}`).join('\n\n');
        onGenerateCV(conversationText);
    };

    return (
        <div className="flex flex-col h-[500px] w-full max-w-2xl mx-auto bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-white">
                    <Bot size={20} />
                    <span className="font-bold">AI Interviewer</span>
                </div>
                <button
                    onClick={handeGenerate}
                    disabled={messages.length < 3 || isGenerating}
                    className="flex items-center gap-2 bg-white text-gray-900 px-3 py-1.5 rounded-full text-xs font-bold hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    <Sparkles size={14} />
                    {isGenerating ? 'Generating...' : 'Create CV'}
                </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50" ref={scrollRef}>
                <div className="flex flex-col gap-4">
                    {messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`flex items-start gap-3 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
                        >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-gray-900 text-white' : 'bg-blue-600 text-white'}`}>
                                {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                            </div>
                            <div className={`p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.role === 'user'
                                ? 'bg-gray-900 text-white rounded-tr-none'
                                : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none'
                                }`}>
                                {msg.content.split(/(\*\*.*?\*\*)/).map((part, i) =>
                                    part.startsWith('**') && part.endsWith('**') ?
                                        <strong key={i}>{part.slice(2, -2)}</strong> :
                                        <span key={i}>{part}</span>
                                )}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 text-white">
                                <Bot size={14} />
                            </div>
                            <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-gray-200 shadow-sm">
                                <div className="flex gap-1">
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                                </div>
                            </div>
                        </div>
                    )}
                    {error && (
                        <div className="flex items-center gap-2 justify-center text-xs text-red-500 mt-2">
                            <AlertCircle size={12} /> {error}
                        </div>
                    )}
                </div>
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-100">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Type your answer..."
                        className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 transition-all"
                        disabled={isLoading}
                    />
                    <button
                        onClick={handleSend}
                        disabled={!input.trim() || isLoading}
                        className="bg-gray-900 text-white p-3 rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <Send size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};
