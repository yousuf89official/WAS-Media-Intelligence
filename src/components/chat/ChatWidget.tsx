'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, X, MessageSquare, Send } from 'lucide-react';

// Types
export type ChatUser = {
    id: string;
    name: string;
    role: string;
    avatar: string;
    status: 'online' | 'busy' | 'offline';
};

export type ChatMessage = {
    id: number;
    text: string;
    sender: 'me' | 'them';
    timestamp: string;
};

// Mock Data
const MOCK_CHAT_USERS: ChatUser[] = [
    { id: 'u1', name: 'Sarah Miller', role: 'Brand Manager', status: 'online', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop' },
    { id: 'u2', name: 'David Chen', role: 'Performance Lead', status: 'busy', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop' },
    { id: 'u3', name: 'Emma Wilson', role: 'Creative Director', status: 'offline', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop' },
];

export const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeUser, setActiveUser] = useState<string | null>(null);
    const [messages, setMessages] = useState<Record<string, ChatMessage[]>>({
        'u1': [
            { id: 1, text: 'Hey, did you see the CTR on the new campaign?', sender: 'them', timestamp: '10:30 AM' },
            { id: 2, text: 'Yeah, it\'s looking great! Way above benchmark.', sender: 'me', timestamp: '10:31 AM' },
        ]
    });
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, activeUser, isTyping]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputText.trim() || !activeUser) return;

        const newMessage: ChatMessage = {
            id: Date.now(),
            text: inputText,
            sender: 'me',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => ({
            ...prev,
            [activeUser]: [...(prev[activeUser] || []), newMessage]
        }));
        setInputText('');

        // Simulate reply
        setIsTyping(true);
        setTimeout(() => {
            const replyMessage: ChatMessage = {
                id: Date.now() + 1,
                text: 'Got it! I will update the report shortly.',
                sender: 'them',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => ({
                ...prev,
                [activeUser]: [...(prev[activeUser] || []), replyMessage]
            }));
            setIsTyping(false);
        }, 2000);
    };

    const activeUserData = activeUser ? MOCK_CHAT_USERS.find(u => u.id === activeUser) : null;

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 font-sans">
            {isOpen && (
                <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-80 sm:w-96 flex flex-col overflow-hidden transition-all duration-200 origin-bottom-right" style={{ height: '500px' }}>
                    {/* Header */}
                    <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                        {activeUser ? (
                            <div className="flex items-center gap-3">
                                <Button variant="ghost" size="icon" className="h-6 w-6 -ml-2" onClick={() => setActiveUser(null)}>
                                    <ArrowLeft className="h-4 w-4" />
                                </Button>
                                <div className="relative">
                                    <img src={activeUserData?.avatar} alt={activeUserData?.name || 'User'} className="h-8 w-8 rounded-full object-cover" />
                                    <span className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white ${activeUserData?.status === 'online' ? 'bg-green-500' : activeUserData?.status === 'busy' ? 'bg-red-500' : 'bg-slate-300'}`} />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-sm text-slate-900">{activeUserData?.name}</h4>
                                    <p className="text-[10px] text-slate-500">{activeUserData?.role}</p>
                                </div>
                            </div>
                        ) : (
                            <h3 className="font-bold text-slate-900">Team Chat</h3>
                        )}
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-900" onClick={() => setIsOpen(false)}>
                            <X className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* Body */}
                    <div className="flex-1 overflow-y-auto bg-white p-4">
                        {activeUser ? (
                            <div className="space-y-4">
                                {(messages[activeUser] || []).map((msg) => (
                                    <div key={msg.id} className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}>
                                        <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${msg.sender === 'me' ? 'bg-slate-900 text-white rounded-br-none' : 'bg-slate-100 text-slate-800 rounded-bl-none'}`}>
                                            {msg.text}
                                        </div>
                                        <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.timestamp}</span>
                                    </div>
                                ))}
                                {isTyping && (
                                    <div className="flex items-center gap-1 text-slate-400 text-xs ml-2">
                                        <span className="animate-bounce">●</span>
                                        <span className="animate-bounce delay-100">●</span>
                                        <span className="animate-bounce delay-200">●</span>
                                    </div>
                                )}
                                <div ref={chatEndRef} />
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {MOCK_CHAT_USERS.map(user => (
                                    <div
                                        key={user.id}
                                        onClick={() => setActiveUser(user.id)}
                                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors group"
                                    >
                                        <div className="relative">
                                            <img src={user.avatar} alt={user.name} className="h-10 w-10 rounded-full object-cover" />
                                            <span className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${user.status === 'online' ? 'bg-green-500' : user.status === 'busy' ? 'bg-red-500' : 'bg-slate-300'}`} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-center">
                                                <h4 className="font-semibold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">{user.name}</h4>
                                                <span className="text-[10px] text-slate-400">10:30 AM</span>
                                            </div>
                                            <p className="text-xs text-slate-500 truncate">{user.role}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer (Input) */}
                    {activeUser && (
                        <div className="p-3 border-t border-slate-100 bg-white">
                            <form onSubmit={handleSendMessage} className="flex gap-2">
                                <input
                                    type="text"
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    placeholder="Type a message..."
                                    className="flex-1 text-sm bg-slate-50 border border-slate-200 rounded-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-slate-900 transition-all text-slate-900"
                                />
                                <Button type="submit" size="icon" className="rounded-full h-9 w-9 shrink-0 bg-slate-900 hover:bg-slate-800">
                                    <Send className="h-4 w-4 ml-0.5" />
                                </Button>
                            </form>
                        </div>
                    )}
                </div>
            )}

            {/* Floating Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`h-14 w-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 ${isOpen ? 'bg-slate-200 text-slate-600 rotate-90' : 'bg-slate-900 text-white'}`}
            >
                {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
            </button>
        </div>
    );
};
