import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Eyebrow }   from '@/components/ui/Eyebrow';

const GAMES = [
  { title: 'Fortnite',                     src: '/games/fortnite.jpg',         console: 'PS5' },
  { title: 'Mario Kart 8 Deluxe',          src: '/games/mario-kart.jpg',       console: 'Switch' },
  { title: 'Super Smash Bros. Ultimate',   src: '/games/smash-bros.jpg',       console: 'Switch' },
  { title: 'Mortal Kombat 11',             src: '/games/mortal-kombat.jpg',    console: 'PS5' },
  { title: 'GTA V',                        src: '/games/gta-v.jpg',            console: 'PS5' },
  { title: 'Borderlands 3',               src: '/games/borderlands-3.jpg',    console: 'PS5' },
  { title: 'Beat Saber',                   src: '/games/beat-saber.jpg',       console: 'VR' },
  { title: 'Animal Crossing',             src: '/games/animal-crossing.jpg',  console: 'Switch' },
  { title: 'Call of Duty: Modern Warfare', src: '/games/cod-mw.jpg',          console: 'PS5' },
  { title: 'Just Dance 2022',             src: '/games/just-dance.jpg',       console: 'Switch' },
  { title: 'Madden NFL',                   src: '/games/madden.jpg',           console: 'PS5' },
];

const CONSOLE_COLOR: Record<string, string> = {
  'PS5':    'var(--neon-cyan)',
  'Switch': 'var(--neon-magenta)',
  'VR':     'var(--neon-violet)',
};

export function FeaturedGames() {
  return (
    <section className="py-[var(--section-gap)]" style={{ background: 'var(--bg-elevated)' }}>
      <Container>
        <div className="text-center mb-12">
          <Eyebrow color="cyan" className="mb-3">Game Library</Eyebrow>
          <h2 className="font-display font-bold" style={{ fontSize: 'var(--text-display)', fontFamily: "'Clash Display', var(--font-clash), Georgia, serif" }}>
            Featured games
          </h2>
          <p className="text-[var(--text-dim)] mt-3">
            PS5 · Nintendo Switch · Xbox · VR — rotating catalog of 100+ titles.
          </p>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
          {GAMES.map((game) => (
            <div key={game.title} className="group relative">
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-white/5 group-hover:border-white/20 transition-colors duration-300">
                <Image
                  src={game.src}
                  alt={game.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 16vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(to top, rgba(10,6,18,0.85) 0%, transparent 60%)' }} />
                <div className="absolute bottom-0 left-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-[10px] font-semibold text-white leading-tight">{game.title}</p>
                </div>
              </div>
              <div className="absolute top-2 right-2">
                <span
                  className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                  style={{ background: CONSOLE_COLOR[game.console] + '22', color: CONSOLE_COLOR[game.console], border: `1px solid ${CONSOLE_COLOR[game.console]}44` }}
                >
                  {game.console}
                </span>
              </div>
            </div>
          ))}

          {/* +100 more card */}
          <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-white/10 flex flex-col items-center justify-center"
            style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(0,229,255,0.08) 0%, transparent 70%)' }}>
            <p className="font-display font-bold text-2xl" style={{ color: 'var(--neon-cyan)', fontFamily: "'Clash Display', var(--font-clash), Georgia, serif" }}>+100</p>
            <p className="text-[10px] text-[var(--text-dim)] text-center mt-1 px-2">more titles available</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
