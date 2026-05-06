import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, MapPin, Clock } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Eyebrow }   from '@/components/ui/Eyebrow';
import { FaqSnippet }from '@/components/home/FaqSnippet';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact Glowhouse Gaming in Santa Clarita, CA. Call (855) 348-4569, visit us at 25061 Avenue Stanford Ste 40, or send a message.',
};

export default function ContactPage() {
  return (
    <>
      <section className="pt-32 pb-20" style={{ background: 'var(--bg-deep)' }}>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <Eyebrow color="cyan" className="mb-4">Get in Touch</Eyebrow>
              <h1 className="font-display font-bold italic mb-8" style={{ fontSize: 'var(--text-display)', fontFamily: 'var(--font-clash), Georgia, serif' }}>
                Let's talk parties
              </h1>
              <ul className="space-y-6">
                <li className="flex gap-4 items-start">
                  <Phone size={20} className="shrink-0 mt-0.5" style={{ color: 'var(--neon-cyan)' }} />
                  <div>
                    <p className="text-sm text-[var(--text-dim)] mb-0.5">Phone</p>
                    <a href="tel:+18553484569" className="font-semibold text-[var(--text-light)] hover:text-[var(--neon-cyan)] transition-colors text-lg">(855) 348-4569</a>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <MapPin size={20} className="shrink-0 mt-0.5" style={{ color: 'var(--neon-cyan)' }} />
                  <div>
                    <p className="text-sm text-[var(--text-dim)] mb-0.5">Address</p>
                    <a href="https://maps.google.com/?q=25061+Avenue+Stanford+Ste+40+Santa+Clarita+CA" target="_blank" rel="noopener" className="font-medium text-[var(--text-light)] hover:text-[var(--neon-cyan)] transition-colors">
                      25061 Avenue Stanford, Ste 40<br />Santa Clarita, CA 91355
                    </a>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <Clock size={20} className="shrink-0 mt-0.5" style={{ color: 'var(--neon-cyan)' }} />
                  <div>
                    <p className="text-sm text-[var(--text-dim)] mb-0.5">Hours</p>
                    <p className="font-medium text-[var(--text-light)]">Monday – Sunday<br />8:00 AM – 7:00 PM</p>
                  </div>
                </li>
              </ul>
              <div className="mt-8">
                <Link href="/book" className="inline-block px-8 py-3 rounded-full font-bold text-white" style={{ background: 'linear-gradient(135deg, var(--neon-cyan), var(--neon-violet))' }} data-magnetic>
                  Book a Party Now
                </Link>
              </div>
            </div>

            <div className="relative aspect-square lg:aspect-auto rounded-2xl overflow-hidden border border-white/5">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3300!2d-118.555!3d34.414!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDI0JzUwLjQiTiAxMTjCsDMzJzE4LjAiVw!5e0!3m2!1sen!2sus!4v1"
                width="100%" height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) saturate(0.7)', minHeight: 400 }}
                allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Glowhouse Gaming location"
              />
            </div>
          </div>
        </Container>
      </section>

      <div id="faq">
        <FaqSnippet />
      </div>
    </>
  );
}
