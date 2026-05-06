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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <link rel="preload" as="image" href="/hero/scene-1.webp" fetchPriority="high" />
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
