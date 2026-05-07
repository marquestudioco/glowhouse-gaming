import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Glowhouse Gaming. Booking policies, cancellations, and event guidelines.',
};

export default function TermsPage() {
  return (
    <section className="pt-32 pb-20 min-h-[60svh]" style={{ background: 'var(--bg-deep)' }}>
      <Container size="narrow">
        <h1 className="font-bold text-3xl text-[var(--text-light)] mb-2">Terms of Service</h1>
        <p className="text-sm text-[var(--text-dim)] mb-10">Last updated: May 2025</p>

        <div className="space-y-8 text-[var(--text-dim)] text-sm leading-relaxed">
          <div>
            <h2 className="text-base font-semibold text-[var(--text-light)] mb-2">1. Agreement</h2>
            <p>By submitting a booking request, paying a deposit, or using any service from Glowhouse Gaming, you agree to these Terms of Service. These terms apply to all services we offer, including the Gaming Lounge, Console & VR Rental, Outdoor Movie Nights, Party Van, Silent Disco, and After School Club.</p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-[var(--text-light)] mb-2">2. Bookings and Deposits</h2>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>All reservations require a deposit to hold your date. The deposit amount varies by service.</li>
              <li>A booking is only confirmed once your deposit is received and acknowledged by Glowhouse Gaming.</li>
              <li>The remaining balance is due before the start of your event.</li>
              <li>Submitting a booking request online does not guarantee availability — we will confirm within 24 hours.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-base font-semibold text-[var(--text-light)] mb-2">3. Cancellations and Refunds</h2>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li><strong className="text-[var(--text-light)]">7+ days before the event:</strong> Full deposit refund or credit toward a future booking.</li>
              <li><strong className="text-[var(--text-light)]">48–6 days before the event:</strong> 50% of the deposit may be refunded; the remainder is forfeited.</li>
              <li><strong className="text-[var(--text-light)]">Fewer than 48 hours before the event:</strong> The deposit is non-refundable.</li>
              <li>Cancellations by Glowhouse Gaming due to equipment failure or unforeseen circumstances will result in a full refund or free rescheduling at your choice.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-base font-semibold text-[var(--text-light)] mb-2">4. Rescheduling</h2>
            <p>Rescheduling requests made 72+ hours in advance will be honored at no additional charge, subject to availability. Last-minute rescheduling (under 72 hours) may incur a rescheduling fee.</p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-[var(--text-light)] mb-2">5. Guest Conduct</h2>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>The booking party is responsible for the conduct of all guests during the event.</li>
              <li>Guests must follow all safety and conduct guidelines provided by our staff.</li>
              <li>Glowhouse Gaming reserves the right to end any event early if safety or conduct rules are violated. No refund will be issued in such cases.</li>
              <li>Damage to equipment caused by guests will be billed to the booking party.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-base font-semibold text-[var(--text-light)] mb-2">6. Equipment and Property</h2>
            <p>Glowhouse Gaming is not responsible for loss of, or damage to, personal property brought by guests to any event. For rental services, all equipment must be treated with care and returned in the same condition it was provided. Damage beyond normal wear will be charged to the renter.</p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-[var(--text-light)] mb-2">7. Liability</h2>
            <p>Glowhouse Gaming provides entertainment services. We are not liable for injuries resulting from guests not following staff instructions or engaging in unsafe behavior. Participation in gaming, VR, and physical activities is at the guest's own risk.</p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-[var(--text-light)] mb-2">8. After School Club</h2>
            <p>The After School Club is a structured enrichment program, not a daycare or childcare service. Enrollment is monthly. Parent/guardian pickup is required by the posted closing time. Medical or allergy information must be disclosed at enrollment.</p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-[var(--text-light)] mb-2">9. Changes to Terms</h2>
            <p>We may update these terms at any time. The current version is always available at this page. Continued use of our services constitutes acceptance.</p>
          </div>

          <div className="pt-4 border-t border-white/5">
            <p>Questions about these terms? Call us at <a href="tel:+18553484569" className="text-[var(--neon-cyan)] hover:underline">(855) 348-4569</a> or visit 25061 Avenue Stanford, Ste 40, Santa Clarita, CA 91355. We're available Mon–Sun, 8 AM–7 PM.</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
