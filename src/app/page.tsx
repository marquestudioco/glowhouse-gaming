import type { Metadata } from 'next';
import { CinematicHero }             from '@/components/home/CinematicHero';
import { TrustStatStrip }            from '@/components/home/TrustStatStrip';
import { ServicesGrid }              from '@/components/home/ServicesGrid';
import { HorizontalServiceScrubber } from '@/components/home/HorizontalServiceScrubber';
import { BirthdaySpotlight }         from '@/components/home/BirthdaySpotlight';
import { PackagesTeaser }            from '@/components/home/PackagesTeaser';
import { PhotoMosaic }               from '@/components/home/PhotoMosaic';
import { TestimonialMarquee }        from '@/components/home/TestimonialMarquee';
import { AboutTeaser }               from '@/components/home/AboutTeaser';
import { FeaturedGames }             from '@/components/home/FeaturedGames';
import { FaqSnippet }                from '@/components/home/FaqSnippet';
import { CtaBand }                   from '@/components/home/CtaBand';

export const metadata: Metadata = {
  title: 'Glowhouse Gaming — Where Birthdays Go to Glow',
  description: 'Glow-in-the-dark gaming lounge, mobile party services, and after-school adventures in Santa Clarita, CA. 5.0★ rated. Book a birthday party today.',
  alternates: { canonical: 'https://www.glowhousegaming.com' },
};

export default function Home() {
  return (
    <>
      <CinematicHero />
      <TrustStatStrip />
      <ServicesGrid />
      <HorizontalServiceScrubber />
      <BirthdaySpotlight />
      <PackagesTeaser />
      <PhotoMosaic />
      <FeaturedGames />
      <TestimonialMarquee />
      <AboutTeaser />
      <FaqSnippet />
      <CtaBand />
    </>
  );
}
