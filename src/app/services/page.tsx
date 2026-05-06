import type { Metadata } from 'next';
import { SERVICES }          from '@/lib/data/services';
import { ServiceSection }    from '@/components/services/ServiceSection';
import { ServiceAreaMap }    from '@/components/services/ServiceAreaMap';
import { GameLibraryFilter } from '@/components/services/GameLibraryFilter';
import { PartyVanTour }      from '@/components/services/PartyVanTour';
import { CtaBand }           from '@/components/home/CtaBand';
import { Container }         from '@/components/ui/Container';

export const metadata: Metadata = {
  title: 'Services',
  description: '6 ways to glow in Santa Clarita: gaming lounge, VR rental, outdoor movies, party van, silent disco, and after-school club.',
};

export default function ServicesPage() {
  return (
    <>
      <section className="pt-32 pb-16" style={{ background: 'var(--bg-deep)' }}>
        <Container size="narrow">
          <div className="text-center">
            <h1 className="font-display font-bold italic" style={{ fontSize: 'var(--text-display)', fontFamily: 'var(--font-clash), Georgia, serif' }}>
              6 Ways to Glow
            </h1>
            <p className="text-[var(--text-dim)] mt-4 text-lg">Choose one. Mix and match. We make it easy.</p>
          </div>
        </Container>
      </section>

      {SERVICES.map((service, i) => (
        <ServiceSection key={service.id} service={service} index={i} />
      ))}

      <GameLibraryFilter />
      <PartyVanTour />
      <ServiceAreaMap />
      <CtaBand />
    </>
  );
}
