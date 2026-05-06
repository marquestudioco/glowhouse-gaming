'use client';

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
          <h2 className="font-display font-bold" style={{ fontSize: 'var(--text-display)', fontFamily: "'Clash Display', Georgia, serif" }}>
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
                pkg.highlight ? 'border-[var(--neon-magenta)] bg-[var(--bg-deep)]' : 'border-white/5 bg-[var(--bg-deep)]',
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
