'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CalendarDays, ArrowRight } from 'lucide-react';

export function DatePickerHero() {
  const [date, setDate] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (date) {
      router.push(`/book?date=${encodeURIComponent(date)}`);
    } else {
      router.push('/book');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-0 rounded-full overflow-hidden border border-white/20 bg-white/5 backdrop-blur-sm max-w-sm"
    >
      <div className="flex items-center gap-2 pl-4 pr-2 flex-1">
        <CalendarDays size={16} className="text-[var(--neon-cyan)] shrink-0" />
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          min={new Date().toISOString().split('T')[0]}
          className="bg-transparent text-sm text-[var(--text-light)] w-full outline-none py-3 [color-scheme:dark]"
          aria-label="Event date"
        />
      </div>
      <button
        type="submit"
        className="flex items-center gap-1.5 px-5 py-3 text-sm font-semibold text-white shrink-0 transition-opacity hover:opacity-90"
        style={{ background: 'linear-gradient(135deg, var(--neon-magenta), var(--neon-violet))' }}
        data-magnetic
      >
        Go
        <ArrowRight size={14} />
      </button>
    </form>
  );
}
