import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body?.phone) return NextResponse.json({ error: 'Missing phone number' }, { status: 400 });

  const apiKey      = process.env.ELEVENLABS_API_KEY;
  const agentId     = process.env.GLOWHOUSE_AGENT_ID;
  const phoneNumId  = process.env.GLOWHOUSE_PHONE_NUMBER_ID;

  if (!apiKey || !agentId || !phoneNumId) {
    return NextResponse.json({ error: 'Receptionist not configured' }, { status: 503 });
  }

  const to = String(body.phone).replace(/\s/g, '');

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
        to_number:       to,
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
