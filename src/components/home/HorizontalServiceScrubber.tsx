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
  const color = service.accentColor === 'var(--neon-cyan)' ? 'cyan'
    : service.accentColor === 'var(--neon-magenta)' ? 'magenta' : 'violet';

  return (
    <div
      className="relative flex-shrink-0 flex flex-col justify-end"
      style={{ width: '100vw', height: '100vh', background: 'var(--bg-deep)' }}
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: BG_COLORS[service.id] }}
      />

      <div
        className="absolute top-10 right-10 font-mono text-xs tracking-widest"
        style={{ color: service.accentColor }}
        aria-hidden
      >
        {num} / {String(SERVICES.length).padStart(2, '0')}
      </div>

      <div className="relative z-10 px-8 sm:px-16 lg:px-24 pb-20 max-w-2xl">
        <Eyebrow color={color} className="mb-4">{num}</Eyebrow>
        <div className="text-6xl mb-6" aria-hidden>{ICON_MAP[service.id]}</div>
        <h2
          className="font-display font-bold mb-4"
          style={{
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            fontFamily: "'Clash Display', Georgia, serif",
            color: service.accentColor,
          }}
        >
          {service.name}
        </h2>
        <p className="text-lg text-[var(--text-dim)] leading-relaxed mb-6 max-w-md">
          {service.description}
        </p>
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

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
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
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
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

      <section className="md:hidden" aria-label="Explore our 6 services">
        {SERVICES.map((service, i) => (
          <ServicePanel key={service.id} service={service} index={i} />
        ))}
      </section>
    </>
  );
}
