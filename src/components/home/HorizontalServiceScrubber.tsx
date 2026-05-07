'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SERVICES, type Service } from '@/lib/data/services';
import { Eyebrow } from '@/components/ui/Eyebrow';

const PANEL_PHOTOS: Record<string, string> = {
  'gaming-lounge':  '/ai/gaming-neon.png',
  'vr-rental':      '/ai/vr-neon.png',
  'outdoor-movies': '/ai/outdoor-neon.png',
  'party-van':      '/ai/partyvan-neon.png',
  'silent-disco':   '/ai/disco-teens.png',
  'after-school':   '/ai/afterschool-neon.png',
};

const BG_COLORS: Record<string, string> = {
  'gaming-lounge':  'radial-gradient(ellipse at 30% 50%, rgba(0,229,255,0.15) 0%, transparent 70%)',
  'vr-rental':      'radial-gradient(ellipse at 70% 40%, rgba(0,229,255,0.12) 0%, transparent 70%)',
  'outdoor-movies': 'radial-gradient(ellipse at 50% 60%, rgba(255,46,147,0.15) 0%, transparent 70%)',
  'party-van':      'radial-gradient(ellipse at 20% 50%, rgba(123,44,191,0.15) 0%, transparent 70%)',
  'silent-disco':   'radial-gradient(ellipse at 80% 30%, rgba(255,46,147,0.12) 0%, transparent 70%)',
  'after-school':   'radial-gradient(ellipse at 40% 60%, rgba(123,44,191,0.12) 0%, transparent 70%)',
};

const ICON_MAP: Record<string, string> = {
  'gaming-lounge':'🎮','vr-rental':'🥽','outdoor-movies':'🎬',
  'party-van':'🚐','silent-disco':'🎧','after-school':'🏫',
};

function ServicePanel({ service, index }: { service: Service; index: number }) {
  const num = String(index + 1).padStart(2, '0');
  const color = service.accentColor === 'var(--neon-cyan)' ? 'cyan'
    : service.accentColor === 'var(--neon-magenta)' ? 'magenta' : 'violet';

  return (
    <div
      className="relative flex-shrink-0 flex flex-col justify-center"
      style={{ width: '100vw', height: '100svh', background: 'var(--bg-deep)', overflow: 'clip' }}
    >
      {/* Real photo — right half, faded into bg */}
      <div aria-hidden className="absolute right-0 top-0 w-1/2 h-full pointer-events-none" style={{ opacity: 0.18 }}>
        <Image
          src={PANEL_PHOTOS[service.id]}
          alt=""
          fill
          className="object-cover"
          sizes="50vw"
          loading="lazy"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, var(--bg-deep) 0%, transparent 40%, transparent 100%)' }} />
      </div>

      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: BG_COLORS[service.id] }}
      />

      {/* Panel number */}
      <div
        className="absolute top-8 right-10 font-mono text-xs tracking-widest"
        style={{ color: service.accentColor, opacity: 0.7 }}
        aria-hidden
      >
        {num} / {String(SERVICES.length).padStart(2, '0')}
      </div>

      {/* Massive background number */}
      <div
        aria-hidden
        className="absolute right-0 top-1/2 -translate-y-1/2 font-display font-bold leading-none pointer-events-none select-none"
        style={{
          fontSize: 'clamp(12rem, 25vw, 22rem)',
          fontFamily: "'Clash Display', var(--font-clash), Georgia, serif",
          color: service.accentColor,
          opacity: 0.03,
          right: 0,
        }}
      >
        {num}
      </div>

      <div className="relative z-10 px-6 sm:px-16 lg:px-24 max-w-3xl">
        <Eyebrow color={color} className="mb-4 sm:mb-5">{service.tagline}</Eyebrow>

        <div className="text-5xl sm:text-7xl mb-4 sm:mb-6" aria-hidden>{ICON_MAP[service.id]}</div>

        <h2
          className="font-display font-bold mb-4 sm:mb-5"
          style={{
            fontSize: 'clamp(2rem, 6vw, 5rem)',
            fontFamily: "'Clash Display', var(--font-clash), Georgia, serif",
            color: service.accentColor,
            textShadow: `0 0 40px ${service.accentColor}60`,
            lineHeight: 1.05,
          }}
        >
          {service.name}
        </h2>

        <p className="text-base sm:text-xl text-[var(--text-dim)] leading-relaxed mb-6 sm:mb-8 max-w-lg">
          {service.description}
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mb-8 sm:mb-10">
          {service.highlights.slice(0, 4).map(h => (
            <span
              key={h}
              className="text-sm px-4 py-2 rounded-full border font-medium"
              style={{ borderColor: service.accentColor + '50', color: service.accentColor, background: service.accentColor + '08' }}
            >
              {h}
            </span>
          ))}
        </div>

        <Link
          href={`/book?service=${service.id}`}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-white text-sm transition-all hover:scale-105"
          style={{
            background: service.accentColor,
            boxShadow: `0 0 20px ${service.accentColor}40`,
          }}
          data-magnetic
        >
          Book this service →
        </Link>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(to right, transparent, ${service.accentColor}80, transparent)` }}
      />
    </div>
  );
}

export function HorizontalServiceScrubber() {
  const sectionRef  = useRef<HTMLElement>(null);
  const trackRef    = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const dotsRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section  = sectionRef.current;
    const track    = trackRef.current;
    const progress = progressRef.current;
    const dots     = dotsRef.current;
    if (!section || !track) return;

    if (window.matchMedia('(max-width: 767px)').matches) return;

    const onScroll = () => {
      const rect              = section.getBoundingClientRect();
      const sectionScrollDist = rect.height - window.innerHeight;
      const scrolled          = -rect.top;
      const p                 = Math.max(0, Math.min(1, scrolled / sectionScrollDist));
      const translateX        = p * (SERVICES.length - 1) * 100;
      track.style.transform   = `translateX(-${translateX}vw)`;

      if (progress) progress.style.width = `${p * 100}%`;

      if (dots) {
        const activeIndex = Math.round(p * (SERVICES.length - 1));
        dots.querySelectorAll<HTMLElement>('[data-dot]').forEach((dot, i) => {
          dot.style.background = i === activeIndex
            ? SERVICES[activeIndex].accentColor
            : 'rgba(255,255,255,0.2)';
          dot.style.width = i === activeIndex ? '24px' : '8px';
        });
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative hidden md:block"
        style={{ height: `${SERVICES.length * 100}svh` }}
        aria-label="Explore our 6 services"
      >
        <div className="sticky top-0 h-[100svh]" style={{ overflow: 'clip' }}>
          <div
            ref={trackRef}
            className="flex will-change-transform"
            style={{ width: `${SERVICES.length * 100}vw` }}
          >
            {SERVICES.map((service, i) => (
              <ServicePanel key={service.id} service={service} index={i} />
            ))}
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/5">
            <div
              ref={progressRef}
              className="h-full transition-none"
              style={{ background: 'linear-gradient(to right, var(--neon-cyan), var(--neon-magenta))', width: '0%' }}
            />
          </div>

          {/* Service dots */}
          <div
            ref={dotsRef}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2"
          >
            {SERVICES.map((_, i) => (
              <div
                key={i}
                data-dot
                className="rounded-full transition-all duration-300"
                style={{ width: i === 0 ? 24 : 8, height: 8, background: i === 0 ? SERVICES[0].accentColor : 'rgba(255,255,255,0.2)' }}
              />
            ))}
          </div>

          {/* Scroll hint on first view */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 opacity-40">
            <span className="text-[10px] uppercase tracking-widest text-[var(--text-dim)] [writing-mode:vertical-lr]">Scroll to explore</span>
            <svg width="16" height="32" viewBox="0 0 16 32" fill="none">
              <path d="M8 4v24M8 28l-4-4M8 28l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
      </section>

      <section className="md:hidden" aria-label="Explore our 6 services">
        {SERVICES.map((service, i) => (
          <ServicePanel key={service.id} service={service} index={i} />
        ))}
      </section>
    </>
  );
}
