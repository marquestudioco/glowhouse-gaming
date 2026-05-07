'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Eyebrow }   from '@/components/ui/Eyebrow';

const VAN_IMAGES = [
  { src: '/gallery/photo-25.jpg', caption: 'The Party Van — fully lit and ready to roll up to your event' },
  { src: '/van/exterior.webp',    caption: 'Glowhouse Gaming party van with mounted entertainment screen' },
  { src: '/gallery/photo-16.jpg', caption: 'Your dedicated host keeps the energy high all night' },
  { src: '/gallery/photo-11.jpg', caption: 'Every Glowhouse event = unforgettable moments' },
];

export function PartyVanTour() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent(c => (c - 1 + VAN_IMAGES.length) % VAN_IMAGES.length);
  const next = () => setCurrent(c => (c + 1) % VAN_IMAGES.length);

  return (
    <section className="py-[var(--section-gap)]" style={{ background: 'var(--bg-deep)' }}>
      <Container size="narrow">
        <div className="text-center mb-10">
          <Eyebrow color="violet" className="mb-3">Party Van</Eyebrow>
          <h2 className="font-display font-bold" style={{ fontSize: 'var(--text-h2)', fontFamily: 'var(--font-clash), Georgia, serif' }}>
            See it in action
          </h2>
        </div>

        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-white/5">
          {VAN_IMAGES.map((img, i) => (
            <div
              key={img.src}
              className="absolute inset-0 transition-opacity duration-500"
              style={{ opacity: i === current ? 1 : 0 }}
            >
              <Image src={img.src} alt={img.caption} fill loading="lazy" className="object-cover" sizes="(max-width: 768px) 100vw, 700px" />
            </div>
          ))}
          <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all" aria-label="Previous">
            <ChevronLeft size={20} />
          </button>
          <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all" aria-label="Next">
            <ChevronRight size={20} />
          </button>
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-sm text-white text-center">
            {VAN_IMAGES[current].caption}
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-4">
          {VAN_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="rounded-full transition-all"
              style={{ width: i === current ? 20 : 8, height: 8, background: i === current ? 'var(--neon-violet)' : 'rgba(255,255,255,0.2)' }}
              aria-label={`Image ${i + 1}`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
