import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, MapPin, Clock } from 'lucide-react';
import { Container }   from '@/components/ui/Container';
import { Eyebrow }     from '@/components/ui/Eyebrow';
import { FaqSnippet }  from '@/components/home/FaqSnippet';
import { ContactForm }          from '@/components/contact/ContactForm';
import { AiReceptionistDemo }   from '@/components/contact/AiReceptionistDemo';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact Glowhouse Gaming in Santa Clarita, CA. Call (855) 348-4569, visit us at 25061 Avenue Stanford Ste 40, or send a message.',
};

export default function ContactPage() {
  return (
    <>
      <section className="pt-32 pb-20" style={{ background: 'var(--bg-deep)' }}>
        <Container>
          {/* Header */}
          <div className="text-center mb-16">
            <Eyebrow color="cyan" className="mb-4">Get in Touch</Eyebrow>
            <h1 className="font-display font-bold italic" style={{ fontSize: 'var(--text-display)', fontFamily: "'Clash Display', Georgia, serif" }}>
              Let's talk parties
            </h1>
            <p className="text-[var(--text-dim)] mt-4 text-lg max-w-md mx-auto">
              Questions about booking, availability, or pricing? We're here to help.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact info column */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-[var(--bg-elevated)] rounded-2xl border border-white/5 p-6 space-y-6">
                <ul className="space-y-6">
                  <li className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,229,255,0.1)' }}>
                      <Phone size={14} style={{ color: 'var(--neon-cyan)' }} />
                    </div>
                    <div>
                      <p className="text-xs text-[var(--text-dim)] mb-1 uppercase tracking-wider">Phone</p>
                      <a href="tel:+18553484569" className="font-semibold text-[var(--text-light)] hover:text-[var(--neon-cyan)] transition-colors text-lg">(855) 348-4569</a>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,229,255,0.1)' }}>
                      <MapPin size={14} style={{ color: 'var(--neon-cyan)' }} />
                    </div>
                    <div>
                      <p className="text-xs text-[var(--text-dim)] mb-1 uppercase tracking-wider">Address</p>
                      <a href="https://maps.google.com/?q=25061+Avenue+Stanford+Ste+40+Santa+Clarita+CA" target="_blank" rel="noopener" className="font-medium text-[var(--text-light)] hover:text-[var(--neon-cyan)] transition-colors">
                        25061 Avenue Stanford, Ste 40<br />Santa Clarita, CA 91355
                      </a>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,229,255,0.1)' }}>
                      <Clock size={14} style={{ color: 'var(--neon-cyan)' }} />
                    </div>
                    <div>
                      <p className="text-xs text-[var(--text-dim)] mb-1 uppercase tracking-wider">Hours</p>
                      <p className="font-medium text-[var(--text-light)]">Monday – Sunday<br />8:00 AM – 7:00 PM</p>
                    </div>
                  </li>
                </ul>

                <div className="pt-4 border-t border-white/5">
                  <Link href="/book"
                    className="block text-center px-6 py-3 rounded-xl font-bold text-white text-sm transition-all hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, var(--neon-cyan), var(--neon-violet))', boxShadow: '0 0 20px rgba(0,229,255,0.2)' }}
                    data-magnetic
                  >
                    Book a Party Now
                  </Link>
                </div>
              </div>

              {/* Map */}
              <div className="relative rounded-2xl overflow-hidden border border-white/5" style={{ height: 260 }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3300!2d-118.555!3d34.414!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDI0JzUwLjQiTiAxMTjCsDMzJzE4LjAiVw!5e0!3m2!1sen!2sus!4v1"
                  width="100%" height="100%"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) saturate(0.7)' }}
                  allowFullScreen loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Glowhouse Gaming location"
                />
              </div>
            </div>

            {/* Contact form column */}
            <div className="lg:col-span-3">
              <div className="bg-[var(--bg-elevated)] rounded-2xl border border-white/5 p-6 sm:p-8">
                <h2 className="font-bold text-xl text-[var(--text-light)] mb-2">Send us a message</h2>
                <p className="text-sm text-[var(--text-dim)] mb-6">We'll get back to you within 24 hours.</p>
                <ContactForm />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <div id="faq">
        <FaqSnippet />
      </div>

      <AiReceptionistDemo />
    </>
  );
}
