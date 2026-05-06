import type { Metadata } from 'next';
import { PhotoMosaic } from '@/components/home/PhotoMosaic';
import { CtaBand }     from '@/components/home/CtaBand';
import { Container }   from '@/components/ui/Container';

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Photos and videos from Glowhouse Gaming parties, events, and experiences in Santa Clarita, CA.',
};

export default function GalleryPage() {
  return (
    <>
      <section className="pt-32 pb-4" style={{ background: 'var(--bg-deep)' }}>
        <Container size="narrow">
          <div className="text-center">
            <h1 className="font-display font-bold italic" style={{ fontSize: 'var(--text-display)', fontFamily: 'var(--font-clash), Georgia, serif' }}>
              The best parties glow
            </h1>
          </div>
        </Container>
      </section>
      <PhotoMosaic />
      <CtaBand />
    </>
  );
}
