import { TESTIMONIALS } from '@/lib/data/testimonials';
import { Container }   from '@/components/ui/Container';
import { Eyebrow }     from '@/components/ui/Eyebrow';
import { Star }        from 'lucide-react';

const SOURCE_LABEL: Record<string, string> = {
  yelp: 'Yelp',
  google: 'Google',
  facebook: 'Facebook',
};
const SOURCE_COLOR: Record<string, string> = {
  yelp: '#FF1A1A',
  google: '#4285F4',
  facebook: '#1877F2',
};

function TestimonialCard({ t }: { t: typeof TESTIMONIALS[0] }) {
  return (
    <div className="flex-shrink-0 w-[22rem] p-6 mx-3 rounded-2xl border border-white/5 bg-[var(--bg-elevated)] flex flex-col gap-4"
      style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.3)' }}>
      <div className="flex items-center justify-between">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={13} fill="var(--neon-cyan)" color="var(--neon-cyan)" />
          ))}
        </div>
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
          style={{ color: SOURCE_COLOR[t.source], background: SOURCE_COLOR[t.source] + '18' }}>
          {SOURCE_LABEL[t.source]}
        </span>
      </div>
      <p className="text-sm text-[var(--text-dim)] leading-relaxed flex-1">"{t.text}"</p>
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
          <h2 className="font-display font-bold" style={{ fontSize: 'var(--text-display)', fontFamily: "'Clash Display', var(--font-clash), Georgia, serif" }}>
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
            animation: 'marqueeScroll 30s linear infinite',
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
