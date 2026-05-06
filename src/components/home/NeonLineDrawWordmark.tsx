'use client';

import { useEffect, useRef } from 'react';

interface Props {
  onComplete?: () => void;
}

export function NeonLineDrawWordmark({ onComplete }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const el = wrapRef.current;
      if (el) el.style.opacity = '1';
      onComplete?.();
      return;
    }
    const timer = setTimeout(() => onComplete?.(), 1800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      ref={wrapRef}
      className="relative select-none"
      aria-label="Glowhouse Gaming"
    >
      <div
        style={{
          animation: 'neonTurnOn 1.6s ease-out forwards',
          animationFillMode: 'forwards',
        }}
      >
        <span
          className="block font-display font-bold uppercase tracking-[0.08em] leading-none"
          style={{
            fontSize: 'clamp(2.5rem, 7vw, 6rem)',
            color: 'transparent',
            WebkitTextStroke: '1.5px var(--neon-cyan)',
            textShadow: 'var(--glow-cyan)',
            fontFamily: "'Clash Display', Georgia, serif",
          }}
        >
          Glowhouse
        </span>
        <span
          className="block font-display font-bold uppercase tracking-[0.25em] leading-none"
          style={{
            fontSize: 'clamp(1rem, 2.5vw, 2.2rem)',
            color: 'transparent',
            WebkitTextStroke: '1px var(--neon-magenta)',
            textShadow: 'var(--glow-magenta)',
            fontFamily: "'Clash Display', Georgia, serif",
            animationDelay: '0.3s',
          }}
        >
          Gaming
        </span>
      </div>
    </div>
  );
}
