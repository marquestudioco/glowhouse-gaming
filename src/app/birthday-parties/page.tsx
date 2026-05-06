import type { Metadata } from 'next';
import { BirthdayHero }       from '@/components/birthday/BirthdayHero';
import { PartyPackagesFull }  from '@/components/birthday/PartyPackagesFull';
import { WhatsIncludedTable } from '@/components/birthday/WhatsIncludedTable';
import { BirthdayHostCard }   from '@/components/birthday/BirthdayHostCard';
import { TestimonialMarquee } from '@/components/home/TestimonialMarquee';
import { CtaBand }            from '@/components/home/CtaBand';
import { FaqSnippet }         from '@/components/home/FaqSnippet';

export const metadata: Metadata = {
  title: 'Birthday Parties',
  description: 'Book a glow-in-the-dark birthday party at Glowhouse Gaming in Santa Clarita, CA. 3 packages, dedicated birthday host, 5.0★ rated.',
  alternates: { canonical: 'https://www.glowhousegaming.com/birthday-parties' },
};

export default function BirthdayPartiesPage() {
  return (
    <>
      <BirthdayHero />
      <PartyPackagesFull />
      <WhatsIncludedTable />
      <BirthdayHostCard />
      <TestimonialMarquee />
      <FaqSnippet />
      <CtaBand />
    </>
  );
}
