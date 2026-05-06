'use client';

import { useState, useEffect } from 'react';
import { Accessibility, X } from 'lucide-react';

interface A11ySettings {
  fontSize: number;
  highContrast: boolean;
  underlineLinks: boolean;
  pauseAnimations: boolean;
}

const DEFAULT: A11ySettings = {
  fontSize: 1,
  highContrast: false,
  underlineLinks: false,
  pauseAnimations: false,
};

export function AccessibilityMenu() {
  const [open, setOpen]         = useState(false);
  const [settings, setSettings] = useState<A11ySettings>(DEFAULT);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('a11y');
      if (stored) setSettings(JSON.parse(stored));
    } catch {}
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    html.style.fontSize        = `${settings.fontSize * 100}%`;
    html.dataset.a11yContrast  = settings.highContrast ? 'high' : '';
    html.dataset.a11yUnderline = settings.underlineLinks ? 'on' : '';
    html.dataset.a11yPauseAnim = settings.pauseAnimations ? 'on' : '';
    try { localStorage.setItem('a11y', JSON.stringify(settings)); } catch {}
  }, [settings]);

  const update = (key: keyof A11ySettings, value: A11ySettings[typeof key]) =>
    setSettings(s => ({ ...s, [key]: value }));

  return (
    <>
      <button
        onClick={() => setOpen(v => !v)}
        aria-label="Accessibility options"
        className="fixed bottom-20 right-4 z-50 lg:bottom-6 p-3 rounded-full bg-[var(--bg-elevated)] border border-white/10 text-[var(--text-dim)] hover:text-[var(--neon-cyan)] transition-colors shadow-lg"
      >
        <Accessibility size={18} />
      </button>

      {open && (
        <div className="fixed bottom-36 right-4 z-50 lg:bottom-20 w-64 bg-[var(--bg-elevated)] border border-white/10 rounded-2xl p-4 shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-semibold text-[var(--text-light)]">Accessibility</h2>
            <button onClick={() => setOpen(false)} className="text-[var(--text-dim)] hover:text-[var(--text-light)]"><X size={16} /></button>
          </div>

          <div className="mb-3">
            <p className="text-xs text-[var(--text-dim)] mb-2">Text Size</p>
            <div className="flex gap-2">
              {[['Normal', 1], ['Large', 1.1], ['XL', 1.2]].map(([label, val]) => (
                <button
                  key={label as string}
                  onClick={() => update('fontSize', val as number)}
                  className={['flex-1 py-1.5 rounded-lg text-xs border transition-colors',
                    settings.fontSize === val
                      ? 'border-[var(--neon-cyan)] text-[var(--neon-cyan)]'
                      : 'border-white/10 text-[var(--text-dim)]',
                  ].join(' ')}
                >
                  {label as string}
                </button>
              ))}
            </div>
          </div>

          {([
            ['highContrast',    'High Contrast'],
            ['underlineLinks',  'Underline Links'],
            ['pauseAnimations', 'Pause Animations'],
          ] as [keyof A11ySettings, string][]).map(([key, label]) => (
            <button
              key={key}
              onClick={() => update(key, !settings[key])}
              className={['w-full text-left text-xs py-2 px-3 rounded-lg mb-2 border transition-colors',
                settings[key]
                  ? 'border-[var(--neon-cyan)] text-[var(--neon-cyan)] bg-[var(--neon-cyan)]/5'
                  : 'border-white/10 text-[var(--text-dim)]',
              ].join(' ')}
            >
              {label}
            </button>
          ))}

          <button
            onClick={() => setSettings(DEFAULT)}
            className="w-full text-xs text-[var(--text-dim)] hover:text-[var(--text-light)] mt-1 py-1 transition-colors"
          >
            Reset to defaults
          </button>
        </div>
      )}
    </>
  );
}
