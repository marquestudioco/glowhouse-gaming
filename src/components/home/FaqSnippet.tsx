'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Minus } from 'lucide-react';
import { FAQ_ITEMS, FAQ_HOME_IDS } from '@/lib/data/faq';
import { Container } from '@/components/ui/Container';
import { Eyebrow }   from '@/components/ui/Eyebrow';

export function FaqSnippet() {
  const [open, setOpen] = useState<string | null>(null);
  const items = FAQ_ITEMS.filter(f => FAQ_HOME_IDS.includes(f.id));

  return (
    <section className="py-[var(--section-gap)]" style={{ background: 'var(--bg-elevated)' }}>
      <Container size="narrow">
        <div className="text-center mb-12">
          <Eyebrow color="cyan" className="mb-3">FAQ</Eyebrow>
          <h2 className="font-display font-bold" style={{ fontSize: 'var(--text-h2)', fontFamily: "'Clash Display', Georgia, serif" }}>
            Parent questions, answered
          </h2>
        </div>

        <div className="space-y-3">
          {items.map(item => (
            <div key={item.id} className="border border-white/5 rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpen(o => o === item.id ? null : item.id)}
                className="w-full text-left px-6 py-4 flex items-center justify-between gap-4"
                aria-expanded={open === item.id}
              >
                <span className="font-medium text-[var(--text-light)] text-sm sm:text-base">{item.question}</span>
                {open === item.id ? <Minus size={16} className="shrink-0 text-[var(--neon-cyan)]" /> : <Plus size={16} className="shrink-0 text-[var(--text-dim)]" />}
              </button>
              {open === item.id && (
                <div className="px-6 pb-5 text-sm text-[var(--text-dim)] leading-relaxed border-t border-white/5">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/contact#faq" className="text-sm text-[var(--neon-cyan)] hover:opacity-80 transition-opacity">
            See all FAQ →
          </Link>
        </div>
      </Container>
    </section>
  );
}
