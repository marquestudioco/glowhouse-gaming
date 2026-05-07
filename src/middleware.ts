import { NextResponse, type NextRequest } from 'next/server';

const STAGING_DOMAIN = 'marquestudio.workers.dev';

export function middleware(request: NextRequest) {
  // Only gate the marquestudio staging subdomain, not the custom domain
  const host = request.headers.get('host') ?? '';
  const stagingPassword = process.env.STAGING_PASSWORD;

  if (!stagingPassword || !host.includes(STAGING_DOMAIN)) {
    return NextResponse.next();
  }

  // Allow static assets and auth endpoint through without the gate
  const { pathname } = request.nextUrl;
  if (
    pathname.startsWith('/_next/') ||
    pathname === '/favicon.ico' ||
    pathname === '/api/staging-auth'
  ) {
    return NextResponse.next();
  }

  // Check session cookie
  const sessionCookie = request.cookies.get('staging_auth');
  if (sessionCookie?.value === stagingPassword) {
    return NextResponse.next();
  }

  // Show the password gate
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Glowhouse Gaming — Preview</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #0A0612;
      font-family: system-ui, -apple-system, sans-serif;
      color: #fff;
    }
    .card {
      text-align: center;
      padding: 3rem 2.5rem;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(0,229,255,0.2);
      border-radius: 16px;
      width: min(360px, 90vw);
      box-shadow: 0 0 60px rgba(0,229,255,0.08);
    }
    .logo {
      font-size: 1.5rem;
      font-weight: 700;
      letter-spacing: 0.05em;
      color: #00E5FF;
      margin-bottom: 0.5rem;
    }
    .sub { font-size: 0.85rem; color: rgba(255,255,255,0.45); margin-bottom: 2rem; }
    label { display: block; font-size: 0.8rem; color: rgba(255,255,255,0.5); text-align: left; margin-bottom: 0.4rem; }
    input[type=password] {
      width: 100%;
      padding: 0.75rem 1rem;
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(0,229,255,0.25);
      border-radius: 8px;
      color: #fff;
      font-size: 1rem;
      outline: none;
      transition: border-color 0.2s;
      margin-bottom: 1.2rem;
    }
    input[type=password]:focus { border-color: #00E5FF; }
    button {
      width: 100%;
      padding: 0.85rem;
      background: #00E5FF;
      color: #0A0612;
      font-weight: 700;
      font-size: 0.95rem;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      letter-spacing: 0.04em;
      transition: opacity 0.2s;
    }
    button:hover { opacity: 0.85; }
    .err { font-size: 0.8rem; color: #FF2E93; margin-top: 0.8rem; display: none; }
    .err.show { display: block; }
  </style>
</head>
<body>
  <div class="card">
    <div class="logo">GLOWHOUSE GAMING</div>
    <div class="sub">Private Preview</div>
    <form id="f" method="POST" action="/api/staging-auth">
      <label for="pw">Access Password</label>
      <input id="pw" name="password" type="password" autofocus autocomplete="current-password" placeholder="Enter password" />
      <button type="submit">Enter Preview</button>
    </form>
    <div class="err" id="err">Incorrect password — try again.</div>
  </div>
  <script>
    const params = new URLSearchParams(location.search);
    if (params.get('e')) document.getElementById('err').classList.add('show');
    document.getElementById('f').addEventListener('submit', async (ev) => {
      ev.preventDefault();
      const pw = document.getElementById('pw').value;
      const r = await fetch('/api/staging-auth', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password: pw }) });
      if (r.ok) { location.reload(); } else { document.getElementById('err').classList.add('show'); }
    });
  </script>
</body>
</html>`;

  return new NextResponse(html, {
    status: 401,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
