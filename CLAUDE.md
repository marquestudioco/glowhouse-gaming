# Glowhouse Gaming — CLAUDE.md

## Project

- **Business:** Glowhouse Gaming — glow-in-the-dark gaming lounge and mobile entertainment party service, Santa Clarita, CA
- **Target client:** Parents booking birthday parties for kids; event organizers; after-school program families
- **Custom domain:** www.glowhousegaming.com

---

## Stack

Next.js 16 App Router + React 19 + Tailwind CSS 4 + TypeScript
Framer Motion 11 (whileInView entrance animations only) · Lenis smooth scroll (desktop only) · Lucide icons · GSAP 3
See PREMIUM_STACK.md for universal components, technical rules, and hard-won lessons.

**Dev port:** 3014

---

## Deploy

**Platform:** Cloudflare Workers (via @opennextjs/cloudflare)

```
npm run cf:build && npm run cf:deploy
```
- Worker name in wrangler.toml: glowhouse-gaming — must not conflict with other Harvey sites
- Account subdomain: marquestudio
- Live URL: https://glowhouse-gaming.marquestudio.workers.dev
- Production secrets: wrangler secret put KEY_NAME
- Custom domain: Cloudflare dashboard → Workers → glowhouse-gaming → Domains & Routes

**GitHub repo:** https://github.com/marquestudioco/glowhouse-gaming

---

## Brand

- **Primary color:** #00E5FF (neon cyan)
- **Secondary/accent:** #FF2E93 (neon magenta), #7B2CBF (neon violet)
- **Background deep:** #0A0612
- **Display font:** Clash Display (self-hosted)
- **Body font:** Geist
- **Tone:** Electric, fun, premium
- **Logo file:** not yet

---

## Pages

- [ ] Home
- [ ] Birthday Parties
- [ ] Services
- [ ] After School Club
- [ ] Gallery
- [ ] About
- [ ] Contact
- [ ] Book (booking form)
- [ ] Privacy
- [ ] Terms

---

## Home Page Sections (in order)

1. CinematicHero — neon wordmark + scene cycle + date picker
2. TrustStatStrip — animated stats
3. ServicesGrid — 6 service cards
4. HorizontalServiceScrubber (Wow #3) — CSS sticky horizontal scroll
5. BirthdaySpotlight — CTA for birthday page
6. PackagesTeaser — 3 packages
7. PhotoMosaic — gallery grid
8. TestimonialMarquee — CSS scroll, no Framer Motion
9. AboutTeaser — light section
10. FaqSnippet — accordion
11. CtaBand — final CTA

---

## Wow Factors

1. CinematicHero — neon turn-on wordmark + crossfading scene backgrounds
2. GlowTrailCursor — GSAP glow trail + magnetic UI (desktop only)
3. HorizontalServiceScrubber — CSS sticky, passive scroll listener, NOT GSAP pin

---

## Critical Rules

- Phone number (855) 348-4569 must always be clickable
- Never use GSAP pin:true — use CSS sticky pattern (see PREMIUM_STACK.md)
- Marquees: CSS keyframe only, never Framer Motion
- Mobile: h-[100svh], overflow:clip, pointer:coarse check for Lenis
- Framer Motion: viewport={{ once: true, amount: 0.15 }} on all whileInView
- Dev port: 3014 (never 3000)

---

## Environment Variables

.env.local (never committed):
  ANTHROPIC_API_KEY=
  RESEND_API_KEY=
  OWNER_NOTIFY_EMAIL=

---

## Current State

**Status:** build
**Last completed:** Task 1 Step 1 — Next.js 16 scaffolded
**Next up:** Install all project dependencies (Task 1 Step 2)
**Known issues:** none
