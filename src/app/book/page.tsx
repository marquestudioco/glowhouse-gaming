import type { Metadata } from 'next';
import { BookingWizard } from '@/components/book/BookingWizard';
import { Container }     from '@/components/ui/Container';

export const metadata: Metadata = {
  title: 'Book a Party',
  description: 'Book a birthday party or event at Glowhouse Gaming in Santa Clarita, CA.',
};

interface Props {
  searchParams: Promise<{ date?: string; service?: string; package?: string }>;
}

export default async function BookPage({ searchParams }: Props) {
  const params = await searchParams;
  return (
    <section className="pt-32 pb-20 min-h-[100svh]" style={{ background: 'var(--bg-deep)' }}>
      <Container size="narrow">
        <div className="text-center mb-10">
          <h1 className="font-display font-bold italic mb-3" style={{ fontSize: 'var(--text-h2)', fontFamily: 'var(--font-clash), Georgia, serif' }}>
            Let's plan your party
          </h1>
          <p className="text-[var(--text-dim)]">3 quick steps. We'll confirm within 24 hours.</p>
        </div>
        <div className="bg-[var(--bg-elevated)] rounded-2xl border border-white/5 p-6 sm:p-8">
          <BookingWizard
            initialDate={params.date ?? ''}
            initialService={params.service ?? ''}
            initialPackage={params.package ?? ''}
          />
        </div>
      </Container>
    </section>
  );
}
