'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Eyebrow }   from '@/components/ui/Eyebrow';

const GALLERY_IMAGES = [
  { src: '/gallery/photo-01.webp', alt: 'Kid experiencing VR in neon pink light',         aspect: 'portrait'  },
  { src: '/gallery/photo-02.webp', alt: 'Group of kids gaming at neon-lit PC stations',   aspect: 'landscape' },
  { src: '/gallery/photo-03.jpg',  alt: 'Venue interior with pink neon "it\'s a vibe" sign', aspect: 'landscape' },
  { src: '/gallery/photo-04.jpg',  alt: 'Full party room setup — chairs, projector, neon lighting', aspect: 'landscape' },
  { src: '/gallery/photo-05.webp', alt: 'Glowhouse Gaming party van with outdoor screen', aspect: 'landscape' },
  { src: '/gallery/photo-06.jpg',  alt: 'Kid gaming with neon tube lights behind them',   aspect: 'portrait'  },
  { src: '/gallery/photo-07.jpg',  alt: 'Family enjoying gaming event together',          aspect: 'square'    },
  { src: '/gallery/photo-08.webp', alt: 'Birthday party cake and balloon decorations',    aspect: 'square'    },
  { src: '/gallery/photo-09.webp', alt: 'Kid playing games at Glowhouse Gaming lounge',  aspect: 'portrait'  },
];

export function PhotoMosaic() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <section className="py-[var(--section-gap)]" style={{ background: 'var(--bg-deep)' }}>
      <Container>
        <div className="text-center mb-12">
          <Eyebrow color="magenta" className="mb-3">Gallery</Eyebrow>
          <h2 className="font-display font-bold" style={{ fontSize: 'var(--text-display)', fontFamily: "'Clash Display', Georgia, serif" }}>
            The best parties glow
          </h2>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3" style={{ columnGap: '1rem' }}>
          {GALLERY_IMAGES.map((img, i) => (
            <motion.figure
              key={img.src}
              className="break-inside-avoid mb-4 cursor-pointer group"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
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
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(to top, rgba(255,46,147,0.2) 0%, transparent 60%)' }} />
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
          style={{ background: 'rgba(10,6,18,0.95)', backdropFilter: 'blur(8px)' }}
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 text-[var(--text-dim)] hover:text-[var(--text-light)] transition-colors"
            onClick={() => setLightbox(null)}
            aria-label="Close lightbox"
          >
            <X size={28} />
          </button>
          <div className="relative max-w-4xl max-h-[85vh] mx-4" onClick={e => e.stopPropagation()}>
            <Image
              src={GALLERY_IMAGES[lightbox].src}
              alt={GALLERY_IMAGES[lightbox].alt}
              width={1200} height={900}
              className="object-contain rounded-xl max-h-[85vh]"
            />
          </div>
        </div>
      )}
    </section>
  );
}
