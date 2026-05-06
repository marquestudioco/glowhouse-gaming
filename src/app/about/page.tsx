import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Eyebrow }   from '@/components/ui/Eyebrow';
import { CtaBand }   from '@/components/home/CtaBand';
import { TestimonialMarquee } from '@/components/home/TestimonialMarquee';

export const metadata: Metadata = {
  title: 'Our Story',
  description: 'About Glowhouse Gaming — born in Santa Clarita in 2017, 1,000+ parties hosted, 5.0★ rated entertainment company.',
};

export default function AboutPage() {
  return (
    <>
      <section className="pt-32 pb-20" style={{ background: 'var(--bg-light)' }}>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <Eyebrow color="violet" className="mb-4">Our Story</Eyebrow>
              <h1 className="font-display font-bold mb-6" style={{ fontSize: 'var(--text-display)', fontFamily: 'var(--font-clash), Georgia, serif', color: 'var(--text-dark)' }}>
                Born in Santa Clarita. Powered by passion.
              </h1>
              <p className="text-[var(--text-dark)] opacity-70 leading-relaxed mb-4 text-lg">
                Glowhouse Gaming opened in 2017 with one mission: make group entertainment unforgettable. We started with a single lounge and a belief that the right atmosphere changes everything.
              </p>
              <p className="text-[var(--text-dark)] opacity-70 leading-relaxed mb-4">
                Since then, we've hosted over 1,000 parties, launched 5 distinct service lines, and expanded to cover the entire Santa Clarita Valley with mobile experiences. Every event gets our full attention — from the game lineup to the lighting.
              </p>
              <p className="text-[var(--text-dark)] opacity-70 leading-relaxed mb-8">
                Our team lives in Santa Clarita. We know the valley, we know our clients, and we care deeply about every birthday, every corporate event, and every after-school afternoon we host.
              </p>
              <Link href="/book" className="inline-block px-8 py-3 rounded-full font-bold text-white" style={{ background: 'var(--neon-violet)' }} data-magnetic>
                Book with us
              </Link>
            </div>
            <div className="relative aspect-square rounded-2xl overflow-hidden">
              <Image src="/about/owner-team.webp" alt="Glowhouse Gaming team" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
          </div>
        </Container>
      </section>
      <TestimonialMarquee />
      <CtaBand />
    </>
  );
}
