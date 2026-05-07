import { NextRequest, NextResponse } from 'next/server';

// TODO: Replace with actual ElevenLabs / Bland.ai / Vapi call initiation
// Harvey will provide the implementation code from his existing setup.
//
// Expected request body: { phone: string }
// The API should trigger an outbound call from Harvey's registered AI number
// to the provided phone number.

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body?.phone) return NextResponse.json({ error: 'Missing phone' }, { status: 400 });

  // PLACEHOLDER — wire up real outbound call trigger here
  console.log('[AI Receptionist] Outbound call requested to:', body.phone);

  return NextResponse.json({ ok: true, message: 'Call initiated (stub)' });
}
