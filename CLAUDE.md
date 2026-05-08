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
- Custom domain: Cloudflare dashboard → Workers → glowhouse-gaming → Domains & Routes

**CRITICAL — env vars on Cloudflare:**
All secrets go in `.env` (embedded at build time). Do NOT use `wrangler secret put` —
wrangler secrets are NOT readable via process.env in Next.js routes on Cloudflare Workers.
If a wrangler secret exists for the same key it blocks the .env value. See PREMIUM_STACK.md.

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

- [x] Home
- [x] Birthday Parties
- [x] Services
- [x] After School Club
- [x] Gallery
- [x] About
- [x] Contact
- [x] Book (booking form — 3-step wizard)
- [x] Privacy
- [x] Terms

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

`.env` (gitignored, never committed — embedded at build time):
  ANTHROPIC_API_KEY=          # Harvey's shared key — powers Sparks chat
  ELEVENLABS_API_KEY=         # Harvey's shared key — powers AI receptionist
  GLOWHOUSE_AGENT_ID=         # Site-specific — ElevenLabs agent for this client
  GLOWHOUSE_PHONE_NUMBER_ID=  # Site-specific — ElevenLabs phone number
  RESEND_API_KEY=             # Harvey's shared key — contact form emails
  OWNER_NOTIFY_EMAIL=         # Client's email for contact form notifications
  CF_ANALYTICS_TOKEN=         # Site-specific — Cloudflare Web Analytics token

All keys are currently set and working. After any .env change: npm run cf:build && npm run cf:deploy.

---

## Current State

**Status:** deployed and sent to client for review
**Live URL:** https://glowhouse-gaming.marquestudio.workers.dev
**GitHub:** https://github.com/marquestudioco/glowhouse-gaming (branch: main, fully pushed)
**Last session:** Visual polish, AI receptionist fully working, analytics live, favicon added

**What's working:**
  - All 10 pages built and deployed
  - Sparks AI chat (Claude-powered) — working
  - AI receptionist (ElevenLabs outbound call) — working, rate limit 10/10min (tighten to 3 before public launch: route.ts line 18)
  - Cloudflare Web Analytics — beacon live, token set
  - Branded favicon (neon G, cyan→magenta gradient)
  - Booking wizard (3-step), contact form, gallery, all sections

**Before public/custom domain launch (owner actions):**
  - Replace placeholder images with real photos (public/birthday/, public/van/, public/about/, public/gallery/)
  - Add real pricing to package data (src/lib/data/packages.ts)
  - Set RESEND_API_KEY + OWNER_NOTIFY_EMAIL in .env → rebuild → redeploy (contact form emails)
  - Tighten receptionist rate limit: src/app/api/receptionist-call/route.ts line 18 → change 10 to 3
  - Configure custom domain: Cloudflare dashboard → Workers → glowhouse-gaming → Domains & Routes
  - Point glowhousegaming.com DNS to that custom domain

**Known non-issues (intentional):**
  - Placeholder webp images — site renders correctly with fallback colors until real photos added
  - Booking form works in demo mode without Resend key (graceful fallback, no emails sent)
