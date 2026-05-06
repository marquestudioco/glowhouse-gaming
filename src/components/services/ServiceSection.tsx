import Link from 'next/link';
import Image from 'next/image';
import { type Service } from '@/lib/data/services';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Container } from '@/components/ui/Container';

interface Props {
  service: Service;
  index: number;
}

export function ServiceSection({ service, index }: Props) {
  const isEven = index % 2 === 0;
  const color = service.accentColor === 'var(--neon-cyan)' ? 'cyan'
    : service.accentColor === 'var(--neon-magenta)' ? 'magenta' : 'violet';

  return (
    <section
      id={service.id}
      className="py-[var(--section-gap)] scroll-mt-20 border-b border-white/5"
      style={{ background: index % 2 === 0 ? 'var(--bg-deep)' : 'var(--bg-elevated)' }}
    >
      <Container>
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center`}>
          <div className={isEven ? '' : 'lg:order-2'}>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/5">
              <Image
                src={service.heroImage}
                alt={service.name}
                fill
                loading="lazy"
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          <div className={isEven ? '' : 'lg:order-1'}>
            <Eyebrow color={color} className="mb-3">{service.duration}</Eyebrow>
            <h2
              className="font-display font-bold mb-4"
              style={{ fontSize: 'var(--text-h2)', fontFamily: 'var(--font-clash), Georgia, serif', color: service.accentColor }}
            >
              {service.name}
            </h2>
            <p className="text-[var(--text-dim)] leading-relaxed mb-6">{service.description}</p>
            <ul className="grid grid-cols-2 gap-2 mb-8">
              {service.highlights.map(h => (
                <li key={h} className="flex items-center gap-2 text-sm text-[var(--text-dim)]">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: service.accentColor }} />
                  {h}
                </li>
              ))}
            </ul>
            <div className="flex gap-3 flex-wrap">
              <Link
                href={`/book?service=${service.id}`}
                className="px-6 py-3 rounded-full font-semibold text-sm text-white transition-all hover:opacity-90"
                style={{ background: service.accentColor }}
                data-magnetic
              >
                Book this service
              </Link>
              <a href="tel:+18553484569" className="px-6 py-3 rounded-full font-semibold text-sm border border-white/15 text-[var(--text-dim)] hover:text-[var(--text-light)] transition-all">
                Call (855) 348-4569
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
