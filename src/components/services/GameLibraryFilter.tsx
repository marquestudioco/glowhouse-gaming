'use client';

import { useState } from 'react';
import { GAMES, PLATFORM_LABELS, type GamePlatform } from '@/lib/data/games';
import { Container } from '@/components/ui/Container';
import { Eyebrow }   from '@/components/ui/Eyebrow';

const ALL_PLATFORMS: GamePlatform[] = ['ps5', 'switch', 'vr', 'party', 'family'];

export function GameLibraryFilter() {
  const [active, setActive] = useState<GamePlatform | 'all'>('all');

  const filtered = active === 'all' ? GAMES : GAMES.filter(g => g.platform.includes(active));

  return (
    <section className="py-[var(--section-gap)]" style={{ background: 'var(--bg-elevated)' }}>
      <Container>
        <div className="text-center mb-10">
          <Eyebrow color="cyan" className="mb-3">Game Library</Eyebrow>
          <h2 className="font-display font-bold" style={{ fontSize: 'var(--text-h2)', fontFamily: 'var(--font-clash), Georgia, serif' }}>
            What's in the lineup
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button
            onClick={() => setActive('all')}
            className={['px-4 py-1.5 rounded-full text-sm font-medium border transition-all',
              active === 'all' ? 'border-[var(--neon-cyan)] text-[var(--neon-cyan)] bg-[var(--neon-cyan)]/5' : 'border-white/10 text-[var(--text-dim)]',
            ].join(' ')}
          >
            All Games
          </button>
          {ALL_PLATFORMS.map(p => (
            <button
              key={p}
              onClick={() => setActive(p)}
              className={['px-4 py-1.5 rounded-full text-sm font-medium border transition-all',
                active === p ? 'border-[var(--neon-cyan)] text-[var(--neon-cyan)] bg-[var(--neon-cyan)]/5' : 'border-white/10 text-[var(--text-dim)]',
              ].join(' ')}
            >
              {PLATFORM_LABELS[p]}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtered.map(game => (
            <div
              key={game.id}
              className="p-3 rounded-xl border border-white/5 bg-[var(--bg-deep)] text-sm"
            >
              <p className="font-medium text-[var(--text-light)] mb-1">{game.name}</p>
              <div className="flex flex-wrap gap-1">
                {game.platform.slice(0, 2).map(p => (
                  <span key={p} className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/5 text-[var(--text-dim)]">
                    {PLATFORM_LABELS[p]}
                  </span>
                ))}
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/5 text-[var(--text-dim)]">
                  {game.ageRating}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
