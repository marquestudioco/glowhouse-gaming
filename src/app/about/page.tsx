import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Zap, Shield, Star } from 'lucide-react';
import { Container }          from '@/components/ui/Container';
import { Eyebrow }            from '@/components/ui/Eyebrow';
import { CtaBand }            from '@/components/home/CtaBand';
import { TestimonialMarquee } from '@/components/home/TestimonialMarquee';

export const metadata: Metadata = {
  title: 'Our Story',
  description: 'About Glowhouse Gaming — born in Santa Clarita in 2017, 1,000+ parties hosted, 5.0★ rated entertainment company.',
};

const STATS = [
  { value: '2017', label: 'Founded' },
  { value: '1,000+', label: 'Parties hosted' },
  { value: '5.0★', label: 'Yelp rating' },
  { value: '6', label: 'Services' },
];

const VALUES = [
  {
    icon: Zap,
    title: 'Electric energy',
    desc: 'Every event should feel alive. We obsess over the atmosphere so your guests never want to leave.',
    color: 'var(--neon-cyan)',
  },
  {
    icon: Heart,
    title: 'Genuine care',
    desc: 'We live in Santa Clarita. These are our neighbors\' kids. We treat every party like it\'s our own.',
    color: 'var(--neon-magenta)',
  },
  {
    icon: Shield,
    title: 'Total reliability',
    desc: 'We show up on time, set up fully, and handle every detail. You celebrate — we handle the rest.',
    color: 'var(--neon-violet)',
  },
  {
    icon: Star,
    title: 'Constant improvement',
    desc: 'New games, new services, new ideas. We stay ahead so your next event is always better than the last.',
    color: 'var(--neon-cyan)',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero / Story */}
      <section className="pt-32 pb-20 relative overflow-clip" style={{ background: 'var(--bg-deep)' }}>
        <div aria-hidden className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 70% 50%, rgba(123,44,191,0.12) 0%, transparent 65%)' }} />
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative z-10">
              <Eyebrow color="violet" className="mb-4">Our Story</Eyebrow>
              <h1
                className="font-display font-bold mb-6"
                style={{ fontSize: 'var(--text-display)', fontFamily: "'Clash Display', var(--font-clash), Georgia, serif" }}
              >
                Born in Santa Clarita.<br />Powered by passion.
              </h1>
              <p className="text-[var(--text-dim)] leading-relaxed mb-4 text-lg">
                Glowhouse Gaming opened in 2017 with one mission: make group entertainment unforgettable. We started with a single lounge and a belief that the right atmosphere changes everything.
              </p>
              <p className="text-[var(--text-dim)] leading-relaxed mb-4">
                Since then, we've hosted over 1,000 parties, launched 6 distinct service lines, and expanded to cover the entire Santa Clarita Valley with mobile experiences. Every event gets our full attention — from the game lineup to the lighting.
              </p>
              <p className="text-[var(--text-dim)] leading-relaxed mb-8">
                Our team lives here. We know the valley, we know our clients, and we care deeply about every birthday, every corporate event, and every after-school afternoon we host.
              </p>
              <Link
                href="/book"
                className="inline-block px-8 py-3 rounded-full font-bold text-white transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, var(--neon-violet), var(--neon-magenta))', boxShadow: '0 0 20px rgba(123,44,191,0.4)' }}
                data-magnetic
              >
                Book with us
              </Link>
            </div>
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10" style={{ boxShadow: '0 0 48px rgba(123,44,191,0.15)' }}>
              <Image
                src="/gallery/photo-23.jpg"
                alt="Glowhouse Gaming team"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Stats bar */}
      <section className="py-12 border-y border-white/5" style={{ background: 'var(--bg-elevated)' }}>
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <p
                  className="font-display font-bold mb-1"
                  style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--neon-cyan)', fontFamily: "'Clash Display', var(--font-clash), Georgia, serif" }}
                >
                  {value}
                </p>
                <p className="text-xs uppercase tracking-widest text-[var(--text-dim)]">{label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="py-[var(--section-gap)]" style={{ background: 'var(--bg-deep)' }}>
        <Container>
          <div className="text-center mb-14">
            <Eyebrow color="cyan" className="mb-3">What We Believe</Eyebrow>
            <h2
              className="font-display font-bold"
              style={{ fontSize: 'var(--text-h2)', fontFamily: "'Clash Display', var(--font-clash), Georgia, serif" }}
            >
              Our values
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {VALUES.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="p-6 rounded-2xl border border-white/5 bg-[var(--bg-elevated)] flex gap-5">
                <div className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: color + '15' }}>
                  <Icon size={18} style={{ color }} />
                </div>
                <div>
                  <h3 className="font-bold text-[var(--text-light)] mb-2">{title}</h3>
                  <p className="text-sm text-[var(--text-dim)] leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <TestimonialMarquee />
      <CtaBand />
    </>
  );
}
