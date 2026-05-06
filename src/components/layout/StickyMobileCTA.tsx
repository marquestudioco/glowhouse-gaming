'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone } from 'lucide-react';

export function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={[
        'fixed bottom-0 left-0 right-0 z-40 lg:hidden',
        'transition-transform duration-300',
        visible ? 'translate-y-0' : 'translate-y-full',
      ].join(' ')}
      style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
    >
      <div className="flex bg-[var(--bg-elevated)] border-t border-white/10 px-4 pt-3 pb-0 gap-3">
        <a
          href="tel:+18553484569"
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border border-[var(--neon-cyan)] text-[var(--neon-cyan)] text-sm font-semibold"
        >
          <Phone size={16} />
          Call Now
        </a>
        <Link
          href="/book"
          className="flex-1 flex items-center justify-center py-3 rounded-lg text-sm font-semibold text-white"
          style={{ background: 'linear-gradient(135deg, var(--neon-magenta), var(--neon-violet))' }}
          data-magnetic
        >
          Book a Party
        </Link>
      </div>
    </div>
  );
}
