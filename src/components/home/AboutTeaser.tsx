import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Eyebrow }   from '@/components/ui/Eyebrow';

export function AboutTeaser() {
  return (
    <section className="py-[var(--section-gap)]" style={{ background: 'var(--bg-light)' }}>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden order-2 lg:order-1">
            <Image
              src="/gallery/photo-23.jpg"
              alt="Glowhouse Gaming team"
              fill
              loading="lazy"
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div className="order-1 lg:order-2">
            <Eyebrow color="violet" className="mb-3">Our Story</Eyebrow>
            <h2
              className="font-display font-bold mb-5"
              style={{ fontSize: 'var(--text-h2)', fontFamily: "'Clash Display', var(--font-clash), Georgia, serif", color: 'var(--text-dark)' }}
            >
              Born in Santa Clarita. Powered by passion.
            </h2>
            <p className="text-[var(--text-dark)] opacity-70 leading-relaxed mb-4">
              Since 2017, Glowhouse Gaming has been making moments — birthday parties, corporate events, after-school afternoons, and everything in between. We started with one lounge and a simple belief: entertainment should feel electric.
            </p>
            <p className="text-[var(--text-dark)] opacity-70 leading-relaxed mb-8">
              Every party gets a dedicated host, a curated lineup, and our full attention. You celebrate. We handle the rest.
            </p>
            <Link href="/about" className="text-sm font-semibold underline underline-offset-4" style={{ color: 'var(--neon-violet)' }}>
              Meet the team →
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
