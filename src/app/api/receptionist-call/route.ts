// POST /api/receptionist-call
// Visitor enters their phone number on the site → we call them via ElevenLabs.
// They experience the AI exactly as an inbound caller would.
//
// Required env vars (add to Cloudflare/Vercel dashboard):
//   ELEVENLABS_API_KEY       — same key used for the chat widget
//   GLOWHOUSE_AGENT_ID       — agent_7101kr1t1wkrfw5s27f4h1xvgmh8
//   GLOWHOUSE_PHONE_NUMBER_ID — phnum_4401knzx9whqfsxtknrv42ex5z1b

import { NextRequest, NextResponse } from 'next/server';

// Required for Cloudflare Workers — edge runtime silently ignores wrangler secrets via process.env
export const runtime = 'nodejs';

const AGENT_ID        = process.env.GLOWHOUSE_AGENT_ID ?? '';
const PHONE_NUMBER_ID = process.env.GLOWHOUSE_PHONE_NUMBER_ID ?? '';
const API_KEY         = process.env.ELEVENLABS_API_KEY ?? '';

// 3 demo calls per IP per 10 minutes. Each call is capped at 4 min → ~12 min max exposure.
const rateLimitMap = new Map<string, { count: number; reset: number }>();
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.reset) { rateLimitMap.set(ip, { count: 1, reset: now + 600_000 }); return true; }
  if (entry.count >= 3) return false;
  entry.count++;
  return true;
}

// Accepts any common US format, returns E.164 (+1XXXXXXXXXX) or null
function normalizePhone(raw: string): string | null {
  const digits = raw.replace(/\D/g, '');
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`;
  return null;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Too many requests — please wait before requesting another call' }, { status: 429 });
  }

  const body = await request.json().catch(() => null) as { phone?: unknown } | null;
  if (!body?.phone) {
    return NextResponse.json({ error: 'Missing phone' }, { status: 400 });
  }

  const phone = normalizePhone(String(body.phone));
  if (!phone) {
    return NextResponse.json({ error: 'Invalid US phone number' }, { status: 400 });
  }

  if (!API_KEY || !AGENT_ID || !PHONE_NUMBER_ID) {
    console.error('[receptionist-call] Missing ElevenLabs env vars');
    return NextResponse.json({ error: 'Receptionist not configured' }, { status: 503 });
  }

  // Demo call is capped at 4 minutes to keep costs tight.
  // The agent's default (15 min) is used for real inbound calls.
  const res = await fetch('https://api.elevenlabs.io/v1/convai/twilio/outbound-call', {
    method: 'POST',
    headers: { 'xi-api-key': API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      agent_id: AGENT_ID,
      agent_phone_number_id: PHONE_NUMBER_ID,
      to_number: phone,
      conversation_initiation_client_data: {
        conversation_config_override: {
          agent: {
            first_message:
              "Thanks for calling Glowhouse Gaming, this is Sparks! How can I help you today?",
          },
          conversation: { max_duration_seconds: 240 },
          language_presets: {
            es: {
              overrides: {
                agent: {
                  first_message:
                    "Gracias por llamar a Glowhouse Gaming, soy Sparks. ¿En qué te puedo ayudar hoy?",
                },
              },
            },
          },
        },
      },
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error('[receptionist-call] ElevenLabs error:', res.status, err.slice(0, 200));
    return NextResponse.json({ error: 'Call could not be placed' }, { status: 502 });
  }

  const data = (await res.json()) as { conversation_id?: string };
  return NextResponse.json({ ok: true, conversationId: data.conversation_id ?? null });
}
