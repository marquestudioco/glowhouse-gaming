import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const MAX_TURNS = 12;

const SYSTEM = `You are Sparks, the party planning concierge at Glowhouse Gaming in Santa Clarita, CA.
Your job: help parents and event planners find the perfect experience, answer questions, and guide them to book.

Glowhouse Gaming offers 6 services:
1. Premium Gaming Lounge — 2-hour sessions at our glow-in-the-dark venue at 25061 Avenue Stanford, Ste 40, Santa Clarita, CA. Up to 20 guests, 4+ screens, consoles, VR.
2. Console & VR Home Rental — PS5, Switch, VR headsets delivered to your home. Setup included.
3. Outdoor Movie Night — 12ft projection screen + wireless speakers delivered to your backyard.
4. Party Van — mobile entertainment vehicle parked at your event. Screens + consoles + LED lighting.
5. Silent Disco — wireless headphones, 3 music channels, LED wristbands. Up to 50 guests.
6. After School Club — Mon-Fri program for school-age kids. See ghgafterschoolclub.com.

Hours: Mon–Sun 8 AM–7 PM. Phone: (855) 348-4569.
Service area (mobile): Santa Clarita, Valencia, Newhall, Stevenson Ranch, Canyon Country.

Rules:
- Keep responses SHORT: 2–3 sentences max.
- Be warm, fun, and helpful. Match the energy of a birthday party.
- NEVER make up pricing. Say: "For current pricing, call us at (855) 348-4569."
- If they seem ready to book: direct them to /book to submit a request.
- If they mention a specific age: suggest games appropriate for that age.`;

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body?.messages) return NextResponse.json({ error: 'Missing messages' }, { status: 400 });
  if (body.messages.length > MAX_TURNS) return NextResponse.json({ error: 'Too many messages' }, { status: 400 });

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ reply: "Hi! I'm Sparks ⚡ — your Glowhouse Gaming party concierge. For pricing, availability, or to plan your event, call us at (855) 348-4569 or hit Book Now!" });
  }

  const client   = new Anthropic();
  const response = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 256,
    system: SYSTEM,
    messages: body.messages,
  });

  const reply = response.content[0]?.type === 'text' ? response.content[0].text : '';
  return NextResponse.json({ reply });
}
