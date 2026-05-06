'use client';

import { useState, useEffect } from 'react';
import { SERVICES }  from '@/lib/data/services';
import { PACKAGES }  from '@/lib/data/packages';
import { BookingConfirmationBurst } from './BookingConfirmationBurst';

interface FormData {
  date: string;
  service: string;
  packageTier: string;
  guestCount: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
}

interface BookingWizardProps {
  initialDate?: string;
  initialService?: string;
  initialPackage?: string;
}

const EMPTY: FormData = { date: '', service: '', packageTier: '', guestCount: '', name: '', email: '', phone: '', notes: '' };

export function BookingWizard({ initialDate = '', initialService = '', initialPackage = '' }: BookingWizardProps) {
  const [step, setStep]     = useState(1);
  const [minDate, setMinDate] = useState('');
  useEffect(() => { setMinDate(new Date().toISOString().split('T')[0]); }, []);
  const [form, setForm] = useState<FormData>({
    ...EMPTY,
    date:        initialDate,
    service:     initialService,
    packageTier: initialPackage,
  });
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const update = (k: keyof FormData, v: string) => setForm(f => ({ ...f, [k]: v }));

  const submitBooking = async () => {
    setLoading(true);
    setError('');
    try {
      const res  = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Booking failed');
      setConfirmed(true);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Something went wrong. Please call (855) 348-4569.');
    } finally {
      setLoading(false);
    }
  };

  if (confirmed) return <BookingConfirmationBurst eventName={form.name} />;

  return (
    <div className="max-w-lg mx-auto">
      <div className="flex items-center justify-center gap-2 mb-8">
        {[1, 2, 3].map(s => (
          <div key={s} className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border transition-all"
              style={step >= s
                ? { background: 'var(--neon-cyan)', borderColor: 'var(--neon-cyan)', color: '#000' }
                : { borderColor: 'rgba(255,255,255,0.15)', color: 'var(--text-dim)' }}
            >
              {s}
            </div>
            {s < 3 && <div className="w-8 h-px" style={{ background: step > s ? 'var(--neon-cyan)' : 'rgba(255,255,255,0.1)' }} />}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-5">
          <h2 className="text-xl font-bold text-[var(--text-light)] mb-4">When and what?</h2>
          <div>
            <label className="block text-sm text-[var(--text-dim)] mb-1">Event date *</label>
            <input
              type="date"
              value={form.date}
              onChange={e => update('date', e.target.value)}
              min={minDate || undefined}
              className="w-full bg-[var(--bg-elevated)] border border-white/10 rounded-xl px-4 py-3 text-[var(--text-light)] outline-none focus:border-[var(--neon-cyan)] transition-colors [color-scheme:dark]"
            />
          </div>
          <div>
            <label className="block text-sm text-[var(--text-dim)] mb-2">Service *</label>
            <div className="grid grid-cols-2 gap-2">
              {SERVICES.map(s => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => update('service', s.id)}
                  className={['text-left px-4 py-3 rounded-xl border text-sm transition-all',
                    form.service === s.id ? 'border-[var(--neon-cyan)] bg-[var(--neon-cyan)]/5 text-[var(--neon-cyan)]' : 'border-white/10 text-[var(--text-dim)] hover:border-white/20',
                  ].join(' ')}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => setStep(2)}
            disabled={!form.date || !form.service}
            className="w-full py-3.5 rounded-xl font-semibold text-white disabled:opacity-40 transition-all"
            style={{ background: 'linear-gradient(135deg, var(--neon-cyan), var(--neon-violet))' }}
          >
            Next: Choose Package →
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-5">
          <h2 className="text-xl font-bold text-[var(--text-light)] mb-4">Package and size</h2>
          <div>
            <label className="block text-sm text-[var(--text-dim)] mb-2">Package (optional)</label>
            <div className="space-y-2">
              {PACKAGES.map(p => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => update('packageTier', p.id)}
                  className={['w-full text-left px-4 py-3 rounded-xl border text-sm transition-all',
                    form.packageTier === p.id ? 'border-[var(--neon-magenta)] bg-[var(--neon-magenta)]/5 text-[var(--neon-magenta)]' : 'border-white/10 text-[var(--text-dim)] hover:border-white/20',
                  ].join(' ')}
                >
                  <span className="font-medium">{p.name}</span>
                  <span className="ml-2 text-xs opacity-70">{p.priceFrom}</span>
                </button>
              ))}
              <button
                type="button"
                onClick={() => update('packageTier', '')}
                className="w-full text-left px-4 py-3 rounded-xl border border-white/10 text-sm text-[var(--text-dim)] hover:border-white/20 transition-all"
              >
                Not sure yet — help me choose
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm text-[var(--text-dim)] mb-1">Estimated guest count</label>
            <input
              type="number"
              value={form.guestCount}
              onChange={e => update('guestCount', e.target.value)}
              placeholder="e.g. 12"
              min="1" max="100"
              className="w-full bg-[var(--bg-elevated)] border border-white/10 rounded-xl px-4 py-3 text-[var(--text-light)] outline-none focus:border-[var(--neon-cyan)] transition-colors"
            />
          </div>
          <div className="flex gap-3">
            <button onClick={() => setStep(1)} className="flex-1 py-3.5 rounded-xl font-medium border border-white/15 text-[var(--text-dim)] hover:border-white/25 transition-all">
              ← Back
            </button>
            <button
              onClick={() => setStep(3)}
              className="flex-1 py-3.5 rounded-xl font-semibold text-white transition-all"
              style={{ background: 'linear-gradient(135deg, var(--neon-cyan), var(--neon-violet))' }}
            >
              Next: Your Info →
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-[var(--text-light)] mb-4">Your contact details</h2>
          {[
            { key: 'name',  label: 'Full name *',   type: 'text',  placeholder: 'Your name' },
            { key: 'email', label: 'Email *',        type: 'email', placeholder: 'you@example.com' },
            { key: 'phone', label: 'Phone number *', type: 'tel',   placeholder: '(555) 000-0000' },
          ].map(({ key, label, type, placeholder }) => (
            <div key={key}>
              <label className="block text-sm text-[var(--text-dim)] mb-1">{label}</label>
              <input
                type={type}
                value={form[key as keyof FormData]}
                onChange={e => update(key as keyof FormData, e.target.value)}
                placeholder={placeholder}
                autoComplete={key === 'email' ? 'email' : key === 'phone' ? 'tel' : 'name'}
                className="w-full bg-[var(--bg-elevated)] border border-white/10 rounded-xl px-4 py-3 text-[var(--text-light)] outline-none focus:border-[var(--neon-cyan)] transition-colors placeholder-[var(--text-dim)]"
              />
            </div>
          ))}
          <div>
            <label className="block text-sm text-[var(--text-dim)] mb-1">Notes / special requests</label>
            <textarea
              value={form.notes}
              onChange={e => update('notes', e.target.value)}
              rows={3}
              placeholder="Age range, theme, dietary needs, etc."
              className="w-full bg-[var(--bg-elevated)] border border-white/10 rounded-xl px-4 py-3 text-[var(--text-light)] outline-none focus:border-[var(--neon-cyan)] transition-colors resize-none placeholder-[var(--text-dim)]"
            />
          </div>
          {error && <p className="text-sm text-red-400 bg-red-400/10 px-3 py-2 rounded-lg">{error}</p>}
          <div className="flex gap-3 pt-2">
            <button onClick={() => setStep(2)} className="flex-1 py-3.5 rounded-xl font-medium border border-white/15 text-[var(--text-dim)] hover:border-white/25 transition-all">
              ← Back
            </button>
            <button
              onClick={submitBooking}
              disabled={!form.name || !form.email || !form.phone || loading}
              className="flex-1 py-3.5 rounded-xl font-bold text-white disabled:opacity-40 transition-all"
              style={{ background: 'linear-gradient(135deg, var(--neon-magenta), var(--neon-violet))' }}
            >
              {loading ? 'Sending...' : 'Submit Request 🎮'}
            </button>
          </div>
          <p className="text-xs text-center text-[var(--text-dim)]">
            We'll confirm within 24 hours. Or call <a href="tel:+18553484569" className="underline">(855) 348-4569</a> to book immediately.
          </p>
        </div>
      )}
    </div>
  );
}
