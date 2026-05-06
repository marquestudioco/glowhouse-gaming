# Premium Stack â€” Universal Reference

> Copy this file into every new project. These are the battle-tested patterns that go on every site.
> Industry-specific components are noted. Customize copy/content but keep the technical patterns.

---

## Always On Every Site

### Lenis Smooth Scroll (desktop only)
Silky smooth wheel scroll on desktop. Disabled on touch/mobile (native scroll is already smooth).  
**Pattern:** `SmoothScroll.tsx` â€” wrap entire layout, detect `pointer: coarse`, skip Lenis on touch.  
**Options:** duration 1.8, lerp 0.06, wheelMultiplier 0.8

### Glass Morphism Nav
Fixed header, transparent when at hero top, frosted glass on scroll.  
`backdrop-blur-md bg-white/95 shadow-sm` on scroll, `bg-transparent` at top.  
Transitions via `scrollY > 24` listener.

### Cinematic Hero
Full-screen (`h-[100svh]`), scene-cycling background images, layered gradient scrims for text contrast.  
Frosted glass scrim panel behind hero text. Animated scene indicator dots.  
Auto-cycles every 4.5s, stops on `prefers-reduced-motion`.  
Always use `overflow: clip` (not `overflow: hidden`) on the section.

### Trust / Social Proof Section
Animated counters for key stats (years, clients served, etc.).  
`CountUp` component â€” animates from 0 on first viewport entry, skips on reduced motion.  
2-column mobile, 4-column desktop grid.

### Sticky Mobile CTA
Fixed bottom bar, `lg:hidden`, appears after 400px scroll.  
Two buttons: phone call + primary action (quote/book/contact).  
`pb-[max(0.75rem,env(safe-area-inset-bottom))]` for iPhone home indicator.

### Scrolling Testimonials / Reviews
Tripled array for seamless loop. CSS `@keyframes` animation (NOT Framer Motion WAAPI).  
Parent container uses `overflow: clip` not `overflow: hidden`.  
Edge fades via absolute gradient overlays.

### CTA Band
Full-width conversion section near bottom of page.  
Strong headline + subtext + primary button + secondary (phone).  
High contrast background (brand primary or dark navy).

### Footer
3-4 column grid: logo + tagline, nav links, contact info, legal.  
Mobile: stacked single column.

### Accessibility Menu
Floating trigger button, panel with font size, contrast, underline links, pause animations, large touch targets controls.  
Persisted to localStorage. Applied via `data-a11y-*` attributes on `<html>`.

### SEO + Metadata
`metadata` export in layout.tsx: title template, description, OG tags, robots.  
`viewport` export: `width=device-width, initialScale=1, themeColor`.  
Preload LCP image: `<link rel="preload" as="image" href="/hero/scene-1.png" />`

---

## Common (include when relevant)

### Partner / Carrier Logo Wall
Grid of partner logos with hover effects.  
Mobile: 3 columns. Desktop: more columns (up to 9).  
`grayscale-[15%] group-hover:grayscale-0` for subtle hover polish.

### Services / Coverage Grid
3-column card grid (or 2 on narrow). Icon + title + description per card.  
`whileInView` Framer Motion fade-in with stagger on cards.

### Atropos — 3D Tilt Cards
`npm install atropos` — adds a subtle 3D parallax tilt effect to cards on hover.  
Good for: service cards, portfolio items, pricing cards — anywhere you want a premium tactile feel.  
`pointer: coarse` devices get no effect (touch doesn't support hover tilt).  
```tsx
import Atropos from 'atropos/react';
import 'atropos/css';
<Atropos className="rounded-2xl" shadow={false}>
  <div data-atropos-offset="4">{/* card content */}</div>
</Atropos>
```

### Lottie Animations
`npm install lottie-react` — plays Lottie JSON animation files.  
Good for: loading states, hero accents, icon animations (no video overhead).  
Source free Lottie files from LottieFiles.com. Keep files under ~50KB.  
```tsx
import Lottie from 'lottie-react';
import animationData from '@/animations/your-file.json';
<Lottie animationData={animationData} loop autoplay style={{ width: 120 }} />
```

### Parallax Scroll Layers
`npm install react-just-parallax` — simple depth parallax for image layers or background elements.  
Good for: hero backgrounds, decorative shapes that drift at a different speed from content.  
Wrap the parallax element and pass a `strength` value (lower = subtler).

### AI Chat Widget
Jordan-style chat assistant. `position: fixed`, bottom-right corner.  
Full-screen takeover on mobile, floating panel on desktop.  
Powered by Anthropic claude-haiku for cost efficiency.  
Custom persona â€” name and personality match the brand.

### About / Team Section
Headshots + bios. Warm, human copy. Not corporate stock photos.

### Map / Location Section
Embed Google Maps iframe or static map image.  
`clamp()` for responsive iframe height.

### Quote / Booking Wizard
Multi-step form with URL param state (`?step=1&type=auto`).  
Works as standalone page AND as embedded teaser with CTA on home page.

### AI Phone Receptionist Demo
Demo call form â€” enter any phone number, receive AI call.  
API route integrates with Bland.ai or similar.


### Custom Cursor + Magnetic Effect (luxury/creative industries)
Hide OS cursor on `pointer: fine` devices, replace with branded dot that morphs on hover.  
`data-cursor="view|photo"` attribute on any element that should trigger a cursor state change.  
`data-magnetic` attribute on CTA buttons/links -- cursor and element pull toward each other within RADIUS (80px works well).  
Use `gsap.quickTo` for smooth cursor tracking. Use `MutationObserver` to re-bind events after client navigation.  
**Skip entirely on `pointer: coarse` (touch) devices.**

```tsx
// globals.css -- hide OS cursor only on pointer-fine
@media (pointer: fine) {
  html, body, a, button, input, textarea, select, [role="button"] { cursor: none !important; }
}
```

```tsx
// Layout: <CustomCursor /> before <RouteTransition /> before {children}
// Any element: <div data-cursor="photo"> or <button data-magnetic>
```

### Route Transition Curtain
Full-screen overlay that slides up on route leave, slides off on route enter.  
Fires on `usePathname()` change. Kills previous tween if navigation interrupts mid-animation.  
Call `ScrollTrigger.refresh()` inside a `requestAnimationFrame` after navigation so scroll pins recalculate.

```tsx
// Fixed div, z-[90], bg = brand neutral color, starts at translateY(100%)
// Timeline: fromTo y:100% to 0% (ease out), then to y:-100% (ease in)
// onComplete: gsap.set(curtain, { y: "100%" }) -- reset so it does not linger
```

### Editorial Mosaic Gallery (photography/creative portfolios)
CSS `columns` masonry layout -- no JS needed for the grid.  
`columns-1 sm:columns-2 lg:columns-3 [&>figure]:break-inside-avoid`  
Sticky filter chips bar at top with `backdrop-blur` background.  
Each image uses `data-cursor="photo"` + click-to-lightbox.  
Lightbox: `fixed inset-0 z-[80]`, dark overlay, `object-contain` image, Escape to close.  
Re-run GSAP entrance animations when filter state changes (new items animate in).

---

## Luxury Creative / Visual Portfolio Industries

> Interior design, home staging, architecture, photography, art studios.
> These businesses sell aspiration -- the site must feel like the work itself.

### Scroll-Driven Horizontal Showcase
Full-screen cards that advance horizontally as user scrolls vertically.  
**CRITICAL:** Use CSS sticky + vanilla scroll listener -- NOT GSAP `pin: true` (see pinning rule below).

```tsx
// Section height = N x 100vh. Inner: position sticky, top-0, h-screen, overflow-hidden
// Track: flex, width = N x 100vw, will-change-transform
// Scroll listener maps -rect.top to translateX progress
```

Each card: full-bleed image + title in oversized italic display font + index counter `01 / 04`.

### Word-by-Word Scroll Reveal (Manifesto / Hero Text)
Split headline into individual `<span data-manifesto-word>` elements.  
Use a passive `scroll` listener (not ScrollTrigger) for maximum precision.  
Each word transitions opacity `0.05 to 1` and `translateY(28px to 0)` across its own progress window.  
All words complete before the section scrolls off-screen (`wordStart = (i / total) * 0.45`).  
Use cubic ease-out: `eased = 1 - Math.pow(1 - p, 3)`.

### Magnetic Photo Collage (Manifesto / About sections)
2-3 overlapping images at different sizes, absolutely positioned.  
`data-magnetic-photo` on each image. On `mousemove`, calculate distance to each image center.  
Within `maxDistance` (320px), pull image toward cursor with `pull = (1 - dist/max) * 0.18`.  
Return to `x:0 y:0` when cursor exits range. Skip on `pointer: coarse`.

### Layered Photo Collage Layout
Primary image full-width. Secondary image absolutely positioned overlapping, with `border-8 border-bone` and heavy box-shadow.  
Creates depth without JavaScript.

### Brand Typography Atom System
Build dedicated atom components for each type role rather than hardcoding classes everywhere.

| Component | Role |
|---|---|
| `<Display>` | Hero headline -- oversized italic serif |
| `<Eyebrow>` | Label above sections -- tiny, uppercase, wide tracking |
| `<Caption>` | Small metadata text below images |
| `<Container size="narrow|wide">` | Max-width wrapper with consistent px padding |

All headline sizes use `clamp()` -- no media-query font scaling.  
Example: `fontSize: 'clamp(3rem, 9vw, 11rem)'`

### Curtain Strip Hero Reveal
On load, N vertical strips (7 works well, cream/bone color) cover the hero image.  
Strips peel off in alternating up/down directions with stagger over ~1.6s.  
`clipPath: 'inset(0% 0 0 0)'` to `'inset(100% 0 0 0)'` (up) or `'inset(0 0 100% 0)'` (down).

### Text Scramble Effect (Hero Tagline)
Random glyph substitution that resolves to the real text after ~3-4 seconds.  
Loop every 9s to keep hero alive without being distracting.  
Character pool: mix of Latin + geometric glyphs.  
Stop animation when tab is hidden (`document.addEventListener('visibilitychange')`).

---

## Technical Patterns (Always Follow)

### Overflow on Animated Sections
```css
/* Always use clip, never hidden, when a section clips animated children */
style={{ overflow: 'clip' }}

/* For html/body in globals.css */
html { overflow-x: hidden !important; }
@supports (overflow: clip) { html { overflow-x: clip !important; } }
```

### Marquee Animations â€” CSS only, never Framer Motion
```css
@keyframes marqueeScroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }   /* -50% if 2x duped, -33.3% if 3x */
}
```
```tsx
<div style={{ width: 'max-content', animation: 'marqueeScroll 60s linear infinite' }}>
```

### Framer Motion â€” whileInView only
Use Framer Motion for `whileInView` entrance animations (fade, slide up) â€” NOT for continuous loops or marquees. Those use CSS keyframes.

**Always include `viewport={{ once: true, amount: 0.15 }}`.** Without `amount: 0.15`, tall sections on small phones may never trigger the animation. Without `once: true`, animations re-fire annoyingly on scrollback.

```tsx
<motion.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: 'easeOut' }}
  viewport={{ once: true, amount: 0.15 }}
/>
```

### Image sizes
- Hero images: 1920Ã—1080 or 1440Ã—960 minimum, WebP preferred
- Logo: SVG preferred or PNG with transparent bg
- Team photos: square crop, at least 400Ã—400

### Tailwind CSS v4 — Config Change
v4 uses `@tailwindcss/postcss` instead of `tailwind.config.js`. No config file needed for most projects.  
Install: `npm install tailwindcss@^4 @tailwindcss/postcss`  
In `postcss.config.mjs`: `plugins: { '@tailwindcss/postcss': {} }`  
Theme tokens go in `globals.css` with `@theme { --color-brand: #...; }` instead of `extend` in a JS config.  
**Do not follow v3 setup guides — the config approach is completely different.**

### Font loading
Always use `next/font/google` with `display: swap` and `variable` CSS custom property.  
Never @import fonts in CSS (blocking).

### Color tokens
All colors in `styles/tokens.css` as CSS custom properties.  
Never hardcode hex values in components â€” always use `var(--token-name)`.

### Mobile first
- Hero: `h-[100svh]` not `h-[100vh]`
- Touch targets: minimum 44Ã—44px
- Test sticky elements: add `pb-[max(X,env(safe-area-inset-bottom))]`
- Avoid `position: fixed` elements that might affect compositing

### Performance
- `fetchPriority="high"` and `decoding="sync"` on LCP (first hero) image
- `loading="lazy"` on all below-fold images
- Defer non-critical scripts

### CRITICAL: Pinned Scroll Sections -- CSS Sticky, Never GSAP pin
GSAP `pin: true` mutates the DOM in a way that conflicts with React unmount. Causes `Node.removeChild` crash on route change -- reproducible every time.

**Always use the CSS sticky pattern instead:**
```tsx
// Section height = N * 100vh (sets total scroll distance)
<section style={{ height: `${N * 100}vh` }}>
  {/* Inner element: sticky + fills viewport */}
  <div className="sticky top-0 h-screen overflow-hidden">
    {/* Scroll-animated content here */}
  </div>
</section>
```
Drive animation state with a passive `scroll` listener that reads `-sectionRef.getBoundingClientRect().top`.

### Favicon -- Use icon.tsx with ImageResponse, Not SVG
SVG favicons have poor and inconsistent browser support (especially Safari/iOS).  
Use `src/app/icon.tsx` with Next.js `ImageResponse` to generate a PNG favicon at build time.

```tsx
// src/app/icon.tsx
import { ImageResponse } from "next/og";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";
export default function Icon() {
  return new ImageResponse(
    <div style={{ background: "#1A1814", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ color: "#F5EFE4", fontSize: 23, fontStyle: "italic", fontFamily: "Georgia, serif" }}>F</div>
    </div>,
    { ...size }
  );
}
```

### Custom Cursor vs Chat Widget Conflict
If a site has both a custom cursor (`cursor: none` globally) and a chat widget, the chat widget input fields will have no cursor for typing.  
**Fix:** scope the `cursor: none` rule to exclude the chat widget container. Use a wrapper class (`.chat-widget`) and override: `.chat-widget * { cursor: auto !important; }`

### CTA Section Glow -- Radial Gradient, Not Blur Blob
Decorative light blobs using `backdrop-filter: blur` or CSS `filter: blur` inside dark sections create hard clipped edges at the element boundary.  
**Use `radial-gradient` on a full-inset overlay instead:**
```tsx
<div
  aria-hidden
  className="pointer-events-none absolute inset-0"
  style={{ background: "radial-gradient(ellipse 80% 70% at 20% 40%, rgba(255,255,255,0.07) 0%, transparent 65%)" }}
/>
```
No hard edges, no clipping, smooth falloff across the full section.

### AI Chat Widget -- Self-Hosted API Route Pattern
Never proxy the Anthropic API key through the frontend. Use a Next.js API route.
```
POST /api/chat
Body: { messages: [{role, content}][] }
Returns: { reply: string }
```
Use `claude-haiku-4-5` for cost efficiency. Set a turn cap (e.g. 12 messages) to prevent abuse.  
Give the assistant a custom persona name + system prompt matching the brand.  
On Cloudflare, set key via `wrangler secret put ANTHROPIC_API_KEY`.  
On Vercel, set via dashboard > Settings > Environment Variables.

---

## Deployment

### Which platform to use

| Use Cloudflare Workers | Use Vercel |
|---|---|
| Most sites (default) | Real estate / heavy property listings |
| Business services, agencies, insurance | Sites needing Vercel image CDN at scale |
| Gaming sites (Cloudflare edge is global + fast) | Sites using Vercel-specific features (Analytics, ISR at scale) |
| Free commercial use â€” no usage caps | When client already has Vercel team plan |
| AI features, API routes, chat widgets | Large media sites with 100s of dynamic pages |

**Default: Cloudflare. Only switch to Vercel if there's a specific reason.**

---

### GitHub (all sites)

Every site = its own repo. Never share repos between clients.

```bash
git init
git add .
git commit -m "initial commit"
# Then on GitHub â€” create new repo, then:
git remote add origin https://github.com/marquestudioco/[repo-name]
git branch -M main
git push -u origin main
```

**Harvey's GitHub username:** [FILL IN â€” harveydjobs or similar]  
**Convention:** repo name = same as the business slug (e.g. `glowhouse-gaming`, `bethany-insurance`)

---

### Cloudflare Workers (default deploy)

**Account:** marquestudio  
**Workers subdomain:** `[site-name].marquestudio.workers.dev`  
**Auth:** `wrangler login` (one-time per machine, uses browser OAuth)

**wrangler.toml** (every site needs this, unique name):
```toml
name = "[unique-site-slug]"
compatibility_date = "2026-04-30"
compatibility_flags = ["nodejs_compat"]
main = ".open-next/worker.js"

[assets]
directory = ".open-next/assets"
```

**package.json scripts required:**
```json
"cf:build": "opennextjs-cloudflare build",
"cf:preview": "opennextjs-cloudflare preview",
"cf:deploy": "opennextjs-cloudflare deploy"
```

**Install:** `npm install -D @opennextjs/cloudflare`

**Deploy (both commands, every time, in order):**
```bash
npm run cf:build && npm run cf:deploy
```

**Production secrets:**
```bash
wrangler secret put ANTHROPIC_API_KEY
wrangler secret put [ANY_OTHER_KEY]
```

**Custom domain:** Cloudflare dashboard â†’ Workers â†’ [site] â†’ Settings â†’ Domains & Routes â†’ Add Custom Domain

---

### Vercel (when needed)

**Account:** [FILL IN â€” Harvey's Vercel account/team name]  
**Auth:** `vercel login` (one-time, browser OAuth) or connect via GitHub integration

**Install CLI:** `npm i -g vercel`

**Deploy:**
```bash
vercel --prod
```

Or preferred: connect GitHub repo in Vercel dashboard â†’ auto-deploys on every push to main.

**Environment variables:** Vercel dashboard â†’ Project â†’ Settings â†’ Environment Variables  
Or via CLI: `vercel env add KEY_NAME`

**Custom domain:** Vercel dashboard â†’ Project â†’ Settings â†’ Domains â†’ Add

**Key Vercel defaults (2026):**
- Node.js 24 LTS (default runtime)
- Function timeout: 300s
- Image optimization: built-in via `next/image`
- No separate build step needed â€” Vercel runs `next build` automatically

---

### Environment Variables

Never commit secrets. Pattern for every site:

**`.env.local`** (local dev, gitignored):
```env
# AI
ANTHROPIC_API_KEY=sk-ant-...

# Add others as needed
GOOGLE_PLACES_API_KEY=
BLAND_AI_API_KEY=
RESEND_API_KEY=
```

**`.env.example`** (committed, no real values â€” shows what's needed):
```env
ANTHROPIC_API_KEY=
GOOGLE_PLACES_API_KEY=
BLAND_AI_API_KEY=
```

**`.gitignore`** must include:
```
.env.local
.env*.local
```

The build chat creates `.env.example` with the right keys. Harvey fills in real values in `.env.local` and sets production secrets via Wrangler or Vercel dashboard.

---

## Deploy Checklist (every site)

**GitHub**
- [ ] Repo created, remote set, initial commit pushed

**Cloudflare (if using)**
- [ ] `wrangler.toml` has unique `name` (no conflicts with other sites)
- [ ] `wrangler login` authenticated
- [ ] Production secrets set via `wrangler secret put`
- [ ] `npm run cf:build && npm run cf:deploy` (both, in order)
- [ ] Custom domain configured in Cloudflare dashboard

**Vercel (if using)**
- [ ] GitHub repo connected in Vercel dashboard
- [ ] Environment variables set in Vercel dashboard
- [ ] Custom domain configured in Vercel dashboard

**All sites**
- [ ] `.env.local` has all secrets for local dev
- [ ] `.env.example` committed with empty values
- [ ] LCP image preloaded in `<head>`
- [ ] OG image created and referenced in metadata
- [ ] Mobile tested on real device (not DevTools)
- [ ] No horizontal overflow on mobile
- [ ] Reduced motion works (no jarring animations)
- [ ] All forms tested end-to-end




