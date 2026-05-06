import { CountUp } from '@/components/ui/CountUp';

const STATS = [
  { end: 2017, suffix: '',    label: 'Year founded',   display: '2017' },
  { end: 5,    suffix: '.0★', label: 'Yelp rating',    display: null },
  { end: 1000, suffix: '+',   label: 'Parties hosted', display: null },
  { end: 6,    suffix: '',    label: 'Ways to glow',   display: null },
];

export function TrustStatStrip() {
  return (
    <section className="py-10 border-y border-white/5" style={{ background: 'var(--bg-elevated)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <p
                className="font-display font-bold mb-1"
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  color: 'var(--neon-cyan)',
                  fontFamily: "'Clash Display', Georgia, serif",
                }}
              >
                {stat.display ?? (
                  <CountUp end={stat.end} suffix={stat.suffix} />
                )}
              </p>
              <p className="text-xs uppercase tracking-widest text-[var(--text-dim)]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
