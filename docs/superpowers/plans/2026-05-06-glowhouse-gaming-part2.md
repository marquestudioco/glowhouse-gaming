# Glowhouse Gaming — Implementation Plan Part 2 of 3: Home Page

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task.

**Prerequisite:** Part 1 complete and all Playwright tests passing.

**Goal:** Build the entire home page — all 12 sections including all 3 Wow Factors — and validate it on mobile/desktop/Cloudflare.

**Covers:** Tasks 13–25 (3 Wow Factors + all home sections + home assembly + Cloudflare phase deploy)

**Part 1:** `2026-05-06-glowhouse-gaming-part1.md` ✓ (Foundation & Layout)
**Part 3:** `2026-05-06-glowhouse-gaming-part3.md` (Inner Pages → Deploy)

---

## File Structure (Part 2 creates these)

```
src/
├── app/
│   └── page.tsx                           # Home page (replaces placeholder)
└── components/
    ├── cursor/
    │   └── GlowTrailCursor.tsx            # REPLACE scaffold — full implementation
    └── home/
        ├── CinematicHero.tsx              # Wow #1
        ├── NeonLineDrawWordmark.tsx       # Used inside CinematicHero
        ├── DatePickerHero.tsx
        ├── TrustStatStrip.tsx
        ├── ServicesGrid.tsx
        ├── HorizontalServiceScrubber.tsx  # Wow #3
        ├── PhotoMosaic.tsx
        ├── TestimonialMarquee.tsx
        ├── PackagesTeaser.tsx
        ├── BirthdaySpotlight.tsx
        ├── AboutTeaser.tsx
        ├── FaqSnippet.tsx
        └── CtaBand.tsx
tests/
└── home.spec.ts
```

---

## Task 13: NeonLineDrawWordmark (Wow #1 — first piece)

**Files:**
- Replace: `src/components/home/NeonLineDrawWordmark.tsx`

This component renders the "GLOWHOUSE GAMING" wordmark as a neon sign turning on. Used as the first animation the user sees in the hero.

- [ ] **Step 1: Create `NeonLineDrawWordmark.tsx`**

```tsx
// src/components/home/NeonLineDrawWordmark.tsx
'use client';

import { useEffect, useRef } from 'react';

interface Props {
  onComplete?: () => void; // fires when animation finishes (~1.6s)
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
    // Trigger CSS animation, then fire onComplete
    const timer = setTimeout(() => onComplete?.(), 1800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      ref={wrapRef}
      className="relative select-none"
      aria-label="Glowhouse Gaming"
    >
      {/* Main wordmark — neon turn-on animation */}
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
            fontFamily: 'var(--font-clash), Georgia, serif',
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
            fontFamily: 'var(--font-clash), Georgia, serif',
            animationDelay: '0.3s',
          }}
        >
          Gaming
        </span>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/home/NeonLineDrawWordmark.tsx
git commit -m "feat: NeonLineDrawWordmark — neon turn-on animation"
```

---

## Task 14: CinematicHero (Wow #1 — full)

**Files:**
- Create: `src/components/home/CinematicHero.tsx`
- Create: `src/components/home/DatePickerHero.tsx`

- [ ] **Step 1: Create `DatePickerHero.tsx`**

```tsx
// src/components/home/DatePickerHero.tsx
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
```

- [ ] **Step 2: Create `CinematicHero.tsx`**

```tsx
// src/components/home/CinematicHero.tsx
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
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // When wordmark finishes, start headline + scene cycle
  const onWordmarkComplete = useCallback(() => {
    setWordmarkDone(true);
    setHeadlineActive(true);
    // CTA fades in after headline finishes (HEADLINE_WORDS.length * 0.12s + 0.6s)
    const delay = HEADLINE_WORDS.length * 120 + 700;
    setTimeout(() => setCtaActive(true), delay);
  }, []);

  // Scene cycle — start after wordmark
  useEffect(() => {
    if (!wordmarkDone) return;
    if (reducedMotion.current) return;
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
      {/* Scene backgrounds */}
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
          {/* Color-tinted overlay */}
          <div
            className="absolute inset-0"
            style={{ background: scene.bg }}
          />
        </div>
      ))}

      {/* Dark gradient scrim for text legibility */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1]"
        style={{
          background: 'linear-gradient(to bottom, rgba(10,6,18,0.7) 0%, rgba(10,6,18,0.4) 50%, rgba(10,6,18,0.85) 100%)',
        }}
      />

      {/* Frosted glass hero panel */}
      <div
        className="relative z-[2] text-center px-4 sm:px-8 max-w-4xl mx-auto"
      >
        {/* Wordmark */}
        <div className="mb-8">
          <NeonLineDrawWordmark onComplete={onWordmarkComplete} />
        </div>

        {/* Headline — word by word reveal */}
        <h1
          className="font-display font-bold leading-[1.05] mb-6"
          style={{
            fontSize: 'var(--text-hero)',
            fontFamily: 'var(--font-clash), Georgia, serif',
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

        {/* Sub-headline */}
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

        {/* Date picker + CTAs */}
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

      {/* Scene indicator dots */}
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
    </section>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/home/CinematicHero.tsx src/components/home/DatePickerHero.tsx
git commit -m "feat: CinematicHero (Wow #1) — scene cycle, word-by-word headline, date picker"
```

---

## Task 15: TrustStatStrip

**Files:**
- Create: `src/components/home/TrustStatStrip.tsx`

- [ ] **Step 1: Create `TrustStatStrip.tsx`**

```tsx
// src/components/home/TrustStatStrip.tsx
import { CountUp } from '@/components/ui/CountUp';

const STATS = [
  { prefix: '',    end: 2017, suffix: '',    label: 'Year founded',         display: '2017' },
  { prefix: '',    end: 5,    suffix: '.0★', label: 'Yelp rating',         display: null },
  { prefix: '',    end: 1000, suffix: '+',   label: 'Parties hosted',       display: null },
  { prefix: '',    end: 6,    suffix: '',    label: 'Ways to glow',         display: null },
];

export function TrustStatStrip() {
  return (
    <section className="py-10 border-y border-white/5" style={{ background: 'var(--bg-elevated)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <p
                className="font-display font-bold mb-1"
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  color: 'var(--neon-cyan)',
                  fontFamily: 'var(--font-clash), Georgia, serif',
                }}
              >
                {stat.display ?? (
                  <CountUp end={stat.end} suffix={stat.suffix} prefix={stat.prefix} />
                )}
              </p>
              <p className="text-xs uppercase tracking-widest text-[var(--text-dim)]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/home/TrustStatStrip.tsx
git commit -m "feat: TrustStatStrip with animated CountUp"
```

---

## Task 16: ServicesGrid

**Files:**
- Create: `src/components/home/ServicesGrid.tsx`

- [ ] **Step 1: Create `ServicesGrid.tsx`**

Uses `NeonGlowCard` + Atropos 3D tilt (desktop only). 6 service cards, each links to `/services#service-id`.

```tsx
// src/components/home/ServicesGrid.tsx
'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SERVICES } from '@/lib/data/services';
import { Container } from '@/components/ui/Container';
import { Eyebrow }   from '@/components/ui/Eyebrow';

const ICON_MAP: Record<string, string> = {
  'gaming-lounge':  '🎮',
  'vr-rental':      '🥽',
  'outdoor-movies': '🎬',
  'party-van':      '🚐',
  'silent-disco':   '🎧',
  'after-school':   '🏫',
};

export function ServicesGrid() {
  return (
    <section className="py-[var(--section-gap)]" style={{ background: 'var(--bg-deep)' }}>
      <Container>
        <div className="text-center mb-14">
          <Eyebrow className="mb-3">6 Ways to Glow</Eyebrow>
          <h2
            className="font-display font-bold"
            style={{
              fontSize: 'var(--text-display)',
              fontFamily: 'var(--font-clash), Georgia, serif',
            }}
          >
            Pick your party
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.07 }}
              viewport={{ once: true, amount: 0.15 }}
            >
              <Link
                href={`/services#${service.id}`}
                className="group block p-6 rounded-2xl border border-white/5 bg-[var(--bg-elevated)] transition-all duration-300 hover:border-current hover:shadow-[0_0_20px_rgba(0,0,0,0.3)]"
                style={{ '--accent': service.accentColor } as React.CSSProperties}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl" aria-hidden>{ICON_MAP[service.id]}</span>
                  <span
                    className="text-xs font-mono uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1"
                    style={{ color: service.accentColor }}
                  >
                    Learn more <ArrowRight size={10} />
                  </span>
                </div>
                <h3
                  className="font-semibold text-[var(--text-light)] text-base mb-1 group-hover:text-current transition-colors"
                  style={{ '--current': service.accentColor } as React.CSSProperties}
                >
                  {service.name}
                </h3>
                <p className="text-sm text-[var(--text-dim)] leading-relaxed line-clamp-2">
                  {service.tagline}
                </p>
                {/* Highlight tags */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {service.highlights.slice(0, 3).map(h => (
                    <span
                      key={h}
                      className="text-[10px] px-2 py-0.5 rounded-full border"
                      style={{ borderColor: service.accentColor + '40', color: service.accentColor }}
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/home/ServicesGrid.tsx
git commit -m "feat: ServicesGrid — 6 services with neon hover + stagger reveal"
```

---

## Task 17: HorizontalServiceScrubber (Wow #3)

**Files:**
- Create: `src/components/home/HorizontalServiceScrubber.tsx`

This is the signature mid-page moment: CSS sticky horizontal scrubber — 6 service panels scroll horizontally as user scrolls vertically. Follow PREMIUM_STACK: CSS sticky + passive scroll listener. Never GSAP `pin: true`.

- [ ] **Step 1: Create `HorizontalServiceScrubber.tsx`**

```tsx
// src/components/home/HorizontalServiceScrubber.tsx
'use client';

import { useEffect, useRef } from 'react';
import { SERVICES, type Service } from '@/lib/data/services';
import { Eyebrow } from '@/components/ui/Eyebrow';

const BG_COLORS: Record<string, string> = {
  'gaming-lounge':  'radial-gradient(ellipse at 30% 50%, rgba(0,229,255,0.12) 0%, transparent 70%)',
  'vr-rental':      'radial-gradient(ellipse at 70% 40%, rgba(0,229,255,0.1)  0%, transparent 70%)',
  'outdoor-movies': 'radial-gradient(ellipse at 50% 60%, rgba(255,46,147,0.12) 0%, transparent 70%)',
  'party-van':      'radial-gradient(ellipse at 20% 50%, rgba(123,44,191,0.12) 0%, transparent 70%)',
  'silent-disco':   'radial-gradient(ellipse at 80% 30%, rgba(255,46,147,0.1)  0%, transparent 70%)',
  'after-school':   'radial-gradient(ellipse at 40% 60%, rgba(123,44,191,0.1)  0%, transparent 70%)',
};

const ICON_MAP: Record<string, string> = {
  'gaming-lounge':'🎮','vr-rental':'🥽','outdoor-movies':'🎬',
  'party-van':'🚐','silent-disco':'🎧','after-school':'🏫',
};

function ServicePanel({ service, index }: { service: Service; index: number }) {
  const num = String(index + 1).padStart(2, '0');
  return (
    <div
      className="relative flex-shrink-0 flex flex-col justify-end"
      style={{
        width: '100vw',
        height: '100vh',
        background: `var(--bg-deep)`,
      }}
    >
      {/* Ambient background gradient */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: BG_COLORS[service.id] }}
      />

      {/* Index counter */}
      <div
        className="absolute top-10 right-10 font-mono text-xs tracking-widest"
        style={{ color: service.accentColor }}
        aria-hidden
      >
        {num} / {String(SERVICES.length).padStart(2, '0')}
      </div>

      {/* Content */}
      <div className="relative z-10 px-8 sm:px-16 lg:px-24 pb-20 max-w-2xl">
        <Eyebrow color={
          service.accentColor === 'var(--neon-cyan)' ? 'cyan'
          : service.accentColor === 'var(--neon-magenta)' ? 'magenta'
          : 'violet'
        } className="mb-4">
          {num}
        </Eyebrow>
        <div className="text-6xl mb-6" aria-hidden>{ICON_MAP[service.id]}</div>
        <h2
          className="font-display font-bold mb-4"
          style={{
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            fontFamily: 'var(--font-clash), Georgia, serif',
            color: service.accentColor,
          }}
        >
          {service.name}
        </h2>
        <p className="text-lg text-[var(--text-dim)] leading-relaxed mb-6 max-w-md">
          {service.description}
        </p>
        {/* 3 key highlights */}
        <ul className="flex flex-wrap gap-3">
          {service.highlights.slice(0, 4).map(h => (
            <li
              key={h}
              className="text-sm px-3 py-1.5 rounded-full border"
              style={{ borderColor: service.accentColor + '50', color: service.accentColor }}
            >
              {h}
            </li>
          ))}
        </ul>
      </div>

      {/* Neon bottom edge line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(to right, transparent, ${service.accentColor}, transparent)` }}
      />
    </div>
  );
}

export function HorizontalServiceScrubber() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track   = trackRef.current;
    if (!section || !track) return;

    // Reduced motion: skip horizontal scroll
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Mobile: also skip (let it stack vertically via CSS fallback)
    if (window.matchMedia('(max-width: 767px)').matches) return;

    const onScroll = () => {
      const rect             = section.getBoundingClientRect();
      const sectionScrollDist = rect.height - window.innerHeight;
      const scrolled          = -rect.top;
      const progress          = Math.max(0, Math.min(1, scrolled / sectionScrollDist));
      const translateX        = progress * (SERVICES.length - 1) * 100;
      track.style.transform   = `translateX(-${translateX}vw)`;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // Initial call
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Desktop: horizontal scrubber */}
      <section
        ref={sectionRef}
        className="relative hidden md:block"
        style={{ height: `${SERVICES.length * 100}vh` }}
        aria-label="Explore our 6 services"
      >
        <div className="sticky top-0 h-screen" style={{ overflow: 'clip' }}>
          <div
            ref={trackRef}
            className="flex will-change-transform"
            style={{ width: `${SERVICES.length * 100}vw` }}
          >
            {SERVICES.map((service, i) => (
              <ServicePanel key={service.id} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Mobile: vertical stack (no JS required) */}
      <section className="md:hidden" aria-label="Explore our 6 services">
        {SERVICES.map((service, i) => (
          <ServicePanel key={service.id} service={service} index={i} />
        ))}
      </section>
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/home/HorizontalServiceScrubber.tsx
git commit -m "feat: HorizontalServiceScrubber (Wow #3) — CSS sticky horizontal scroll"
```

---

## Task 18: GlowTrailCursor (Wow #2)

**Files:**
- Replace: `src/components/cursor/GlowTrailCursor.tsx` (was a scaffold)

- [ ] **Step 1: Replace `GlowTrailCursor.tsx` with full implementation**

```tsx
// src/components/cursor/GlowTrailCursor.tsx
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function GlowTrailCursor() {
  const dotRef   = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only on pointer:fine devices
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const dot   = dotRef.current;
    const trail = trailRef.current;
    if (!dot || !trail) return;

    // Show cursors now that we're confirmed on desktop
    dot.style.display   = 'block';
    trail.style.display = 'block';

    // quickTo for smooth lag-free tracking
    const dotX   = gsap.quickTo(dot,   'x', { duration: 0.08, ease: 'power3.out' });
    const dotY   = gsap.quickTo(dot,   'y', { duration: 0.08, ease: 'power3.out' });
    const trailX = gsap.quickTo(trail, 'x', { duration: 0.25, ease: 'power3.out' });
    const trailY = gsap.quickTo(trail, 'y', { duration: 0.25, ease: 'power3.out' });

    const onMouseMove = (e: MouseEvent) => {
      dotX(e.clientX); dotY(e.clientY);
      trailX(e.clientX); trailY(e.clientY);
    };

    // Scale up on clickable elements
    const onMouseOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest('a, button, [data-magnetic]');
      if (el) {
        gsap.to(dot,   { scale: 2.5, duration: 0.2 });
        gsap.to(trail, { scale: 1.8, opacity: 0.9, duration: 0.3 });
      }
    };
    const onMouseOut = () => {
      gsap.to(dot,   { scale: 1, duration: 0.2 });
      gsap.to(trail, { scale: 1, opacity: 0.5, duration: 0.3 });
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout',  onMouseOut);

    // Magnetic effect — re-bind after route changes
    const bindMagnetic = () => {
      document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach(el => {
        // Remove previous to avoid duplicate handlers
        el.replaceWith(el.cloneNode(true));
      });
      document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach(el => {
        const onElMove = (e: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          const cx   = rect.left + rect.width / 2;
          const cy   = rect.top  + rect.height / 2;
          const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
          if (dist < 80) {
            const pull = (1 - dist / 80) * 0.28;
            gsap.to(el, { x: (e.clientX - cx) * pull, y: (e.clientY - cy) * pull, duration: 0.3, ease: 'power2.out' });
          }
        };
        const onElLeave = () => {
          gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
        };
        el.addEventListener('mousemove', onElMove);
        el.addEventListener('mouseleave', onElLeave);
      });
    };

    bindMagnetic();
    const observer = new MutationObserver(bindMagnetic);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout',  onMouseOut);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Inner dot — fast */}
      <div
        ref={dotRef}
        aria-hidden
        style={{
          display: 'none',
          position: 'fixed',
          top: 0, left: 0,
          width: 8, height: 8,
          borderRadius: '50%',
          background: 'var(--neon-cyan)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 9999,
          boxShadow: 'var(--glow-cyan)',
        }}
      />
      {/* Trail — slow, gradient glow */}
      <div
        ref={trailRef}
        aria-hidden
        style={{
          display: 'none',
          position: 'fixed',
          top: 0, left: 0,
          width: 32, height: 32,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,229,255,0.4) 0%, rgba(255,46,147,0.2) 50%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 9998,
          opacity: 0.5,
          filter: 'blur(6px)',
        }}
      />
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/cursor/GlowTrailCursor.tsx
git commit -m "feat: GlowTrailCursor (Wow #2) — glow trail + magnetic UI"
```

---

## Task 19: PhotoMosaic

**Files:**
- Create: `src/components/home/PhotoMosaic.tsx`

CSS `columns` masonry, click-to-lightbox, neon borders.

- [ ] **Step 1: Create `PhotoMosaic.tsx`**

```tsx
// src/components/home/PhotoMosaic.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Eyebrow }   from '@/components/ui/Eyebrow';

// Placeholder gallery images — replace with real Yelp/Instagram photos before launch
const GALLERY_IMAGES = [
  { src: '/gallery/photo-01.webp', alt: 'Kids gaming in neon-lit lounge',          aspect: 'landscape' },
  { src: '/gallery/photo-02.webp', alt: 'Birthday party group celebrating',          aspect: 'portrait'  },
  { src: '/gallery/photo-03.webp', alt: 'VR experience in action',                   aspect: 'square'    },
  { src: '/gallery/photo-04.webp', alt: 'Outdoor movie night setup',                 aspect: 'landscape' },
  { src: '/gallery/photo-05.webp', alt: 'Party van exterior glowing',                aspect: 'portrait'  },
  { src: '/gallery/photo-06.webp', alt: 'Silent disco headphone dance party',        aspect: 'landscape' },
  { src: '/gallery/photo-07.webp', alt: 'After school club kids at consoles',        aspect: 'square'    },
  { src: '/gallery/photo-08.webp', alt: 'Birthday cake and gaming setup',            aspect: 'portrait'  },
  { src: '/gallery/photo-09.webp', alt: 'Competition stage with LED lighting',       aspect: 'landscape' },
];

export function PhotoMosaic() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <section className="py-[var(--section-gap)]" style={{ background: 'var(--bg-deep)' }}>
      <Container>
        <div className="text-center mb-12">
          <Eyebrow color="magenta" className="mb-3">Gallery</Eyebrow>
          <h2 className="font-display font-bold" style={{ fontSize: 'var(--text-display)', fontFamily: 'var(--font-clash), Georgia, serif' }}>
            The best parties glow
          </h2>
        </div>

        {/* CSS columns masonry */}
        <div
          className="columns-1 sm:columns-2 lg:columns-3 gap-4"
          style={{ columnGap: '1rem' }}
        >
          {GALLERY_IMAGES.map((img, i) => (
            <motion.figure
              key={img.src}
              className="break-inside-avoid mb-4 cursor-pointer group"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              viewport={{ once: true, amount: 0.15 }}
              onClick={() => setLightbox(i)}
            >
              <div className="relative overflow-hidden rounded-xl border border-white/5 group-hover:border-[var(--neon-magenta)] transition-colors duration-300">
                <div style={{ aspectRatio: img.aspect === 'portrait' ? '3/4' : img.aspect === 'square' ? '1/1' : '16/9' }}>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    loading="lazy"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                {/* Hover glow overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(to top, rgba(255,46,147,0.15) 0%, transparent 60%)' }} />
              </div>
            </motion.figure>
          ))}
        </div>
      </Container>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center"
          style={{ background: 'rgba(10,6,18,0.95)', backdropFilter: 'blur(8px)' }}
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 text-[var(--text-dim)] hover:text-[var(--text-light)] transition-colors"
            onClick={() => setLightbox(null)}
            aria-label="Close lightbox"
          >
            <X size={28} />
          </button>
          <div className="relative max-w-4xl max-h-[85vh] mx-4" onClick={e => e.stopPropagation()}>
            <Image
              src={GALLERY_IMAGES[lightbox].src}
              alt={GALLERY_IMAGES[lightbox].alt}
              width={1200} height={900}
              className="object-contain rounded-xl max-h-[85vh]"
            />
          </div>
        </div>
      )}
    </section>
  );
}
```

- [ ] **Step 2: Create placeholder gallery images**

```bash
mkdir public/gallery
# Create placeholder WebP files for photo-01.webp through photo-09.webp
# Replace with real venue photography before launch
```

- [ ] **Step 3: Commit**

```bash
git add src/components/home/PhotoMosaic.tsx public/gallery/
git commit -m "feat: PhotoMosaic gallery with lightbox and CSS masonry"
```

---

## Task 20: TestimonialMarquee

**Files:**
- Create: `src/components/home/TestimonialMarquee.tsx`

CSS keyframe only — NEVER Framer Motion (causes 5000px mobile layout break).

- [ ] **Step 1: Create `TestimonialMarquee.tsx`**

```tsx
// src/components/home/TestimonialMarquee.tsx
import { TESTIMONIALS } from '@/lib/data/testimonials';
import { Container }   from '@/components/ui/Container';
import { Eyebrow }     from '@/components/ui/Eyebrow';
import { Star }        from 'lucide-react';

function TestimonialCard({ t }: { t: typeof TESTIMONIALS[0] }) {
  return (
    <div
      className="flex-shrink-0 w-80 p-5 mx-3 rounded-2xl border border-white/5 bg-[var(--bg-elevated)]"
    >
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={12} fill="var(--neon-cyan)" color="var(--neon-cyan)" />
        ))}
      </div>
      <p className="text-sm text-[var(--text-dim)] leading-relaxed mb-4">"{t.text}"</p>
      <div>
        <p className="text-sm font-semibold text-[var(--text-light)]">{t.name}</p>
        <p className="text-xs text-[var(--text-dim)]">{t.role}</p>
      </div>
    </div>
  );
}

export function TestimonialMarquee() {
  // Triple array for seamless -33.3% loop
  const tripled = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="py-[var(--section-gap)] overflow-clip" style={{ background: 'var(--bg-deep)' }}>
      <Container>
        <div className="text-center mb-12">
          <Eyebrow color="cyan" className="mb-3">Reviews</Eyebrow>
          <h2 className="font-display font-bold" style={{ fontSize: 'var(--text-display)', fontFamily: 'var(--font-clash), Georgia, serif' }}>
            5.0 stars, every time
          </h2>
        </div>
      </Container>

      {/* Edge fades */}
      <div className="relative" style={{ overflow: 'clip' }}>
        <div aria-hidden className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, var(--bg-deep), transparent)' }} />
        <div aria-hidden className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, var(--bg-deep), transparent)' }} />

        {/* CSS marquee — width: max-content, -33.333% because 3x array */}
        <div
          style={{
            display: 'flex',
            width: 'max-content',
            animation: 'marqueeScroll 50s linear infinite',
          }}
        >
          {tripled.map((t, i) => (
            <TestimonialCard key={`${t.id}-${i}`} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/home/TestimonialMarquee.tsx
git commit -m "feat: TestimonialMarquee — CSS keyframe scroll (no Framer Motion)"
```

---

## Task 21: Remaining Home Sections

**Files:**
- Create: `src/components/home/PackagesTeaser.tsx`
- Create: `src/components/home/BirthdaySpotlight.tsx`
- Create: `src/components/home/AboutTeaser.tsx`
- Create: `src/components/home/FaqSnippet.tsx`
- Create: `src/components/home/CtaBand.tsx`

- [ ] **Step 1: Create `PackagesTeaser.tsx`**

```tsx
// src/components/home/PackagesTeaser.tsx
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { PACKAGES } from '@/lib/data/packages';
import { Container } from '@/components/ui/Container';
import { Eyebrow }   from '@/components/ui/Eyebrow';

export function PackagesTeaser() {
  return (
    <section className="py-[var(--section-gap)]" style={{ background: 'var(--bg-elevated)' }}>
      <Container>
        <div className="text-center mb-14">
          <Eyebrow color="magenta" className="mb-3">Packages</Eyebrow>
          <h2 className="font-display font-bold" style={{ fontSize: 'var(--text-display)', fontFamily: 'var(--font-clash), Georgia, serif' }}>
            Choose your glow level
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PACKAGES.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true, amount: 0.15 }}
              className={[
                'relative rounded-2xl border p-6 flex flex-col',
                pkg.highlight
                  ? 'border-[var(--neon-magenta)] bg-[var(--bg-deep)]'
                  : 'border-white/5 bg-[var(--bg-deep)]',
              ].join(' ')}
            >
              {pkg.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs px-3 py-1 rounded-full font-semibold text-white"
                  style={{ background: 'var(--neon-magenta)' }}>
                  Most Popular
                </div>
              )}
              <h3 className="font-display font-bold text-xl mb-1">{pkg.name}</h3>
              <p className="text-sm text-[var(--text-dim)] mb-4">{pkg.tagline}</p>
              <p className="font-bold text-2xl mb-6" style={{ color: pkg.highlight ? 'var(--neon-magenta)' : 'var(--neon-cyan)' }}>
                {pkg.priceFrom}
              </p>
              <ul className="space-y-2 mb-8 flex-1">
                {pkg.includes.map(item => (
                  <li key={item} className="flex gap-2 text-sm text-[var(--text-dim)]">
                    <Check size={14} className="shrink-0 mt-0.5" style={{ color: pkg.highlight ? 'var(--neon-magenta)' : 'var(--neon-cyan)' }} />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href={`/birthday-parties#${pkg.id}`}
                className="mt-auto block text-center py-3 rounded-xl text-sm font-semibold border transition-all"
                style={pkg.highlight ? {
                  background: 'var(--neon-magenta)', color: '#fff', borderColor: 'var(--neon-magenta)'
                } : {
                  borderColor: 'rgba(255,255,255,0.15)', color: 'var(--text-light)'
                }}
                data-magnetic
              >
                Book this package
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Create `BirthdaySpotlight.tsx`**

```tsx
// src/components/home/BirthdaySpotlight.tsx
import Link from 'next/link';
import { Container } from '@/components/ui/Container';

export function BirthdaySpotlight() {
  return (
    <section
      className="py-20 relative overflow-clip"
      style={{ background: 'var(--bg-deep)' }}
    >
      {/* Radial glow — no hard-edge blur blob (per PREMIUM_STACK) */}
      <div aria-hidden className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 50%, rgba(255,46,147,0.06) 0%, transparent 65%)' }} />

      <Container size="narrow">
        <div className="text-center">
          <p className="text-5xl mb-6" aria-hidden>🎂</p>
          <h2 className="font-display font-bold italic mb-4"
            style={{ fontSize: 'var(--text-display)', fontFamily: 'var(--font-clash), Georgia, serif', color: 'var(--neon-magenta)' }}>
            Make their birthday unforgettable
          </h2>
          <p className="text-[var(--text-dim)] mb-8 text-lg leading-relaxed">
            Santa Clarita's most exciting birthday party venue. From small groups to big celebrations — we've hosted 1,000+ parties and counting.
          </p>
          <Link
            href="/birthday-parties"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white transition-all hover:scale-105"
            style={{ background: 'linear-gradient(135deg, var(--neon-magenta), var(--neon-violet))' }}
            data-magnetic
          >
            Plan your birthday party →
          </Link>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 3: Create `AboutTeaser.tsx`**

```tsx
// src/components/home/AboutTeaser.tsx
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Eyebrow }   from '@/components/ui/Eyebrow';

export function AboutTeaser() {
  return (
    <section className="py-[var(--section-gap)]" style={{ background: 'var(--bg-light)' }}>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden order-2 lg:order-1">
            <Image
              src="/about/owner-team.webp"
              alt="Glowhouse Gaming team"
              fill
              loading="lazy"
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Add placeholder image at public/about/owner-team.webp before launch */}
          </div>

          {/* Text */}
          <div className="order-1 lg:order-2">
            <Eyebrow color="violet" className="mb-3">Our Story</Eyebrow>
            <h2
              className="font-display font-bold mb-5"
              style={{ fontSize: 'var(--text-h2)', fontFamily: 'var(--font-clash), Georgia, serif', color: 'var(--text-dark)' }}
            >
              Born in Santa Clarita. Powered by passion.
            </h2>
            <p className="text-[var(--text-dark)] opacity-70 leading-relaxed mb-4">
              Since 2017, Glowhouse Gaming has been making moments — birthday parties, corporate events, after-school afternoons, and everything in between. We started with one lounge and a simple belief: entertainment should feel electric.
            </p>
            <p className="text-[var(--text-dark)] opacity-70 leading-relaxed mb-8">
              Every party gets a dedicated host, a curated lineup, and our full attention. You celebrate. We handle the rest.
            </p>
            <Link href="/about" className="text-sm font-semibold underline underline-offset-4" style={{ color: 'var(--neon-violet)' }}>
              Meet the team →
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 4: Create `FaqSnippet.tsx`**

```tsx
// src/components/home/FaqSnippet.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Minus } from 'lucide-react';
import { FAQ_ITEMS, FAQ_HOME_IDS } from '@/lib/data/faq';
import { Container } from '@/components/ui/Container';
import { Eyebrow }   from '@/components/ui/Eyebrow';

export function FaqSnippet() {
  const [open, setOpen] = useState<string | null>(null);
  const items = FAQ_ITEMS.filter(f => FAQ_HOME_IDS.includes(f.id));

  return (
    <section className="py-[var(--section-gap)]" style={{ background: 'var(--bg-elevated)' }}>
      <Container size="narrow">
        <div className="text-center mb-12">
          <Eyebrow color="cyan" className="mb-3">FAQ</Eyebrow>
          <h2 className="font-display font-bold" style={{ fontSize: 'var(--text-h2)', fontFamily: 'var(--font-clash), Georgia, serif' }}>
            Parent questions, answered
          </h2>
        </div>

        <div className="space-y-3">
          {items.map(item => (
            <div key={item.id} className="border border-white/5 rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpen(o => o === item.id ? null : item.id)}
                className="w-full text-left px-6 py-4 flex items-center justify-between gap-4"
                aria-expanded={open === item.id}
              >
                <span className="font-medium text-[var(--text-light)] text-sm sm:text-base">{item.question}</span>
                {open === item.id ? <Minus size={16} className="shrink-0 text-[var(--neon-cyan)]" /> : <Plus size={16} className="shrink-0 text-[var(--text-dim)]" />}
              </button>
              {open === item.id && (
                <div className="px-6 pb-5 text-sm text-[var(--text-dim)] leading-relaxed border-t border-white/5">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/contact#faq" className="text-sm text-[var(--neon-cyan)] hover:opacity-80 transition-opacity">
            See all FAQ →
          </Link>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 5: Create `CtaBand.tsx`**

```tsx
// src/components/home/CtaBand.tsx
import Link from 'next/link';
import { Phone } from 'lucide-react';
import { Container } from '@/components/ui/Container';

export function CtaBand() {
  return (
    <section
      className="py-24 relative overflow-clip"
      style={{ background: 'var(--bg-deep)' }}
    >
      {/* Radial glow — no blur blob */}
      <div aria-hidden className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 50%, rgba(0,229,255,0.07) 0%, transparent 65%)' }} />

      {/* Neon top border */}
      <div aria-hidden className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, var(--neon-cyan), var(--neon-magenta), transparent)' }} />

      <Container size="narrow">
        <div className="text-center">
          <h2
            className="font-display font-bold italic mb-4"
            style={{ fontSize: 'var(--text-display)', fontFamily: 'var(--font-clash), Georgia, serif' }}
          >
            Ready to glow?
          </h2>
          <p className="text-[var(--text-dim)] text-lg mb-10">
            Book your party in 60 seconds. We'll take care of the rest.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/book"
              className="px-10 py-4 rounded-full font-bold text-white text-base transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, var(--neon-cyan), var(--neon-violet))' }}
              data-magnetic
            >
              Book a Party Now
            </Link>
            <a
              href="tel:+18553484569"
              className="flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm border border-white/15 text-[var(--text-dim)] hover:text-[var(--text-light)] hover:border-white/30 transition-all"
            >
              <Phone size={16} />
              (855) 348-4569
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 6: Commit all sections**

```bash
git add src/components/home/PackagesTeaser.tsx src/components/home/BirthdaySpotlight.tsx src/components/home/AboutTeaser.tsx src/components/home/FaqSnippet.tsx src/components/home/CtaBand.tsx
git commit -m "feat: home page sections — packages, birthday spotlight, about teaser, FAQ, CTA band"
```

---

## Task 22: Placeholder Images

Before assembling the home page, ensure public dirs exist:

- [ ] **Step 1: Create placeholder image directories**

```bash
mkdir -p public/hero public/gallery public/about
```

For development, add 1x1 dark WebP files at each path. Mark all with a `// REPLACE` comment in the component. Real photos sourced from their 68 Yelp photos + Instagram reels before launch.

Create a placeholder helper: any solid `#0A0612` background 1920×1080 WebP for hero, 800×600 for gallery.

```bash
# A minimal valid WebP can be any small file renamed — dev server won't break
# Lightbox, gallery, and hero will show dark placeholders until real photos added
```

---

## Task 23: Home Page Assembly

**Files:**
- Replace: `src/app/page.tsx`

- [ ] **Step 1: Replace `src/app/page.tsx` with full home page**

```tsx
// src/app/page.tsx
import type { Metadata } from 'next';
import { CinematicHero }              from '@/components/home/CinematicHero';
import { TrustStatStrip }             from '@/components/home/TrustStatStrip';
import { ServicesGrid }               from '@/components/home/ServicesGrid';
import { HorizontalServiceScrubber }  from '@/components/home/HorizontalServiceScrubber';
import { BirthdaySpotlight }          from '@/components/home/BirthdaySpotlight';
import { PackagesTeaser }             from '@/components/home/PackagesTeaser';
import { PhotoMosaic }                from '@/components/home/PhotoMosaic';
import { TestimonialMarquee }         from '@/components/home/TestimonialMarquee';
import { AboutTeaser }                from '@/components/home/AboutTeaser';
import { FaqSnippet }                 from '@/components/home/FaqSnippet';
import { CtaBand }                    from '@/components/home/CtaBand';

export const metadata: Metadata = {
  title: 'Glowhouse Gaming — Where Birthdays Go to Glow',
  description: 'Glow-in-the-dark gaming lounge, mobile party services, and after-school adventures in Santa Clarita, CA. 5.0★ rated. Book a birthday party today.',
  alternates: { canonical: 'https://www.glowhousegaming.com' },
};

export default function Home() {
  return (
    <>
      <CinematicHero />
      <TrustStatStrip />
      <ServicesGrid />
      <HorizontalServiceScrubber />
      <BirthdaySpotlight />
      <PackagesTeaser />
      <PhotoMosaic />
      <TestimonialMarquee />
      <AboutTeaser />
      <FaqSnippet />
      <CtaBand />
    </>
  );
}
```

- [ ] **Step 2: Run TypeScript check**

```bash
npx tsc --noEmit
```

Expected: 0 errors.

- [ ] **Step 3: Start dev server and run Playwright**

```bash
npm run dev
```

Create `tests/home.spec.ts`:

```ts
// tests/home.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
  test('hero renders with headline', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('glow');
  });

  test('date picker is present in hero', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('input[type="date"]')).toBeVisible();
  });

  test('services grid has 6 cards', async ({ page }) => {
    await page.goto('/');
    await page.locator('text=Pick your party').scrollIntoViewIfNeeded();
    const cards = page.locator('a[href^="/services#"]');
    await expect(cards).toHaveCount(6);
  });

  test('testimonial marquee is present', async ({ page }) => {
    await page.goto('/');
    await page.locator('text=5.0 stars, every time').scrollIntoViewIfNeeded();
    await expect(page.locator('text=5.0 stars, every time')).toBeVisible();
  });

  test('CTA band has Book a Party link', async ({ page }) => {
    await page.goto('/');
    const cta = page.locator('a[href="/book"]').last();
    await cta.scrollIntoViewIfNeeded();
    await expect(cta).toBeVisible();
  });

  test('no horizontal overflow on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    expect(bodyWidth).toBeLessThanOrEqual(376);
  });

  test('horizontal scrubber not present on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    // On mobile, scrubber section should be visible as vertical stack
    const mobileStack = page.locator('.md\\:hidden');
    await expect(mobileStack).toBeAttached();
  });
});
```

Run: `npm run test:e2e`
Expected: all 7 tests pass.

- [ ] **Step 4: Verify on desktop — scroll through full page**

Open http://localhost:3014 at 1280px width. Verify:
- Hero wordmark animation fires
- Scene cycle works (auto-advances every 4.5s)
- Headline words reveal sequentially
- Trust stats animate on scroll
- Horizontal scrubber advances on scroll (desktop)
- Testimonial marquee scrolls smoothly
- CTA band visible

- [ ] **Step 5: Deploy Phase 2 to Cloudflare and verify live**

```bash
npm run cf:build && npm run cf:deploy
```

Visit `https://glowhouse-gaming.marquestudio.workers.dev` and verify:
1. Hero looks identical to localhost (no image/font flash)
2. Marquee scrolls smoothly (not 5000px wide on mobile)
3. Open Chrome DevTools mobile emulation (375px) — no horizontal scroll
4. GSAP cursor visible on desktop, absent on touch simulation

Screenshot both mobile and desktop views. Confirm parity.

- [ ] **Step 6: Final Part 2 commit**

```bash
git add src/app/page.tsx tests/home.spec.ts
git commit -m "feat: home page assembly — all sections integrated, Playwright tests passing"
```

---

**Part 2 complete.** Home page live and validated on Cloudflare. Continue with:
`2026-05-06-glowhouse-gaming-part3.md` — Inner Pages → Booking → Chat → CMS → Deploy
