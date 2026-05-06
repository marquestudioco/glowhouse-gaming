'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Phone } from 'lucide-react';

const NAV_LINKS = [
  { href: '/birthday-parties', label: 'Birthday Parties', highlight: true },
  { href: '/services',          label: 'Services' },
  { href: '/after-school-club', label: 'After School' },
  { href: '/gallery',           label: 'Gallery' },
  { href: '/about',             label: 'About' },
  { href: '/contact',           label: 'Contact' },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={[
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'backdrop-blur-md bg-[var(--bg-deep)]/90 shadow-lg shadow-black/30 border-b border-white/5'
          : 'bg-transparent',
      ].join(' ')}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="text-lg font-bold tracking-widest uppercase text-[var(--text-light)]">
          <span style={{ color: 'var(--neon-cyan)' }}>Glow</span>house Gaming
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map(({ href, label, highlight }) => (
            <li key={href}>
              <Link
                href={href}
                className={[
                  'text-sm font-medium transition-colors duration-200',
                  highlight
                    ? 'px-4 py-2 rounded-full border border-[var(--neon-magenta)] text-[var(--neon-magenta)] hover:bg-[var(--neon-magenta)] hover:text-white'
                    : 'text-[var(--text-dim)] hover:text-[var(--text-light)]',
                ].join(' ')}
                data-magnetic
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href="tel:+18553484569"
              className="flex items-center gap-2 text-sm font-medium text-[var(--neon-cyan)] hover:opacity-80 transition-opacity"
            >
              <Phone size={14} />
              (855) 348-4569
            </a>
          </li>
        </ul>

        {/* Right side: Book Now (always visible) + hamburger */}
        <div className="flex items-center gap-3">
          <Link
            href="/book"
            className="px-5 py-2 rounded-full text-sm font-bold text-white transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(0,229,255,0.4)]"
            style={{ background: 'linear-gradient(135deg, var(--neon-cyan), var(--neon-violet))' }}
            data-magnetic
          >
            <span className="hidden sm:inline">Book Now</span>
            <span className="sm:hidden">Book</span>
          </Link>
          <button
            onClick={() => setMenuOpen(v => !v)}
            className="lg:hidden text-[var(--text-light)] p-2"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="lg:hidden bg-[var(--bg-elevated)]/95 backdrop-blur-md border-b border-white/5 px-4 pb-6 pt-2">
          <ul className="flex flex-col gap-4">
            {NAV_LINKS.map(({ href, label, highlight }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={[
                    'block text-base font-medium py-2',
                    highlight ? 'text-[var(--neon-magenta)]' : 'text-[var(--text-light)]',
                  ].join(' ')}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <a href="tel:+18553484569" className="flex items-center gap-2 text-[var(--neon-cyan)] text-base font-medium py-2">
                <Phone size={16} />
                (855) 348-4569
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
