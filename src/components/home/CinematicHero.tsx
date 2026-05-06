'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { NeonLineDrawWordmark } from './NeonLineDrawWordmark';
import { DatePickerHero }      from './DatePickerHero';

const SCENES = [
  { src: '/hero/scene-1.webp', label: 'Gaming Lounge', bg: 'rgba(0,229,255,0.15)' },
  { src: '/hero/scene-2.webp', label: 'VR Experience', bg: 'rgba(0,229,255,0.12)' },
  { src: '/hero/scene-3.webp', label: 'Outdoor Movies', bg: 'rgba(255,46,147,0.15)' },
  { src: '/hero/scene-4.webp', label: 'Party Van',      bg: 'rgba(123,44,191,0.15)' },
  { src: '/hero/scene-5.webp', label: 'Silent Disco',   bg: 'rgba(255,46,147,0.12)' },
  { src: '/hero/scene-6.webp', label: 'After School',   bg: 'rgba(123,44,191,0.12)' },
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
      {SCENES.map((scene, i) => (
        <div
          key={scene.src}
          aria-hidden
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === activeScene ? 1 : 0, zIndex: 0 }}
        >
          <Image
            src={scene.src}
            alt=""
            fill
            priority={i === 0}
            fetchPriority={i === 0 ? 'high' : 'auto'}
            decoding={i === 0 ? 'sync' : 'async'}
            loading={i === 0 ? 'eager' : 'lazy'}
            className="object-cover"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{ background: scene.bg }}
          />
        </div>
      ))}

      {/* Brand gradient — magenta left → violet center → cyan right, matches logo */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1]"
        style={{
          background: 'linear-gradient(105deg, rgba(255,46,147,0.38) 0%, rgba(123,44,191,0.18) 45%, rgba(0,229,255,0.32) 100%)',
        }}
      />

      {/* Dark vignette — keeps text readable */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1]"
        style={{
          background: 'linear-gradient(to bottom, rgba(10,6,18,0.60) 0%, rgba(10,6,18,0.20) 50%, rgba(10,6,18,0.80) 100%)',
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
            fontFamily: "'Clash Display', Georgia, serif",
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
