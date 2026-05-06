# Glowhouse Gaming — Implementation Plan Part 3 of 3: Inner Pages → Deploy

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task.

**Prerequisite:** Part 1 + Part 2 complete, all Playwright tests passing, home page live on Cloudflare.

**Goal:** Build all inner pages (Birthday Parties, Services, After School Club, Gallery, About, Contact), the booking form + email API, the Sparks AI chat widget, Decap CMS, and deploy the final production-ready site.

**Covers:** Tasks 26–39 (Inner Pages → Booking → Chat → CMS → Performance → Final Deploy)

**Part 1:** Foundation & Layout ✓
**Part 2:** Home Page ✓

---

## File Structure (Part 3 creates these)

```
src/
├── app/
│   ├── birthday-parties/page.tsx
│   ├── services/page.tsx
│   ├── after-school-club/page.tsx
│   ├── gallery/page.tsx
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── book/page.tsx
│   ├── privacy/page.tsx       # minimal legal page
│   ├── terms/page.tsx         # minimal legal page
│   └── api/
│       ├── book/route.ts      # Booking form → Resend
│       └── chat/route.ts      # Sparks AI persona
└── components/
    ├── birthday/
    │   ├── BirthdayHero.tsx
    │   ├── PartyPackagesFull.tsx
    │   ├── WhatsIncludedTable.tsx
    │   └── BirthdayHostCard.tsx
    ├── services/
    │   ├── ServiceSection.tsx
    │   ├── ServiceAreaMap.tsx
    │   ├── GameLibraryFilter.tsx
    │   └── PartyVanTour.tsx
    ├── book/
    │   ├── BookingWizard.tsx
    │   └── BookingConfirmationBurst.tsx
    └── chat/
        └── ChatWidget.tsx
public/
└── admin/                     # Decap CMS admin (static HTML)
tests/
├── birthday.spec.ts
├── booking.spec.ts
└── chat.spec.ts
```

---

## Task 26: Birthday Parties Page

**Files:**
- Create: `src/app/birthday-parties/page.tsx`
- Create: `src/components/birthday/BirthdayHero.tsx`
- Create: `src/components/birthday/PartyPackagesFull.tsx`
- Create: `src/components/birthday/WhatsIncludedTable.tsx`
- Create: `src/components/birthday/BirthdayHostCard.tsx`

- [ ] **Step 1: Create `BirthdayHero.tsx`**

```tsx
// src/components/birthday/BirthdayHero.tsx
import Link from 'next/link';
import Image from 'next/image';
import { Eyebrow } from '@/components/ui/Eyebrow';

export function BirthdayHero() {
  return (
    <section
      className="relative flex items-center min-h-[70svh] pt-24 pb-16"
      style={{ background: 'var(--bg-deep)', overflow: 'clip' }}
    >
      {/* Radial glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 60% 80% at 70% 50%, rgba(255,46,147,0.08) 0%, transparent 65%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <Eyebrow color="magenta" className="mb-4">Birthday Parties</Eyebrow>
          <h1
            className="font-display font-bold italic mb-5"
            style={{ fontSize: 'var(--text-display)', fontFamily: 'var(--font-clash), Georgia, serif' }}
          >
            The birthday they'll never stop talking about
          </h1>
          <p className="text-[var(--text-dim)] text-lg leading-relaxed mb-8">
            Santa Clarita's most exciting birthday venue. Glow-in-the-dark gaming, dedicated birthday host, customized playlists, and an atmosphere that feels like nothing else in the Valley.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="#packages"
              className="px-8 py-4 rounded-full font-bold text-white text-center transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, var(--neon-magenta), var(--neon-violet))' }}
              data-magnetic
            >
              See Packages
            </Link>
            <Link href="/book" className="px-8 py-4 rounded-full font-semibold text-center border border-white/15 text-[var(--text-light)] hover:border-white/30 transition-all">
              Book Now
            </Link>
          </div>
          {/* Quick trust */}
          <div className="flex flex-wrap gap-4 mt-8 text-xs text-[var(--text-dim)]">
            <span>⭐ 5.0 Yelp rating</span>
            <span>🎂 1,000+ parties hosted</span>
            <span>🎮 Ages 6–adult</span>
            <span>📍 Santa Clarita, CA</span>
          </div>
        </div>

        {/* Hero image */}
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/5">
          <Image src="/birthday/hero.webp" alt="Birthday party at Glowhouse Gaming" fill loading="eager" className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
          {/* Replace with real birthday party photo */}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `WhatsIncludedTable.tsx`**

```tsx
// src/components/birthday/WhatsIncludedTable.tsx
import { Check, X } from 'lucide-react';
import { PACKAGES }  from '@/lib/data/packages';
import { Container } from '@/components/ui/Container';
import { Eyebrow }   from '@/components/ui/Eyebrow';

const ATTRIBUTES = [
  { label: 'Lounge session',        starter: '2 hrs',  premium: '2 hrs',  vip: '3 hrs'  },
  { label: 'Max guests',            starter: '8',      premium: '16',     vip: '25'     },
  { label: 'Screens + consoles',    starter: '2',      premium: '4',      vip: 'All'    },
  { label: 'VR headsets',           starter: false,    premium: true,     vip: true     },
  { label: 'Birthday host',         starter: false,    premium: true,     vip: true     },
  { label: 'Custom playlist',       starter: true,     premium: true,     vip: true     },
  { label: 'LED party lighting',    starter: 'Standard',premium:'Full DJ', vip: 'Full DJ'},
  { label: 'Custom invite design',  starter: false,    premium: false,    vip: true     },
  { label: 'Mobile add-on option',  starter: false,    premium: false,    vip: true     },
];

function Cell({ value }: { value: string | boolean }) {
  if (typeof value === 'boolean') {
    return value
      ? <Check size={16} className="mx-auto" style={{ color: 'var(--neon-cyan)' }} />
      : <X     size={16} className="mx-auto" style={{ color: 'rgba(255,255,255,0.2)' }} />;
  }
  return <span className="text-sm text-[var(--text-light)]">{value}</span>;
}

export function WhatsIncludedTable() {
  return (
    <section className="py-[var(--section-gap)]" style={{ background: 'var(--bg-deep)' }}>
      <Container>
        <div className="text-center mb-12">
          <Eyebrow color="cyan" className="mb-3">Compare</Eyebrow>
          <h2 className="font-display font-bold" style={{ fontSize: 'var(--text-h2)', fontFamily: 'var(--font-clash), Georgia, serif' }}>
            What's included
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse">
            <thead>
              <tr>
                <th className="text-left py-3 px-4 text-xs uppercase tracking-widest text-[var(--text-dim)]">Feature</th>
                {PACKAGES.map(pkg => (
                  <th key={pkg.id} className="text-center py-3 px-4 text-sm font-semibold" style={{ color: pkg.highlight ? 'var(--neon-magenta)' : 'var(--text-light)' }}>
                    {pkg.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ATTRIBUTES.map((row, i) => (
                <tr key={row.label} className={i % 2 === 0 ? 'bg-[var(--bg-elevated)]' : ''}>
                  <td className="py-3 px-4 text-sm text-[var(--text-dim)]">{row.label}</td>
                  <td className="py-3 px-4 text-center"><Cell value={row.starter} /></td>
                  <td className="py-3 px-4 text-center"><Cell value={row.premium} /></td>
                  <td className="py-3 px-4 text-center"><Cell value={row.vip} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 3: Create `BirthdayHostCard.tsx`**

```tsx
// src/components/birthday/BirthdayHostCard.tsx
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Eyebrow }   from '@/components/ui/Eyebrow';

export function BirthdayHostCard() {
  return (
    <section className="py-[var(--section-gap)]" style={{ background: 'var(--bg-elevated)' }}>
      <Container size="narrow">
        <div className="text-center mb-10">
          <Eyebrow color="magenta" className="mb-3">Your Party Host</Eyebrow>
          <h2 className="font-display font-bold" style={{ fontSize: 'var(--text-h2)', fontFamily: 'var(--font-clash), Georgia, serif' }}>
            Meet your birthday guide
          </h2>
        </div>
        <div className="flex flex-col sm:flex-row gap-8 items-center bg-[var(--bg-deep)] rounded-2xl border border-white/5 p-8">
          <div className="relative w-32 h-32 rounded-full overflow-hidden shrink-0 border-2" style={{ borderColor: 'var(--neon-magenta)' }}>
            <Image src="/about/birthday-host.webp" alt="Birthday party host" fill className="object-cover" />
            {/* Replace with real host photo before launch */}
          </div>
          <div>
            <h3 className="font-bold text-xl text-[var(--text-light)] mb-1">Your Party Host</h3>
            <p className="text-sm mb-3" style={{ color: 'var(--neon-magenta)' }}>Included in Premium & VIP packages</p>
            <p className="text-sm text-[var(--text-dim)] leading-relaxed">
              Every Premium and VIP party comes with a dedicated birthday host — a trained Glowhouse team member who coordinates the event, guides games, leads the celebration, and ensures every guest has an unforgettable time. You bring the guests. We bring the energy.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 4: Create `PartyPackagesFull.tsx`**

Import `PACKAGES` from data, render full package cards with booking buttons. Anchor IDs match package `id` fields for deep linking from nav.

```tsx
// src/components/birthday/PartyPackagesFull.tsx
import Link from 'next/link';
import { Check } from 'lucide-react';
import { PACKAGES } from '@/lib/data/packages';
import { Container } from '@/components/ui/Container';
import { Eyebrow }   from '@/components/ui/Eyebrow';

export function PartyPackagesFull() {
  return (
    <section id="packages" className="py-[var(--section-gap)] scroll-mt-16" style={{ background: 'var(--bg-elevated)' }}>
      <Container>
        <div className="text-center mb-14">
          <Eyebrow color="magenta" className="mb-3">Packages</Eyebrow>
          <h2 className="font-display font-bold" style={{ fontSize: 'var(--text-display)', fontFamily: 'var(--font-clash), Georgia, serif' }}>
            Choose your glow level
          </h2>
          <p className="text-[var(--text-dim)] mt-3 max-w-lg mx-auto">
            All packages include game setup, breakdown, custom playlist, and LED party lighting. Hours: Mon–Sun 8 AM–7 PM.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              id={pkg.id}
              className={['relative rounded-2xl border p-8 flex flex-col scroll-mt-20',
                pkg.highlight ? 'border-[var(--neon-magenta)]' : 'border-white/5',
              ].join(' ')}
              style={{ background: 'var(--bg-deep)' }}
            >
              {pkg.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-xs px-4 py-1 rounded-full font-bold text-white" style={{ background: 'var(--neon-magenta)' }}>
                  Most Popular
                </div>
              )}
              <p className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: pkg.highlight ? 'var(--neon-magenta)' : 'var(--neon-cyan)' }}>
                {pkg.tier}
              </p>
              <h3 className="font-bold text-2xl text-[var(--text-light)] mb-1">{pkg.name}</h3>
              <p className="text-sm text-[var(--text-dim)] mb-4">{pkg.tagline}</p>
              <p className="font-bold text-3xl mb-6" style={{ color: pkg.highlight ? 'var(--neon-magenta)' : 'var(--neon-cyan)' }}>
                {pkg.priceFrom}
              </p>
              <ul className="space-y-3 mb-8 flex-1">
                {pkg.includes.map(item => (
                  <li key={item} className="flex gap-3 text-sm text-[var(--text-dim)]">
                    <Check size={15} className="shrink-0 mt-0.5" style={{ color: pkg.highlight ? 'var(--neon-magenta)' : 'var(--neon-cyan)' }} />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href={`/book?package=${pkg.id}`}
                className="block text-center py-3.5 rounded-xl font-semibold text-sm transition-all border"
                style={pkg.highlight
                  ? { background: 'var(--neon-magenta)', color: '#fff', borderColor: 'var(--neon-magenta)' }
                  : { borderColor: 'rgba(255,255,255,0.15)', color: 'var(--text-light)' }}
                data-magnetic
              >
                Book {pkg.name}
              </Link>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-[var(--text-dim)] mt-6">
          *Pricing subject to change. Contact us at (855) 348-4569 for current rates.
        </p>
      </Container>
    </section>
  );
}
```

- [ ] **Step 5: Assemble `src/app/birthday-parties/page.tsx`**

```tsx
// src/app/birthday-parties/page.tsx
import type { Metadata } from 'next';
import { BirthdayHero }      from '@/components/birthday/BirthdayHero';
import { PartyPackagesFull } from '@/components/birthday/PartyPackagesFull';
import { WhatsIncludedTable }from '@/components/birthday/WhatsIncludedTable';
import { BirthdayHostCard }  from '@/components/birthday/BirthdayHostCard';
import { TestimonialMarquee }from '@/components/home/TestimonialMarquee';
import { CtaBand }           from '@/components/home/CtaBand';
import { FaqSnippet }        from '@/components/home/FaqSnippet';

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
```

Create placeholder image at `public/birthday/hero.webp`.

- [ ] **Step 6: Write Playwright test**

```ts
// tests/birthday.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Birthday Parties page', () => {
  test('page loads with hero heading', async ({ page }) => {
    await page.goto('/birthday-parties');
    await expect(page.locator('h1')).toBeVisible();
  });
  test('packages section has 3 packages', async ({ page }) => {
    await page.goto('/birthday-parties');
    const packages = page.locator('#packages .grid > div');
    await expect(packages).toHaveCount(3);
  });
  test('Book Now button links to /book', async ({ page }) => {
    await page.goto('/birthday-parties');
    const bookLink = page.locator('a[href="/book"]').first();
    await expect(bookLink).toBeVisible();
  });
  test('no horizontal overflow on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/birthday-parties');
    const w = await page.evaluate(() => document.body.scrollWidth);
    expect(w).toBeLessThanOrEqual(376);
  });
});
```

Run: `npm run test:e2e -- tests/birthday.spec.ts`
Expected: 4 tests pass.

- [ ] **Step 7: Commit**

```bash
git add src/app/birthday-parties/ src/components/birthday/ public/birthday/ tests/birthday.spec.ts
git commit -m "feat: Birthday Parties page — hero, packages, comparison table, host card"
```

---

## Task 27: Services Page

**Files:**
- Create: `src/app/services/page.tsx`
- Create: `src/components/services/ServiceSection.tsx`
- Create: `src/components/services/ServiceAreaMap.tsx`
- Create: `src/components/services/GameLibraryFilter.tsx`
- Create: `src/components/services/PartyVanTour.tsx`

- [ ] **Step 1: Create `ServiceSection.tsx`**

One reusable section per service. Used for each of the 6 services in the page.

```tsx
// src/components/services/ServiceSection.tsx
import Link from 'link';
import Image from 'next/image';
import { type Service } from '@/lib/data/services';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Container } from '@/components/ui/Container';

interface Props {
  service: Service;
  index: number;
}

export function ServiceSection({ service, index }: Props) {
  const isEven = index % 2 === 0;
  const color = service.accentColor === 'var(--neon-cyan)' ? 'cyan'
    : service.accentColor === 'var(--neon-magenta)' ? 'magenta' : 'violet';

  return (
    <section
      id={service.id}
      className="py-[var(--section-gap)] scroll-mt-20 border-b border-white/5"
      style={{ background: index % 2 === 0 ? 'var(--bg-deep)' : 'var(--bg-elevated)' }}
    >
      <Container>
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}>
          {/* Image */}
          <div className={`relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/5 ${isEven ? '' : 'lg:order-2'}`}>
            <Image
              src={service.heroImage}
              alt={service.name}
              fill
              loading="lazy"
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Content */}
          <div className={isEven ? '' : 'lg:order-1'}>
            <Eyebrow color={color} className="mb-3">{service.duration}</Eyebrow>
            <h2
              className="font-display font-bold mb-4"
              style={{ fontSize: 'var(--text-h2)', fontFamily: 'var(--font-clash), Georgia, serif', color: service.accentColor }}
            >
              {service.name}
            </h2>
            <p className="text-[var(--text-dim)] leading-relaxed mb-6">{service.description}</p>
            <ul className="grid grid-cols-2 gap-2 mb-8">
              {service.highlights.map(h => (
                <li key={h} className="flex items-center gap-2 text-sm text-[var(--text-dim)]">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: service.accentColor }} />
                  {h}
                </li>
              ))}
            </ul>
            <div className="flex gap-3 flex-wrap">
              <Link
                href={`/book?service=${service.id}`}
                className="px-6 py-3 rounded-full font-semibold text-sm text-white transition-all hover:opacity-90"
                style={{ background: service.accentColor }}
                data-magnetic
              >
                Book this service
              </Link>
              <a href="tel:+18553484569" className="px-6 py-3 rounded-full font-semibold text-sm border border-white/15 text-[var(--text-dim)] hover:text-[var(--text-light)] transition-all">
                Call (855) 348-4569
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Create `ServiceAreaMap.tsx`**

CSS-only map showing Santa Clarita service area. No external map API required — uses a simple SVG overlay on a static map image.

```tsx
// src/components/services/ServiceAreaMap.tsx
import { Container } from '@/components/ui/Container';
import { Eyebrow }   from '@/components/ui/Eyebrow';
import { MapPin }    from 'lucide-react';
import { SERVICE_AREA_CITIES } from '@/lib/data/services';

export function ServiceAreaMap() {
  return (
    <section className="py-[var(--section-gap)]" style={{ background: 'var(--bg-deep)' }}>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* City list */}
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

          {/* Map embed placeholder */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/5">
            {/* Google Maps iframe — replace src with real embed URL */}
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
```

- [ ] **Step 3: Create `GameLibraryFilter.tsx`**

```tsx
// src/components/services/GameLibraryFilter.tsx
'use client';

import { useState } from 'react';
import { GAMES, PLATFORM_LABELS, type GamePlatform } from '@/lib/data/games';
import { Container } from '@/components/ui/Container';
import { Eyebrow }   from '@/components/ui/Eyebrow';

const ALL_PLATFORMS: GamePlatform[] = ['ps5', 'switch', 'vr', 'party', 'family'];

export function GameLibraryFilter() {
  const [active, setActive] = useState<GamePlatform | 'all'>('all');

  const filtered = active === 'all' ? GAMES : GAMES.filter(g => g.platform.includes(active));

  return (
    <section className="py-[var(--section-gap)]" style={{ background: 'var(--bg-elevated)' }}>
      <Container>
        <div className="text-center mb-10">
          <Eyebrow color="cyan" className="mb-3">Game Library</Eyebrow>
          <h2 className="font-display font-bold" style={{ fontSize: 'var(--text-h2)', fontFamily: 'var(--font-clash), Georgia, serif' }}>
            What's in the lineup
          </h2>
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button
            onClick={() => setActive('all')}
            className={['px-4 py-1.5 rounded-full text-sm font-medium border transition-all',
              active === 'all' ? 'border-[var(--neon-cyan)] text-[var(--neon-cyan)] bg-[var(--neon-cyan)]/5' : 'border-white/10 text-[var(--text-dim)]',
            ].join(' ')}
          >
            All Games
          </button>
          {ALL_PLATFORMS.map(p => (
            <button
              key={p}
              onClick={() => setActive(p)}
              className={['px-4 py-1.5 rounded-full text-sm font-medium border transition-all',
                active === p ? 'border-[var(--neon-cyan)] text-[var(--neon-cyan)] bg-[var(--neon-cyan)]/5' : 'border-white/10 text-[var(--text-dim)]',
              ].join(' ')}
            >
              {PLATFORM_LABELS[p]}
            </button>
          ))}
        </div>

        {/* Games grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtered.map(game => (
            <div
              key={game.id}
              className="p-3 rounded-xl border border-white/5 bg-[var(--bg-deep)] text-sm"
            >
              <p className="font-medium text-[var(--text-light)] mb-1">{game.name}</p>
              <div className="flex flex-wrap gap-1">
                {game.platform.slice(0, 2).map(p => (
                  <span key={p} className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/5 text-[var(--text-dim)]">
                    {PLATFORM_LABELS[p]}
                  </span>
                ))}
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/5 text-[var(--text-dim)]">
                  {game.ageRating}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 4: Create `PartyVanTour.tsx`**

```tsx
// src/components/services/PartyVanTour.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Eyebrow }   from '@/components/ui/Eyebrow';

const VAN_IMAGES = [
  { src: '/van/exterior.webp',  caption: 'The Party Van exterior — arrive in style' },
  { src: '/van/interior-1.webp',caption: 'Console gaming setup inside' },
  { src: '/van/interior-2.webp',caption: 'Multiple screens and controllers' },
  { src: '/van/lighting.webp',  caption: 'Full LED party lighting inside' },
];

export function PartyVanTour() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent(c => (c - 1 + VAN_IMAGES.length) % VAN_IMAGES.length);
  const next = () => setCurrent(c => (c + 1) % VAN_IMAGES.length);

  return (
    <section className="py-[var(--section-gap)]" style={{ background: 'var(--bg-deep)' }}>
      <Container size="narrow">
        <div className="text-center mb-10">
          <Eyebrow color="violet" className="mb-3">Party Van</Eyebrow>
          <h2 className="font-display font-bold" style={{ fontSize: 'var(--text-h2)', fontFamily: 'var(--font-clash), Georgia, serif' }}>
            Take a look inside
          </h2>
        </div>

        {/* Carousel */}
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-white/5">
          {VAN_IMAGES.map((img, i) => (
            <div
              key={img.src}
              className="absolute inset-0 transition-opacity duration-500"
              style={{ opacity: i === current ? 1 : 0 }}
            >
              <Image src={img.src} alt={img.caption} fill loading="lazy" className="object-cover" sizes="(max-width: 768px) 100vw, 700px" />
            </div>
          ))}
          {/* Controls */}
          <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all" aria-label="Previous">
            <ChevronLeft size={20} />
          </button>
          <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all" aria-label="Next">
            <ChevronRight size={20} />
          </button>
          {/* Caption */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-sm text-white text-center">
            {VAN_IMAGES[current].caption}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {VAN_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="rounded-full transition-all"
              style={{ width: i === current ? 20 : 8, height: 8, background: i === current ? 'var(--neon-violet)' : 'rgba(255,255,255,0.2)' }}
              aria-label={`Image ${i + 1}`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 5: Assemble `src/app/services/page.tsx`**

```tsx
// src/app/services/page.tsx
import type { Metadata } from 'next';
import { SERVICES }         from '@/lib/data/services';
import { ServiceSection }   from '@/components/services/ServiceSection';
import { ServiceAreaMap }   from '@/components/services/ServiceAreaMap';
import { GameLibraryFilter }from '@/components/services/GameLibraryFilter';
import { PartyVanTour }     from '@/components/services/PartyVanTour';
import { CtaBand }          from '@/components/home/CtaBand';
import { Container }        from '@/components/ui/Container';

export const metadata: Metadata = {
  title: 'Services',
  description: '6 ways to glow in Santa Clarita: gaming lounge, VR rental, outdoor movies, party van, silent disco, and after-school club.',
};

export default function ServicesPage() {
  return (
    <>
      {/* Page hero */}
      <section className="pt-32 pb-16" style={{ background: 'var(--bg-deep)' }}>
        <Container size="narrow">
          <div className="text-center">
            <h1 className="font-display font-bold italic" style={{ fontSize: 'var(--text-display)', fontFamily: 'var(--font-clash), Georgia, serif' }}>
              6 Ways to Glow
            </h1>
            <p className="text-[var(--text-dim)] mt-4 text-lg">Choose one. Mix and match. We make it easy.</p>
          </div>
        </Container>
      </section>

      {/* Each service */}
      {SERVICES.map((service, i) => (
        <ServiceSection key={service.id} service={service} index={i} />
      ))}

      {/* Gaming lounge extras */}
      <GameLibraryFilter />

      {/* Party van tour */}
      <PartyVanTour />

      {/* Mobile service area map */}
      <ServiceAreaMap />

      <CtaBand />
    </>
  );
}
```

Create placeholder van images at `public/van/`.

- [ ] **Step 6: Commit**

```bash
git add src/app/services/ src/components/services/ public/van/
git commit -m "feat: Services page — all 6 services, game filter, van tour, service area map"
```

---

## Task 28: After School Club, Gallery, About, Contact Pages

**Files:**
- Create: `src/app/after-school-club/page.tsx`
- Create: `src/app/gallery/page.tsx`
- Create: `src/app/about/page.tsx`
- Create: `src/app/contact/page.tsx`

- [ ] **Step 1: Create After School Club page**

```tsx
// src/app/after-school-club/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Eyebrow }   from '@/components/ui/Eyebrow';
import { CtaBand }   from '@/components/home/CtaBand';

export const metadata: Metadata = {
  title: 'After School Club',
  description: 'Glowhouse Gaming After School Club in Santa Clarita — safe, supervised, and seriously fun. Mon–Fri program for school-age kids.',
};

export default function AfterSchoolClubPage() {
  return (
    <>
      <section className="pt-32 pb-20 min-h-[60svh] flex items-center" style={{ background: 'var(--bg-deep)' }}>
        <Container size="narrow">
          <div className="text-center">
            <Eyebrow color="violet" className="mb-4">After School Club</Eyebrow>
            <h1 className="font-display font-bold italic mb-5"
              style={{ fontSize: 'var(--text-display)', fontFamily: 'var(--font-clash), Georgia, serif' }}>
              The best part of their school day
            </h1>
            <p className="text-[var(--text-dim)] text-lg leading-relaxed mb-8 max-w-xl mx-auto">
              Structured after-school gaming Mon–Fri. Safe, supervised, and seriously fun for school-age kids in Santa Clarita.
            </p>
            <a
              href="https://www.ghgafterschoolclub.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, var(--neon-violet), var(--neon-magenta))' }}
              data-magnetic
            >
              Visit After School Club Site →
            </a>
            <p className="text-xs text-[var(--text-dim)] mt-4">
              Opens ghgafterschoolclub.com — enrollment, schedules, and pricing.
            </p>
          </div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
```

- [ ] **Step 2: Create Gallery page**

Import `PhotoMosaic` (reuse). Add a page hero.

```tsx
// src/app/gallery/page.tsx
import type { Metadata } from 'next';
import { PhotoMosaic } from '@/components/home/PhotoMosaic';
import { CtaBand }     from '@/components/home/CtaBand';
import { Container }   from '@/components/ui/Container';

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Photos and videos from Glowhouse Gaming parties, events, and experiences in Santa Clarita, CA.',
};

export default function GalleryPage() {
  return (
    <>
      <section className="pt-32 pb-4" style={{ background: 'var(--bg-deep)' }}>
        <Container size="narrow">
          <div className="text-center">
            <h1 className="font-display font-bold italic" style={{ fontSize: 'var(--text-display)', fontFamily: 'var(--font-clash), Georgia, serif' }}>
              The best parties glow
            </h1>
          </div>
        </Container>
      </section>
      <PhotoMosaic />
      <CtaBand />
    </>
  );
}
```

- [ ] **Step 3: Create About page**

```tsx
// src/app/about/page.tsx
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Eyebrow }   from '@/components/ui/Eyebrow';
import { CtaBand }   from '@/components/home/CtaBand';
import { TestimonialMarquee } from '@/components/home/TestimonialMarquee';

export const metadata: Metadata = {
  title: 'Our Story',
  description: 'About Glowhouse Gaming — born in Santa Clarita in 2017, 1,000+ parties hosted, 5.0★ rated entertainment company.',
};

export default function AboutPage() {
  return (
    <>
      <section className="pt-32 pb-20" style={{ background: 'var(--bg-light)' }}>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <Eyebrow color="violet" className="mb-4">Our Story</Eyebrow>
              <h1 className="font-display font-bold mb-6" style={{ fontSize: 'var(--text-display)', fontFamily: 'var(--font-clash), Georgia, serif', color: 'var(--text-dark)' }}>
                Born in Santa Clarita. Powered by passion.
              </h1>
              <p className="text-[var(--text-dark)] opacity-70 leading-relaxed mb-4 text-lg">
                Glowhouse Gaming opened in 2017 with one mission: make group entertainment unforgettable. We started with a single lounge and a belief that the right atmosphere changes everything.
              </p>
              <p className="text-[var(--text-dark)] opacity-70 leading-relaxed mb-4">
                Since then, we've hosted over 1,000 parties, launched 5 distinct service lines, and expanded to cover the entire Santa Clarita Valley with mobile experiences. Every event gets our full attention — from the game lineup to the lighting.
              </p>
              <p className="text-[var(--text-dark)] opacity-70 leading-relaxed mb-8">
                Our team lives in Santa Clarita. We know the valley, we know our clients, and we care deeply about every birthday, every corporate event, and every after-school afternoon we host.
              </p>
              <Link href="/book" className="inline-block px-8 py-3 rounded-full font-bold text-white" style={{ background: 'var(--neon-violet)' }} data-magnetic>
                Book with us
              </Link>
            </div>
            <div className="relative aspect-square rounded-2xl overflow-hidden">
              <Image src="/about/owner-team.webp" alt="Glowhouse Gaming team" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
          </div>
        </Container>
      </section>
      <TestimonialMarquee />
      <CtaBand />
    </>
  );
}
```

- [ ] **Step 4: Create Contact page with FAQ**

```tsx
// src/app/contact/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, MapPin, Clock, Mail } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Eyebrow }   from '@/components/ui/Eyebrow';
import { FaqSnippet }from '@/components/home/FaqSnippet';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact Glowhouse Gaming in Santa Clarita, CA. Call (855) 348-4569, visit us at 25061 Avenue Stanford Ste 40, or send a message.',
};

export default function ContactPage() {
  return (
    <>
      <section className="pt-32 pb-20" style={{ background: 'var(--bg-deep)' }}>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact info */}
            <div>
              <Eyebrow color="cyan" className="mb-4">Get in Touch</Eyebrow>
              <h1 className="font-display font-bold italic mb-8" style={{ fontSize: 'var(--text-display)', fontFamily: 'var(--font-clash), Georgia, serif' }}>
                Let's talk parties
              </h1>
              <ul className="space-y-6">
                <li className="flex gap-4 items-start">
                  <Phone size={20} className="shrink-0 mt-0.5" style={{ color: 'var(--neon-cyan)' }} />
                  <div>
                    <p className="text-sm text-[var(--text-dim)] mb-0.5">Phone</p>
                    <a href="tel:+18553484569" className="font-semibold text-[var(--text-light)] hover:text-[var(--neon-cyan)] transition-colors text-lg">(855) 348-4569</a>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <MapPin size={20} className="shrink-0 mt-0.5" style={{ color: 'var(--neon-cyan)' }} />
                  <div>
                    <p className="text-sm text-[var(--text-dim)] mb-0.5">Address</p>
                    <a href="https://maps.google.com/?q=25061+Avenue+Stanford+Ste+40+Santa+Clarita+CA" target="_blank" rel="noopener" className="font-medium text-[var(--text-light)] hover:text-[var(--neon-cyan)] transition-colors">
                      25061 Avenue Stanford, Ste 40<br />Santa Clarita, CA 91355
                    </a>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <Clock size={20} className="shrink-0 mt-0.5" style={{ color: 'var(--neon-cyan)' }} />
                  <div>
                    <p className="text-sm text-[var(--text-dim)] mb-0.5">Hours</p>
                    <p className="font-medium text-[var(--text-light)]">Monday – Sunday<br />8:00 AM – 7:00 PM</p>
                  </div>
                </li>
              </ul>
              <div className="mt-8">
                <Link href="/book" className="inline-block px-8 py-3 rounded-full font-bold text-white" style={{ background: 'linear-gradient(135deg, var(--neon-cyan), var(--neon-violet))' }} data-magnetic>
                  Book a Party Now
                </Link>
              </div>
            </div>

            {/* Map */}
            <div className="relative aspect-square lg:aspect-auto rounded-2xl overflow-hidden border border-white/5">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3300!2d-118.555!3d34.414!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDI0JzUwLjQiTiAxMTjCsDMzJzE4LjAiVw!5e0!3m2!1sen!2sus!4v1"
                width="100%" height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) saturate(0.7)', minHeight: 400 }}
                allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Glowhouse Gaming location"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ section */}
      <div id="faq">
        <FaqSnippet />
      </div>
    </>
  );
}
```

- [ ] **Step 5: Create minimal Privacy and Terms pages**

```tsx
// src/app/privacy/page.tsx
import { Container } from '@/components/ui/Container';
export default function PrivacyPage() {
  return (
    <section className="pt-32 pb-20 min-h-[60svh]" style={{ background: 'var(--bg-deep)' }}>
      <Container size="narrow">
        <h1 className="font-bold text-2xl text-[var(--text-light)] mb-6">Privacy Policy</h1>
        <p className="text-[var(--text-dim)] text-sm leading-relaxed">
          Glowhouse Gaming respects your privacy. We collect contact information submitted through booking forms solely to process your booking and communicate with you. We do not sell or share your personal information with third parties. Contact us at (855) 348-4569 with any questions.
        </p>
        {/* Expand before launch with full legal policy */}
      </Container>
    </section>
  );
}
```

Copy pattern for `src/app/terms/page.tsx` with equivalent minimal content.

- [ ] **Step 6: Commit all pages**

```bash
git add src/app/after-school-club/ src/app/gallery/ src/app/about/ src/app/contact/ src/app/privacy/ src/app/terms/
git commit -m "feat: inner pages — after school, gallery, about, contact, privacy, terms"
```

---

## Task 29: Booking API Route + Email

**Files:**
- Create: `src/app/api/book/route.ts`
- Test: API with vitest

- [ ] **Step 1: Write failing API test**

```ts
// src/test/api-book.test.ts
import { describe, it, expect, vi } from 'vitest';

// Mock Resend to test logic without real email calls
vi.mock('resend', () => ({
  Resend: vi.fn().mockImplementation(() => ({
    emails: {
      send: vi.fn().mockResolvedValue({ id: 'test-id', error: null }),
    },
  })),
}));

// Import after mock
const { POST } = await import('@/app/api/book/route');

describe('POST /api/book', () => {
  it('returns 400 when required fields missing', async () => {
    const req = new Request('http://localhost/api/book', {
      method: 'POST',
      body: JSON.stringify({ name: 'Test' }), // missing date, service, email, phone
      headers: { 'Content-Type': 'application/json' },
    });
    const res = await POST(req as any);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toBeDefined();
  });

  it('returns 200 with valid booking data', async () => {
    const req = new Request('http://localhost/api/book', {
      method: 'POST',
      body: JSON.stringify({
        date: '2026-06-15',
        service: 'gaming-lounge',
        packageTier: 'premium',
        guestCount: 12,
        name: 'Test Parent',
        email: 'test@example.com',
        phone: '555-1234',
        notes: '',
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    const res = await POST(req as any);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
  });
});
```

Run: `npm test -- api-book`
Expected: FAIL (route doesn't exist yet).

- [ ] **Step 2: Create `src/app/api/book/route.ts`**

```ts
// src/app/api/book/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });

  const { date, service, packageTier, guestCount, name, email, phone, notes } = body;

  if (!date || !service || !name || !email || !phone) {
    return NextResponse.json({ error: 'Missing required fields: date, service, name, email, phone' }, { status: 400 });
  }

  // Basic email validation
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
  }

  const ownerEmail = process.env.OWNER_NOTIFY_EMAIL;
  if (!ownerEmail || !process.env.RESEND_API_KEY) {
    // In dev without env vars, simulate success
    if (process.env.NODE_ENV === 'development') {
      console.log('[DEV] Booking submitted (no email sent):', { name, email, date, service });
      return NextResponse.json({ success: true, dev: true });
    }
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  try {
    // Notify owner
    await resend.emails.send({
      from: 'Glowhouse Gaming <booking@glowhousegaming.com>',
      to: ownerEmail,
      subject: `🎮 New Booking Request — ${service} on ${date}`,
      html: `
        <h2>New Booking Request</h2>
        <table style="border-collapse:collapse;width:100%">
          <tr><td><strong>Date</strong></td><td>${date}</td></tr>
          <tr><td><strong>Service</strong></td><td>${service}</td></tr>
          <tr><td><strong>Package</strong></td><td>${packageTier ?? 'Not selected'}</td></tr>
          <tr><td><strong>Guests</strong></td><td>${guestCount ?? 'Not specified'}</td></tr>
          <tr><td><strong>Name</strong></td><td>${name}</td></tr>
          <tr><td><strong>Email</strong></td><td>${email}</td></tr>
          <tr><td><strong>Phone</strong></td><td>${phone}</td></tr>
          <tr><td><strong>Notes</strong></td><td>${notes ?? 'None'}</td></tr>
        </table>
        <p>Reply to this email or call ${phone} to confirm.</p>
      `,
    });

    // Confirm to guest
    await resend.emails.send({
      from: 'Glowhouse Gaming <booking@glowhousegaming.com>',
      to: email,
      subject: `We got your request, ${name}! 🎮`,
      html: `
        <h2>We received your booking request!</h2>
        <p>Hi ${name},</p>
        <p>Thanks for reaching out! We'll review your request and get back to you within 24 hours to confirm your booking for <strong>${date}</strong>.</p>
        <p><strong>Service:</strong> ${service}</p>
        <p>Questions? Call us at <a href="tel:+18553484569">(855) 348-4569</a> — we're here Mon–Sun 8 AM–7 PM.</p>
        <p>— The Glowhouse Gaming Team</p>
        <p style="font-size:12px;color:#999">25061 Avenue Stanford, Ste 40, Santa Clarita, CA 91355</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Resend error:', error);
    return NextResponse.json({ error: 'Failed to send confirmation' }, { status: 500 });
  }
}
```

- [ ] **Step 3: Run tests**

```bash
npm test -- api-book
```

Expected: 2 tests pass.

- [ ] **Step 4: Commit**

```bash
git add src/app/api/book/ src/test/api-book.test.ts
git commit -m "feat: booking API route with Resend email + validation tests"
```

---

## Task 30: BookingWizard + Book Page

**Files:**
- Create: `src/components/book/BookingWizard.tsx`
- Create: `src/components/book/BookingConfirmationBurst.tsx`
- Create: `src/app/book/page.tsx`

- [ ] **Step 1: Create `BookingConfirmationBurst.tsx`**

```tsx
// src/components/book/BookingConfirmationBurst.tsx
'use client';

import { useEffect, useRef } from 'react';

const PARTICLES = ['🎮','🎉','✨','🕹️','🎂','💜','⚡','🎊'];

export function BookingConfirmationBurst({ eventName }: { eventName: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = Array.from({ length: 60 }, () => ({
      x: canvas.width  / 2 + (Math.random() - 0.5) * 200,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 12,
      vy: -Math.random() * 14 - 4,
      emoji: PARTICLES[Math.floor(Math.random() * PARTICLES.length)],
      life: 1,
      decay: 0.01 + Math.random() * 0.01,
      size: 20 + Math.random() * 20,
    }));

    let raf: number;
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.4; // gravity
        p.life -= p.decay;
        if (p.life > 0) {
          alive = true;
          ctx.globalAlpha = p.life;
          ctx.font = `${p.size}px serif`;
          ctx.fillText(p.emoji, p.x, p.y);
        }
      });
      ctx.globalAlpha = 1;
      if (alive) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="fixed inset-0 z-[70] flex flex-col items-center justify-center" style={{ background: 'rgba(10,6,18,0.92)' }}>
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
      <div className="relative z-10 text-center px-6">
        <p className="text-6xl mb-4">🎉</p>
        <h2 className="font-display font-bold text-3xl italic mb-2" style={{ fontFamily: 'var(--font-clash), Georgia, serif', color: 'var(--neon-cyan)' }}>
          You're all set, {eventName}!
        </h2>
        <p className="text-[var(--text-dim)] mb-1">We'll confirm your booking within 24 hours.</p>
        <p className="text-sm text-[var(--text-dim)]">Check your email for a confirmation.</p>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create `BookingWizard.tsx`**

Multi-step form: Step 1 = date + service, Step 2 = package + guest count, Step 3 = contact details. One component, URL param state via `?step=`.

```tsx
// src/components/book/BookingWizard.tsx
'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { SERVICES }  from '@/lib/data/services';
import { PACKAGES }  from '@/lib/data/packages';
import { BookingConfirmationBurst } from './BookingConfirmationBurst';

interface FormData {
  date: string;
  service: string;
  packageTier: string;
  guestCount: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
}

const EMPTY: FormData = { date: '', service: '', packageTier: '', guestCount: '', name: '', email: '', phone: '', notes: '' };

export function BookingWizard() {
  const params          = useSearchParams();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>({
    ...EMPTY,
    date:       params.get('date')    ?? '',
    service:    params.get('service') ?? '',
    packageTier:params.get('package') ?? '',
  });
  const [loading,     setLoading]     = useState(false);
  const [error,       setError]       = useState('');
  const [confirmed,   setConfirmed]   = useState(false);

  const update = (k: keyof FormData, v: string) => setForm(f => ({ ...f, [k]: v }));

  const submitBooking = async () => {
    setLoading(true);
    setError('');
    try {
      const res  = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Booking failed');
      setConfirmed(true);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Something went wrong. Please call (855) 348-4569.');
    } finally {
      setLoading(false);
    }
  };

  if (confirmed) return <BookingConfirmationBurst eventName={form.name} />;

  return (
    <div className="max-w-lg mx-auto">
      {/* Step indicator */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {[1, 2, 3].map(s => (
          <div key={s} className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border transition-all"
              style={step >= s
                ? { background: 'var(--neon-cyan)', borderColor: 'var(--neon-cyan)', color: '#000' }
                : { borderColor: 'rgba(255,255,255,0.15)', color: 'var(--text-dim)' }}
            >
              {s}
            </div>
            {s < 3 && <div className="w-8 h-px" style={{ background: step > s ? 'var(--neon-cyan)' : 'rgba(255,255,255,0.1)' }} />}
          </div>
        ))}
      </div>

      {/* Step 1: Date + Service */}
      {step === 1 && (
        <div className="space-y-5">
          <h2 className="text-xl font-bold text-[var(--text-light)] mb-4">When and what?</h2>
          <div>
            <label className="block text-sm text-[var(--text-dim)] mb-1">Event date *</label>
            <input
              type="date"
              value={form.date}
              onChange={e => update('date', e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full bg-[var(--bg-elevated)] border border-white/10 rounded-xl px-4 py-3 text-[var(--text-light)] outline-none focus:border-[var(--neon-cyan)] transition-colors [color-scheme:dark]"
            />
          </div>
          <div>
            <label className="block text-sm text-[var(--text-dim)] mb-2">Service *</label>
            <div className="grid grid-cols-2 gap-2">
              {SERVICES.map(s => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => update('service', s.id)}
                  className={['text-left px-4 py-3 rounded-xl border text-sm transition-all',
                    form.service === s.id ? 'border-[var(--neon-cyan)] bg-[var(--neon-cyan)]/5 text-[var(--neon-cyan)]' : 'border-white/10 text-[var(--text-dim)] hover:border-white/20',
                  ].join(' ')}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => setStep(2)}
            disabled={!form.date || !form.service}
            className="w-full py-3.5 rounded-xl font-semibold text-white disabled:opacity-40 transition-all"
            style={{ background: 'linear-gradient(135deg, var(--neon-cyan), var(--neon-violet))' }}
          >
            Next: Choose Package →
          </button>
        </div>
      )}

      {/* Step 2: Package + Guest Count */}
      {step === 2 && (
        <div className="space-y-5">
          <h2 className="text-xl font-bold text-[var(--text-light)] mb-4">Package and size</h2>
          <div>
            <label className="block text-sm text-[var(--text-dim)] mb-2">Package (optional)</label>
            <div className="space-y-2">
              {PACKAGES.map(p => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => update('packageTier', p.id)}
                  className={['w-full text-left px-4 py-3 rounded-xl border text-sm transition-all',
                    form.packageTier === p.id ? 'border-[var(--neon-magenta)] bg-[var(--neon-magenta)]/5 text-[var(--neon-magenta)]' : 'border-white/10 text-[var(--text-dim)] hover:border-white/20',
                  ].join(' ')}
                >
                  <span className="font-medium">{p.name}</span>
                  <span className="ml-2 text-xs opacity-70">{p.priceFrom}</span>
                </button>
              ))}
              <button
                type="button"
                onClick={() => update('packageTier', '')}
                className="w-full text-left px-4 py-3 rounded-xl border border-white/10 text-sm text-[var(--text-dim)] hover:border-white/20 transition-all"
              >
                Not sure yet — help me choose
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm text-[var(--text-dim)] mb-1">Estimated guest count</label>
            <input
              type="number"
              value={form.guestCount}
              onChange={e => update('guestCount', e.target.value)}
              placeholder="e.g. 12"
              min="1" max="100"
              className="w-full bg-[var(--bg-elevated)] border border-white/10 rounded-xl px-4 py-3 text-[var(--text-light)] outline-none focus:border-[var(--neon-cyan)] transition-colors"
            />
          </div>
          <div className="flex gap-3">
            <button onClick={() => setStep(1)} className="flex-1 py-3.5 rounded-xl font-medium border border-white/15 text-[var(--text-dim)] hover:border-white/25 transition-all">
              ← Back
            </button>
            <button
              onClick={() => setStep(3)}
              className="flex-1 py-3.5 rounded-xl font-semibold text-white transition-all"
              style={{ background: 'linear-gradient(135deg, var(--neon-cyan), var(--neon-violet))' }}
            >
              Next: Your Info →
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Contact Info */}
      {step === 3 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-[var(--text-light)] mb-4">Your contact details</h2>
          {[
            { key: 'name',  label: 'Full name *',    type: 'text',  placeholder: 'Your name' },
            { key: 'email', label: 'Email *',         type: 'email', placeholder: 'you@example.com' },
            { key: 'phone', label: 'Phone number *',  type: 'tel',   placeholder: '(555) 000-0000' },
          ].map(({ key, label, type, placeholder }) => (
            <div key={key}>
              <label className="block text-sm text-[var(--text-dim)] mb-1">{label}</label>
              <input
                type={type}
                value={form[key as keyof FormData]}
                onChange={e => update(key as keyof FormData, e.target.value)}
                placeholder={placeholder}
                autoComplete={key === 'email' ? 'email' : key === 'phone' ? 'tel' : 'name'}
                className="w-full bg-[var(--bg-elevated)] border border-white/10 rounded-xl px-4 py-3 text-[var(--text-light)] outline-none focus:border-[var(--neon-cyan)] transition-colors placeholder-[var(--text-dim)]"
              />
            </div>
          ))}
          <div>
            <label className="block text-sm text-[var(--text-dim)] mb-1">Notes / special requests</label>
            <textarea
              value={form.notes}
              onChange={e => update('notes', e.target.value)}
              rows={3}
              placeholder="Age range, theme, dietary needs, etc."
              className="w-full bg-[var(--bg-elevated)] border border-white/10 rounded-xl px-4 py-3 text-[var(--text-light)] outline-none focus:border-[var(--neon-cyan)] transition-colors resize-none placeholder-[var(--text-dim)]"
            />
          </div>
          {error && <p className="text-sm text-red-400 bg-red-400/10 px-3 py-2 rounded-lg">{error}</p>}
          <div className="flex gap-3 pt-2">
            <button onClick={() => setStep(2)} className="flex-1 py-3.5 rounded-xl font-medium border border-white/15 text-[var(--text-dim)] hover:border-white/25 transition-all">
              ← Back
            </button>
            <button
              onClick={submitBooking}
              disabled={!form.name || !form.email || !form.phone || loading}
              className="flex-1 py-3.5 rounded-xl font-bold text-white disabled:opacity-40 transition-all"
              style={{ background: 'linear-gradient(135deg, var(--neon-magenta), var(--neon-violet))' }}
            >
              {loading ? 'Sending...' : 'Submit Request 🎮'}
            </button>
          </div>
          <p className="text-xs text-center text-[var(--text-dim)]">
            We'll confirm within 24 hours. Or call <a href="tel:+18553484569" className="underline">(855) 348-4569</a> to book immediately.
          </p>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Create `src/app/book/page.tsx`**

```tsx
// src/app/book/page.tsx
import type { Metadata } from 'next';
import { Suspense }       from 'react';
import { BookingWizard }  from '@/components/book/BookingWizard';
import { Container }      from '@/components/ui/Container';

export const metadata: Metadata = {
  title: 'Book a Party',
  description: 'Book a birthday party or event at Glowhouse Gaming in Santa Clarita, CA.',
};

export default function BookPage() {
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
          {/* Suspense required for useSearchParams */}
          <Suspense fallback={<div className="py-12 text-center text-[var(--text-dim)]">Loading...</div>}>
            <BookingWizard />
          </Suspense>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 4: Write Playwright booking test**

```ts
// tests/booking.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Booking wizard', () => {
  test('shows step 1 on load', async ({ page }) => {
    await page.goto('/book');
    await expect(page.locator('text=When and what?')).toBeVisible();
  });

  test('step 1 next button disabled without date and service', async ({ page }) => {
    await page.goto('/book');
    const next = page.locator('button', { hasText: 'Next: Choose Package' });
    await expect(next).toBeDisabled();
  });

  test('can advance to step 2 with date and service', async ({ page }) => {
    await page.goto('/book');
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
    await page.locator('input[type="date"]').fill(tomorrow);
    await page.locator('button', { hasText: 'Premium Gaming Lounge' }).click();
    await page.locator('button', { hasText: 'Next: Choose Package' }).click();
    await expect(page.locator('text=Package and size')).toBeVisible();
  });

  test('no horizontal overflow on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/book');
    const w = await page.evaluate(() => document.body.scrollWidth);
    expect(w).toBeLessThanOrEqual(376);
  });
});
```

Run: `npm run test:e2e -- tests/booking.spec.ts`
Expected: 4 tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/app/api/book/ src/components/book/ src/app/book/ tests/booking.spec.ts
git commit -m "feat: booking wizard, confirmation burst, book API route"
```

---

## Task 31: AI Chat Widget (Sparks)

**Files:**
- Create: `src/app/api/chat/route.ts`
- Create: `src/components/chat/ChatWidget.tsx`

- [ ] **Step 1: Write failing API test**

```ts
// src/test/api-chat.test.ts
import { describe, it, expect, vi } from 'vitest';

vi.mock('@anthropic-ai/sdk', () => ({
  default: vi.fn().mockImplementation(() => ({
    messages: {
      create: vi.fn().mockResolvedValue({
        content: [{ type: 'text', text: 'Hi! I\'m Sparks.' }],
      }),
    },
  })),
}));

const { POST } = await import('@/app/api/chat/route');

describe('POST /api/chat', () => {
  it('returns 400 for missing messages', async () => {
    const req = new Request('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({}),
      headers: { 'Content-Type': 'application/json' },
    });
    const res = await POST(req as any);
    expect(res.status).toBe(400);
  });

  it('returns 400 when message count exceeds limit', async () => {
    const tooMany = Array.from({ length: 15 }, (_, i) => ({ role: 'user', content: `msg ${i}` }));
    const req = new Request('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({ messages: tooMany }),
      headers: { 'Content-Type': 'application/json' },
    });
    const res = await POST(req as any);
    expect(res.status).toBe(400);
  });

  it('returns reply for valid messages', async () => {
    const req = new Request('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({ messages: [{ role: 'user', content: 'Hello' }] }),
      headers: { 'Content-Type': 'application/json' },
    });
    const res = await POST(req as any);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(typeof body.reply).toBe('string');
  });
});
```

Run: `npm test -- api-chat`
Expected: FAIL (route not created).

- [ ] **Step 2: Create `src/app/api/chat/route.ts`**

```ts
// src/app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const client    = new Anthropic();
const MAX_TURNS = 12;

const SYSTEM = `You are Sparks, the party planning concierge at Glowhouse Gaming in Santa Clarita, CA.
Your job: help parents and event planners find the perfect experience, answer questions, and guide them to book.

Glowhouse Gaming offers 6 services:
1. Premium Gaming Lounge — 2-hour sessions at our glow-in-the-dark venue at 25061 Avenue Stanford, Ste 40, Santa Clarita, CA. Up to 20 guests, 4+ screens, consoles, VR.
2. Console & VR Home Rental — PS5, Switch, VR headsets delivered to your home. Setup included.
3. Outdoor Movie Night — 12ft projection screen + wireless speakers delivered to your backyard.
4. Party Van — mobile entertainment vehicle parked at your event. Screens + consoles + LED lighting.
5. Silent Disco — wireless headphones, 3 music channels, LED wristbands. Up to 50 guests.
6. After School Club — Mon-Fri program for school-age kids. See ghgafterschoolclub.com.

Hours: Mon–Sun 8 AM–7 PM. Phone: (855) 348-4569.
Service area (mobile): Santa Clarita, Valencia, Newhall, Stevenson Ranch, Canyon Country.

Rules:
- Keep responses SHORT: 2–3 sentences max.
- Be warm, fun, and helpful. Match the energy of a birthday party.
- NEVER make up pricing. Say: "For current pricing, call us at (855) 348-4569."
- If they seem ready to book: direct them to /book to submit a request.
- If they mention a specific age: suggest games appropriate for that age.`;

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body?.messages) return NextResponse.json({ error: 'Missing messages' }, { status: 400 });
  if (body.messages.length > MAX_TURNS) return NextResponse.json({ error: 'Too many messages' }, { status: 400 });

  const response = await client.messages.create({
    model: 'claude-haiku-4-5',
    max_tokens: 256,
    system: SYSTEM,
    messages: body.messages,
  });

  const reply = response.content[0]?.type === 'text' ? response.content[0].text : '';
  return NextResponse.json({ reply });
}
```

- [ ] **Step 3: Run tests**

```bash
npm test -- api-chat
```

Expected: 3 tests pass.

- [ ] **Step 4: Create `ChatWidget.tsx`**

```tsx
// src/components/chat/ChatWidget.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function ChatWidget() {
  const [open,     setOpen]     = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hey! I'm Sparks ⚡ — Glowhouse Gaming's party concierge. What kind of party are you planning?" }
  ]);
  const [input,   setInput]   = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef             = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg: Message = { role: 'user', content: input.trim() };
    setMessages(m => [...m, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res  = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content })) }),
      });
      const data = await res.json();
      setMessages(m => [...m, { role: 'assistant', content: data.reply || 'Sorry, I had trouble responding. Call us at (855) 348-4569!' }]);
    } catch {
      setMessages(m => [...m, { role: 'assistant', content: 'Something went wrong. Call us at (855) 348-4569!' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    /* chat-widget class: exempts from cursor: none (per globals.css) */
    <div className="chat-widget fixed bottom-20 right-4 z-50 lg:bottom-6">
      {/* Bubble trigger */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 px-4 py-3 rounded-full font-semibold text-white shadow-lg transition-all hover:scale-105"
          style={{ background: 'linear-gradient(135deg, var(--neon-cyan), var(--neon-violet))' }}
          aria-label="Chat with Sparks, our party concierge"
        >
          <MessageCircle size={18} />
          <span className="text-sm">Chat with Sparks</span>
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div
          className="flex flex-col rounded-2xl border border-white/10 shadow-2xl"
          style={{
            width: 320,
            height: 460,
            background: 'var(--bg-elevated)',
            // Full-screen on mobile
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: 'linear-gradient(135deg, var(--neon-cyan), var(--neon-violet))' }}>S</div>
              <div>
                <p className="text-sm font-semibold text-[var(--text-light)]">Sparks ⚡</p>
                <p className="text-xs text-[var(--text-dim)]">Party concierge</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-[var(--text-dim)] hover:text-[var(--text-light)] transition-colors" aria-label="Close chat">
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className="max-w-[85%] text-sm rounded-2xl px-3 py-2 leading-relaxed"
                  style={m.role === 'user'
                    ? { background: 'var(--neon-violet)', color: '#fff' }
                    : { background: 'var(--bg-deep)', color: 'var(--text-light)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-[var(--bg-deep)] border border-white/7 rounded-2xl px-3 py-2 text-sm text-[var(--text-dim)]">
                  Sparks is typing...
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-white/5">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && send()}
                placeholder="Ask about parties..."
                className="flex-1 bg-[var(--bg-deep)] border border-white/10 rounded-xl px-3 py-2 text-sm text-[var(--text-light)] outline-none focus:border-[var(--neon-cyan)] placeholder-[var(--text-dim)] transition-colors"
                aria-label="Message Sparks"
              />
              <button
                onClick={send}
                disabled={!input.trim() || loading}
                className="p-2 rounded-xl disabled:opacity-40 transition-all"
                style={{ background: 'var(--neon-cyan)', color: '#000' }}
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 5: Add `ChatWidget` to root layout**

Open `src/app/layout.tsx` and add `ChatWidget` to the layout body (import + render after `AccessibilityMenu`):

```tsx
import { ChatWidget } from '@/components/chat/ChatWidget';
// ...
<AccessibilityMenu />
<ChatWidget />
```

- [ ] **Step 6: Run chat API tests**

```bash
npm test
```

Expected: all tests pass.

- [ ] **Step 7: Commit**

```bash
git add src/app/api/chat/ src/components/chat/ src/test/api-chat.test.ts
git commit -m "feat: Sparks AI chat widget (claude-haiku-4-5, 12-msg cap)"
```

---

## Task 32: Decap CMS Setup

- [ ] **Step 1: Install and configure Decap CMS**

Create `public/admin/index.html`:

```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="noindex" />
  <title>Glowhouse Gaming — CMS</title>
  <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
</head>
<body>
  <script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"></script>
</body>
</html>
```

Create `public/admin/config.yml`:

```yaml
backend:
  name: github
  repo: marquestudioco/glowhouse-gaming
  branch: main

media_folder: public/uploads
public_folder: /uploads

collections:
  - name: testimonials
    label: Testimonials
    folder: src/lib/data/cms/testimonials
    create: true
    slug: "{{slug}}"
    fields:
      - { name: id,     label: ID,    widget: string }
      - { name: name,   label: Name,  widget: string }
      - { name: role,   label: Role,  widget: string }
      - { name: text,   label: Quote, widget: text }
      - { name: source, label: Source, widget: select, options: [yelp, facebook, google] }

  - name: faq
    label: FAQ Items
    folder: src/lib/data/cms/faq
    create: true
    slug: "{{slug}}"
    fields:
      - { name: id,       label: ID,       widget: string }
      - { name: question, label: Question, widget: string }
      - { name: answer,   label: Answer,   widget: text }
      - { name: category, label: Category, widget: select, options: [booking, birthday, mobile, afterschool] }

  - name: settings
    label: Site Settings
    files:
      - name: contact
        label: Contact Info
        file: src/lib/data/cms/settings/contact.json
        fields:
          - { name: phone,   label: Phone,   widget: string }
          - { name: address, label: Address, widget: string }
          - { name: hoursWeekday, label: Hours (Weekday), widget: string }
          - { name: hoursWeekend, label: Hours (Weekend), widget: string }
```

- [ ] **Step 2: Add GitHub OAuth setup note**

CMS auth requires a GitHub OAuth app. Add to `CLAUDE.md` open items:
- Create GitHub OAuth App at github.com/settings/developers
- Set Authorization callback URL to `https://api.netlify.com/auth/done`
- Add Client ID + Secret to Cloudflare secrets: `wrangler secret put GITHUB_CLIENT_ID`

- [ ] **Step 3: Commit CMS config**

```bash
git add public/admin/
git commit -m "feat: Decap CMS — admin config for testimonials, FAQ, contact settings"
```

---

## Task 33: Performance & Accessibility Audit Pass

- [ ] **Step 1: Run TypeScript check**

```bash
npx tsc --noEmit
```

Expected: 0 errors.

- [ ] **Step 2: Run all unit tests**

```bash
npm test
```

Expected: all tests pass.

- [ ] **Step 3: Run full Playwright suite**

```bash
npm run test:e2e
```

Expected: all tests pass on both desktop and mobile viewports.

- [ ] **Step 4: Mobile overflow audit**

```bash
npx playwright test --grep "horizontal overflow"
```

Expected: pass on all pages (layout, home, birthday, booking).

- [ ] **Step 5: Check reduced-motion compliance**

In Chrome DevTools → Rendering → Emulate prefers-reduced-motion: reduce.
Verify:
- Hero scene cycle doesn't auto-play (scenes are static)
- Marquee is still (paused — add `@media (prefers-reduced-motion: reduce) { .marquee { animation-play-state: paused; } }` to globals.css)
- CountUp jumps to final value
- Route curtain doesn't fire
- Cursor trail is hidden

Add to `globals.css`:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 6: Touch target audit**

Every interactive element (buttons, links, inputs) must have min 44×44px tap area. Add `min-h-[44px] min-w-[44px]` to any small elements.

- [ ] **Step 7: Verify all phone links are tel: links**

```bash
npx playwright evaluate --browser=chromium http://localhost:3014 "Array.from(document.querySelectorAll('a')).filter(a => a.textContent.includes('348-4569') && !a.href.startsWith('tel:')).map(a => a.outerHTML)"
```

Expected: empty array (all phone number links use `tel:`).

- [ ] **Step 8: Commit accessibility fixes**

```bash
git add src/ public/
git commit -m "fix: reduced-motion, touch targets, phone tel: links — accessibility pass"
```

---

## Task 34: Final Cloudflare Deploy & Live Verification

- [ ] **Step 1: Set production secrets on Cloudflare**

```bash
wrangler secret put ANTHROPIC_API_KEY
wrangler secret put RESEND_API_KEY
wrangler secret put OWNER_NOTIFY_EMAIL
```

Enter the real values when prompted.

- [ ] **Step 2: Build and deploy to Cloudflare Workers**

```bash
npm run cf:build && npm run cf:deploy
```

Expected: Build succeeds, deploys to `https://glowhouse-gaming.marquestudio.workers.dev`.

- [ ] **Step 3: Run Playwright against live URL**

Update `playwright.config.ts` temporarily to target the live URL, or create a separate config:

```ts
// playwright.cloudflare.config.ts
import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  use: { baseURL: 'https://glowhouse-gaming.marquestudio.workers.dev' },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile',  use: { ...devices['iPhone 13'] } },
  ],
});
```

```bash
npx playwright test --config=playwright.cloudflare.config.ts
```

Expected: all tests pass on live URL.

- [ ] **Step 4: Visual parity check — screenshot key pages**

```bash
npx playwright screenshot --browser=chromium https://glowhouse-gaming.marquestudio.workers.dev/ --output=screenshots/live-home-desktop.png
npx playwright screenshot --browser=chromium --viewport-size=375,812 https://glowhouse-gaming.marquestudio.workers.dev/ --output=screenshots/live-home-mobile.png
```

Compare to localhost screenshots. Confirm:
- Fonts render identically
- Hero images load (no 404)
- Marquee scrolls smoothly, not 5000px wide
- GlowTrailCursor absent on mobile simulation
- No visible CLS (layout shift) on load

- [ ] **Step 5: Run Lighthouse on live URL**

```bash
npx lighthouse https://glowhouse-gaming.marquestudio.workers.dev --output json --output html --output-path ./lighthouse-report
```

Expected: Performance ≥ 90 mobile, Accessibility ≥ 95, Best Practices = 100, SEO ≥ 95.

If Performance < 90: identify LCP, TBT, CLS culprits from the report and fix before final commit.

- [ ] **Step 6: Update CLAUDE.md with final project state**

```markdown
## Current State

**Status:** deployed
**Last completed:** Full site build — home page, all inner pages, booking flow, AI chat, Decap CMS
**Live URL:** https://glowhouse-gaming.marquestudio.workers.dev
**Custom domain:** TBD — glowhousegaming.com (DNS migration pending)
**Next up:** 
  - Replace placeholder photos with real Yelp/Instagram photos
  - Add real pricing from owner
  - Configure custom domain in Cloudflare
  - Fill in owner photo + birthday host photo
  - Complete Decap CMS GitHub OAuth setup
**Known issues:** none — all Playwright tests passing
```

- [ ] **Step 7: Final commit and GitHub push**

```bash
git add .
git commit -m "feat: full Glowhouse Gaming site — deployed to Cloudflare Workers"
git remote add origin https://github.com/marquestudioco/glowhouse-gaming
git branch -M main
git push -u origin main
```

---

## Spec Self-Review Checklist

Verifying plan coverage against `docs/superpowers/specs/2026-05-05-glowhouse-gaming-design.md`:

| Spec Requirement | Plan Coverage |
|---|---|
| 6 service lines | ✅ Task 3, 16, 17, 27 |
| Birthday Parties dedicated landing | ✅ Task 26 |
| Services page | ✅ Task 27 |
| After School Club page | ✅ Task 28 |
| Gallery page | ✅ Task 28 |
| About page | ✅ Task 28 |
| Contact page | ✅ Task 28 |
| Book page + wizard | ✅ Task 30 |
| Wow #1 — hero neon line-draw + scene cycle | ✅ Tasks 13–14 |
| Wow #2 — glow trail cursor + magnetic | ✅ Task 18 |
| Wow #3 — horizontal scrubber | ✅ Task 17 |
| Booking confirmation burst | ✅ Task 30 |
| DatePickerHero | ✅ Task 14 |
| TrustStatStrip with CountUp | ✅ Task 15 |
| ServicesGrid | ✅ Task 16 |
| PhotoMosaic + lightbox | ✅ Task 19 |
| TestimonialMarquee (CSS) | ✅ Task 20 |
| PackagesTeaser | ✅ Task 21 |
| BirthdaySpotlight | ✅ Task 21 |
| AboutTeaser | ✅ Task 21 |
| FaqSnippet | ✅ Task 21 |
| CtaBand | ✅ Task 21 |
| ServiceAreaMap | ✅ Task 27 |
| GameLibraryFilter | ✅ Task 27 |
| PartyVanTour | ✅ Task 27 |
| BirthdayHostCard | ✅ Task 26 |
| WhatsIncludedTable | ✅ Task 26 |
| AI Chat (Sparks, claude-haiku-4-5, 12-msg cap) | ✅ Task 31 |
| Booking API + Resend email | ✅ Task 29 |
| Decap CMS | ✅ Task 32 |
| Cloudflare Workers deploy | ✅ Tasks 1, 34 |
| Glass nav | ✅ Task 6 |
| Footer | ✅ Task 7 |
| Sticky mobile CTA | ✅ Task 8 |
| Route transition curtain | ✅ Task 9 |
| Accessibility menu | ✅ Task 9 |
| SmoothScroll (desktop only) | ✅ Task 5 |
| Favicon | ✅ Task 10 |
| Mobile rules (all 5) | ✅ Applied throughout |
| Cloudflare parity rules | ✅ Applied throughout |
| Playwright validation | ✅ Tasks 12, 23, 26, 30, 33, 34 |
| Privacy + Terms pages | ✅ Task 28 |
| SEO metadata | ✅ All page.tsx files |
| Reduced-motion compliance | ✅ Task 33 |

All spec requirements covered. No gaps.

---

**All 3 parts complete. The full Glowhouse Gaming site is built, tested, and deployed.**

**Handoff to client:**
- Live: `https://glowhouse-gaming.marquestudio.workers.dev`
- CMS: `/admin`
- Open items: real photos, pricing, custom domain, owner photo, birthday host photo, GitHub OAuth for CMS
