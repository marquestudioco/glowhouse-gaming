import { NextRequest, NextResponse } from 'next/server';

// In-memory rate limiter: 3 outbound calls per IP per 10 minutes (~5 min total exposure)
// For hard per-call duration caps, set "Max call duration" in the ElevenLabs agent dashboard.
const rateLimitMap = new Map<string, { count: number; reset: number }>();
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.reset) {
    rateLimitMap.set(ip, { count: 1, reset: now + 600_000 });
    return true;
  }
  if (entry.count >= 3) return false;
  entry.count++;
  return true;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Too many requests — please wait before requesting another call' }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  if (!body?.phone) return NextResponse.json({ error: 'Missing phone number' }, { status: 400 });

  // Basic phone number validation
  const rawPhone = String(body.phone).replace(/\s/g, '');
  if (!/^\+?[\d\-().]{7,15}$/.test(rawPhone)) {
    return NextResponse.json({ error: 'Invalid phone number format' }, { status: 400 });
  }

  const apiKey      = process.env.ELEVENLABS_API_KEY;
  const agentId     = process.env.GLOWHOUSE_AGENT_ID;
  const phoneNumId  = process.env.GLOWHOUSE_PHONE_NUMBER_ID;

  if (!apiKey || !agentId || !phoneNumId) {
    return NextResponse.json({ error: 'Receptionist not configured' }, { status: 503 });
  }

  try {
    const res = await fetch('https://api.elevenlabs.io/v1/convai/conversations/outbound_call', {
      method: 'POST',
      headers: {
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        agent_id:        agentId,
        phone_number_id: phoneNumId,
        to_number:       rawPhone,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('[Receptionist] ElevenLabs error:', err);
      return NextResponse.json({ error: 'Call failed', detail: err }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json({ ok: true, conversation_id: data.conversation_id });
  } catch (e) {
    console.error('[Receptionist] Unexpected error:', e);
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}
