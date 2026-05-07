import Link from 'next/link';
import Image from 'next/image';
import { Phone, MapPin, Clock } from 'lucide-react';
import { SERVICES } from '@/lib/data/services';

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-[var(--bg-elevated)] border-t border-white/5 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">

          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/logo-color.png"
                alt="Glowhouse Gaming"
                width={1268}
                height={952}
                style={{ height: '52px', width: 'auto' }}
              />
            </Link>
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
                <InstagramIcon />
              </a>
              <a href="https://www.facebook.com/glowhousegaming" target="_blank" rel="noopener" aria-label="Facebook" className="text-[var(--text-dim)] hover:text-[var(--neon-cyan)] transition-colors">
                <FacebookIcon />
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
