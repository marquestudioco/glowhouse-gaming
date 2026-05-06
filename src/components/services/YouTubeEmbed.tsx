'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';

interface Props {
  videoId: string;
  title?: string;
  accentColor?: string;
}

export function YouTubeEmbed({ videoId, title = 'Watch the vibe', accentColor = 'var(--neon-magenta)' }: Props) {
  const [playing, setPlaying] = useState(false);
  const thumbSrc = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <div className="mt-10">
      <p className="text-xs uppercase tracking-[0.2em] mb-4" style={{ color: accentColor }}>
        {title}
      </p>
      <div
        className="relative w-full rounded-2xl overflow-hidden border border-white/5"
        style={{ aspectRatio: '16/9' }}
      >
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
            style={{ border: 0 }}
          />
        ) : (
          <button
            className="absolute inset-0 w-full h-full group"
            onClick={() => setPlaying(true)}
            aria-label={`Play: ${title}`}
          >
            <Image
              src={thumbSrc}
              alt={title}
              fill
              loading="lazy"
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 600px"
            />
            {/* Gradient overlay */}
            <div
              className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-80"
              style={{ background: 'linear-gradient(to top, rgba(10,6,18,0.7) 0%, rgba(10,6,18,0.2) 60%, transparent 100%)', opacity: 0.6 }}
            />
            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="flex items-center justify-center w-16 h-16 rounded-full transition-all duration-300 group-hover:scale-110"
                style={{
                  background: `linear-gradient(135deg, ${accentColor}, var(--neon-violet))`,
                  boxShadow: `0 0 32px ${accentColor}60, 0 0 64px ${accentColor}20`,
                }}
              >
                <Play size={24} fill="white" className="text-white ml-1" />
              </div>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
