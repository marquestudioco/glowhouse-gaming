'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { NeonLineDrawWordmark } from './NeonLineDrawWordmark';
import { DatePickerHero }      from './DatePickerHero';

// Each scene composites a real photo with neon gradient overlays
const SCENES = [
  {
    label: 'Gaming Lounge',
    image: '/hero/scene-1.webp',
    overlay: `
      radial-gradient(ellipse 90% 80% at 10% 55%, rgba(255,46,147,0.38) 0%, transparent 55%),
      radial-gradient(ellipse 60% 70% at 80% 40%, rgba(0,229,255,0.22) 0%, transparent 55%),
      radial-gradient(ellipse 55% 65% at 50% 75%, rgba(123,44,191,0.25) 0%, transparent 60%)
    `,
  },
  {
    label: 'VR Experience',
    image: '/hero/scene-2.webp',
    overlay: `
      radial-gradient(ellipse 80% 80% at 88% 50%, rgba(0,229,255,0.38) 0%, transparent 55%),
      radial-gradient(ellipse 60% 70% at 12% 45%, rgba(255,46,147,0.22) 0%, transparent 55%),
      radial-gradient(ellipse 55% 65% at 50% 30%, rgba(123,44,191,0.25) 0%, transparent 60%)
    `,
  },
  {
    label: 'Outdoor Movies',
    image: '/hero/scene-3.webp',
    overlay: `
      radial-gradient(ellipse 70% 80% at 20% 50%, rgba(255,46,147,0.32) 0%, transparent 55%),
      radial-gradient(ellipse 70% 80% at 80% 50%, rgba(0,229,255,0.30) 0%, transparent 55%),
      radial-gradient(ellipse 50% 60% at 50% 55%, rgba(123,44,191,0.30) 0%, transparent 60%)
    `,
  },
  {
    label: 'Party Van',
    image: '/hero/scene-4.webp',
    overlay: `
      radial-gradient(ellipse 100% 60% at 50% 100%, rgba(123,44,191,0.35) 0%, transparent 55%),
      radial-gradient(ellipse 70% 70% at 15% 40%, rgba(255,46,147,0.28) 0%, transparent 55%),
      radial-gradient(ellipse 60% 60% at 85% 35%, rgba(0,229,255,0.24) 0%, transparent 55%)
    `,
  },
  {
    label: 'Silent Disco',
    image: '/hero/scene-5.webp',
    overlay: `
      radial-gradient(ellipse 80% 90% at 25% 60%, rgba(255,46,147,0.35) 0%, transparent 55%),
      radial-gradient(ellipse 70% 70% at 75% 40%, rgba(0,229,255,0.32) 0%, transparent 55%),
      radial-gradient(ellipse 40% 50% at 50% 20%, rgba(123,44,191,0.22) 0%, transparent 55%)
    `,
  },
  {
    label: 'After School',
    image: '/hero/scene-6.webp',
    overlay: `
      radial-gradient(ellipse 60% 80% at 50% 50%, rgba(123,44,191,0.36) 0%, transparent 55%),
      radial-gradient(ellipse 70% 60% at 5% 50%, rgba(255,46,147,0.25) 0%, transparent 50%),
      radial-gradient(ellipse 70% 60% at 95% 50%, rgba(0,229,255,0.25) 0%, transparent 50%)
    `,
  },
];

const HEADLINE_WORDS = ['Where', 'birthdays', 'go', 'to', 'glow.'];

export function CinematicHero() {
  const [activeScene,    setActiveScene]    = useState(0);
  const [wordmarkDone,   setWordmarkDone]   = useState(false);
  const [headlineActive, setHeadlineActive] = useState(false);
  const [ctaActive,      setCtaActive]      = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const onWordmarkComplete = useCallback(() => {
    setWordmarkDone(true);
    setHeadlineActive(true);
    const delay = HEADLINE_WORDS.length * 120 + 700;
    setTimeout(() => setCtaActive(true), delay);
  }, []);

  useEffect(() => {
    if (!wordmarkDone) return;
    intervalRef.current = setInterval(() => {
      setActiveScene(s => (s + 1) % SCENES.length);
    }, 4500);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [wordmarkDone]);

  return (
    <section
      className="relative flex items-center justify-center"
      style={{ height: '100svh', overflow: 'clip' }}
    >
      {/* Base dark layer */}
      <div aria-hidden className="absolute inset-0" style={{ background: '#0A0612' }} />

      {/* Scene layers: neon gradient overlays only */}
      {SCENES.map((scene, i) => (
        <div
          key={scene.label}
          aria-hidden
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === activeScene ? 1 : 0 }}
        >
          <div
            className="absolute inset-0"
            style={{ background: scene.overlay }}
          />
        </div>
      ))}

      {/* Dark vignette — top/bottom fade keeps text crisp */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1]"
        style={{
          background: 'linear-gradient(to bottom, rgba(10,6,18,0.55) 0%, rgba(10,6,18,0.05) 45%, rgba(10,6,18,0.75) 100%)',
        }}
      />

      <div className="relative z-[2] text-center px-4 sm:px-8 max-w-4xl mx-auto">
        <div className="mb-8">
          <NeonLineDrawWordmark onComplete={onWordmarkComplete} />
        </div>

        <h1
          className="font-display font-bold leading-[1.05] mb-6"
          style={{
            fontSize: 'var(--text-hero)',
            fontFamily: "'Clash Display', var(--font-clash), Georgia, serif",
            fontStyle: 'italic',
          }}
        >
          {HEADLINE_WORDS.map((word, i) => (
            <span
              key={`${word}-${i}`}
              className="inline-block mr-[0.25em]"
              style={headlineActive ? {
                animation: `wordReveal 0.6s ease-out forwards`,
                animationDelay: `${i * 0.12}s`,
                opacity: 0,
              } : { opacity: 0 }}
            >
              {word}
            </span>
          ))}
        </h1>

        <p
          className="text-[var(--text-dim)] mb-8 transition-all duration-700"
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            opacity: ctaActive ? 1 : 0,
            transform: ctaActive ? 'translateY(0)' : 'translateY(12px)',
          }}
        >
          Glow-in-the-dark gaming lounge, mobile party services, and after-school adventures in Santa Clarita, CA.
        </p>

        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700"
          style={{
            opacity: ctaActive ? 1 : 0,
            transform: ctaActive ? 'translateY(0)' : 'translateY(16px)',
            transitionDelay: '0.1s',
          }}
        >
          <DatePickerHero />
          <Link
            href="/services"
            className="text-sm font-medium text-[var(--text-dim)] hover:text-[var(--text-light)] transition-colors underline-offset-4 hover:underline"
          >
            Explore all services →
          </Link>
        </div>
      </div>

      <div
        aria-hidden
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[2] flex gap-2"
      >
        {SCENES.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setActiveScene(i);
              if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = setInterval(
                  () => setActiveScene(s => (s + 1) % SCENES.length),
                  4500
                );
              }
            }}
            className="rounded-full transition-all duration-300"
            style={{
              width:  i === activeScene ? 24 : 8,
              height: 8,
              background: i === activeScene ? 'var(--neon-cyan)' : 'rgba(255,255,255,0.25)',
            }}
            aria-label={`View scene ${i + 1}: ${SCENES[i].label}`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div
        aria-hidden
        className="absolute bottom-20 left-1/2 -translate-x-1/2 z-[2] flex flex-col items-center gap-1 opacity-60"
        style={{ animation: 'scrollBounce 2s ease-in-out infinite' }}
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--neon-cyan)]">Scroll</span>
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
          <rect x="1" y="1" width="14" height="22" rx="7" stroke="var(--neon-cyan)" strokeWidth="1.5"/>
          <rect x="7" y="5" width="2" height="6" rx="1" fill="var(--neon-cyan)" style={{ animation: 'scrollDot 2s ease-in-out infinite' }}/>
        </svg>
      </div>
    </section>
  );
}
