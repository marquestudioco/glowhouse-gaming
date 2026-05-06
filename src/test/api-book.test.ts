import { describe, it, expect, vi } from 'vitest';

vi.mock('resend', () => {
  const Resend = vi.fn(function (this: any) {
    this.emails = { send: vi.fn().mockResolvedValue({ id: 'test-id', error: null }) };
  });
  return { Resend };
});

process.env.RESEND_API_KEY = 'test-key';
process.env.OWNER_NOTIFY_EMAIL = 'owner@test.com';

const { POST } = await import('@/app/api/book/route');

describe('POST /api/book', () => {
  it('returns 400 when required fields missing', async () => {
    const req = new Request('http://localhost/api/book', {
      method: 'POST',
      body: JSON.stringify({ name: 'Test' }),
      headers: { 'Content-Type': 'application/json' },
    });
    const res = await POST(req as any);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toBeDefined();
  });

  it('returns 200 with valid booking data', async () => {
    const req = new Request('http://localhost/api/book', {
      method: 'POST',
      body: JSON.stringify({
        date: '2026-06-15',
        service: 'gaming-lounge',
        packageTier: 'premium',
        guestCount: 12,
        name: 'Test Parent',
        email: 'test@example.com',
        phone: '555-1234',
        notes: '',
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    const res = await POST(req as any);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
  });
});
