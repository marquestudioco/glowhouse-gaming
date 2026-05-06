import Link from 'next/link';
import { Container } from '@/components/ui/Container';

export function BirthdaySpotlight() {
  return (
    <section
      className="py-20 relative overflow-clip"
      style={{ background: 'var(--bg-deep)' }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 50%, rgba(255,46,147,0.06) 0%, transparent 65%)' }} />

      <Container size="narrow">
        <div className="text-center">
          <p className="text-5xl mb-6" aria-hidden>🎂</p>
          <h2 className="font-display font-bold italic mb-4"
            style={{ fontSize: 'var(--text-display)', fontFamily: "'Clash Display', Georgia, serif", color: 'var(--neon-magenta)' }}>
            Make their birthday unforgettable
          </h2>
          <p className="text-[var(--text-dim)] mb-8 text-lg leading-relaxed">
            Santa Clarita's most exciting birthday party venue. From small groups to big celebrations — we've hosted 1,000+ parties and counting.
          </p>
          <Link
            href="/birthday-parties"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white transition-all hover:scale-105"
            style={{ background: 'linear-gradient(135deg, var(--neon-magenta), var(--neon-violet))' }}
            data-magnetic
          >
            Plan your birthday party →
          </Link>
        </div>
      </Container>
    </section>
  );
}
