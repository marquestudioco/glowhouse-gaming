import { Check, X } from 'lucide-react';
import { PACKAGES }  from '@/lib/data/packages';
import { Container } from '@/components/ui/Container';
import { Eyebrow }   from '@/components/ui/Eyebrow';

const ATTRIBUTES = [
  { label: 'Lounge session',        starter: '2 hrs',   premium: '2 hrs',    vip: '3 hrs'   },
  { label: 'Max guests',            starter: '8',       premium: '16',       vip: '25'      },
  { label: 'Screens + consoles',    starter: '2',       premium: '4',        vip: 'All'     },
  { label: 'VR headsets',           starter: false,     premium: true,       vip: true      },
  { label: 'Birthday host',         starter: false,     premium: true,       vip: true      },
  { label: 'Custom playlist',       starter: true,      premium: true,       vip: true      },
  { label: 'LED party lighting',    starter: 'Standard',premium: 'Full DJ',  vip: 'Full DJ' },
  { label: 'Custom invite design',  starter: false,     premium: false,      vip: true      },
  { label: 'Mobile add-on option',  starter: false,     premium: false,      vip: true      },
];

function Cell({ value }: { value: string | boolean }) {
  if (typeof value === 'boolean') {
    return value
      ? <Check size={16} className="mx-auto" style={{ color: 'var(--neon-cyan)' }} />
      : <X     size={16} className="mx-auto" style={{ color: 'rgba(255,255,255,0.2)' }} />;
  }
  return <span className="text-sm text-[var(--text-light)]">{value}</span>;
}

export function WhatsIncludedTable() {
  return (
    <section className="py-[var(--section-gap)]" style={{ background: 'var(--bg-deep)' }}>
      <Container>
        <div className="text-center mb-12">
          <Eyebrow color="cyan" className="mb-3">Compare</Eyebrow>
          <h2 className="font-display font-bold" style={{ fontSize: 'var(--text-h2)', fontFamily: 'var(--font-clash), Georgia, serif' }}>
            What's included
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse">
            <thead>
              <tr>
                <th className="text-left py-3 px-4 text-xs uppercase tracking-widest text-[var(--text-dim)]">Feature</th>
                {PACKAGES.map(pkg => (
                  <th key={pkg.id} className="text-center py-3 px-4 text-sm font-semibold" style={{ color: pkg.highlight ? 'var(--neon-magenta)' : 'var(--text-light)' }}>
                    {pkg.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ATTRIBUTES.map((row, i) => (
                <tr key={row.label} className={i % 2 === 0 ? 'bg-[var(--bg-elevated)]' : ''}>
                  <td className="py-3 px-4 text-sm text-[var(--text-dim)]">{row.label}</td>
                  <td className="py-3 px-4 text-center"><Cell value={row.starter} /></td>
                  <td className="py-3 px-4 text-center"><Cell value={row.premium} /></td>
                  <td className="py-3 px-4 text-center"><Cell value={row.vip} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  );
}
