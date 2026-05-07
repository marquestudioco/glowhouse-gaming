import type { Metadata } from 'next';
import { SERVICES }          from '@/lib/data/services';
import { ServiceSection }    from '@/components/services/ServiceSection';
import { ServiceAreaMap }    from '@/components/services/ServiceAreaMap';
import { GameLibraryFilter } from '@/components/services/GameLibraryFilter';
import { CtaBand }           from '@/components/home/CtaBand';
import { Container }         from '@/components/ui/Container';
import { Eyebrow }           from '@/components/ui/Eyebrow';

export const metadata: Metadata = {
  title: 'Services',
  description: '6 ways to glow in Santa Clarita: gaming lounge, VR rental, outdoor movies, party van, silent disco, and after-school club.',
};

const ICON_MAP: Record<string, string> = {
  'gaming-lounge':  '🎮',
  'vr-rental':      '🥽',
  'outdoor-movies': '🎬',
  'party-van':      '🚐',
  'silent-disco':   '🎧',
  'after-school':   '🏫',
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-clip" style={{ background: 'var(--bg-deep)' }}>
        <div aria-hidden className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,229,255,0.06) 0%, transparent 65%)' }} />

        <Container size="narrow">
          <div className="text-center mb-12">
            <Eyebrow color="cyan" className="mb-4">Services</Eyebrow>
            <h1
              className="font-display font-bold italic mb-4"
              style={{ fontSize: 'var(--text-display)', fontFamily: "'Clash Display', Georgia, serif" }}
            >
              6 Ways to Glow
            </h1>
            <p className="text-[var(--text-dim)] text-lg max-w-md mx-auto">
              Choose one. Mix and match. We make it easy.
            </p>
          </div>

          {/* Quick-jump nav */}
          <div className="flex flex-wrap justify-center gap-3">
            {SERVICES.map(service => (
              <a
                key={service.id}
                href={`#${service.id}`}
                className="flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all hover:scale-105"
                style={{
                  borderColor: service.accentColor + '40',
                  color: service.accentColor,
                  background: service.accentColor + '08',
                }}
              >
                <span aria-hidden>{ICON_MAP[service.id]}</span>
                {service.name}
              </a>
            ))}
          </div>
        </Container>
      </section>

      {SERVICES.map((service, i) => (
        <ServiceSection key={service.id} service={service} index={i} />
      ))}

      <GameLibraryFilter />
      <ServiceAreaMap />
      <CtaBand />
    </>
  );
}
