import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });

  const { name, email, phone, message, interest } = body;

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  const ownerEmail = process.env.OWNER_NOTIFY_EMAIL;
  const apiKey     = process.env.RESEND_API_KEY;

  if (!ownerEmail || !apiKey) {
    console.log('[DEMO] Contact form submission (no email sent):', { name, email, interest });
    return NextResponse.json({ success: true, demo: true });
  }

  const resend = new Resend(apiKey);

  try {
    await resend.emails.send({
      from: 'Glowhouse Gaming <contact@glowhousegaming.com>',
      to: ownerEmail,
      subject: `📩 New Contact Message — ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <table style="border-collapse:collapse;width:100%">
          <tr><td><strong>Name</strong></td><td>${name}</td></tr>
          <tr><td><strong>Email</strong></td><td>${email}</td></tr>
          <tr><td><strong>Phone</strong></td><td>${phone ?? 'Not provided'}</td></tr>
          <tr><td><strong>Interest</strong></td><td>${interest ?? 'Not specified'}</td></tr>
          <tr><td><strong>Message</strong></td><td style="white-space:pre-wrap">${message}</td></tr>
        </table>
        <p>Reply directly to this email to respond to ${name}.</p>
      `,
    });

    await resend.emails.send({
      from: 'Glowhouse Gaming <contact@glowhousegaming.com>',
      to: email,
      subject: `Thanks for reaching out, ${name}! 🎮`,
      html: `
        <h2>We got your message!</h2>
        <p>Hi ${name},</p>
        <p>Thanks for contacting Glowhouse Gaming! We'll get back to you within 24 hours.</p>
        <p>In a hurry? Call us at <a href="tel:+18553484569">(855) 348-4569</a> — we're here Mon–Sun 8 AM–7 PM.</p>
        <p>— The Glowhouse Gaming Team</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Resend error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
