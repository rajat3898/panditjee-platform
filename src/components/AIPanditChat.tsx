/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { Send, Sparkles, MessageCircle, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';

export default function AIPanditChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [isSending, setIsSending] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const suggestionChips = [
    'Remedies for career growth & obstacles',
    'Significance of Saturn Sade Sati & remedies',
    'How to handle stress & activate positive energy?',
    'Daily Vedic pooja routine for peace at home',
    'Remedial gemstone advice for mental clarity',
  ];

  // Set initial blessing from Pandit Dwarakanath
  useEffect(() => {
    if (messages.length === 0) {
      const initialMessage: ChatMessage = {
        id: 'initial-1',
        role: 'model',
        text: `Hari Om, dear soul! 🙏

I am Pandit Dwarakanath. I welcome you to this sacred space of spiritual consultation. In Vedic tradition, the alignment of planets and our karma defines our path, but conscious efforts, noble actions, and devotion can unlock all blessings.

How may I guide you on your journey today? You can ask me about your career path, relationships, spiritual growth, gemstone recommendations, or how to appease specific planetary influences (like Shani or Rahu). Kalyan ho! 🕉️✨`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([initialMessage]);
    }
  }, []);

  // Auto Scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isSending]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isSending) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsSending(true);

    try {
      const chatHistory = [...messages, userMessage].map((msg) => ({
        role: msg.role,
        text: msg.text,
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: chatHistory }),
      });

      const data = await response.json();
      if (response.ok) {
        const modelMessage: ChatMessage = {
          id: `model-${Date.now()}`,
          role: 'model',
          text: data.text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, modelMessage]);
      } else {
        const errorMessage: ChatMessage = {
          id: `error-${Date.now()}`,
          role: 'model',
          text: `Forgive me, dear soul, but my celestial connection was interrupted temporarily: ${data.error || 'Server connection error'}. Let us try again in a brief moment.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error('Error in chat request:', error);
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        role: 'model',
        text: 'Forgive me, but the cosmic currents are unstable right now. Please check your internet connection, or try again soon. Om Shanti. 🙏',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsSending(false);
    }
  };

  const clearChat = () => {
    const initialMessage: ChatMessage = {
      id: `initial-${Date.now()}`,
      role: 'model',
      text: `Hari Om! 🙏 The sacred energy of our space has been renewed. How can I offer guidance to your soul today? Kalyan ho!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([initialMessage]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white border border-orange-200 rounded-3xl overflow-hidden shadow-xl flex flex-col h-[650px]"
    >
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-orange-600 to-amber-600 px-6 py-4 border-b border-orange-500 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 bg-white/10 border border-white/30 rounded-full flex items-center justify-center font-serif text-xl text-white font-bold shadow-inner">
              PD
            </div>
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-orange-600 rounded-full animate-pulse"></span>
          </div>
          <div>
            <h2 className="text-base font-serif font-semibold text-white flex items-center gap-1.5">
              Pandit Dwarakanath
              <Sparkles className="h-3.5 w-3.5 text-orange-200" />
            </h2>
            <p className="text-[10px] text-orange-100/90 font-medium font-sans">Spiritual Astrologer & Vedic Scholar</p>
          </div>
        </div>

        <button
          id="btn-clear-chat"
          onClick={clearChat}
          title="Reset Consultation"
          className="p-2 rounded-xl text-orange-100/70 hover:text-white hover:bg-white/10 transition-all duration-300 border border-transparent hover:border-white/20"
        >
          <RefreshCw className="h-4 w-4" />
        </button>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-orange-50/20 to-transparent scrollbar-thin scrollbar-thumb-orange-200 scrollbar-track-transparent">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              {/* Avatar Icon */}
              <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center font-serif text-xs font-bold border ${
                msg.role === 'user'
                  ? 'bg-orange-100 border-orange-200 text-orange-700'
                  : 'bg-orange-600 border-orange-500 text-white'
              }`}>
                {msg.role === 'user' ? 'ME' : 'ॐ'}
              </div>

              {/* Message Bubble */}
              <div className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed border ${
                msg.role === 'user'
                  ? 'bg-orange-50 border-orange-200 text-stone-800 rounded-tr-none'
                  : 'bg-orange-50/20 border-orange-100 text-stone-800 rounded-tl-none font-serif shadow-sm whitespace-pre-line'
              }`}>
                {msg.text}
                <span className={`block text-[9px] mt-2 text-right opacity-60 font-sans`}>
                  {msg.timestamp}
                </span>
              </div>
            </div>
          </div>
        ))}

        {isSending && (
          <div className="flex justify-start">
            <div className="flex gap-3 max-w-[80%]">
              <div className="w-8 h-8 rounded-full bg-orange-600 border border-orange-500 flex items-center justify-center font-serif text-xs font-bold text-white">
                ॐ
              </div>
              <div className="px-5 py-3 rounded-2xl rounded-tl-none bg-orange-50/30 border border-orange-100 flex items-center space-x-1.5">
                <span className="w-2 h-2 bg-orange-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 bg-orange-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 bg-orange-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggestion Chips */}
      {messages.length === 1 && (
        <div className="px-6 py-3 border-t border-orange-100 bg-orange-50/30 flex flex-wrap gap-2 overflow-x-auto">
          {suggestionChips.map((chip, idx) => (
            <button
              id={`chip-${idx}`}
              key={idx}
              onClick={() => handleSendMessage(chip)}
              className="px-3.5 py-1.5 rounded-full bg-white hover:bg-orange-50 border border-orange-200 hover:border-orange-400 text-[11px] text-stone-700 hover:text-orange-700 transition-all duration-300 font-serif shadow-sm"
            >
              {chip}
            </button>
          ))}
        </div>
      )}

      {/* Input Box */}
      <div className="p-4 bg-orange-50/50 border-t border-orange-100">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(inputText);
          }}
          className="flex gap-3 items-center bg-white border border-orange-200 focus-within:border-orange-500 rounded-2xl px-4 py-2 transition-all duration-300 shadow-sm"
        >
          <div className="text-orange-500/60">
            <MessageCircle className="h-5 w-5" />
          </div>
          <input
            id="chat-input-text"
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask Pandit Jee about career, remedies, gemstones..."
            className="flex-1 bg-transparent text-stone-800 text-sm focus:outline-none placeholder-stone-400"
            disabled={isSending}
          />
          <button
            id="btn-send-message"
            type="submit"
            disabled={!inputText.trim() || isSending}
            className="p-2 rounded-xl bg-orange-600 hover:bg-orange-500 disabled:bg-orange-100 text-white disabled:text-stone-400 transition-all duration-300 shadow-md flex items-center justify-center"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </motion.div>
  );
}
