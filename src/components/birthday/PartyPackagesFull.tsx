import Link from 'next/link';
import { Check } from 'lucide-react';
import { PACKAGES } from '@/lib/data/packages';
import { Container } from '@/components/ui/Container';
import { Eyebrow }   from '@/components/ui/Eyebrow';

export function PartyPackagesFull() {
  return (
    <section id="packages" className="py-[var(--section-gap)] scroll-mt-16" style={{ background: 'var(--bg-elevated)' }}>
      <Container>
        <div className="text-center mb-14">
          <Eyebrow color="magenta" className="mb-3">Packages</Eyebrow>
          <h2 className="font-display font-bold" style={{ fontSize: 'var(--text-display)', fontFamily: 'var(--font-clash), Georgia, serif' }}>
            Choose your glow level
          </h2>
          <p className="text-[var(--text-dim)] mt-3 max-w-lg mx-auto">
            All packages include game setup, breakdown, custom playlist, and LED party lighting. Hours: Mon–Sun 8 AM–7 PM.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              id={pkg.id}
              className={['relative rounded-2xl border p-8 flex flex-col scroll-mt-20',
                pkg.highlight ? 'border-[var(--neon-magenta)]' : 'border-white/5',
              ].join(' ')}
              style={{ background: 'var(--bg-deep)' }}
            >
              {pkg.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-xs px-4 py-1 rounded-full font-bold text-white" style={{ background: 'var(--neon-magenta)' }}>
                  Most Popular
                </div>
              )}
              <p className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: pkg.highlight ? 'var(--neon-magenta)' : 'var(--neon-cyan)' }}>
                {pkg.tier}
              </p>
              <h3 className="font-bold text-2xl text-[var(--text-light)] mb-1">{pkg.name}</h3>
              <p className="text-sm text-[var(--text-dim)] mb-4">{pkg.tagline}</p>
              <p className="font-bold text-3xl mb-6" style={{ color: pkg.highlight ? 'var(--neon-magenta)' : 'var(--neon-cyan)' }}>
                {pkg.priceFrom}
              </p>
              <ul className="space-y-3 mb-8 flex-1">
                {pkg.includes.map(item => (
                  <li key={item} className="flex gap-3 text-sm text-[var(--text-dim)]">
                    <Check size={15} className="shrink-0 mt-0.5" style={{ color: pkg.highlight ? 'var(--neon-magenta)' : 'var(--neon-cyan)' }} />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href={`/book?package=${pkg.id}`}
                className="block text-center py-3.5 rounded-xl font-semibold text-sm transition-all border"
                style={pkg.highlight
                  ? { background: 'var(--neon-magenta)', color: '#fff', borderColor: 'var(--neon-magenta)' }
                  : { borderColor: 'rgba(255,255,255,0.15)', color: 'var(--text-light)' }}
                data-magnetic
              >
                Book {pkg.name}
              </Link>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-[var(--text-dim)] mt-6">
          *Pricing subject to change. Contact us at (855) 348-4569 for current rates.
        </p>
      </Container>
    </section>
  );
}
