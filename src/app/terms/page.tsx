import { Container } from '@/components/ui/Container';

export default function TermsPage() {
  return (
    <section className="pt-32 pb-20 min-h-[60svh]" style={{ background: 'var(--bg-deep)' }}>
      <Container size="narrow">
        <h1 className="font-bold text-2xl text-[var(--text-light)] mb-6">Terms of Service</h1>
        <p className="text-[var(--text-dim)] text-sm leading-relaxed mb-4">
          By booking services with Glowhouse Gaming, you agree to our standard booking terms. All reservations require a deposit to hold your date. Cancellations made fewer than 48 hours before the event may forfeit the deposit.
        </p>
        <p className="text-[var(--text-dim)] text-sm leading-relaxed mb-4">
          Glowhouse Gaming is not responsible for personal property brought to events. Guests must follow all venue rules. We reserve the right to end any event early for safety or conduct reasons.
        </p>
        <p className="text-[var(--text-dim)] text-sm leading-relaxed">
          For questions about our terms, contact us at (855) 348-4569 or visit us at 25061 Avenue Stanford, Ste 40, Santa Clarita, CA 91355.
        </p>
      </Container>
    </section>
  );
}
