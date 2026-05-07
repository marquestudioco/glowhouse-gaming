import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

import { SmoothScroll }           from '@/components/layout/SmoothScroll';
import { Nav }                    from '@/components/layout/Nav';
import { Footer }                 from '@/components/layout/Footer';
import { StickyMobileCTA }        from '@/components/layout/StickyMobileCTA';
import { RouteTransitionCurtain } from '@/components/layout/RouteTransitionCurtain';
import { AccessibilityMenu }      from '@/components/layout/AccessibilityMenu';
import { GlowTrailCursor }        from '@/components/cursor/GlowTrailCursor';
import { ChatWidget }             from '@/components/chat/ChatWidget';

const geistSans = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
  display: 'swap',
});
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: '%s | Glowhouse Gaming',
    default:  'Glowhouse Gaming — Where Birthdays Go to Glow',
  },
  description: 'Glow-in-the-dark gaming lounge, mobile party services, and after-school adventures in Santa Clarita, CA. Book a birthday party today.',
  keywords: ['gaming lounge', 'birthday party', 'Santa Clarita', 'VR rental', 'silent disco', 'party van', 'after school club'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.glowhousegaming.com',
    siteName: 'Glowhouse Gaming',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0A0612',
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Glowhouse Gaming',
  description: 'Glow-in-the-dark gaming lounge and mobile entertainment party service in Santa Clarita, CA.',
  url: 'https://www.glowhousegaming.com',
  telephone: '+18553484569',
  priceRange: '$$',
  image: 'https://www.glowhousegaming.com/og-image.jpg',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '25061 Avenue Stanford, Ste 40',
    addressLocality: 'Santa Clarita',
    addressRegion: 'CA',
    postalCode: '91355',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 34.4208,
    longitude: -118.5642,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
      opens: '08:00',
      closes: '19:00',
    },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: '100',
    bestRating: '5',
  },
  sameAs: [
    'https://www.instagram.com/glowhousegaming',
    'https://www.facebook.com/glowhousegaming',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <link rel="preload" as="image" href="/hero/scene-1.webp" fetchPriority="high" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body>
        <GlowTrailCursor />
        <SmoothScroll>
          <RouteTransitionCurtain />
          <Nav />
          <main>{children}</main>
          <Footer />
          <StickyMobileCTA />
          <AccessibilityMenu />
          <ChatWidget />
        </SmoothScroll>
      </body>
    </html>
  );
}
