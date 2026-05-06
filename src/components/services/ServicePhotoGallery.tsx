'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

interface Props {
  photos: { src: string; alt: string }[];
  accentColor: string;
  label?: string;
}

const GRID_SIZE = 4;

export function ServicePhotoGallery({ photos, accentColor, label = 'Event Photos' }: Props) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const gridPhotos = photos.slice(0, GRID_SIZE);
  const overflow = photos.length - GRID_SIZE;

  const prev = () => setLightbox(i => (i === null ? null : (i - 1 + photos.length) % photos.length));
  const next = () => setLightbox(i => (i === null ? null : (i + 1) % photos.length));

  return (
    <>
      <div className="mt-10">
        <p className="text-xs uppercase tracking-[0.2em] mb-4" style={{ color: accentColor }}>
          {label}
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {gridPhotos.map((photo, i) => (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              viewport={{ once: true, amount: 0.15 }}
              className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group border border-white/5"
              style={{ transition: 'border-color 0.25s' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = accentColor + '60')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}
              onClick={() => setLightbox(i)}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                loading="lazy"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
              {i === GRID_SIZE - 1 && overflow > 0 ? (
                <div className="absolute inset-0 flex items-center justify-center bg-black/55">
                  <span className="text-white font-bold text-2xl">+{overflow}</span>
                </div>
              ) : (
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="p-1.5 rounded-full bg-black/60 backdrop-blur-sm text-white">
                    <ZoomIn size={12} />
                  </div>
                </div>
              )}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(to top, ${accentColor}18 0%, transparent 50%)` }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center"
          style={{ background: 'rgba(10,6,18,0.96)', backdropFilter: 'blur(10px)' }}
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 text-[var(--text-dim)] hover:text-[var(--text-light)] transition-colors z-10"
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            <X size={28} />
          </button>

          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 text-white hover:bg-black/80 transition-all z-10"
            onClick={e => { e.stopPropagation(); prev(); }}
            aria-label="Previous photo"
          >
            <ChevronLeft size={22} />
          </button>

          <div
            className="relative max-w-4xl max-h-[85vh] mx-16"
            onClick={e => e.stopPropagation()}
          >
            <Image
              src={photos[lightbox].src}
              alt={photos[lightbox].alt}
              width={1200}
              height={900}
              className="object-contain rounded-xl max-h-[85vh]"
            />
            <p className="text-center text-sm text-[var(--text-dim)] mt-3">
              {lightbox + 1} / {photos.length}
            </p>
          </div>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 text-white hover:bg-black/80 transition-all z-10"
            onClick={e => { e.stopPropagation(); next(); }}
            aria-label="Next photo"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      )}
    </>
  );
}
