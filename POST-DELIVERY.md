# Glowhouse Gaming — Post-Delivery Notes
> For Harvey / Marque Studio internal use. Not committed to client repo.

---

## Delivery Status

- **Site:** Live at https://glowhouse-gaming.marquestudio.workers.dev
- **Custom domain:** DNS to be pointed to Cloudflare → Workers → glowhouse-gaming → Domains & Routes
- **Platform:** Cloudflare Workers via @opennextjs/cloudflare
- **Repo:** https://github.com/marquestudioco/glowhouse-gaming

---

## Pricing Options to Present to Client

### Option A — One-Time Handoff (clean exit)
- Full site build, deployed, custom domain configured
- 30-day post-launch support window included
- Client gets GitHub repo, Cloudflare account credentials, and Decap CMS access
- **Suggested price: $3,500–$5,000**

### Option B — Monthly Retainer (recommended)
| Item | Monthly |
|------|---------|
| Sparks AI Chat (Claude Haiku API costs + setup) | included |
| AI Phone Receptionist (ElevenLabs/Vapi minutes + Harvey's number) | included |
| Ongoing site updates (copy, images, new sections) | included |
| Hosting (Cloudflare Workers free tier) | $0 |
| **Total client charge** | **$650–750/month** |

> Note: $500/month is the floor — margins get thin at moderate call volume. Price at $700 to be safe.

---

## Things Client Needs to Do (Owner Actions)

- [ ] Point `glowhousegaming.com` DNS to Cloudflare (see Cloudflare Dashboard → Workers → glowhouse-gaming → Domains & Routes)
- [ ] Run `wrangler secret put ANTHROPIC_API_KEY` — activates Sparks chat
- [ ] Run `wrangler secret put RESEND_API_KEY` — activates contact form emails
- [ ] Run `wrangler secret put OWNER_NOTIFY_EMAIL` — sets who gets contact form notifications
- [ ] Replace any remaining placeholder images in `public/`
- [ ] Finalize real pricing in `src/lib/data/packages.ts`
- [ ] Complete Decap CMS GitHub OAuth app (see `public/admin/config.yml`)
- [ ] Register for enrollment at `ghgafterschoolclub.com` if running separate site

---

## CMS — Decap CMS

Already integrated. Client can edit blog posts and content at `yourdomain.com/admin`.

**Setup steps:**
1. Create a GitHub OAuth App at github.com/settings/developers
2. Set Client ID and Client Secret in `public/admin/config.yml`
3. Deploy a Netlify Identity or use Decap's GitHub backend directly

**Is Decap the right choice?** Yes for this client — they're non-technical, want to edit content themselves without a developer. Decap is free, Git-backed, and works with Cloudflare. Alternative: Sanity or Contentful if they want a more polished CMS UI (extra cost ~$99/month for teams).

---

## Deployment

```bash
# Build + deploy to Cloudflare Workers
npm run cf:build && npm run cf:deploy

# Check live deployments
npx vercel ls   # (if using Vercel) OR check Cloudflare dashboard

# Set production secrets
wrangler secret put ANTHROPIC_API_KEY
wrangler secret put RESEND_API_KEY
wrangler secret put OWNER_NOTIFY_EMAIL
```

Worker name: `glowhouse-gaming`
Account: `marquestudio`

---

## Sparks AI Chat

- Lives at `src/app/api/chat/route.ts`
- Knowledge base is the `SYSTEM` constant in that file — update anytime
- Uses Claude Haiku 4.5 (cheapest Claude model, ~$0.25/1M input tokens)
- Limits: 12 turns/conversation, 256 tokens/response
- **Cost estimate:** Each full 12-turn conversation ≈ $0.003–0.005. 1,000 conversations/month ≈ $3–5 in API costs.
- Fully trained on: all 6 services with real pricing, booking process, service area, FAQ, in-chat booking flow

**To activate:** `wrangler secret put ANTHROPIC_API_KEY`

---

## AI Phone Receptionist

- UI demo section lives at `/contact` page (visible, labeled "Glowhouse Team Demo")
- API stub at `src/app/api/receptionist-call/route.ts` — awaiting Harvey's ElevenLabs/Bland.ai/Vapi integration code
- Reverse-call flow: client enters their number → Harvey's AI calls them → they experience it as a customer would
- **Appropriate for this business:** Yes — high call volume of repetitive questions (pricing, availability, what's included). Would save 10–20 hrs/week of owner time.
- **Cost to Harvey:** Bland.ai ~$0.09/min, Vapi ~$0.05/min + ElevenLabs voice cost. At moderate volume (5 calls/day × 4 min avg) ≈ $50–100/month in AI costs.

---

## Feature Backlog (Post-Launch)

- [ ] Google Calendar / Acuity integration for real-time availability in chat and booking form
- [ ] Stripe/Square deposit payments wired to booking form
- [ ] SMS follow-up after booking form submission (Twilio)
- [ ] Testimonial CMS — client submits new reviews via Decap
- [ ] After School Club page: add $400/month pricing, Hart/Saugus pickup detail, tutoring add-on
- [ ] Party Van: 3rd gallery photo (`photo-16.jpg`) is generic host-on-mic — replace if better van content available
- [ ] Analytics: add PostHog or Plausible (privacy-friendly, free tier)
- [ ] Performance: run Lighthouse after Cloudflare deploy and fix any CWV issues

---

## Clean Handoff (If Client Declines Retainer)

1. Transfer GitHub repo to client's account
2. Transfer Cloudflare Workers project to client's account
3. Document all environment variables and where to get API keys
4. Record a 15-minute Loom walkthrough of the Decap CMS
5. Hand over this document and the CLAUDE.md for reference
6. Provide 30-day email support window

---

## Notes

- Phone (855) 348-4569 must always be clickable — check every page if updating
- Dev port: 3014 (never 3000 — conflicts with other Harvey projects)
- Deploy command: `npm run cf:build && npm run cf:deploy`
- Never add custom Cache-Control for `/_next/static/` — Cloudflare handles it
