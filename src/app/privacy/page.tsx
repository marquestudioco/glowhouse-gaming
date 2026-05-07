import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Glowhouse Gaming. Learn how we collect and protect your personal information.',
};

export default function PrivacyPage() {
  return (
    <section className="pt-32 pb-20 min-h-[60svh]" style={{ background: 'var(--bg-deep)' }}>
      <Container size="narrow">
        <h1 className="font-bold text-3xl text-[var(--text-light)] mb-2">Privacy Policy</h1>
        <p className="text-sm text-[var(--text-dim)] mb-10">Last updated: May 2025</p>

        <div className="space-y-8 text-[var(--text-dim)] text-sm leading-relaxed">
          <div>
            <h2 className="text-base font-semibold text-[var(--text-light)] mb-2">1. Who We Are</h2>
            <p>Glowhouse Gaming ("we," "us," "our") is a gaming lounge and mobile entertainment company based in Santa Clarita, CA. Our address is 25061 Avenue Stanford, Ste 40, Santa Clarita, CA 91355. You can reach us at (855) 348-4569.</p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-[var(--text-light)] mb-2">2. Information We Collect</h2>
            <p className="mb-2">We collect information you voluntarily provide when you:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Submit a booking request (name, email, phone number, event details)</li>
              <li>Send us a message through the contact form</li>
              <li>Call or text us directly</li>
              <li>Interact with our AI chat assistant on this website</li>
            </ul>
            <p className="mt-2">We do not collect payment information on this site. All payments are handled separately at the time of booking.</p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-[var(--text-light)] mb-2">3. How We Use Your Information</h2>
            <p className="mb-2">We use your information solely to:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Respond to your booking requests and inquiries</li>
              <li>Confirm event details and send reminders</li>
              <li>Communicate before, during, and after your event</li>
              <li>Improve our services based on feedback</li>
            </ul>
          </div>

          <div>
            <h2 className="text-base font-semibold text-[var(--text-light)] mb-2">4. Information Sharing</h2>
            <p>We do not sell, trade, rent, or share your personal information with third parties for marketing purposes. Your data is used only by Glowhouse Gaming staff to fulfill your booking. We may share information with service providers (such as email delivery services) solely to operate our business, and those providers are contractually required to protect your data.</p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-[var(--text-light)] mb-2">5. Data Retention</h2>
            <p>We retain booking and contact information for up to 2 years to support event history and customer service. You may request deletion of your data at any time by contacting us.</p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-[var(--text-light)] mb-2">6. Cookies and Analytics</h2>
            <p>This website may use basic analytics to understand traffic patterns (page views, device types). We do not use advertising trackers or sell browsing data. Any analytics data is aggregated and not personally identifiable.</p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-[var(--text-light)] mb-2">7. Children's Privacy</h2>
            <p>Our services are designed for families and children's events. We do not knowingly collect personal information directly from children under 13. Booking information is collected from the parent or guardian responsible for the event.</p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-[var(--text-light)] mb-2">8. Your Rights</h2>
            <p>You have the right to access, correct, or request deletion of any personal information we hold about you. To exercise these rights, contact us at (855) 348-4569 or visit us at 25061 Avenue Stanford, Ste 40, Santa Clarita, CA 91355.</p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-[var(--text-light)] mb-2">9. Changes to This Policy</h2>
            <p>We may update this policy periodically. Continued use of our website after changes constitutes acceptance of the updated policy. The date at the top of this page reflects the most recent revision.</p>
          </div>

          <div className="pt-4 border-t border-white/5">
            <p>Questions? Contact us at <a href="tel:+18553484569" className="text-[var(--neon-cyan)] hover:underline">(855) 348-4569</a> or visit us Mon–Sun, 8 AM–7 PM.</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
