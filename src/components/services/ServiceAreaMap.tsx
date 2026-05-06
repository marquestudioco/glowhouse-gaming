import { Container } from '@/components/ui/Container';
import { Eyebrow }   from '@/components/ui/Eyebrow';
import { MapPin }    from 'lucide-react';
import { SERVICE_AREA_CITIES } from '@/lib/data/services';

export function ServiceAreaMap() {
  return (
    <section className="py-[var(--section-gap)]" style={{ background: 'var(--bg-deep)' }}>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Eyebrow color="cyan" className="mb-3">Service Area</Eyebrow>
            <h2 className="font-display font-bold mb-4" style={{ fontSize: 'var(--text-h2)', fontFamily: 'var(--font-clash), Georgia, serif' }}>
              We come to you
            </h2>
            <p className="text-[var(--text-dim)] mb-6 leading-relaxed">
              Our mobile services (console rental, outdoor movies, party van, silent disco) serve the entire Santa Clarita Valley. Not sure if we cover your area? Just call — we'll let you know.
            </p>
            <ul className="grid grid-cols-2 gap-2 mb-6">
              {SERVICE_AREA_CITIES.map(city => (
                <li key={city} className="flex items-center gap-2 text-sm text-[var(--text-dim)]">
                  <MapPin size={12} style={{ color: 'var(--neon-cyan)' }} />
                  {city}
                </li>
              ))}
            </ul>
            <p className="text-sm text-[var(--text-dim)]">
              Outside our standard area? <a href="tel:+18553484569" className="underline" style={{ color: 'var(--neon-cyan)' }}>Call us</a> — we can often accommodate.
            </p>
          </div>

          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/5">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52870.35!2d-118.52!3d34.41!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c28ba25d0a64a1%3A0x4f6a6a6a6a6a6a6a!2sSanta%20Clarita%2C%20CA!5e0!3m2!1sen!2sus!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) saturate(0.8)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Glowhouse Gaming service area map"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
