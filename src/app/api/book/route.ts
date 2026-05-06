import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });

  const { date, service, packageTier, guestCount, name, email, phone, notes } = body;

  if (!date || !service || !name || !email || !phone) {
    return NextResponse.json({ error: 'Missing required fields: date, service, name, email, phone' }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
  }

  const ownerEmail = process.env.OWNER_NOTIFY_EMAIL;
  const apiKey     = process.env.RESEND_API_KEY;
  if (!ownerEmail || !apiKey) {
    // Demo mode: log the submission and return success without sending email
    console.log('[DEMO] Booking submitted (no email sent):', { name, email, date, service });
    return NextResponse.json({ success: true, demo: true });
  }

  const resend = new Resend(apiKey);

  try {
    await resend.emails.send({
      from: 'Glowhouse Gaming <booking@glowhousegaming.com>',
      to: ownerEmail,
      subject: `🎮 New Booking Request — ${service} on ${date}`,
      html: `
        <h2>New Booking Request</h2>
        <table style="border-collapse:collapse;width:100%">
          <tr><td><strong>Date</strong></td><td>${date}</td></tr>
          <tr><td><strong>Service</strong></td><td>${service}</td></tr>
          <tr><td><strong>Package</strong></td><td>${packageTier ?? 'Not selected'}</td></tr>
          <tr><td><strong>Guests</strong></td><td>${guestCount ?? 'Not specified'}</td></tr>
          <tr><td><strong>Name</strong></td><td>${name}</td></tr>
          <tr><td><strong>Email</strong></td><td>${email}</td></tr>
          <tr><td><strong>Phone</strong></td><td>${phone}</td></tr>
          <tr><td><strong>Notes</strong></td><td>${notes ?? 'None'}</td></tr>
        </table>
        <p>Reply to this email or call ${phone} to confirm.</p>
      `,
    });

    await resend.emails.send({
      from: 'Glowhouse Gaming <booking@glowhousegaming.com>',
      to: email,
      subject: `We got your request, ${name}! 🎮`,
      html: `
        <h2>We received your booking request!</h2>
        <p>Hi ${name},</p>
        <p>Thanks for reaching out! We'll review your request and get back to you within 24 hours to confirm your booking for <strong>${date}</strong>.</p>
        <p><strong>Service:</strong> ${service}</p>
        <p>Questions? Call us at <a href="tel:+18553484569">(855) 348-4569</a> — we're here Mon–Sun 8 AM–7 PM.</p>
        <p>— The Glowhouse Gaming Team</p>
        <p style="font-size:12px;color:#999">25061 Avenue Stanford, Ste 40, Santa Clarita, CA 91355</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Resend error:', error);
    return NextResponse.json({ error: 'Failed to send confirmation' }, { status: 500 });
  }
}
