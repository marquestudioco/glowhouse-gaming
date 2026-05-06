'use client';

import { motion } from 'framer-motion';
import { CountUp } from '@/components/ui/CountUp';

const STATS = [
  { end: 2017, suffix: '',    label: 'Year founded',   display: '2017' },
  { end: 5,    suffix: '.0★', label: 'Yelp rating',    display: null },
  { end: 1000, suffix: '+',   label: 'Parties hosted', display: null },
  { end: 6,    suffix: '',    label: 'Ways to glow',   display: null },
];

export function TrustStatStrip() {
  return (
    <section className="py-10 border-y border-white/5" style={{ background: 'var(--bg-elevated)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <p
                className="font-display font-bold mb-1"
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  color: 'var(--neon-cyan)',
                  fontFamily: "'Clash Display', Georgia, serif",
                  textShadow: '0 0 20px rgba(0,229,255,0.3)',
                }}
              >
                {stat.display ?? (
                  <CountUp end={stat.end} suffix={stat.suffix} />
                )}
              </p>
              <p className="text-xs uppercase tracking-widest text-[var(--text-dim)]">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
