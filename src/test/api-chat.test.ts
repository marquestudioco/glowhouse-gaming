import { describe, it, expect, vi } from 'vitest';

vi.mock('@anthropic-ai/sdk', () => {
  const Anthropic = vi.fn(function (this: any) {
    this.messages = {
      create: vi.fn().mockResolvedValue({ content: [{ type: 'text', text: "Hi! I'm Sparks." }] }),
    };
  });
  return { default: Anthropic };
});

const { POST } = await import('@/app/api/chat/route');

describe('POST /api/chat', () => {
  it('returns 400 for missing messages', async () => {
    const req = new Request('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({}),
      headers: { 'Content-Type': 'application/json' },
    });
    const res = await POST(req as any);
    expect(res.status).toBe(400);
  });

  it('returns 400 when message count exceeds limit', async () => {
    const tooMany = Array.from({ length: 15 }, (_, i) => ({ role: 'user', content: `msg ${i}` }));
    const req = new Request('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({ messages: tooMany }),
      headers: { 'Content-Type': 'application/json' },
    });
    const res = await POST(req as any);
    expect(res.status).toBe(400);
  });

  it('returns reply for valid messages', async () => {
    const req = new Request('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({ messages: [{ role: 'user', content: 'Hello' }] }),
      headers: { 'Content-Type': 'application/json' },
    });
    const res = await POST(req as any);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(typeof body.reply).toBe('string');
  });
});
