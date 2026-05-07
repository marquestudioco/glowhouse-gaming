import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Eyebrow }   from '@/components/ui/Eyebrow';

export function BirthdayHostCard() {
  return (
    <section className="py-[var(--section-gap)]" style={{ background: 'var(--bg-elevated)' }}>
      <Container size="narrow">
        <div className="text-center mb-10">
          <Eyebrow color="magenta" className="mb-3">Your Party Host</Eyebrow>
          <h2 className="font-display font-bold" style={{ fontSize: 'var(--text-h2)', fontFamily: 'var(--font-clash), Georgia, serif' }}>
            Meet your birthday guide
          </h2>
        </div>
        <div className="flex flex-col sm:flex-row gap-8 items-center bg-[var(--bg-deep)] rounded-2xl border border-white/5 p-8">
          <div className="relative w-32 h-32 rounded-full overflow-hidden shrink-0 border-2" style={{ borderColor: 'var(--neon-magenta)' }}>
            <Image src="/about/owner-team.webp" alt="Glowhouse Gaming team" fill className="object-cover object-top" />
          </div>
          <div>
            <h3 className="font-bold text-xl text-[var(--text-light)] mb-1">Your Party Host</h3>
            <p className="text-sm mb-3" style={{ color: 'var(--neon-magenta)' }}>Included in Premium & VIP packages</p>
            <p className="text-sm text-[var(--text-dim)] leading-relaxed">
              Every Premium and VIP party comes with a dedicated birthday host — a trained Glowhouse team member who coordinates the event, guides games, leads the celebration, and ensures every guest has an unforgettable time. You bring the guests. We bring the energy.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
