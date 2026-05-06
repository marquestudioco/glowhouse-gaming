import Link from 'next/link';
import { Phone } from 'lucide-react';
import { Container } from '@/components/ui/Container';

export function CtaBand() {
  return (
    <section
      className="py-28 relative overflow-clip"
      style={{ background: 'var(--bg-deep)' }}
    >
      {/* Deep radial glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 90% 80% at 50% 50%, rgba(0,229,255,0.1) 0%, rgba(123,44,191,0.06) 40%, transparent 70%)' }} />

      {/* Animated top shimmer border */}
      <div aria-hidden className="absolute top-0 left-0 right-0 h-px overflow-hidden">
        <div style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, var(--neon-cyan), var(--neon-magenta), var(--neon-violet), var(--neon-cyan), transparent)',
          backgroundSize: '200% 100%',
          animation: 'neonShimmer 3s linear infinite',
        }} />
      </div>

      {/* Bottom shimmer border */}
      <div aria-hidden className="absolute bottom-0 left-0 right-0 h-px overflow-hidden">
        <div style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, var(--neon-violet), var(--neon-magenta), var(--neon-cyan), var(--neon-violet), transparent)',
          backgroundSize: '200% 100%',
          animation: 'neonShimmer 3s linear infinite reverse',
        }} />
      </div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          aria-hidden
          className="absolute rounded-full pointer-events-none"
          style={{
            width: [4, 6, 3, 5, 4, 6][i],
            height: [4, 6, 3, 5, 4, 6][i],
            left: `${[15, 30, 50, 65, 78, 88][i]}%`,
            bottom: `${[10, 20, 5, 15, 8, 25][i]}%`,
            background: ['var(--neon-cyan)', 'var(--neon-magenta)', 'var(--neon-violet)', 'var(--neon-cyan)', 'var(--neon-magenta)', 'var(--neon-violet)'][i],
            boxShadow: `0 0 8px currentColor`,
            animation: `floatUp ${[3.5, 4.2, 5, 3.8, 4.5, 3.2][i]}s ease-in-out ${[0, 0.8, 1.5, 0.4, 1.2, 2][i]}s infinite`,
          }}
        />
      ))}

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
              style={{
                background: 'linear-gradient(135deg, var(--neon-cyan), var(--neon-violet))',
                boxShadow: '0 0 30px rgba(0,229,255,0.25), 0 0 60px rgba(123,44,191,0.15)',
              }}
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
