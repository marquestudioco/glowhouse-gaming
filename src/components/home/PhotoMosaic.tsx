'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Eyebrow }   from '@/components/ui/Eyebrow';

const GALLERY_IMAGES = [
  // Lounge & gaming events — real Glowhouse photos
  { src: '/gallery/photo-10.jpg',  alt: 'Glowhouse Gaming team with branded LED headphones',            aspect: 'landscape' },
  { src: '/gallery/photo-14.jpg',  alt: 'Glowhouse Gaming lounge setup for Super Bowl Sunday',          aspect: 'landscape' },
  { src: '/gallery/photo-13.jpg',  alt: 'Guests wearing LED headphones at a silent disco event',         aspect: 'landscape' },
  { src: '/gallery/photo-12.jpg',  alt: 'Glow Squad LED headphones glowing red and blue in the dark',   aspect: 'portrait'  },
  { src: '/gallery/photo-19.jpg',  alt: 'Woman using VR headset at a Glowhouse Gaming event',           aspect: 'landscape' },
  { src: '/gallery/photo-25.jpg',  alt: 'Glowhouse Gaming party van at an outdoor night event',         aspect: 'landscape' },
  { src: '/gallery/photo-27.jpg',  alt: 'Outdoor backyard gaming party with screens and bean bags',     aspect: 'landscape' },
  { src: '/gallery/photo-11.jpg',  alt: 'Guests dancing and celebrating at a Glowhouse party',          aspect: 'landscape' },
  { src: '/gallery/photo-15.jpg',  alt: 'Professional DJ mixer with purple neon lighting',              aspect: 'portrait'  },
  { src: '/gallery/photo-18.jpg',  alt: 'Gaming with headphones in neon-lit Glowhouse lounge',         aspect: 'landscape' },
  { src: '/gallery/photo-24.jpg',  alt: 'Outdoor event setup with DJ tent and gaming screen',           aspect: 'landscape' },
  // Venue & atmosphere
  { src: '/gallery/photo-03.jpg',  alt: 'Glowhouse lounge — "it\'s a vibe" neon sign',                 aspect: 'landscape' },
  { src: '/gallery/photo-04.jpg',  alt: 'Glowhouse venue with projector and neon pink lighting',        aspect: 'landscape' },
  // Silent disco
  { src: '/silent-disco/photo-3.jpg', alt: 'Girl wearing Glow Squad silent disco headphones outdoors',  aspect: 'portrait'  },
  { src: '/silent-disco/photo-4.jpg', alt: 'Everyone dancing at a Glowhouse silent disco',              aspect: 'square'    },
  { src: '/silent-disco/photo-1.jpg', alt: 'Silent disco guests at the DJ setup',                       aspect: 'square'    },
  // Van & outdoor
  { src: '/gallery/photo-05.webp', alt: 'Glowhouse Gaming party van with outdoor screen',               aspect: 'landscape' },
  // VR
  { src: '/gallery/photo-20.jpg',  alt: 'Multiple guests experiencing VR headsets at a Glowhouse event', aspect: 'landscape' },
  { src: '/gallery/photo-16.jpg',  alt: 'Glowhouse Gaming host on mic with LED headphones at an event',  aspect: 'landscape' },
  { src: '/gallery/photo-29.jpg',  alt: 'Full room of guests dancing at a Glowhouse holiday party',      aspect: 'landscape' },
  { src: '/gallery/photo-01.webp', alt: 'Kid experiencing VR in neon pink light',                        aspect: 'portrait'  },
  // More events
  { src: '/gallery/photo-30.jpg',  alt: 'Owner dancing with guests at a Glowhouse holiday party',        aspect: 'landscape' },
  { src: '/gallery/photo-22.jpg',  alt: 'Glowhouse Gaming host on mic — Glowhouse logo sign behind',    aspect: 'landscape' },
  { src: '/outdoor/superbowl-setup.jpg', alt: 'Glowhouse outdoor Super Bowl event setup with big screen',        aspect: 'portrait'  },
  { src: '/gallery/photo-28.jpg',        alt: 'Outdoor Lakers-themed gaming party with inflatable seating',    aspect: 'landscape' },
  { src: '/gallery/photo-23.jpg',        alt: 'The Glowhouse Gaming team at a branded event',                  aspect: 'landscape' },
  { src: '/outdoor/movie-night.jpg',     alt: 'Glowhouse outdoor movie night — big screen, bean bags, and purple palm lighting', aspect: 'landscape' },
  { src: '/lounge/lounge-branded.jpg',   alt: 'Guests gaming at the Glowhouse Gaming lounge under the GG logo', aspect: 'landscape' },
  { src: '/lounge/glow-bar.jpg',         alt: 'Glowhouse Gaming branded photo wall and Glow Bar event setup',   aspect: 'landscape' },
];

export function PhotoMosaic({ showHeader = true }: { showHeader?: boolean }) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const prev = () => setLightbox(i => (i === null ? null : (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length));
  const next = () => setLightbox(i => (i === null ? null : (i + 1) % GALLERY_IMAGES.length));

  return (
    <section className="py-[var(--section-gap)]" style={{ background: 'var(--bg-deep)' }}>
      <Container>
        {showHeader && (
          <div className="text-center mb-12">
            <Eyebrow color="magenta" className="mb-3">Gallery</Eyebrow>
            <h2 className="font-display font-bold" style={{ fontSize: 'var(--text-display)', fontFamily: "'Clash Display', Georgia, serif" }}>
              The best parties glow
            </h2>
          </div>
        )}

        <div className="columns-1 sm:columns-2 lg:columns-3" style={{ columnGap: '1rem' }}>
          {GALLERY_IMAGES.map((img, i) => (
            <motion.figure
              key={img.src}
              className="break-inside-avoid mb-4 cursor-pointer group"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
              viewport={{ once: true, amount: 0.15 }}
              onClick={() => setLightbox(i)}
            >
              <div className="relative overflow-hidden rounded-xl border border-white/5 group-hover:border-[var(--neon-magenta)] transition-colors duration-300">
                <div style={{ aspectRatio: img.aspect === 'portrait' ? '3/4' : img.aspect === 'square' ? '1/1' : '16/9' }}>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    loading="lazy"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(to top, rgba(255,46,147,0.25) 0%, transparent 60%)' }}
                />
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                  <div className="p-2 rounded-full bg-black/60 backdrop-blur-sm text-white border border-white/20">
                    <ZoomIn size={14} />
                  </div>
                </div>
              </div>
            </motion.figure>
          ))}
        </div>
      </Container>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center"
          style={{ background: 'rgba(10,6,18,0.96)', backdropFilter: 'blur(10px)' }}
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 text-[var(--text-dim)] hover:text-[var(--text-light)] transition-colors z-10"
            onClick={() => setLightbox(null)}
            aria-label="Close lightbox"
          >
            <X size={28} />
          </button>

          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 text-white hover:bg-black/80 transition-all z-10 border border-white/10"
            onClick={e => { e.stopPropagation(); prev(); }}
            aria-label="Previous photo"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M13 4l-6 6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>

          <div
            className="relative max-w-4xl max-h-[85vh] mx-2 sm:mx-16"
            onClick={e => e.stopPropagation()}
          >
            <Image
              src={GALLERY_IMAGES[lightbox].src}
              alt={GALLERY_IMAGES[lightbox].alt}
              width={1200}
              height={900}
              className="object-contain rounded-xl max-h-[85vh]"
            />
            <p className="text-center text-xs text-[var(--text-dim)] mt-3 tracking-wider">
              {lightbox + 1} / {GALLERY_IMAGES.length}
            </p>
          </div>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 text-white hover:bg-black/80 transition-all z-10 border border-white/10"
            onClick={e => { e.stopPropagation(); next(); }}
            aria-label="Next photo"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      )}
    </section>
  );
}
