import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Eyebrow }   from '@/components/ui/Eyebrow';
import { CtaBand }   from '@/components/home/CtaBand';

export const metadata: Metadata = {
  title: 'After School Club',
  description: 'Glowhouse Gaming After School Club in Santa Clarita — safe, supervised, and seriously fun. Mon–Fri program for school-age kids.',
};

export default function AfterSchoolClubPage() {
  return (
    <>
      <section className="pt-32 pb-20 min-h-[60svh] flex items-center" style={{ background: 'var(--bg-deep)' }}>
        <Container size="narrow">
          <div className="text-center">
            <Eyebrow color="violet" className="mb-4">After School Club</Eyebrow>
            <h1 className="font-display font-bold italic mb-5"
              style={{ fontSize: 'var(--text-display)', fontFamily: 'var(--font-clash), Georgia, serif' }}>
              The best part of their school day
            </h1>
            <p className="text-[var(--text-dim)] text-lg leading-relaxed mb-8 max-w-xl mx-auto">
              Structured after-school gaming Mon–Fri. Safe, supervised, and seriously fun for school-age kids in Santa Clarita.
            </p>
            <a
              href="https://www.ghgafterschoolclub.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, var(--neon-violet), var(--neon-magenta))' }}
              data-magnetic
            >
              Visit After School Club Site →
            </a>
            <p className="text-xs text-[var(--text-dim)] mt-4">
              Opens ghgafterschoolclub.com — enrollment, schedules, and pricing.
            </p>
          </div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
