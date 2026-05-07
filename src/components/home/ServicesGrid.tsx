'use client';

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
              fontFamily: "'Clash Display', var(--font-clash), Georgia, serif",
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
                className="group block p-6 rounded-2xl border border-white/5 bg-[var(--bg-elevated)] transition-all duration-300"
                style={{
                  '--accent': service.accentColor,
                  transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.2s',
                } as React.CSSProperties}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = service.accentColor;
                  el.style.boxShadow = `0 0 20px ${service.accentColor}30, 0 0 40px ${service.accentColor}10`;
                  el.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = '';
                  el.style.boxShadow = '';
                  el.style.transform = '';
                }}
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
                <h3 className="font-semibold text-[var(--text-light)] text-base mb-1">
                  {service.name}
                </h3>
                <p className="text-sm text-[var(--text-dim)] leading-relaxed line-clamp-2">
                  {service.tagline}
                </p>
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
