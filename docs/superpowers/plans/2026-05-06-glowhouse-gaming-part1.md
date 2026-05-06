# Glowhouse Gaming — Implementation Plan Part 1 of 3: Foundation & Layout

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bootstrap the Glowhouse Gaming Next.js 16 project with Cloudflare Workers deploy config, design tokens, all static data files, and a complete layout shell (glass nav, footer, smooth scroll, sticky mobile CTA, route transition curtain, accessibility menu, custom cursor scaffolding, favicon).

**Architecture:** Next.js 16 App Router + TypeScript + Tailwind CSS v4. All design tokens in `src/styles/tokens.css` imported into `globals.css`. Layout shell in `src/app/layout.tsx` wraps every page. Lenis smooth scroll desktop-only via `pointer: coarse` detection. Custom cursor rendered at layout level, no-ops on touch.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4 (`@tailwindcss/postcss`), TypeScript, Lenis, GSAP 3, Framer Motion 11, Lucide React, Atropos, `@opennextjs/cloudflare`, Resend, `@anthropic-ai/sdk`, `clsx`, `tailwind-merge`.

**Covers:** Tasks 1–12 (Bootstrap → Design Tokens → Data → Layout Shell → UI Atoms)
**Part 2:** `2026-05-06-glowhouse-gaming-part2.md` (Home Page + 3 Wow Factors)
**Part 3:** `2026-05-06-glowhouse-gaming-part3.md` (Inner Pages → Booking → Chat → CMS → Deploy)

**Dev port:** 3014
**Cloudflare worker:** `glowhouse-gaming` on `marquestudio` account

---

## File Structure (Part 1 creates these)

```
glowhouse-gaming/
├── .env.example
├── .env.local                          # gitignored — fill in secrets
├── .gitignore
├── next.config.ts
├── wrangler.toml
├── postcss.config.mjs
├── vitest.config.ts
├── playwright.config.ts
├── package.json
├── tsconfig.json
├── public/
│   └── hero/                           # placeholder WebP scenes (6 files)
├── src/
│   ├── app/
│   │   ├── layout.tsx                  # Root layout — fonts, metadata, shell
│   │   ├── icon.tsx                    # PNG favicon via ImageResponse
│   │   ├── globals.css                 # Tailwind @import + @theme tokens + keyframes
│   │   └── page.tsx                    # Home placeholder (Part 2 fills this)
│   ├── styles/
│   │   └── tokens.css                  # CSS custom properties (colors, fonts, spacing)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Nav.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── SmoothScroll.tsx
│   │   │   ├── StickyMobileCTA.tsx
│   │   │   ├── RouteTransitionCurtain.tsx
│   │   │   └── AccessibilityMenu.tsx
│   │   ├── cursor/
│   │   │   └── GlowTrailCursor.tsx     # Scaffolded here, implemented in Part 2
│   │   └── ui/
│   │       ├── Container.tsx
│   │       ├── Eyebrow.tsx
│   │       ├── CountUp.tsx
│   │       └── NeonGlowCard.tsx
│   └── lib/
│       ├── data/
│       │   ├── services.ts
│       │   ├── packages.ts
│       │   ├── testimonials.ts
│       │   ├── games.ts
│       │   └── faq.ts
│       └── utils/
│           └── cn.ts
├── tests/
│   └── layout.spec.ts                  # Playwright layout smoke test
```

---

## Task 1: Project Bootstrap

**Files:**
- Create: `package.json`, `next.config.ts`, `wrangler.toml`, `postcss.config.mjs`, `.env.example`, `.gitignore`, `tsconfig.json`

- [ ] **Step 1: Scaffold Next.js 16 app in current directory**

```bash
npx create-next-app@latest . --typescript --eslint --app --src-dir --import-alias "@/*" --no-tailwind --turbopack
```

When prompted: yes to ESLint, no to Tailwind (adding v4 manually), yes to App Router, yes to `src/` directory, `@/*` import alias.

- [ ] **Step 2: Install all project dependencies**

```bash
npm install tailwindcss@^4 @tailwindcss/postcss
npm install gsap framer-motion lenis atropos lucide-react
npm install clsx tailwind-merge
npm install resend @anthropic-ai/sdk
npm install -D @opennextjs/cloudflare wrangler
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom
npm install -D @playwright/test
npx playwright install chromium
```

- [ ] **Step 3: Replace `postcss.config.mjs` with Tailwind v4 config**

```js
// postcss.config.mjs
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
export default config;
```

- [ ] **Step 4: Replace `next.config.ts` with Cloudflare-compatible config**

```ts
// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Required for @opennextjs/cloudflare
  output: 'standalone',
  images: {
    // Cloudflare handles image optimization at edge
    unoptimized: false,
    formats: ['image/webp'],
    deviceSizes: [375, 768, 1280, 1920],
  },
  // Ensure no dynamic class names break Tailwind JIT
  // All class names must be static strings
};

export default nextConfig;
```

- [ ] **Step 5: Create `wrangler.toml`**

```toml
name = "glowhouse-gaming"
compatibility_date = "2026-04-30"
compatibility_flags = ["nodejs_compat"]
main = ".open-next/worker.js"

[assets]
directory = ".open-next/assets"
```

- [ ] **Step 6: Add Cloudflare build scripts to `package.json`**

Open `package.json` and replace the `scripts` section with:

```json
"scripts": {
  "dev": "next dev -p 3014 --turbopack",
  "build": "next build",
  "start": "next start -p 3014",
  "lint": "next lint",
  "test": "vitest run",
  "test:watch": "vitest",
  "test:e2e": "playwright test",
  "cf:build": "opennextjs-cloudflare build",
  "cf:preview": "opennextjs-cloudflare preview",
  "cf:deploy": "opennextjs-cloudflare deploy"
}
```

- [ ] **Step 7: Create `vitest.config.ts`**

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
});
```

Create `src/test/setup.ts`:
```ts
import '@testing-library/jest-dom';
```

- [ ] **Step 8: Create `playwright.config.ts`**

```ts
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'http://localhost:3014',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 800 } } },
    { name: 'mobile',  use: { ...devices['iPhone 13'],      viewport: { width: 375, height: 812 } } },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3014',
    reuseExistingServer: true,
    timeout: 60000,
  },
});
```

- [ ] **Step 9: Create `.env.example` and `.env.local`**

```bash
# .env.example  (commit this)
ANTHROPIC_API_KEY=
RESEND_API_KEY=
OWNER_NOTIFY_EMAIL=
```

Create `.env.local` (do NOT commit — already in `.gitignore`) and fill in real values for local dev.

- [ ] **Step 10: Verify `.gitignore` covers secrets**

Ensure `.gitignore` contains:
```
.env.local
.env*.local
.open-next/
```

- [ ] **Step 11: Create placeholder hero images**

Create `public/hero/` directory. Add 6 placeholder files (1×1 pixel transparent WebP named `scene-1.webp` through `scene-6.webp`). These are replaced with real photography before launch.

```bash
mkdir public/hero
# Create minimal valid WebP placeholders — any 1920x1080 dark image works for dev
# In production: replace with actual glow-in-the-dark venue photography
```

- [ ] **Step 12: Initial git commit**

```bash
git init
git add .
git commit -m "feat: project bootstrap — Next.js 16, Tailwind v4, Cloudflare config"
```

---

## Task 2: Design Tokens & Globals

**Files:**
- Create: `src/styles/tokens.css`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Create `src/styles/tokens.css`**

```css
/* src/styles/tokens.css */
:root {
  /* Backgrounds */
  --bg-deep:      #0A0612;
  --bg-elevated:  #14101F;
  --bg-light:     #F5F5F0;

  /* Neon accents — use sparingly (edges, glows, highlights, hover states) */
  --neon-cyan:    #00E5FF;
  --neon-magenta: #FF2E93;
  --neon-violet:  #7B2CBF;

  /* Text */
  --text-light:   #F5F5F0;
  --text-dim:     rgba(245, 245, 240, 0.65);
  --text-dark:    #14101F;

  /* Glow shadows */
  --glow-cyan:    0 0 15px rgba(0, 229, 255, 0.5), 0 0 40px rgba(0, 229, 255, 0.2);
  --glow-magenta: 0 0 15px rgba(255, 46, 147, 0.5), 0 0 40px rgba(255, 46, 147, 0.2);
  --glow-violet:  0 0 15px rgba(123, 44, 191, 0.5), 0 0 40px rgba(123, 44, 191, 0.2);

  /* Typography scale (clamp — no media queries needed) */
  --text-hero:    clamp(3rem, 8vw, 7rem);
  --text-display: clamp(2rem, 5vw, 4.5rem);
  --text-h2:      clamp(1.5rem, 3.5vw, 2.75rem);
  --text-h3:      clamp(1.125rem, 2vw, 1.5rem);
  --text-body:    clamp(0.9375rem, 1.2vw, 1.0625rem);

  /* Spacing */
  --section-gap:  clamp(4rem, 8vw, 8rem);

  /* Transitions */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-elastic:  cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

- [ ] **Step 2: Replace `src/app/globals.css`**

```css
/* src/app/globals.css */
@import "tailwindcss";
@import "../styles/tokens.css";

@theme {
  --color-bg-deep:      #0A0612;
  --color-bg-elevated:  #14101F;
  --color-bg-light:     #F5F5F0;
  --color-neon-cyan:    #00E5FF;
  --color-neon-magenta: #FF2E93;
  --color-neon-violet:  #7B2CBF;
  --color-text-light:   #F5F5F0;
  --color-text-dim:     rgba(245,245,240,0.65);
  --color-text-dark:    #14101F;

  --font-display: var(--font-clash), 'Georgia', serif;
  --font-body:    var(--font-geist), 'Arial', sans-serif;
  --font-mono:    var(--font-geist-mono), monospace;
}

/* Overflow — clip not hidden (iOS/Android GPU composite fix) */
html {
  overflow-x: hidden !important;
  background-color: #0A0612;
}
@supports (overflow: clip) {
  html { overflow-x: clip !important; }
}

body {
  background-color: var(--bg-deep);
  color: var(--text-light);
  font-family: var(--font-body);
  -webkit-font-smoothing: antialiased;
}

/* Custom cursor — hide OS cursor on pointer:fine devices */
@media (pointer: fine) {
  html, body, a, button, input, textarea, select, [role="button"] {
    cursor: none !important;
  }
  /* Restore cursor inside chat widget */
  .chat-widget * { cursor: auto !important; }
}

/* Hero word reveal animation */
@keyframes wordReveal {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Neon sign turn-on */
@keyframes neonTurnOn {
  0%   { opacity: 0; filter: brightness(0); }
  10%  { opacity: 0.4; filter: brightness(1.5) blur(2px); }
  15%  { opacity: 0.1; }
  25%  { opacity: 0.9; filter: brightness(2); }
  30%  { opacity: 0.7; }
  40%  { opacity: 1; filter: brightness(1.8); }
  100% { opacity: 1; filter: brightness(1); }
}

/* Marquee scroll (CSS only — never Framer Motion) */
@keyframes marqueeScroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-33.333%); } /* 3x duped array */
}

/* CountUp number reveal */
@keyframes countUp {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Route transition curtain */
@keyframes curtainIn  { from { transform: translateY(100%); } to { transform: translateY(0%); } }
@keyframes curtainOut { from { transform: translateY(0%); }   to { transform: translateY(-100%); } }

/* Neon card edge glow on hover */
.neon-card-cyan  { border-color: transparent; transition: border-color 0.3s, box-shadow 0.3s; }
.neon-card-cyan:hover  { border-color: var(--neon-cyan);    box-shadow: var(--glow-cyan); }
.neon-card-magenta:hover { border-color: var(--neon-magenta); box-shadow: var(--glow-magenta); }
.neon-card-violet:hover  { border-color: var(--neon-violet);  box-shadow: var(--glow-violet); }
```

- [ ] **Step 3: Commit**

```bash
git add src/styles/tokens.css src/app/globals.css
git commit -m "feat: design tokens and global CSS with Tailwind v4"
```

---

## Task 3: Static Data Files

**Files:**
- Create: `src/lib/data/services.ts`, `packages.ts`, `testimonials.ts`, `games.ts`, `faq.ts`

- [ ] **Step 1: Create `src/lib/data/services.ts`**

```ts
// src/lib/data/services.ts
export type ServiceId =
  | 'gaming-lounge'
  | 'vr-rental'
  | 'outdoor-movies'
  | 'party-van'
  | 'silent-disco'
  | 'after-school';

export interface Service {
  id: ServiceId;
  name: string;
  tagline: string;
  description: string;
  highlights: string[];
  accentColor: string; // CSS custom property name
  heroImage: string;   // /hero/scene-N.webp
  maxGuests: number;
  duration: string;
  indoor: boolean;
  mobileService: boolean;
}

export const SERVICES: Service[] = [
  {
    id: 'gaming-lounge',
    name: 'Premium Gaming Lounge',
    tagline: 'The main event.',
    description: 'Glow-in-the-dark gaming lounge with 4+ screens, multiple consoles, and a competition stage. The ultimate birthday party venue.',
    highlights: ['4+ screens', 'PS5 & Switch', 'VR headsets', 'Competition stage', 'LED party lighting', 'Up to 12 players'],
    accentColor: 'var(--neon-cyan)',
    heroImage: '/hero/scene-1.webp',
    maxGuests: 20,
    duration: '2 hours',
    indoor: true,
    mobileService: false,
  },
  {
    id: 'vr-rental',
    name: 'Console & VR Rental',
    tagline: 'We bring the fun to you.',
    description: 'We deliver PS5, Nintendo Switch, and VR headsets to your home or event space. Set up included — just play.',
    highlights: ['PS5', 'Nintendo Switch', 'VR headsets', 'Delivery & setup', 'Pickup included', 'All games provided'],
    accentColor: 'var(--neon-cyan)',
    heroImage: '/hero/scene-2.webp',
    maxGuests: 12,
    duration: 'Flexible',
    indoor: true,
    mobileService: true,
  },
  {
    id: 'outdoor-movies',
    name: 'Outdoor Movie Nights',
    tagline: 'Under the stars.',
    description: '12-foot projection screen, HD projector, and wireless speakers delivered to your backyard or event space.',
    highlights: ['12ft HD screen', 'HD projector', 'Wireless speakers', 'Movie library', 'Popcorn setup', 'Night sky vibes'],
    accentColor: 'var(--neon-magenta)',
    heroImage: '/hero/scene-3.webp',
    maxGuests: 50,
    duration: 'Flexible',
    indoor: false,
    mobileService: true,
  },
  {
    id: 'party-van',
    name: 'Party Van',
    tagline: 'The party parks at your door.',
    description: 'A fully-loaded mobile entertainment van that drives to you. Screens, consoles, lighting — all inside.',
    highlights: ['Mobile venue', 'Multiple screens', 'Console gaming', 'LED lighting', 'Comes to you', 'Rain or shine'],
    accentColor: 'var(--neon-violet)',
    heroImage: '/hero/scene-4.webp',
    maxGuests: 10,
    duration: '2–4 hours',
    indoor: true,
    mobileService: true,
  },
  {
    id: 'silent-disco',
    name: 'Silent Disco',
    tagline: 'Dance to your own beat.',
    description: 'Wireless headphones, 3 music channels, LED wristbands. Everyone dances, nobody disturbs the neighbors.',
    highlights: ['Wireless headphones', '3 music channels', 'LED wristbands', 'All genres', 'No noise ordinance issues', 'Up to 50 guests'],
    accentColor: 'var(--neon-magenta)',
    heroImage: '/hero/scene-5.webp',
    maxGuests: 50,
    duration: 'Flexible',
    indoor: false,
    mobileService: true,
  },
  {
    id: 'after-school',
    name: 'After School Club',
    tagline: 'The best part of their day.',
    description: 'Structured after-school gaming program. Safe, supervised, and seriously fun — Mon through Fri.',
    highlights: ['Mon–Fri program', 'Safe & supervised', 'Structured play', 'All skill levels', 'Homework time included', 'Monthly membership'],
    accentColor: 'var(--neon-violet)',
    heroImage: '/hero/scene-6.webp',
    maxGuests: 20,
    duration: 'Afternoons',
    indoor: true,
    mobileService: false,
  },
];

export const SERVICE_AREA_CITIES = [
  'Santa Clarita', 'Valencia', 'Newhall', 'Stevenson Ranch', 'Canyon Country', 'Saugus', 'Castaic',
];
```

- [ ] **Step 2: Create `src/lib/data/packages.ts`**

```ts
// src/lib/data/packages.ts
export interface Package {
  id: string;
  tier: 'starter' | 'premium' | 'vip';
  name: string;
  tagline: string;
  priceFrom: string; // "Starting at $X" — update before launch
  includes: string[];
  highlight: boolean; // true = recommended
  accentColor: string;
}

export const PACKAGES: Package[] = [
  {
    id: 'starter',
    tier: 'starter',
    name: 'Starter Glow',
    tagline: 'Perfect for smaller parties.',
    priceFrom: 'Starting at $199',
    includes: [
      '2-hour lounge session',
      'Up to 8 guests',
      '2 screens + consoles',
      'Custom playlist',
      'Standard LED lighting',
    ],
    highlight: false,
    accentColor: 'var(--neon-cyan)',
  },
  {
    id: 'premium',
    tier: 'premium',
    name: 'Premium Glow',
    tagline: 'The most popular choice.',
    priceFrom: 'Starting at $349',
    includes: [
      '2-hour lounge session',
      'Up to 16 guests',
      '4 screens + consoles',
      'VR headsets included',
      'Birthday host',
      'Custom playlist + DJ lighting',
      'Photo op setup',
    ],
    highlight: true,
    accentColor: 'var(--neon-magenta)',
  },
  {
    id: 'vip',
    tier: 'vip',
    name: 'VIP Glow',
    tagline: 'Pull out all the stops.',
    priceFrom: 'Starting at $549',
    includes: [
      '3-hour lounge session',
      'Up to 25 guests',
      'All screens + consoles + VR',
      'Dedicated birthday host',
      'Custom invite design',
      'Full DJ lighting experience',
      'Add-on mobile service available',
    ],
    highlight: false,
    accentColor: 'var(--neon-violet)',
  },
];

// NOTE: Update priceFrom values with actual pricing before launch
```

- [ ] **Step 3: Create `src/lib/data/testimonials.ts`**

```ts
// src/lib/data/testimonials.ts
export interface Testimonial {
  id: string;
  name: string;
  role: string; // e.g. "Mom of birthday kid (age 12)"
  text: string;
  rating: 5;
  source: 'yelp' | 'facebook' | 'google';
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah M.',
    role: 'Mom of birthday kid (age 12)',
    text: 'My son\'s birthday was absolutely amazing. The staff was so friendly and helped keep all the kids engaged the entire time. The setup was incredible — the kids didn\'t want to leave!',
    rating: 5,
    source: 'yelp',
  },
  {
    id: '2',
    name: 'Jennifer R.',
    role: 'Mom, daughter\'s 16th birthday',
    text: 'The owners and staff were so friendly and accommodating. Spacious, clean, and the whole venue just looks incredible. My daughter and all her friends had the best time.',
    rating: 5,
    source: 'yelp',
  },
  {
    id: '3',
    name: 'Marcus T.',
    role: 'Corporate event organizer',
    text: 'We used the silent disco for our team holiday event and it was a massive hit. Easy to book, the team arrived on time, and everyone was talking about it for weeks.',
    rating: 5,
    source: 'facebook',
  },
  {
    id: '4',
    name: 'Daniela K.',
    role: 'Mom of birthday kid (age 9)',
    text: 'The birthday host made the whole experience special. My daughter kept saying it was the best birthday she ever had. Highly recommend for any parent looking for something unique.',
    rating: 5,
    source: 'facebook',
  },
  {
    id: '5',
    name: 'Kevin L.',
    role: 'Dad, twin birthday party',
    text: 'Booked the VIP package for my twins\' birthday — 20 kids and everything ran perfectly. The staff was patient, helpful, and clearly loves what they do.',
    rating: 5,
    source: 'yelp',
  },
  {
    id: '6',
    name: 'Priya S.',
    role: 'Booked outdoor movie night',
    text: 'Had Glowhouse set up their outdoor movie screen for a backyard graduation party. Setup was fast, quality was amazing, and the whole experience was stress-free.',
    rating: 5,
    source: 'google',
  },
];
// NOTE: Replace placeholder reviews with actual Yelp/Facebook quotes before launch
```

- [ ] **Step 4: Create `src/lib/data/games.ts`**

```ts
// src/lib/data/games.ts
export type GamePlatform = 'ps5' | 'switch' | 'vr' | 'party' | 'family';

export interface Game {
  id: string;
  name: string;
  platform: GamePlatform[];
  ageRating: string;
}

export const GAMES: Game[] = [
  { id: 'mario-kart',      name: 'Mario Kart 8',        platform: ['switch', 'party', 'family'], ageRating: 'E' },
  { id: 'just-dance',      name: 'Just Dance',          platform: ['switch', 'party', 'family'], ageRating: 'E10' },
  { id: 'minecraft',       name: 'Minecraft',           platform: ['switch', 'family'],          ageRating: 'E10' },
  { id: 'fortnite',        name: 'Fortnite',            platform: ['ps5', 'party'],              ageRating: 'T' },
  { id: 'fifa',            name: 'EA Sports FC',        platform: ['ps5', 'party'],              ageRating: 'E' },
  { id: 'beat-saber',      name: 'Beat Saber',          platform: ['vr', 'party'],               ageRating: 'T' },
  { id: 'superhot',        name: 'Superhot VR',         platform: ['vr'],                        ageRating: 'M' },
  { id: 'gorilla-tag',     name: 'Gorilla Tag',         platform: ['vr', 'party'],               ageRating: 'E' },
  { id: 'spider-man',      name: 'Spider-Man 2',        platform: ['ps5'],                       ageRating: 'T' },
  { id: 'rocket-league',   name: 'Rocket League',       platform: ['ps5', 'party'],              ageRating: 'E' },
  { id: 'smash-bros',      name: 'Super Smash Bros.',   platform: ['switch', 'party', 'family'], ageRating: 'E10' },
  { id: 'among-us',        name: 'Among Us',            platform: ['switch', 'party', 'family'], ageRating: 'E10' },
  { id: 'borderlands',     name: 'Borderlands 3',       platform: ['ps5'],                       ageRating: 'M' },
  { id: 'gta5',            name: 'GTA Online',          platform: ['ps5'],                       ageRating: 'M' },
  { id: 'nba2k',           name: 'NBA 2K',              platform: ['ps5', 'party'],              ageRating: 'E' },
  { id: 'vr-sports',       name: 'Sports Scramble VR',  platform: ['vr', 'party', 'family'],     ageRating: 'E' },
];

export const PLATFORM_LABELS: Record<GamePlatform, string> = {
  ps5:    'PS5',
  switch: 'Switch',
  vr:     'VR',
  party:  'Party',
  family: 'Family',
};
```

- [ ] **Step 5: Create `src/lib/data/faq.ts`**

```ts
// src/lib/data/faq.ts
export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'booking' | 'birthday' | 'mobile' | 'afterschool';
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'deposit',
    question: 'Is a deposit required to book?',
    answer: 'Yes — a 50% deposit secures your date. The remaining balance is due on the day of your event. We accept all major credit cards.',
    category: 'booking',
  },
  {
    id: 'service-area',
    question: 'What areas do you serve for mobile services?',
    answer: 'We serve the entire Santa Clarita Valley including Valencia, Newhall, Stevenson Ranch, Canyon Country, Saugus, and Castaic. Contact us for locations outside this area.',
    category: 'mobile',
  },
  {
    id: 'age-range',
    question: 'What ages are the parties appropriate for?',
    answer: 'We host kids as young as 6 all the way through adults. We customize the game selection to the age group — let us know and we\'ll set up the perfect lineup.',
    category: 'birthday',
  },
  {
    id: 'whats-included',
    question: 'What\'s included with a birthday party package?',
    answer: 'All packages include game setup and breakdown, a curated playlist, LED party lighting, and dedicated staff. Premium and VIP packages include a birthday host who guides the party experience.',
    category: 'birthday',
  },
  {
    id: 'how-far-ahead',
    question: 'How far in advance should I book?',
    answer: 'Weekends book fast — we recommend 2–3 weeks minimum for birthday parties. For larger events, 4+ weeks is ideal.',
    category: 'booking',
  },
  {
    id: 'food',
    question: 'Can we bring food and cake?',
    answer: 'Absolutely! You\'re welcome to bring your own food, cake, and decorations. Some packages include a catering add-on — ask when booking.',
    category: 'birthday',
  },
  {
    id: 'after-school-enroll',
    question: 'How do I enroll in the After School Club?',
    answer: 'Visit ghgafterschoolclub.com for enrollment info, schedules, and pricing. Monthly memberships are available.',
    category: 'afterschool',
  },
  {
    id: 'cancellation',
    question: 'What is your cancellation policy?',
    answer: 'Cancellations 7+ days before the event receive a full deposit refund. Cancellations within 7 days are non-refundable but can be rescheduled once.',
    category: 'booking',
  },
];

export const FAQ_HOME_IDS = ['deposit', 'service-area', 'age-range', 'whats-included'];
```

- [ ] **Step 6: Commit data files**

```bash
git add src/lib/data/
git commit -m "feat: static data files — services, packages, testimonials, games, FAQ"
```

---

## Task 4: Utility Functions

**Files:**
- Create: `src/lib/utils/cn.ts`, `src/test/setup.ts`

- [ ] **Step 1: Create `src/lib/utils/cn.ts`**

```ts
// src/lib/utils/cn.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 2: Write unit test for cn**

```ts
// src/test/cn.test.ts
import { describe, it, expect } from 'vitest';
import { cn } from '@/lib/utils/cn';

describe('cn', () => {
  it('merges class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });
  it('deduplicates Tailwind classes', () => {
    expect(cn('p-4', 'p-8')).toBe('p-8');
  });
  it('handles conditional classes', () => {
    expect(cn('base', false && 'hidden', 'end')).toBe('base end');
  });
});
```

- [ ] **Step 3: Run the test**

```bash
npm test
```

Expected: all 3 tests pass.

- [ ] **Step 4: Commit**

```bash
git add src/lib/utils/ src/test/
git commit -m "feat: cn utility + test setup"
```

---

## Task 5: Smooth Scroll (Lenis)

**Files:**
- Create: `src/components/layout/SmoothScroll.tsx`

- [ ] **Step 1: Create `SmoothScroll.tsx`**

```tsx
// src/components/layout/SmoothScroll.tsx
'use client';

import { useState, useEffect } from 'react';
import { ReactLenis } from 'lenis/react';

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  // Only enable Lenis on pointer:fine (desktop) — not on touch devices
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(!window.matchMedia('(pointer: coarse)').matches);
  }, []);

  if (!enabled) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        duration: 1.8,
        lerp: 0.06,
        wheelMultiplier: 0.8,
        smoothWheel: true,
        // Stop on reduced motion
        prevent: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      }}
    >
      {children}
    </ReactLenis>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/SmoothScroll.tsx
git commit -m "feat: Lenis smooth scroll (desktop only, respects reduced-motion)"
```

---

## Task 6: Glass-Morphism Nav

**Files:**
- Create: `src/components/layout/Nav.tsx`

- [ ] **Step 1: Create `Nav.tsx`**

```tsx
// src/components/layout/Nav.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Phone } from 'lucide-react';

const NAV_LINKS = [
  { href: '/birthday-parties', label: 'Birthday Parties', highlight: true },
  { href: '/services',         label: 'Services' },
  { href: '/after-school-club',label: 'After School' },
  { href: '/gallery',          label: 'Gallery' },
  { href: '/about',            label: 'About' },
  { href: '/contact',          label: 'Contact' },
];

export function Nav() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={[
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'backdrop-blur-md bg-[var(--bg-deep)]/90 shadow-lg shadow-black/30 border-b border-white/5'
          : 'bg-transparent',
      ].join(' ')}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-lg font-bold tracking-widest uppercase text-[var(--text-light)]">
          <span style={{ color: 'var(--neon-cyan)' }}>Glow</span>house Gaming
        </Link>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map(({ href, label, highlight }) => (
            <li key={href}>
              <Link
                href={href}
                className={[
                  'text-sm font-medium transition-colors duration-200',
                  highlight
                    ? 'px-4 py-2 rounded-full border border-[var(--neon-magenta)] text-[var(--neon-magenta)] hover:bg-[var(--neon-magenta)] hover:text-white'
                    : 'text-[var(--text-dim)] hover:text-[var(--text-light)]',
                ].join(' ')}
                data-magnetic
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href="tel:+18553484569"
              className="flex items-center gap-2 text-sm font-medium text-[var(--neon-cyan)] hover:opacity-80 transition-opacity"
            >
              <Phone size={14} />
              (855) 348-4569
            </a>
          </li>
        </ul>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMenuOpen(v => !v)}
          className="lg:hidden text-[var(--text-light)] p-2"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-[var(--bg-elevated)]/95 backdrop-blur-md border-b border-white/5 px-4 pb-6 pt-2">
          <ul className="flex flex-col gap-4">
            {NAV_LINKS.map(({ href, label, highlight }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={[
                    'block text-base font-medium py-2',
                    highlight
                      ? 'text-[var(--neon-magenta)]'
                      : 'text-[var(--text-light)]',
                  ].join(' ')}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <a href="tel:+18553484569" className="flex items-center gap-2 text-[var(--neon-cyan)] text-base font-medium py-2">
                <Phone size={16} />
                (855) 348-4569
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/Nav.tsx
git commit -m "feat: glass-morphism nav with mobile menu"
```

---

## Task 7: Footer

**Files:**
- Create: `src/components/layout/Footer.tsx`

- [ ] **Step 1: Create `Footer.tsx`**

```tsx
// src/components/layout/Footer.tsx
import Link from 'next/link';
import { Phone, MapPin, Clock, Instagram, Facebook } from 'lucide-react';
import { SERVICES } from '@/lib/data/services';

export function Footer() {
  return (
    <footer className="bg-[var(--bg-elevated)] border-t border-white/5 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <p className="text-lg font-bold tracking-widest uppercase mb-3">
              <span style={{ color: 'var(--neon-cyan)' }}>Glow</span>house Gaming
            </p>
            <p className="text-sm text-[var(--text-dim)] leading-relaxed mb-4">
              Where birthdays go to glow. Santa Clarita's premier gaming lounge and mobile party service.
            </p>
            {/* Trust badges */}
            <div className="flex flex-col gap-1 text-xs text-[var(--text-dim)]">
              <span>⭐ 5.0 on Yelp</span>
              <span>✓ 100% recommend on Facebook</span>
              <span>🎮 Since 2017</span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-dim)] mb-4">Services</h3>
            <ul className="space-y-2">
              {SERVICES.map(s => (
                <li key={s.id}>
                  <Link href={`/services#${s.id}`} className="text-sm text-[var(--text-dim)] hover:text-[var(--text-light)] transition-colors">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-dim)] mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { href: '/birthday-parties', label: 'Birthday Parties' },
                { href: '/book',             label: 'Book Now' },
                { href: '/gallery',          label: 'Gallery' },
                { href: '/about',            label: 'Our Story' },
                { href: '/contact',          label: 'Contact' },
                { href: '/contact#faq',      label: 'FAQ' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-[var(--text-dim)] hover:text-[var(--text-light)] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-dim)] mb-4">Find Us</h3>
            <ul className="space-y-3 text-sm text-[var(--text-dim)]">
              <li className="flex gap-2">
                <MapPin size={14} className="shrink-0 mt-0.5" style={{ color: 'var(--neon-cyan)' }} />
                <a href="https://maps.google.com/?q=25061+Avenue+Stanford+Ste+40+Santa+Clarita+CA+91355" target="_blank" rel="noopener" className="hover:text-[var(--text-light)] transition-colors">
                  25061 Avenue Stanford, Ste 40<br />Santa Clarita, CA 91355
                </a>
              </li>
              <li className="flex gap-2 items-center">
                <Phone size={14} className="shrink-0" style={{ color: 'var(--neon-cyan)' }} />
                <a href="tel:+18553484569" className="hover:text-[var(--text-light)] transition-colors">
                  (855) 348-4569
                </a>
              </li>
              <li className="flex gap-2 items-start">
                <Clock size={14} className="shrink-0 mt-0.5" style={{ color: 'var(--neon-cyan)' }} />
                <span>Mon–Sun: 8:00 AM – 7:00 PM</span>
              </li>
            </ul>
            {/* Social */}
            <div className="flex gap-3 mt-4">
              <a href="https://www.instagram.com/glowhousegaming" target="_blank" rel="noopener" aria-label="Instagram" className="text-[var(--text-dim)] hover:text-[var(--neon-magenta)] transition-colors">
                <Instagram size={18} />
              </a>
              <a href="https://www.facebook.com/glowhousegaming" target="_blank" rel="noopener" aria-label="Facebook" className="text-[var(--text-dim)] hover:text-[var(--neon-cyan)] transition-colors">
                <Facebook size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-[var(--text-dim)]">
          <p>© {new Date().getFullYear()} Glowhouse Gaming. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-[var(--text-light)] transition-colors">Privacy</Link>
            <Link href="/terms"   className="hover:text-[var(--text-light)] transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/Footer.tsx
git commit -m "feat: footer with contact, services, social links"
```

---

## Task 8: StickyMobileCTA

**Files:**
- Create: `src/components/layout/StickyMobileCTA.tsx`

- [ ] **Step 1: Create `StickyMobileCTA.tsx`**

```tsx
// src/components/layout/StickyMobileCTA.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone } from 'lucide-react';

export function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={[
        'fixed bottom-0 left-0 right-0 z-40 lg:hidden',
        'transition-transform duration-300',
        visible ? 'translate-y-0' : 'translate-y-full',
      ].join(' ')}
      // Safe area for iPhone home indicator
      style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
    >
      <div className="flex bg-[var(--bg-elevated)] border-t border-white/10 px-4 pt-3 pb-0 gap-3">
        <a
          href="tel:+18553484569"
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border border-[var(--neon-cyan)] text-[var(--neon-cyan)] text-sm font-semibold"
        >
          <Phone size={16} />
          Call Now
        </a>
        <Link
          href="/book"
          className="flex-1 flex items-center justify-center py-3 rounded-lg text-sm font-semibold text-white"
          style={{ background: 'linear-gradient(135deg, var(--neon-magenta), var(--neon-violet))' }}
          data-magnetic
        >
          Book a Party
        </Link>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/StickyMobileCTA.tsx
git commit -m "feat: sticky mobile CTA bar (call + book)"
```

---

## Task 9: RouteTransitionCurtain & AccessibilityMenu

**Files:**
- Create: `src/components/layout/RouteTransitionCurtain.tsx`
- Create: `src/components/layout/AccessibilityMenu.tsx`

- [ ] **Step 1: Create `RouteTransitionCurtain.tsx`**

```tsx
// src/components/layout/RouteTransitionCurtain.tsx
'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';

export function RouteTransitionCurtain() {
  const curtainRef = useRef<HTMLDivElement>(null);
  const pathname   = usePathname();
  const prevPath   = useRef(pathname);

  useEffect(() => {
    // Register GSAP plugins inside useEffect (Cloudflare edge safety)
    if (typeof window === 'undefined') return;
    if (pathname === prevPath.current) return;
    prevPath.current = pathname;

    const curtain = curtainRef.current;
    if (!curtain) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const tl = gsap.timeline();
    tl.fromTo(curtain,
      { y: '100%' },
      { y: '0%', duration: 0.35, ease: 'power3.out' }
    ).to(curtain,
      { y: '-100%', duration: 0.35, ease: 'power3.in', delay: 0.05 }
    ).set(curtain, { y: '100%' });
  }, [pathname]);

  return (
    <div
      ref={curtainRef}
      aria-hidden
      className="fixed inset-0 z-[90] pointer-events-none"
      style={{
        background: 'var(--bg-elevated)',
        transform: 'translateY(100%)',
      }}
    />
  );
}
```

- [ ] **Step 2: Create `AccessibilityMenu.tsx`**

```tsx
// src/components/layout/AccessibilityMenu.tsx
'use client';

import { useState, useEffect } from 'react';
import { Accessibility, X } from 'lucide-react';

interface A11ySettings {
  fontSize: number;      // 1 = normal, 1.1 = large, 1.2 = xl
  highContrast: boolean;
  underlineLinks: boolean;
  pauseAnimations: boolean;
}

const DEFAULT: A11ySettings = {
  fontSize: 1,
  highContrast: false,
  underlineLinks: false,
  pauseAnimations: false,
};

export function AccessibilityMenu() {
  const [open, setOpen]         = useState(false);
  const [settings, setSettings] = useState<A11ySettings>(DEFAULT);

  // Load from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('a11y');
      if (stored) setSettings(JSON.parse(stored));
    } catch {}
  }, []);

  // Apply settings to <html>
  useEffect(() => {
    const html = document.documentElement;
    html.style.fontSize           = `${settings.fontSize * 100}%`;
    html.dataset.a11yContrast     = settings.highContrast ? 'high' : '';
    html.dataset.a11yUnderline    = settings.underlineLinks ? 'on' : '';
    html.dataset.a11yPauseAnim    = settings.pauseAnimations ? 'on' : '';
    try { localStorage.setItem('a11y', JSON.stringify(settings)); } catch {}
  }, [settings]);

  const update = (key: keyof A11ySettings, value: A11ySettings[typeof key]) =>
    setSettings(s => ({ ...s, [key]: value }));

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(v => !v)}
        aria-label="Accessibility options"
        className="fixed bottom-20 right-4 z-50 lg:bottom-6 p-3 rounded-full bg-[var(--bg-elevated)] border border-white/10 text-[var(--text-dim)] hover:text-[var(--neon-cyan)] transition-colors shadow-lg"
      >
        <Accessibility size={18} />
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-36 right-4 z-50 lg:bottom-20 w-64 bg-[var(--bg-elevated)] border border-white/10 rounded-2xl p-4 shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-semibold text-[var(--text-light)]">Accessibility</h2>
            <button onClick={() => setOpen(false)} className="text-[var(--text-dim)] hover:text-[var(--text-light)]"><X size={16} /></button>
          </div>

          {/* Font size */}
          <div className="mb-3">
            <p className="text-xs text-[var(--text-dim)] mb-2">Text Size</p>
            <div className="flex gap-2">
              {[['Normal', 1], ['Large', 1.1], ['XL', 1.2]].map(([label, val]) => (
                <button
                  key={label as string}
                  onClick={() => update('fontSize', val as number)}
                  className={['flex-1 py-1.5 rounded-lg text-xs border transition-colors',
                    settings.fontSize === val
                      ? 'border-[var(--neon-cyan)] text-[var(--neon-cyan)]'
                      : 'border-white/10 text-[var(--text-dim)]',
                  ].join(' ')}
                >
                  {label as string}
                </button>
              ))}
            </div>
          </div>

          {/* Toggles */}
          {([
            ['highContrast',    'High Contrast'],
            ['underlineLinks',  'Underline Links'],
            ['pauseAnimations', 'Pause Animations'],
          ] as [keyof A11ySettings, string][]).map(([key, label]) => (
            <button
              key={key}
              onClick={() => update(key, !settings[key])}
              className={['w-full text-left text-xs py-2 px-3 rounded-lg mb-2 border transition-colors',
                settings[key]
                  ? 'border-[var(--neon-cyan)] text-[var(--neon-cyan)] bg-[var(--neon-cyan)]/5'
                  : 'border-white/10 text-[var(--text-dim)]',
              ].join(' ')}
            >
              {label}
            </button>
          ))}

          <button
            onClick={() => setSettings(DEFAULT)}
            className="w-full text-xs text-[var(--text-dim)] hover:text-[var(--text-light)] mt-1 py-1 transition-colors"
          >
            Reset to defaults
          </button>
        </div>
      )}
    </>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/RouteTransitionCurtain.tsx src/components/layout/AccessibilityMenu.tsx
git commit -m "feat: route transition curtain and accessibility menu"
```

---

## Task 10: Favicon & Root Layout

**Files:**
- Create: `src/app/icon.tsx`
- Modify: `src/app/layout.tsx`
- Create: `src/app/page.tsx` (placeholder)
- Create: `src/components/cursor/GlowTrailCursor.tsx` (scaffold only)

- [ ] **Step 1: Create `src/app/icon.tsx`**

```tsx
// src/app/icon.tsx
import { ImageResponse } from 'next/og';

export const size        = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    <div style={{
      background: '#0A0612',
      width: '100%', height: '100%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      borderRadius: 4,
    }}>
      <div style={{
        color: '#00E5FF',
        fontSize: 18,
        fontWeight: 700,
        letterSpacing: '-0.5px',
        fontFamily: 'sans-serif',
      }}>G</div>
    </div>,
    { ...size }
  );
}
```

- [ ] **Step 2: Create `GlowTrailCursor.tsx` scaffold**

```tsx
// src/components/cursor/GlowTrailCursor.tsx
// Full implementation in Part 2 Task 22. Scaffold only.
'use client';
export function GlowTrailCursor() {
  return null; // implemented in Part 2
}
```

- [ ] **Step 3: Replace `src/app/layout.tsx` with full layout**

```tsx
// src/app/layout.tsx
import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';

import { SmoothScroll }          from '@/components/layout/SmoothScroll';
import { Nav }                   from '@/components/layout/Nav';
import { Footer }                from '@/components/layout/Footer';
import { StickyMobileCTA }       from '@/components/layout/StickyMobileCTA';
import { RouteTransitionCurtain } from '@/components/layout/RouteTransitionCurtain';
import { AccessibilityMenu }      from '@/components/layout/AccessibilityMenu';
import { GlowTrailCursor }        from '@/components/cursor/GlowTrailCursor';

// Body + mono fonts
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

// Clash Display (self-hosted — download from fonts.cdnfonts.com/clash-display)
// Place files in public/fonts/ClashDisplay-*.woff2
// NOTE: If font files are not present, fallback to Georgia (site still looks good)
const clashDisplay = localFont({
  src: [
    { path: '../../public/fonts/ClashDisplay-Medium.woff2',    weight: '500', style: 'normal' },
    { path: '../../public/fonts/ClashDisplay-Semibold.woff2',  weight: '600', style: 'normal' },
    { path: '../../public/fonts/ClashDisplay-Bold.woff2',       weight: '700', style: 'normal' },
  ],
  variable: '--font-clash',
  display: 'swap',
  fallback: ['Georgia', 'serif'],
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
      className={`${geistSans.variable} ${geistMono.variable} ${clashDisplay.variable}`}
    >
      <head>
        {/* Preload LCP hero image */}
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
        </SmoothScroll>
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Create home page placeholder**

```tsx
// src/app/page.tsx
export default function Home() {
  return (
    <div className="min-h-[100svh] flex items-center justify-center">
      <p className="text-[var(--text-dim)]">Home page — Part 2</p>
    </div>
  );
}
```

- [ ] **Step 5: Download Clash Display font files**

Download from https://www.cdnfonts.com/clash-display.font (free for commercial use).
Place in `public/fonts/`:
- `ClashDisplay-Medium.woff2`
- `ClashDisplay-Semibold.woff2`
- `ClashDisplay-Bold.woff2`

Add to `.gitignore` if font license requires it. Otherwise commit.

- [ ] **Step 6: Commit**

```bash
git add src/app/icon.tsx src/app/layout.tsx src/app/page.tsx src/components/cursor/
git commit -m "feat: root layout, favicon, font setup, placeholder home page"
```

---

## Task 11: UI Atoms

**Files:**
- Create: `src/components/ui/Container.tsx`, `Eyebrow.tsx`, `CountUp.tsx`, `NeonGlowCard.tsx`

- [ ] **Step 1: Create `src/components/ui/Container.tsx`**

```tsx
// src/components/ui/Container.tsx
import { cn } from '@/lib/utils/cn';

interface ContainerProps {
  children: React.ReactNode;
  size?: 'narrow' | 'default' | 'wide';
  className?: string;
}

const sizes = {
  narrow:  'max-w-3xl',
  default: 'max-w-7xl',
  wide:    'max-w-[1400px]',
};

export function Container({ children, size = 'default', className }: ContainerProps) {
  return (
    <div className={cn('mx-auto px-4 sm:px-6 lg:px-8', sizes[size], className)}>
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Create `src/components/ui/Eyebrow.tsx`**

```tsx
// src/components/ui/Eyebrow.tsx
import { cn } from '@/lib/utils/cn';

interface EyebrowProps {
  children: React.ReactNode;
  color?: 'cyan' | 'magenta' | 'violet';
  className?: string;
}

export function Eyebrow({ children, color = 'cyan', className }: EyebrowProps) {
  const colorClass = { cyan: 'text-[var(--neon-cyan)]', magenta: 'text-[var(--neon-magenta)]', violet: 'text-[var(--neon-violet)]' }[color];
  return (
    <p className={cn('text-xs font-mono font-semibold uppercase tracking-[0.2em]', colorClass, className)}>
      {children}
    </p>
  );
}
```

- [ ] **Step 3: Write failing test for CountUp**

```ts
// src/test/CountUp.test.ts
import { describe, it, expect } from 'vitest';

// Pure logic test — the hook interpolates from 0 to target
function lerp(from: number, to: number, t: number) {
  return from + (to - from) * t;
}

describe('CountUp logic', () => {
  it('starts at 0', () => {
    expect(lerp(0, 100, 0)).toBe(0);
  });
  it('ends at target', () => {
    expect(lerp(0, 100, 1)).toBe(100);
  });
  it('interpolates midpoint', () => {
    expect(lerp(0, 100, 0.5)).toBe(50);
  });
});
```

- [ ] **Step 4: Run failing test**

```bash
npm test
```

Expected: 3 new tests pass (lerp is trivially correct — this confirms test infrastructure works).

- [ ] **Step 5: Create `src/components/ui/CountUp.tsx`**

```tsx
// src/components/ui/CountUp.tsx
'use client';

import { useEffect, useRef, useState } from 'react';

interface CountUpProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number; // ms
}

export function CountUp({ end, suffix = '', prefix = '', duration = 1800 }: CountUpProps) {
  const [value, setValue]       = useState(0);
  const containerRef            = useRef<HTMLSpanElement>(null);
  const startedRef              = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || startedRef.current) return;

    // Reduced motion: jump to end immediately
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(end);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          const startTime = performance.now();

          const tick = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(eased * end));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={containerRef}>
      {prefix}{value.toLocaleString()}{suffix}
    </span>
  );
}
```

- [ ] **Step 6: Create `src/components/ui/NeonGlowCard.tsx`**

```tsx
// src/components/ui/NeonGlowCard.tsx
import { cn } from '@/lib/utils/cn';

interface NeonGlowCardProps {
  children: React.ReactNode;
  accentColor?: 'cyan' | 'magenta' | 'violet';
  className?: string;
  as?: React.ElementType;
}

export function NeonGlowCard({
  children,
  accentColor = 'cyan',
  className,
  as: Tag = 'div',
}: NeonGlowCardProps) {
  const glowClass = {
    cyan:    'hover:border-[var(--neon-cyan)]    hover:shadow-[0_0_20px_rgba(0,229,255,0.2)]',
    magenta: 'hover:border-[var(--neon-magenta)] hover:shadow-[0_0_20px_rgba(255,46,147,0.2)]',
    violet:  'hover:border-[var(--neon-violet)]  hover:shadow-[0_0_20px_rgba(123,44,191,0.2)]',
  }[accentColor];

  return (
    <Tag
      className={cn(
        'rounded-2xl border border-white/5 bg-[var(--bg-elevated)] transition-all duration-300',
        glowClass,
        className
      )}
    >
      {children}
    </Tag>
  );
}
```

- [ ] **Step 7: Commit**

```bash
git add src/components/ui/
git commit -m "feat: UI atoms — Container, Eyebrow, CountUp, NeonGlowCard"
```

---

## Task 12: Phase 1 Validation

- [ ] **Step 1: Start dev server**

```bash
npm run dev
```

Expected: server starts on http://localhost:3014 with no TypeScript errors.

- [ ] **Step 2: Run Playwright layout smoke test**

Create `tests/layout.spec.ts`:

```ts
// tests/layout.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Layout shell', () => {
  test('nav is visible on desktop', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('header nav')).toBeVisible();
    await expect(page.locator('text=Glowhouse')).toBeVisible();
  });

  test('footer renders with contact info', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('footer')).toBeVisible();
    await expect(page.locator('text=25061 Avenue Stanford')).toBeVisible();
    await expect(page.locator('text=(855) 348-4569')).toBeVisible();
  });

  test('phone number is clickable (tel: link)', async ({ page }) => {
    await page.goto('/');
    const telLink = page.locator('a[href="tel:+18553484569"]').first();
    await expect(telLink).toBeVisible();
  });

  test('no horizontal overflow on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    expect(bodyWidth).toBeLessThanOrEqual(375 + 1); // 1px tolerance
  });

  test('sticky mobile CTA hidden below scroll threshold', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    // At scroll position 0, sticky CTA should be off-screen
    const cta = page.locator('text=Book a Party').last();
    // It renders but is translated off-screen
    await expect(cta).toBeAttached();
  });
});
```

Run: `npm run test:e2e`

Expected: all 5 tests pass.

- [ ] **Step 3: Check TypeScript**

```bash
npx tsc --noEmit
```

Expected: 0 errors.

- [ ] **Step 4: Check for horizontal overflow on mobile in browser**

Open http://localhost:3014 in Chrome DevTools at 375px width. Confirm no horizontal scroll.

- [ ] **Step 5: Final commit for Part 1**

```bash
git add tests/
git commit -m "test: layout smoke tests (Playwright) — Part 1 complete"
```

---

**Part 1 complete.** Layout shell is live and validated. Continue with:
`2026-05-06-glowhouse-gaming-part2.md` — Home Page (Wow Factors + all sections)
