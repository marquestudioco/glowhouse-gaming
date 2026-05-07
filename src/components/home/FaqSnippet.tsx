'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Minus } from 'lucide-react';
import { FAQ_ITEMS, FAQ_HOME_IDS } from '@/lib/data/faq';
import { Container } from '@/components/ui/Container';
import { Eyebrow }   from '@/components/ui/Eyebrow';

function AccordionItem({ item, isOpen, onToggle }: {
  item: typeof FAQ_ITEMS[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    if (isOpen) {
      el.style.maxHeight = el.scrollHeight + 'px';
      el.style.opacity = '1';
    } else {
      el.style.maxHeight = '0px';
      el.style.opacity = '0';
    }
  }, [isOpen]);

  return (
    <div
      className="border rounded-2xl overflow-hidden transition-all duration-200"
      style={{
        borderColor: isOpen ? 'rgba(0,229,255,0.3)' : 'rgba(255,255,255,0.05)',
        background: isOpen ? 'rgba(0,229,255,0.03)' : 'transparent',
      }}
    >
      <button
        onClick={onToggle}
        className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
        aria-expanded={isOpen}
      >
        <span className="font-medium text-[var(--text-light)] text-sm sm:text-base leading-snug">{item.question}</span>
        <span
          className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full border transition-all duration-200"
          style={{
            borderColor: isOpen ? 'var(--neon-cyan)' : 'rgba(255,255,255,0.15)',
            color: isOpen ? 'var(--neon-cyan)' : 'var(--text-dim)',
            background: isOpen ? 'rgba(0,229,255,0.08)' : 'transparent',
          }}
        >
          {isOpen ? <Minus size={12} /> : <Plus size={12} />}
        </span>
      </button>
      <div
        ref={bodyRef}
        style={{ maxHeight: 0, opacity: 0, overflow: 'hidden', transition: 'max-height 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.25s ease' }}
      >
        <div className="px-6 pb-5 text-sm text-[var(--text-dim)] leading-relaxed">
          {item.answer}
        </div>
      </div>
    </div>
  );
}

export function FaqSnippet() {
  const [open, setOpen] = useState<string | null>(null);
  const items = FAQ_ITEMS.filter(f => FAQ_HOME_IDS.includes(f.id));

  return (
    <section className="py-[var(--section-gap)]" style={{ background: 'var(--bg-elevated)' }}>
      <Container size="narrow">
        <div className="text-center mb-12">
          <Eyebrow color="cyan" className="mb-3">FAQ</Eyebrow>
          <h2 className="font-display font-bold" style={{ fontSize: 'var(--text-h2)', fontFamily: "'Clash Display', var(--font-clash), Georgia, serif" }}>
            Parent questions, answered
          </h2>
        </div>

        <div className="space-y-3">
          {items.map(item => (
            <AccordionItem
              key={item.id}
              item={item}
              isOpen={open === item.id}
              onToggle={() => setOpen(o => o === item.id ? null : item.id)}
            />
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
