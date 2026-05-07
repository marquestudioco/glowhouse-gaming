'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function ChatWidget() {
  const [open,     setOpen]     = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hey! I'm Sparks ⚡ — Glowhouse Gaming's party concierge. What kind of party are you planning?" }
  ]);
  const [input,     setInput]     = useState('');
  const [loading,   setLoading]   = useState(false);
  const [chatError, setChatError] = useState('');
  const bottomRef                 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg: Message = { role: 'user', content: input.trim() };
    const prevMessages = messages;
    const newMessages  = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    setChatError('');

    try {
      const res  = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages.map(m => ({ role: m.role, content: m.content })) }),
      });
      const data = await res.json();
      if (data.reply) {
        setMessages(m => [...m, { role: 'assistant', content: data.reply }]);
      } else {
        // Roll back — keep conversation clean, restore input for retry
        setMessages(prevMessages);
        setInput(userMsg.content);
        setChatError("Sparks hit a snag — try again!");
      }
    } catch {
      setMessages(prevMessages);
      setInput(userMsg.content);
      setChatError("Connection error — try again or call (855) 348-4569!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-widget fixed bottom-20 right-4 z-50 lg:bottom-6">
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 px-4 py-3 rounded-full font-semibold text-white shadow-lg transition-all hover:scale-105"
          style={{ background: 'linear-gradient(135deg, var(--neon-cyan), var(--neon-violet))' }}
          aria-label="Chat with Sparks, our party concierge"
        >
          <MessageCircle size={18} />
          <span className="text-sm">Ask Sparks anything</span>
        </button>
      )}

      {open && (
        <div
          className="flex flex-col rounded-2xl border border-white/10 shadow-2xl"
          style={{ width: 320, height: 460, background: 'var(--bg-elevated)' }}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: 'linear-gradient(135deg, var(--neon-cyan), var(--neon-violet))' }}>S</div>
              <div>
                <p className="text-sm font-semibold text-[var(--text-light)]">Sparks ⚡</p>
                <p className="text-xs text-[var(--text-dim)]">AI concierge · answers instantly, 24/7</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-[var(--text-dim)] hover:text-[var(--text-light)] transition-colors" aria-label="Close chat">
              <X size={16} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className="max-w-[85%] text-sm rounded-2xl px-3 py-2 leading-relaxed"
                  style={m.role === 'user'
                    ? { background: 'var(--neon-violet)', color: '#fff' }
                    : { background: 'var(--bg-deep)', color: 'var(--text-light)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-[var(--bg-deep)] rounded-2xl px-3 py-2 text-sm text-[var(--text-dim)]" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
                  Sparks is typing...
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {chatError && (
            <p className="px-3 pb-1 text-xs text-red-400 text-center">{chatError}</p>
          )}

          <div className="p-3 border-t border-white/5">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && send()}
                placeholder="Ask about parties..."
                className="flex-1 bg-[var(--bg-deep)] border border-white/10 rounded-xl px-3 py-2 text-sm text-[var(--text-light)] outline-none focus:border-[var(--neon-cyan)] placeholder-[var(--text-dim)] transition-colors"
                aria-label="Message Sparks"
              />
              <button
                onClick={send}
                disabled={!input.trim() || loading}
                className="p-2 rounded-xl disabled:opacity-40 transition-all"
                style={{ background: 'var(--neon-cyan)', color: '#000' }}
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
