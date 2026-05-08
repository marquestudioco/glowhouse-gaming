import Link from 'next/link';
import Image from 'next/image';
import { type Service } from '@/lib/data/services';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Container } from '@/components/ui/Container';
import { ServicePhotoGallery } from './ServicePhotoGallery';
import { YouTubeHero } from './YouTubeHero';


interface Props {
  service: Service;
  index: number;
}

function CheckIcon({ color }: { color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="8" fill={color} fillOpacity="0.15" />
      <path d="M5 8l2 2 4-4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ServiceSection({ service, index }: Props) {
  const isEven = index % 2 === 0;
  const color = service.accentColor === 'var(--neon-cyan)' ? 'cyan'
    : service.accentColor === 'var(--neon-magenta)' ? 'magenta' : 'violet';

  const accentHex = service.accentColor === 'var(--neon-cyan)'
    ? '#00E5FF'
    : service.accentColor === 'var(--neon-magenta)'
    ? '#FF2E93'
    : '#7B2CBF';

  const btnTextColor = accentHex === '#00E5FF' ? '#0A0612' : '#FFFFFF';
  return (
    <section
      id={service.id}
      className="py-[var(--section-gap)] scroll-mt-20 border-b border-white/5"
      style={{ background: index % 2 === 0 ? 'var(--bg-deep)' : 'var(--bg-elevated)' }}
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Hero: video player when available, otherwise hero image */}
          <div className={isEven ? '' : 'lg:order-2'}>
            {service.youtubeId ? (
              <YouTubeHero
                videoId={service.youtubeId}
                thumbnail={service.heroImage}
                accentHex={accentHex}
                maxGuests={service.maxGuests}
                duration={service.duration}
                indoor={service.indoor}
                mobileService={service.mobileService}
              />
            ) : (
              <div
                className="relative aspect-[4/3] rounded-2xl overflow-hidden"
                style={{
                  boxShadow: `0 0 48px ${accentHex}22, 0 0 96px ${accentHex}0a, inset 0 0 0 1px ${accentHex}25`,
                }}
              >
                <Image
                  src={service.heroImage}
                  alt={service.name}
                  fill
                  loading="lazy"
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: `linear-gradient(to top, ${accentHex}50 0%, ${accentHex}10 35%, transparent 60%)` }}
                />

                <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5">
                  <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-sm text-white border border-white/10">
                    👥 Up to {service.maxGuests.toLocaleString()}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-sm text-white border border-white/10">
                    ⏱ {service.duration}
                  </span>
                  <span
                    className="inline-flex items-center gap-1 text-[10px] font-medium px-2.5 py-1 rounded-full backdrop-blur-sm border"
                    style={{ background: accentHex + '18', borderColor: accentHex + '40', color: accentHex }}
                  >
                    {service.indoor ? '🏠 Indoor' : '🌙 Outdoor'}{service.mobileService ? ' · 🚐 Mobile' : ''}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Text */}
          <div className={isEven ? '' : 'lg:order-1'}>
            <Eyebrow color={color} className="mb-3">{service.tagline}</Eyebrow>

            <h2
              className="font-display font-bold mb-4"
              style={{
                fontSize: 'var(--text-h2)',
                fontFamily: 'var(--font-clash), Georgia, serif',
                color: service.accentColor,
                textShadow: `0 0 40px ${accentHex}40`,
              }}
            >
              {service.name}
            </h2>

            {/* Price callout */}
            {service.priceFrom && (
              <div
                className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full border text-sm"
                style={{ background: accentHex + '10', borderColor: accentHex + '30' }}
              >
                <span className="text-[var(--text-dim)]">Starting from</span>
                <span className="font-bold" style={{ color: service.accentColor }}>{service.priceFrom}</span>
              </div>
            )}

            <p className="text-[var(--text-dim)] leading-relaxed mb-6">{service.description}</p>

            <ul className="grid grid-cols-2 gap-2.5 mb-8">
              {service.highlights.map(h => (
                <li key={h} className="flex items-center gap-2 text-sm text-[var(--text-dim)]">
                  <CheckIcon color={accentHex} />
                  {h}
                </li>
              ))}
            </ul>

            <div className="flex gap-3 flex-wrap">
              <Link
                href={`/book?service=${service.id}`}
                className="px-6 py-3 rounded-full font-semibold text-sm transition-all hover:opacity-90 hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${accentHex}, ${accentHex}bb)`,
                  boxShadow: `0 0 20px ${accentHex}40`,
                  color: btnTextColor,
                }}
                data-magnetic
              >
                Book this service
              </Link>
              <a
                href="tel:+18553484569"
                className="px-6 py-3 rounded-full font-semibold text-sm border border-white/15 text-[var(--text-dim)] hover:text-[var(--text-light)] hover:border-white/30 transition-all"
              >
                Call (855) 348-4569
              </a>
            </div>
          </div>
        </div>

        {/* Photo gallery — thumbnails below */}
        {service.gallery && service.gallery.length > 0 && (
          <ServicePhotoGallery
            photos={service.gallery}
            accentColor={service.accentColor}
          />
        )}
      </Container>
    </section>
  );
}
