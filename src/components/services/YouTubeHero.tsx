'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';

interface Props {
  videoId: string;
  thumbnail: string;
  accentHex: string;
  maxGuests: number;
  duration: string;
  indoor: boolean;
  mobileService: boolean;
}

export function YouTubeHero({ videoId, thumbnail, accentHex, maxGuests, duration, indoor, mobileService }: Props) {
  const [playing, setPlaying] = useState(false);

  return (
    <div
      className="relative rounded-2xl overflow-hidden"
      style={{
        aspectRatio: '16/9',
        boxShadow: `0 0 48px ${accentHex}22, 0 0 96px ${accentHex}0a, inset 0 0 0 1px ${accentHex}25`,
      }}
    >
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title="Service video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          style={{ border: 0 }}
        />
      ) : (
        <button
          className="absolute inset-0 w-full h-full group"
          onClick={() => setPlaying(true)}
          aria-label="Play video"
        >
          <Image
            src={thumbnail}
            alt="Video thumbnail"
            fill
            loading="lazy"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(to top, ${accentHex}60 0%, ${accentHex}10 40%, rgba(0,0,0,0.3) 100%)` }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="flex items-center justify-center w-16 h-16 rounded-full transition-all duration-300 group-hover:scale-110"
              style={{
                background: `linear-gradient(135deg, ${accentHex}, ${accentHex}bb)`,
                boxShadow: `0 0 32px ${accentHex}60, 0 0 64px ${accentHex}20`,
              }}
            >
              <Play size={24} fill="white" className="text-white ml-1" />
            </div>
          </div>

          {/* Stat badges */}
          <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5">
            <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-sm text-white border border-white/10">
              👥 Up to {maxGuests.toLocaleString()}
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-sm text-white border border-white/10">
              ⏱ {duration}
            </span>
            <span
              className="inline-flex items-center gap-1 text-[10px] font-medium px-2.5 py-1 rounded-full backdrop-blur-sm border"
              style={{ background: accentHex + '18', borderColor: accentHex + '40', color: accentHex }}
            >
              {indoor ? '🏠 Indoor' : '🌙 Outdoor'}{mobileService ? ' · 🚐 Mobile' : ''}
            </span>
          </div>
        </button>
      )}
    </div>
  );
}
