'use client';

import { useState } from 'react';
import { Phone, Loader2 } from 'lucide-react';

export function AiReceptionistDemo() {
  const [phone,  setPhone]  = useState('');
  const [status, setStatus] = useState<'idle' | 'calling' | 'called' | 'error'>('idle');
  const [debug,  setDebug]  = useState('');

  const handleCall = async () => {
    if (!phone.trim()) return;
    setStatus('calling');
    setDebug('');

    try {
      const res = await fetch('/api/receptionist-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });
      if (res.ok) {
        setStatus('called');
      } else {
        const data = await res.json().catch(() => ({})) as { debug?: string };
        setDebug(data.debug ?? '');
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="py-16 border-t border-dashed border-white/10" style={{ background: 'var(--bg-deep)' }}>
      <div className="max-w-xl mx-auto px-4 text-center">

        {/* Owner-only label */}
        <div className="inline-flex items-center gap-2 mb-5 px-3 py-1 rounded-full border border-dashed border-[var(--neon-violet)]/40 text-[10px] font-mono uppercase tracking-widest text-[var(--neon-violet)]/70">
          🔧 Glowhouse Team Demo
        </div>

        <h2 className="font-display font-bold text-xl text-[var(--text-light)] mb-2" style={{ fontFamily: "'Clash Display', var(--font-clash), Georgia, serif" }}>
          Your AI Receptionist — Live 24/7
        </h2>
        <p className="text-sm text-[var(--text-dim)] mb-5 max-w-sm mx-auto">
          Experience it yourself — enter your number and it calls you instantly, exactly as a real customer hears it.
        </p>

        {/* Benefits */}
        <ul className="text-left max-w-sm mx-auto mb-8 space-y-2">
          {[
            { icon: '📞', text: 'Picks up after ~5 rings — zero missed calls, any hour' },
            { icon: '🌙', text: 'Live 24/7, including late-night planning from busy parents' },
            { icon: '📅', text: 'Checks availability, answers package questions, guides callers to book' },
            { icon: '🤖', text: 'Handles FAQs automatically — pricing, location, what to expect' },
            { icon: '💰', text: 'One saved booking call covers the cost of the entire service' },
          ].map(({ icon, text }) => (
            <li key={text} className="flex items-start gap-2.5 text-sm text-[var(--text-dim)]">
              <span className="shrink-0 mt-0.5">{icon}</span>
              <span>{text}</span>
            </li>
          ))}
        </ul>

        <div className="flex gap-2 max-w-sm mx-auto">
          <input
            type="tel"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder="+1 (555) 000-0000"
            className="flex-1 px-4 py-3 rounded-xl bg-[var(--bg-elevated)] border border-white/10 text-[var(--text-light)] text-sm placeholder:text-[var(--text-dim)] focus:outline-none focus:border-[var(--neon-violet)]/50 transition-colors"
          />
          <button
            onClick={handleCall}
            disabled={!phone.trim() || status === 'calling'}
            className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm text-white transition-all hover:scale-105 disabled:opacity-50 disabled:pointer-events-none"
            style={{ background: 'linear-gradient(135deg, var(--neon-violet), var(--neon-magenta))', boxShadow: '0 0 20px rgba(123,44,191,0.3)' }}
          >
            {status === 'calling'
              ? <><Loader2 size={14} className="animate-spin" /> Calling…</>
              : <><Phone size={14} /> Call me</>
            }
          </button>
        </div>

        {status === 'called' && (
          <p className="mt-4 text-sm text-[var(--neon-cyan)]">✓ Call initiated — pick up in a moment!</p>
        )}
        {status === 'error' && (
          <div className="mt-4 text-sm text-red-400 text-left max-w-sm mx-auto">
            <p className="font-semibold mb-1">Call failed:</p>
            <pre className="text-xs whitespace-pre-wrap break-all">{debug || 'No error detail'}</pre>
          </div>
        )}

        <p className="text-[10px] text-[var(--text-dim)]/50 mt-6">
          Owner demo — customers reach the same AI by calling your business line.
        </p>
      </div>
    </section>
  );
}
