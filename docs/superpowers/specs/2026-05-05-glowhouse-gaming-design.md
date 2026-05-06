# Glowhouse Gaming — Site Design Spec

**Date:** 2026-05-05
**Status:** Locked
**Source URL audited:** https://www.glowhousegaming.com/
**Yelp:** https://www.yelp.com/biz/glowhouse-gaming-santa-clarita

---

## Business Context

- Multi-format entertainment business in Santa Clarita, CA
- **Address:** 25061 Avenue Stanford, Ste 40, Santa Clarita, CA 91355
- **Phone:** (855) 348-4569
- **Hours:** Mon–Sun 8:00 AM – 7:00 PM
- **Founded:** 2017
- **Trust:** 5.0★ on Yelp · 100% recommend on Facebook · 68 photos on Yelp
- **Service area (mobile):** Santa Clarita Valley — Valencia, Newhall, Stevenson Ranch, Canyon Country
- **Primary conversion:** kid/teen birthday party bookings
- **Secondary conversions:** After-school club memberships, mobile service bookings, corporate/event inquiries

## Service Lines (6, all first-class)

1. **Premium Gaming Lounge** — 2-hour sessions, 4+ screens, multiple consoles, glow-in-the-dark venue
2. **Console & VR Home Rental** — delivered to home for events
3. **Outdoor Movies** — projection service for events
4. **Party Van Rental** — mobile entertainment vehicle
5. **Silent Disco** — wireless headphone dance experience
6. **After School Club** — recurring program at `ghgafterschoolclub.com` (decision pending: link out vs build inline)

## Brand

- **Tagline (locked):** *Where birthdays go to glow.*
- **Sub-tagline:** *Glow-in-the-dark gaming lounge, mobile party services, and after-school adventures in Santa Clarita.*
- **Tone:** Confident, fun, parent-readable, kid-exciting. Premium kid-birthday venue energy.
- **Voice anchor:** *"The only birthday venue in town that looks like a music video."*
- **Avoid:** try-hard slang, ESPORTS jargon, generic gaming-bro voice, formal corporate tone, 2014 gaming-culture tropes.

## Color Tokens

| Token | Hex | Usage |
|---|---|---|
| `--bg-deep` | `#0A0612` | Primary near-black with violet undertone |
| `--bg-elevated` | `#14101F` | Cards, modals, raised surfaces |
| `--bg-light` | `#F5F5F0` | Light-mode sections (About, FAQ, parts of Contact) for visual breathing room |
| `--neon-cyan` | `#00E5FF` | Primary accent — Lounge, primary CTAs |
| `--neon-magenta` | `#FF2E93` | Secondary accent — Movies, Silent Disco, highlights |
| `--neon-violet` | `#7B2CBF` | After School Club, Party Van, transitional gradients |
| `--text-light` | `#F5F5F0` | Body text on dark surfaces |
| `--text-dim` | `rgba(245, 245, 240, 0.65)` | Secondary text on dark |
| `--text-dark` | `#14101F` | Body text on light surfaces |

Neon = accent only. Never large neon fills (looks cheap). Hover/focus states ignite neon edges.

## Typography

| Role | Font | Notes |
|---|---|---|
| Display (hero, section headlines) | **Clash Display** | Italic for hero impact moments |
| Body | **Geist Sans** | Clean, technical |
| Eyebrow / labels | **Geist Mono** | Uppercase, wide-tracked |

All headline sizes use `clamp()` — no media-query font scaling.
All fonts loaded via `next/font/google` (or self-hosted for Clash Display) with `display: swap`.

## Pages

| Route | Purpose | Primary CTA |
|---|---|---|
| `/` | Full sales pitch, all 6 services, conversion machine | Book a Party |
| `/birthday-parties` | Dedicated landing — paid ad target | Book Birthday Party |
| `/services` | Single long page with anchor sections per service | Book this service |
| `/after-school-club` | After School Club program (or redirect to ghgafterschoolclub.com — TBD) | Enroll / Learn more |
| `/gallery` | Editorial photo/video reel of past events | Book a similar experience |
| `/about` | Owner face, 2017 origin story, what makes Glowhouse different | Contact / Book |
| `/contact` | Form + map + phone + hours + service area + FAQ section | Form submit / call |
| `/book` | Multi-step booking wizard (date → service → package → details) | Submit booking |

## Home Page Section Order (top → bottom)

1. **Cinematic Hero** (`100svh`) — neon wordmark line-draws on, scene cycle ignites behind, headline reveals word-by-word, inline date picker. Primary CTA "Book a Party" + ghost "Explore Services."
2. **Trust Stat Strip** — *Since 2017 · 5.0★ on Yelp · 100% recommend on Facebook · 1,000+ parties hosted* (last figure to verify with owner) — CountUp on viewport entry.
3. **The 6 Ways to Glow** — service grid, neon edge glow on hover, 3D Atropos tilt on desktop.
4. **Spatial Service Scrubber** (Wow #3) — CSS sticky 6×100vh, panels scroll horizontally, color-shifting bg per service.
5. **Birthday Parties Spotlight** — full-bleed band linking to `/birthday-parties` with dedicated booking CTA.
6. **Party Packages Teaser** — 3-tier card preview (Starter / Premium / VIP) → "See all packages."
7. **Editorial Photo Mosaic** — past events, neon photo borders, click-to-lightbox. Source from their 68 Yelp photos + Instagram.
8. **Testimonial Marquee** — verbatim Yelp/Facebook quotes with names + event types ("Sarah, mom of birthday kid"). CSS keyframe scroll, never Framer Motion.
9. **About / Behind the Scenes** — owner photo + 2017 origin + "birthday host" differentiator mention.
10. **FAQ Snippet** — top 4 parent questions (deposit? service area? age range? what's included?).
11. **CTA Conversion Band** — full-bleed neon-glow section: "Ready to glow? Book your party in 60 seconds."
12. **Footer** — services list, contact, social, legal, trust badges.

**Universals (every page):** glass-morphism nav, sticky mobile CTA bar (Call + Book), accessibility menu, route transition curtain.

## Wow Factors (locked)

### Wow #1 — "The Lounge Reveal" Hero
Page loads black. Glowhouse wordmark draws itself on as neon tubes igniting (SVG `stroke-dashoffset` animation). Behind it, scene cycle ignites: lounge bathed in RGB → kids in VR mid-jump → outdoor movie under stars → party van twilight glow → silent disco wrist-light blur → after-school kids cheering. Each scene has soft motion-blur cinematic grade. Headline reveals word-by-word ("Where / birthdays / go / to / glow"). Inline date picker below — *"When's your event? →"*

### Wow #2 — Glow-Trail Cursor + Magnetic Neon UI
Desktop only (`pointer: fine`): cursor leaves faint cyan→magenta gradient trail (GSAP `quickTo`), like a glow stick swung through dark. Service cards, package tiles, CTAs are magnetic — pull subtly toward cursor on approach (`data-magnetic` + 80px radius). On hover, card neon edge ignites with soft hum-pulse. Single system carries the brand across every interaction. Disabled on touch + reduced-motion.

### Wow #3 — "6 Ways to Glow" Horizontal Scrubber
CSS-sticky section, 6×100vh tall. As user scrolls vertically, 6 service tiles scroll horizontally. Each lights up its neon edge as it hits center, with 3-line value prop fading in. Background hue subtly shifts per service: cyan (lounge) → magenta (movies) → violet (van) → cyan-magenta gradient (silent disco) → cyan (VR rental) → violet (after-school). Index counter "01 / 06" in corner. Whole service catalog as one cinematic act.

### Bonus — Booking Confirmation Burst
On successful booking submit: screen fills with neon party-emoji confetti + the event name. 2-second moment, Instagram-worthy. Honors reduced-motion (just shows a static success card instead).

## Industry-Specific Sections (beyond standard premium stack)

- **Service Area Map** — animated radius boundary from venue pin (Santa Clarita / Valencia / Newhall / Stevenson Ranch / Canyon Country). Leaflet or pure-CSS SVG.
- **Inline Date Picker (Hero)** — "When's your event?" availability check above the fold. Removes #1 booking friction.
- **Game Library Filter** — chip-filtered grid (Switch / PS5 / VR / Party / Family). Parents need to see "yes my kid's favorite is here."
- **What's Included Comparison Table** — services × attributes (duration, max guests, price-from, indoor/outdoor, setup time).
- **Party Van Tour** — scrollable interior reveal / 360 carousel. "What's inside the van?" is the trust gap.
- **Birthday Host Spotlight** — "Meet your party host" mini-section with photo + bio. Differentiator most competitors lack.

## Custom Components (beyond premium-stack universals)

- `<DatePickerHero>` — inline above-fold availability check
- `<ServiceAreaMap>` — animated radius boundary
- `<GameLibraryFilter>` — chip-filtered grid
- `<WhatsIncludedTable>` — services × attributes comparison
- `<PartyVanTour>` — scrollable 360 interior reveal
- `<HorizontalServiceScrubber>` — CSS sticky, 6 panels
- `<NeonLineDrawWordmark>` — SVG `stroke-dashoffset` animation
- `<GlowTrailCursor>` — GSAP `quickTo` gradient trail
- `<BookingConfirmationBurst>` — neon emoji confetti
- `<TestimonialMarquee>` — CSS keyframe scroll with verbatim quotes
- `<TrustStatStrip>` — CountUp on viewport entry
- `<BirthdayHostCard>` — host spotlight component

## Stack

- **Next.js 16 App Router** + **React 19** + **Tailwind CSS 4** + **TypeScript**
- **GSAP 3** — cursor trail, neon line-draw, horizontal scrubber, scroll listeners
- **Framer Motion 11** — `whileInView` entrance animations only (NOT continuous loops)
- **Lenis** — smooth scroll, desktop only (skip on `pointer: coarse`)
- **Lucide** — iconography
- **Atropos** — 3D tilt cards (desktop only)
- **Resend** — transactional email (booking confirmations + owner notifications)

## Deploy

- **Platform:** Cloudflare Workers (verified end-to-end Cloudflare-compatible)
- **Worker name:** `glowhouse-gaming` (in `wrangler.toml`)
- **Repo:** `github.com/marquestudioco/glowhouse-gaming`
- **Live URL:** `https://glowhouse-gaming.marquestudio.workers.dev`
- **Custom domain:** `glowhousegaming.com` (DNS migration to Cloudflare TBD)
- **Build command:** `npm run cf:build && npm run cf:deploy`
- **Production secrets via `wrangler secret put`:**
  - `ANTHROPIC_API_KEY`
  - `RESEND_API_KEY`
  - `OWNER_NOTIFY_EMAIL`

## CMS

- **Choice:** Decap CMS (git-based, free, zero runtime impact, works perfectly with Cloudflare)
- **Editable content:**
  - Service descriptions + pricing
  - Package tiers + pricing
  - Testimonials (curated from Yelp/Facebook)
  - Gallery photos + captions
  - FAQ items
  - Hours / contact info
  - Birthday host bio
  - About / story copy
- **Auth:** GitHub OAuth (owner gets editor access only)
- **Admin URL:** `/admin` (gated)

## AI Chat Widget

- **Persona:** "Sparks" — Glowhouse's party-planning concierge
- **Model:** `claude-haiku-4-5` (cost efficiency)
- **Turn cap:** 12 messages
- **System prompt focus:** answers FAQ, helps select package, hands off to `/book` form, knows hours + service area
- **Cursor conflict fix:** `.chat-widget *` exempt from global `cursor: none` rule (per PREMIUM_STACK)

## Booking Flow

- **v1 (launch):** Multi-step UI form on `/book` (date → service → package → guest count → contact info) → submit → Resend email to owner + auto-reply confirmation to guest.
- **v2 (later):** Optional integration with Square Appointments / Acuity if owner wants real-time self-serve calendar. Punted from launch to keep one-shot scope tight.

## Copy Direction

- **Hero headline:** *Where birthdays go to glow.*
- **Hero sub:** *Glow-in-the-dark gaming lounge, mobile party services, and after-school adventures in Santa Clarita.*
- **CTA primary:** *Book a Party*
- **CTA secondary:** *Explore Services*
- **Tone:** confident, fun, slightly cheeky. Adult-readable, kid-exciting.
- **Headline style:** short, declarative, italic-display impact.
- **Sample alt headlines:** *"Light up the party." / "Your party, lit." / "Come glow off."*
- **Emphasize:** convenience ("we set up, you celebrate"), variety ("6 ways to play"), memorability ("everyone leaves buzzing"), all-inclusive, real reviews, since-2017.

## Visual Direction

- **Background hierarchy:** ~70% dark surfaces (`--bg-deep`, `--bg-elevated`), ~30% light surfaces (`--bg-light`) for breathing room. Avoid oppressive all-dark — alternate hero/showcase (dark+neon) with About/FAQ (light+warm).
- **Neon usage:** accents only — edges, glows, headline highlights, hover states. Never large neon fills.
- **Imagery:** cinematic low-light, rim-lit, color-saturated, real action shots. Source from Yelp 68-photo bank + Instagram reels. AI-generate only where needed and only to a tight visual spec matching the venue's actual lighting.
- **Density:** generous on hero/showcase moments, tighter on packages/services grids where decisions happen.
- **Animation personality:** smooth, confident, never frenetic. Soft glow pulses, no hard flashes (epilepsy-safe). Word-by-word reveals. All `prefers-reduced-motion` aware.
- **Scroll feel:** like walking into a venue at night — sign turns on, room reveals, you find your spot. Every scroll position is a destination.

## Trust Signals (surface aggressively)

- "Since 2017"
- "5.0★ on Yelp"
- "100% recommend on Facebook"
- "1,000+ parties hosted" (verify with owner)
- 4–6 verbatim Yelp/Facebook review quotes with names
- Yelp + Facebook + Instagram + GigSalad badges in footer
- Service area cities listed prominently

## Performance & Quality Bar

- **LCP:** < 2.5s on 4G
- **CLS:** < 0.1
- **Lighthouse mobile:** > 90
- **All sections work without JS** (animations are progressive enhancement)
- **Reduced motion:** fully supported across every animation
- **WCAG AA contrast** on all text (light text on dark surfaces verified ≥ 4.5:1)
- **Touch targets:** ≥ 44×44px
- **No horizontal overflow on mobile** (`overflow-x: clip` on `html`)
- **Hero image preloaded:** `<link rel="preload" as="image">` on first scene
- **`fetchPriority="high"` + `decoding="sync"`** on LCP image
- **Accessibility menu:** font size, contrast, pause animations, large touch targets — persisted to localStorage

## Critical Rules (Glowhouse-specific)

- **(855) 348-4569** always click-to-call on mobile (`tel:` link)
- **Address always linked** to Google Maps
- **Hours always visible** in footer + contact + nav strip on mobile
- **"Birthday Parties" CTA** visible from any page in nav
- **All animations** respect `prefers-reduced-motion`
- **AI chat widget input fields** exempt from global `cursor: none`
- **Color tokens via CSS variables** in `styles/tokens.css` — no hardcoded hex in components

## Mobile Compatibility Rules (apply to every component, every page)

These are non-negotiable. Each comes from a real bug on a prior shipped Harvey build. Apply by default — do not wait to be reminded.

### 1. `overflow: clip` not `overflow: hidden` on animated wrappers
`overflow: hidden` fails to clip GPU-composited elements on iOS Safari + Android Chrome. Use inline style:
```tsx
<section style={{ overflow: 'clip' }}>
```
And in `globals.css`:
```css
html { overflow-x: hidden !important; }
@supports (overflow: clip) { html { overflow-x: clip !important; } }
```

### 2. Marquees / scrolling tracks: CSS `@keyframes` only, never Framer Motion
A `<motion.div animate={{ x: ['0%', '-50%'] }}>` with `width: max-content` can make the whole document 5,000px+ wide on mobile, breaking every other section's layout site-wide.
```css
@keyframes marqueeScroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
```
```tsx
<div style={{ width: 'max-content', animation: 'marqueeScroll 60s linear infinite' }}>
```
Applies to: TestimonialMarquee, any logo wall, any horizontally-scrolling track.

### 3. Lenis smooth scroll: disable on touch devices
```tsx
const [lenisEnabled, setLenisEnabled] = useState(false);
useEffect(() => {
  setLenisEnabled(!window.matchMedia('(pointer: coarse)').matches);
}, []);
// Only wrap with <ReactLenis> when lenisEnabled is true.
```

### 4. Framer Motion `whileInView`: always with `viewport={{ once: true, amount: 0.15 }}`
Without `amount: 0.15`, tall sections on small phones may never trigger. Without `once: true`, animations re-fire on scrollback. Lock pattern:
```tsx
<motion.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: 'easeOut' }}
  viewport={{ once: true, amount: 0.15 }}
/>
```

### 5. Hero height: `h-[100svh]` not `h-[100vh]`
`100vh` on mobile includes the address bar and hides content behind it. Use `100svh` (small viewport height) for any full-screen hero or full-screen section.

### Plus from PREMIUM_STACK (re-confirmed):
- Pinned scroll sections: CSS sticky pattern only, never GSAP `pin: true` (causes React unmount crashes)
- Custom cursor: skip entirely on `pointer: coarse`
- Magnetic effects: skip entirely on `pointer: coarse`
- Sticky mobile CTA: `pb-[max(0.75rem,env(safe-area-inset-bottom))]` for iPhone home indicator
- Touch targets: ≥ 44×44px

## Cloudflare Deploy Parity Rules

Build assuming Cloudflare Workers is the deploy target from day 1. Every animation, image, font, and effect must render identically on the deployed `glowhouse-gaming.marquestudio.workers.dev` URL as on localhost. No "fix after deploy" — fix during build.

### Image rules
- **Explicit `width` + `height`** on every `<img>` / `<Image>` (prevents CLS + animation drift)
- **Preload LCP image:** `<link rel="preload" as="image" href="/hero/scene-1.webp" />`
- **`fetchPriority="high"` + `decoding="sync"`** on first hero image
- **`loading="lazy"`** on every below-fold image
- **WebP format** for all hero/scene cycle images, with explicit size budgets (target ≤ 250KB each)
- **Cloudflare Images** for any image > 200KB that needs runtime resizing — otherwise pre-optimize and serve static

### Font rules
- **`next/font/google`** with `display: swap` and `variable` CSS custom property — never `@import` in CSS (blocking)
- **Self-host Clash Display** via `next/font/local` since it's not on Google Fonts
- Verify font swap is invisible — no FOUT/FOIT flicker on Cloudflare deploy

### GSAP rules
- **Register plugins inside `useEffect`** of a `'use client'` component, NEVER at module top:
  ```tsx
  'use client';
  import { useEffect } from 'react';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    // ... animation setup
    return () => { /* cleanup */ };
  }, []);
  ```
  Module-top `gsap.registerPlugin()` calls can be tree-shaken on Cloudflare's edge build.
- **Cleanup all ScrollTriggers** on unmount: `ScrollTrigger.getAll().forEach(t => t.kill())`
- **`ScrollTrigger.refresh()`** in `requestAnimationFrame` after route changes (so layout recalculates)

### Hydration rules
- **No `Math.random()` / `Date.now()`** in initial render — animation seeds set in `useEffect` after mount only
- **No `window.*`** reads at module/render top — wrap in `useEffect` or `typeof window !== 'undefined'` checks
- **No conditional rendering based on viewport size at SSR** — always render the desktop variant on server, swap to mobile in `useEffect`

### Layout rules
- **`ResizeObserver`** to recalculate scroll-driven animation positions on window resize + after fonts/images load
- **Always wait for `document.fonts.ready`** before measuring text-based layout (e.g., headline word-by-word reveals)

### CSS rules
- **No dynamic Tailwind class concatenation** (`bg-${color}-500`) — breaks JIT purging on production builds. Always full class names; use a lookup map if you need conditional classes:
  ```tsx
  const colorClass = { cyan: 'bg-cyan-500', magenta: 'bg-pink-500' }[variant];
  ```
- **Static Tailwind class strings only** — no string interpolation that hides class names from the JIT scanner

### Build / deploy verification
- **`compatibility_date = "2026-04-30"`** in `wrangler.toml`
- **End of every phase:** run `npm run cf:build && npm run cf:deploy`, then drive the live URL with Playwright (mobile + desktop). Compare to localhost. Capture screenshots of every signature moment (hero, scrubber, cursor trail, marquee). Any drift = fix before next phase.
- **Final sweep:** Lighthouse mobile audit on the live URL > 90 score before launch.

## Open Items (resolve before launch)

- [ ] Real package pricing from owner (or use "starting at $X" placeholders)
- [ ] Logo file from owner (decide: keep / refine / redraw)
- [ ] Owner photo + bio for About
- [ ] Birthday host photo + bio for spotlight
- [ ] Confirm "1,000+ parties" stat (or substitute)
- [ ] After School Club: separate site link or build inline page
- [ ] Custom domain DNS plan (`glowhousegaming.com` → Cloudflare)
- [ ] Owner notification email address for booking submissions
- [ ] Social handles confirmed (Instagram, Facebook, GigSalad)

## Validation Discipline (build-time)

- **After every task:** run dev server, drive Playwright, verify golden path + edge cases (mobile 375px, tablet 768px, desktop 1280px, reduced-motion). Only then mark task complete.
- **After every phase:** full Playwright sweep across all phase deliverables, plus a Cloudflare deploy + live-URL Playwright verification. Compare to localhost. Capture screenshots of signature moments.
- **Never report a task as done** without running it. No "this should work" — only "I just verified it works."
- **If anything is unverified or borderline:** keep the task as `in_progress`, don't claim completion.
- **Final phase:** Lighthouse mobile audit ≥ 90 on the live Cloudflare URL.

## Phase 1 Build Order (handoff to writing-plans)

1. Project bootstrap (Next.js 16, Tailwind 4, TS, Cloudflare/OpenNext config, design tokens, fonts)
2. Layout shell — glass nav, footer, accessibility menu, sticky mobile CTA, route transition curtain, custom cursor scaffolding
3. Home page sections in order (top-down), with placeholder content where owner-supplied content is pending
4. Wow Factor #1 — Hero with neon line-draw + scene cycle + word-by-word headline + inline date picker
5. Wow Factor #2 — Glow-trail cursor + magnetic UI system
6. Wow Factor #3 — 6-way horizontal scrubber
7. `/birthday-parties` dedicated landing
8. `/services` single long page with anchor sections
9. `/after-school-club` (or redirect)
10. `/gallery`, `/about`, `/contact` (with FAQ)
11. `/book` multi-step form + Resend email integration
12. AI Chat Widget (Sparks persona, claude-haiku-4-5, 12-msg cap)
13. Decap CMS integration
14. Performance + accessibility audit pass
15. Cloudflare Workers deploy + custom domain wiring

## Decisions Log (the "why")

- **Cloudflare over Vercel** — verified all components Cloudflare-compatible (OpenNext for Next 16, Workers for API routes, R2/Workers Assets for static, Resend for email). Gaming + global edge = fit. No Vercel-specific feature needed. Per PREMIUM_STACK default.
- **Decap over Sanity/TINA/Keystatic** — git-based, free, no hosted dependency, matches existing Harvey workflow. Sanity DX is nicer but introduces tooling for no real gain at this scale.
- **Form-to-email over real booking system at v1** — keeps one-shot scope tight. Owner confirms manually. Phase 2 = optional Square/Acuity if owner pulls trigger.
- **Dark+neon over bright/cheerful** — venue is literally blacklight. Site mirrors actual experience. Light-mode breathing-room sections (About, FAQ) prevent oppressive all-dark.
- **6 service lines (not 5)** — After School Club was missed in v1 plan; surfacing it is critical for recurring revenue and weekday traffic.
- **"Where birthdays go to glow." over "Where the night gets loud."** — original headline was wrong (8AM–7PM venue, not nightlife). New headline owns their #1 conversion (birthdays) + uses brand name as verb.
- **Birthday Parties as dedicated top-nav landing** — reviews confirm it's the #1 conversion. Should be the paid-ad target.
