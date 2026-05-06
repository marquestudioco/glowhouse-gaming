'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';

type FormState = 'idle' | 'loading' | 'success' | 'error';

export function ContactForm() {
  const [state, setState] = useState<FormState>('idle');
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', interest: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setState(res.ok ? 'success' : 'error');
    } catch {
      setState('error');
    }
  };

  if (state === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="text-5xl mb-4">🎉</div>
        <h3 className="font-bold text-xl text-[var(--text-light)] mb-2">Message sent!</h3>
        <p className="text-[var(--text-dim)] text-sm">We'll get back to you within 24 hours.</p>
      </div>
    );
  }

  const inputCls = [
    'w-full px-4 py-3 rounded-xl text-sm text-[var(--text-light)] bg-white/5 border border-white/10',
    'outline-none transition-all duration-200 placeholder:text-[var(--text-dim)]/50',
    'focus:border-[var(--neon-cyan)] focus:ring-1 focus:ring-[var(--neon-cyan)]/20',
  ].join(' ');

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-[var(--text-dim)] mb-1.5 uppercase tracking-wider">Name *</label>
          <input
            name="name" type="text" required
            value={form.name} onChange={handleChange}
            placeholder="Your name"
            className={inputCls}
          />
        </div>
        <div>
          <label className="block text-xs text-[var(--text-dim)] mb-1.5 uppercase tracking-wider">Email *</label>
          <input
            name="email" type="email" required
            value={form.email} onChange={handleChange}
            placeholder="your@email.com"
            className={inputCls}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-[var(--text-dim)] mb-1.5 uppercase tracking-wider">Phone</label>
          <input
            name="phone" type="tel"
            value={form.phone} onChange={handleChange}
            placeholder="(555) 000-0000"
            className={inputCls}
          />
        </div>
        <div>
          <label className="block text-xs text-[var(--text-dim)] mb-1.5 uppercase tracking-wider">I'm interested in</label>
          <select name="interest" value={form.interest} onChange={handleChange} className={inputCls}>
            <option value="">Select a service…</option>
            <option value="birthday">Birthday Party</option>
            <option value="gaming-lounge">Gaming Lounge</option>
            <option value="vr-rental">Console & VR Rental</option>
            <option value="outdoor-movies">Outdoor Movie Night</option>
            <option value="party-van">Party Van</option>
            <option value="silent-disco">Silent Disco</option>
            <option value="after-school">After School Club</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs text-[var(--text-dim)] mb-1.5 uppercase tracking-wider">Message *</label>
        <textarea
          name="message" required rows={5}
          value={form.message} onChange={handleChange}
          placeholder="Tell us about your event — dates, number of guests, and anything else we should know…"
          className={inputCls + ' resize-none'}
        />
      </div>

      {state === 'error' && (
        <p className="text-sm text-red-400">Something went wrong. Please call us at (855) 348-4569.</p>
      )}

      <button
        type="submit"
        disabled={state === 'loading'}
        className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white text-sm transition-all hover:scale-[1.02] disabled:opacity-60 disabled:scale-100"
        style={{ background: 'linear-gradient(135deg, var(--neon-cyan), var(--neon-violet))', boxShadow: '0 0 20px rgba(0,229,255,0.2)' }}
      >
        {state === 'loading' ? (
          <span className="opacity-70">Sending…</span>
        ) : (
          <>
            <Send size={15} />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}
