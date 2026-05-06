import { TESTIMONIALS } from '@/lib/data/testimonials';
import { Container }   from '@/components/ui/Container';
import { Eyebrow }     from '@/components/ui/Eyebrow';
import { Star }        from 'lucide-react';

function TestimonialCard({ t }: { t: typeof TESTIMONIALS[0] }) {
  return (
    <div className="flex-shrink-0 w-80 p-5 mx-3 rounded-2xl border border-white/5 bg-[var(--bg-elevated)]">
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={12} fill="var(--neon-cyan)" color="var(--neon-cyan)" />
        ))}
      </div>
      <p className="text-sm text-[var(--text-dim)] leading-relaxed mb-4">"{t.text}"</p>
      <div>
        <p className="text-sm font-semibold text-[var(--text-light)]">{t.name}</p>
        <p className="text-xs text-[var(--text-dim)]">{t.role}</p>
      </div>
    </div>
  );
}

export function TestimonialMarquee() {
  const tripled = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="py-[var(--section-gap)] overflow-clip" style={{ background: 'var(--bg-deep)' }}>
      <Container>
        <div className="text-center mb-12">
          <Eyebrow color="cyan" className="mb-3">Reviews</Eyebrow>
          <h2 className="font-display font-bold" style={{ fontSize: 'var(--text-display)', fontFamily: "'Clash Display', Georgia, serif" }}>
            5.0 stars, every time
          </h2>
        </div>
      </Container>

      <div className="relative" style={{ overflow: 'clip' }}>
        <div aria-hidden className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, var(--bg-deep), transparent)' }} />
        <div aria-hidden className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, var(--bg-deep), transparent)' }} />

        <div
          className="marquee-track"
          style={{
            display: 'flex',
            width: 'max-content',
            animation: 'marqueeScroll 50s linear infinite',
          }}
        >
          {tripled.map((t, i) => (
            <TestimonialCard key={`${t.id}-${i}`} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
