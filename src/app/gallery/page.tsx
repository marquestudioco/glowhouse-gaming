import type { Metadata } from 'next';
import { PhotoMosaic } from '@/components/home/PhotoMosaic';
import { CtaBand }     from '@/components/home/CtaBand';
import { Container }   from '@/components/ui/Container';
import { Eyebrow }     from '@/components/ui/Eyebrow';

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Photos and videos from Glowhouse Gaming parties, events, and experiences in Santa Clarita, CA.',
};

export default function GalleryPage() {
  return (
    <>
      <section className="pt-32 pb-12 relative overflow-clip" style={{ background: 'var(--bg-deep)' }}>
        <div aria-hidden className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255,46,147,0.06) 0%, transparent 65%)' }} />

        <Container size="narrow">
          <div className="text-center">
            <Eyebrow color="magenta" className="mb-4">Gallery</Eyebrow>
            <h1
              className="font-display font-bold italic mb-4"
              style={{
                fontSize: 'var(--text-display)',
                fontFamily: "'Clash Display', Georgia, serif",
                textShadow: '0 0 40px rgba(255,46,147,0.3)',
              }}
            >
              The best parties glow
            </h1>
            <p className="text-[var(--text-dim)] text-lg max-w-md mx-auto">
              Real moments from real Glowhouse parties. Browse the vibes and imagine your event here.
            </p>
          </div>
        </Container>
      </section>

      <PhotoMosaic />
      <CtaBand />
    </>
  );
}
