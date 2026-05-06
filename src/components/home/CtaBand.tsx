import Link from 'next/link';
import { Phone } from 'lucide-react';
import { Container } from '@/components/ui/Container';

export function CtaBand() {
  return (
    <section
      className="py-24 relative overflow-clip"
      style={{ background: 'var(--bg-deep)' }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 50%, rgba(0,229,255,0.07) 0%, transparent 65%)' }} />

      <div aria-hidden className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, var(--neon-cyan), var(--neon-magenta), transparent)' }} />

      <Container size="narrow">
        <div className="text-center">
          <h2
            className="font-display font-bold italic mb-4"
            style={{ fontSize: 'var(--text-display)', fontFamily: "'Clash Display', Georgia, serif" }}
          >
            Ready to glow?
          </h2>
          <p className="text-[var(--text-dim)] text-lg mb-10">
            Book your party in 60 seconds. We'll take care of the rest.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/book"
              className="px-10 py-4 rounded-full font-bold text-white text-base transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, var(--neon-cyan), var(--neon-violet))' }}
              data-magnetic
            >
              Book a Party Now
            </Link>
            <a
              href="tel:+18553484569"
              className="flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm border border-white/15 text-[var(--text-dim)] hover:text-[var(--text-light)] hover:border-white/30 transition-all"
            >
              <Phone size={16} />
              (855) 348-4569
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
