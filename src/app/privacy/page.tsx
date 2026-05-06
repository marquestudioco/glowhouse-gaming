import { Container } from '@/components/ui/Container';

export default function PrivacyPage() {
  return (
    <section className="pt-32 pb-20 min-h-[60svh]" style={{ background: 'var(--bg-deep)' }}>
      <Container size="narrow">
        <h1 className="font-bold text-2xl text-[var(--text-light)] mb-6">Privacy Policy</h1>
        <p className="text-[var(--text-dim)] text-sm leading-relaxed">
          Glowhouse Gaming respects your privacy. We collect contact information submitted through booking forms solely to process your booking and communicate with you. We do not sell or share your personal information with third parties. Contact us at (855) 348-4569 with any questions.
        </p>
      </Container>
    </section>
  );
}
