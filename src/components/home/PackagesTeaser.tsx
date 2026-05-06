'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { PACKAGES } from '@/lib/data/packages';
import { Container } from '@/components/ui/Container';
import { Eyebrow }   from '@/components/ui/Eyebrow';

export function PackagesTeaser() {
  return (
    <section className="py-[var(--section-gap)]" style={{ background: 'var(--bg-elevated)' }}>
      <Container>
        <div className="text-center mb-14">
          <Eyebrow color="magenta" className="mb-3">Packages</Eyebrow>
          <h2 className="font-display font-bold" style={{ fontSize: 'var(--text-display)', fontFamily: "'Clash Display', Georgia, serif" }}>
            Choose your glow level
          </h2>
          <p className="text-[var(--text-dim)] mt-3">All packages include setup, custom playlist, and LED lighting.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PACKAGES.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, amount: 0.15 }}
              className="relative rounded-2xl border p-7 flex flex-col transition-all duration-300"
              style={{
                borderColor: pkg.highlight ? 'var(--neon-magenta)' : 'rgba(255,255,255,0.06)',
                background: 'var(--bg-deep)',
                boxShadow: pkg.highlight ? '0 0 30px rgba(255,46,147,0.15), inset 0 0 30px rgba(255,46,147,0.03)' : 'none',
              }}
            >
              {pkg.highlight && (
                <div
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-xs px-4 py-1.5 rounded-full font-bold text-white"
                  style={{ background: 'var(--neon-magenta)', boxShadow: '0 0 10px rgba(255,46,147,0.5)' }}
                >
                  Most Popular
                </div>
              )}

              {/* Tier label */}
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] mb-2" style={{ color: pkg.highlight ? 'var(--neon-magenta)' : 'var(--neon-cyan)' }}>
                {pkg.tier}
              </p>

              <h3 className="font-display font-bold text-xl mb-1">{pkg.name}</h3>
              <p className="text-sm text-[var(--text-dim)] mb-5">{pkg.tagline}</p>

              <p className="font-bold text-3xl mb-7" style={{ color: pkg.highlight ? 'var(--neon-magenta)' : 'var(--neon-cyan)' }}>
                {pkg.priceFrom}
              </p>

              <ul className="space-y-2.5 mb-8 flex-1">
                {pkg.includes.map(item => (
                  <li key={item} className="flex gap-2.5 text-sm text-[var(--text-dim)]">
                    <Check size={14} className="shrink-0 mt-0.5" style={{ color: pkg.highlight ? 'var(--neon-magenta)' : 'var(--neon-cyan)' }} />
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href={`/birthday-parties#${pkg.id}`}
                className="mt-auto flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold border transition-all hover:gap-3"
                style={pkg.highlight ? {
                  background: 'var(--neon-magenta)',
                  color: '#fff',
                  borderColor: 'var(--neon-magenta)',
                  boxShadow: '0 0 15px rgba(255,46,147,0.3)',
                } : {
                  borderColor: 'rgba(255,255,255,0.12)',
                  color: 'var(--text-light)',
                }}
                data-magnetic
              >
                Book this package
                <ArrowRight size={13} />
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
