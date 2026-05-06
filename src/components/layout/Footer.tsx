import Link from 'next/link';
import { Phone, MapPin, Clock, Instagram, Facebook } from 'lucide-react';
import { SERVICES } from '@/lib/data/services';

export function Footer() {
  return (
    <footer className="bg-[var(--bg-elevated)] border-t border-white/5 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          <div className="lg:col-span-1">
            <p className="text-lg font-bold tracking-widest uppercase mb-3">
              <span style={{ color: 'var(--neon-cyan)' }}>Glow</span>house Gaming
            </p>
            <p className="text-sm text-[var(--text-dim)] leading-relaxed mb-4">
              Where birthdays go to glow. Santa Clarita's premier gaming lounge and mobile party service.
            </p>
            <div className="flex flex-col gap-1 text-xs text-[var(--text-dim)]">
              <span>⭐ 5.0 on Yelp</span>
              <span>✓ 100% recommend on Facebook</span>
              <span>🎮 Since 2017</span>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-dim)] mb-4">Services</h3>
            <ul className="space-y-2">
              {SERVICES.map(s => (
                <li key={s.id}>
                  <Link href={`/services#${s.id}`} className="text-sm text-[var(--text-dim)] hover:text-[var(--text-light)] transition-colors">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-dim)] mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { href: '/birthday-parties', label: 'Birthday Parties' },
                { href: '/book',             label: 'Book Now' },
                { href: '/gallery',          label: 'Gallery' },
                { href: '/about',            label: 'Our Story' },
                { href: '/contact',          label: 'Contact' },
                { href: '/contact#faq',      label: 'FAQ' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-[var(--text-dim)] hover:text-[var(--text-light)] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-dim)] mb-4">Find Us</h3>
            <ul className="space-y-3 text-sm text-[var(--text-dim)]">
              <li className="flex gap-2">
                <MapPin size={14} className="shrink-0 mt-0.5" style={{ color: 'var(--neon-cyan)' }} />
                <a href="https://maps.google.com/?q=25061+Avenue+Stanford+Ste+40+Santa+Clarita+CA+91355" target="_blank" rel="noopener" className="hover:text-[var(--text-light)] transition-colors">
                  25061 Avenue Stanford, Ste 40<br />Santa Clarita, CA 91355
                </a>
              </li>
              <li className="flex gap-2 items-center">
                <Phone size={14} className="shrink-0" style={{ color: 'var(--neon-cyan)' }} />
                <a href="tel:+18553484569" className="hover:text-[var(--text-light)] transition-colors">
                  (855) 348-4569
                </a>
              </li>
              <li className="flex gap-2 items-start">
                <Clock size={14} className="shrink-0 mt-0.5" style={{ color: 'var(--neon-cyan)' }} />
                <span>Mon–Sun: 8:00 AM – 7:00 PM</span>
              </li>
            </ul>
            <div className="flex gap-3 mt-4">
              <a href="https://www.instagram.com/glowhousegaming" target="_blank" rel="noopener" aria-label="Instagram" className="text-[var(--text-dim)] hover:text-[var(--neon-magenta)] transition-colors">
                <Instagram size={18} />
              </a>
              <a href="https://www.facebook.com/glowhousegaming" target="_blank" rel="noopener" aria-label="Facebook" className="text-[var(--text-dim)] hover:text-[var(--neon-cyan)] transition-colors">
                <Facebook size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-[var(--text-dim)]">
          <p>© {new Date().getFullYear()} Glowhouse Gaming. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-[var(--text-light)] transition-colors">Privacy</Link>
            <Link href="/terms"   className="hover:text-[var(--text-light)] transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
