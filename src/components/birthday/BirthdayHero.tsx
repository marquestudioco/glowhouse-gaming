import Link from 'next/link';
import Image from 'next/image';
import { Eyebrow } from '@/components/ui/Eyebrow';

export function BirthdayHero() {
  return (
    <section
      className="relative flex items-center min-h-[70svh] pt-24 pb-16"
      style={{ background: 'var(--bg-deep)', overflow: 'clip' }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 60% 80% at 70% 50%, rgba(255,46,147,0.08) 0%, transparent 65%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <Eyebrow color="magenta" className="mb-4">Birthday Parties</Eyebrow>
          <h1
            className="font-display font-bold italic mb-5"
            style={{ fontSize: 'var(--text-display)', fontFamily: 'var(--font-clash), Georgia, serif' }}
          >
            The birthday they'll never stop talking about
          </h1>
          <p className="text-[var(--text-dim)] text-lg leading-relaxed mb-8">
            Santa Clarita's most exciting birthday venue. Glow-in-the-dark gaming, dedicated birthday host, customized playlists, and an atmosphere that feels like nothing else in the Valley.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="#packages"
              className="px-8 py-4 rounded-full font-bold text-white text-center transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, var(--neon-magenta), var(--neon-violet))' }}
              data-magnetic
            >
              See Packages
            </Link>
            <Link href="/book" className="px-8 py-4 rounded-full font-semibold text-center border border-white/15 text-[var(--text-light)] hover:border-white/30 transition-all">
              Book Now
            </Link>
          </div>
          <div className="flex flex-wrap gap-4 mt-8 text-xs text-[var(--text-dim)]">
            <span>⭐ 5.0 Yelp rating</span>
            <span>🎂 1,000+ parties hosted</span>
            <span>🎮 Ages 6–adult</span>
            <span>📍 Santa Clarita, CA</span>
          </div>
        </div>

        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/5">
          <Image src="/birthday/hero.webp" alt="Birthday party at Glowhouse Gaming" fill loading="eager" className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
        </div>
      </div>
    </section>
  );
}
