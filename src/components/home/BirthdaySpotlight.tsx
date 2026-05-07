'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';

const BADGES = [
  '⭐ 5.0 Yelp Rating',
  '🎮 Ages 6–Adult',
  '🎂 1,000+ Parties',
  '📍 Santa Clarita',
];

export function BirthdaySpotlight() {
  return (
    <section
      className="py-28 relative overflow-clip"
      style={{ background: 'var(--bg-deep)' }}
    >
      {/* Dramatic background glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 70% 80% at 50% 50%, rgba(255,46,147,0.1) 0%, rgba(123,44,191,0.06) 40%, transparent 70%)' }} />

      {/* Neon ring accent */}
      <div aria-hidden className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 600, height: 600,
          borderRadius: '50%',
          border: '1px solid rgba(255,46,147,0.08)',
          boxShadow: 'inset 0 0 60px rgba(255,46,147,0.04), 0 0 60px rgba(255,46,147,0.04)',
        }} />
      <div aria-hidden className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 900, height: 900,
          borderRadius: '50%',
          border: '1px solid rgba(123,44,191,0.05)',
        }} />

      <Container size="narrow">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <Eyebrow color="magenta" className="mb-5">Birthday Parties</Eyebrow>

          <h2
            className="font-display font-bold italic mb-6"
            style={{
              fontSize: 'var(--text-display)',
              fontFamily: "'Clash Display', var(--font-clash), Georgia, serif",
              color: 'var(--neon-magenta)',
              textShadow: '0 0 40px rgba(255,46,147,0.4), 0 0 80px rgba(255,46,147,0.2)',
            }}
          >
            Make their birthday unforgettable
          </h2>

          <p className="text-[var(--text-dim)] mb-10 text-lg leading-relaxed max-w-lg mx-auto">
            Santa Clarita's most exciting birthday party venue. Glow-in-the-dark gaming, dedicated birthday host, and an atmosphere that feels like nothing else in the Valley.
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {BADGES.map((badge, i) => (
              <motion.span
                key={badge}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                viewport={{ once: true, amount: 0.5 }}
                className="text-xs px-4 py-2 rounded-full border font-medium"
                style={{ borderColor: 'rgba(255,46,147,0.25)', color: 'rgba(255,46,147,0.9)', background: 'rgba(255,46,147,0.05)' }}
              >
                {badge}
              </motion.span>
            ))}
          </div>

          <Link
            href="/birthday-parties"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full font-bold text-white transition-all hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, var(--neon-magenta), var(--neon-violet))',
              boxShadow: '0 0 30px rgba(255,46,147,0.35), 0 0 60px rgba(123,44,191,0.15)',
            }}
            data-magnetic
          >
            Plan your birthday party →
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
