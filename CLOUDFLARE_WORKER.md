# Cloudflare Worker: Waitlist endpoint

This file shows a minimal Cloudflare Worker that accepts POST requests at `/api/waitlist` and forwards the payload by email using SendGrid (or any email API).

> Note: Add your secrets (e.g., `SENDGRID_API_KEY`) in your Worker environment (Wrangler secret or KV).

## Worker script (index.js)

```js
addEventListener('fetch', (event) => {
  event.respondWith(handle(event.request));
});

async function handle(request) {
  if (request.method !== 'POST') {
    return new Response('Not found', { status: 404 });
  }

  try {
    const data = await request.json();

    // Replace with your email provider logic. Example uses SendGrid v3 API.
    const SENDGRID_API_KEY = SENDER_API_KEY; // set via Wrangler secrets

    const subject = `Atenra Waitlist - ${data.userType || 'client'}`;
    const bodyLines = [
      'New Waitlist Signup',
      '',
      `Type: ${data.userType || 'client'}`,
      `Name: ${data.name || ''}`,
      data.businessName ? `Business Name: ${data.businessName}` : '',
      `Email: ${data.email || ''}`,
      `Phone: ${data.phone || 'Not provided'}`,
    ].filter(Boolean).join('\n');

    // Example SendGrid request
    const sendgridRes = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: 'contact@atenra.com' }], subject }],
        from: { email: 'no-reply@atenra.com', name: 'Atenra' },
        content: [{ type: 'text/plain', value: bodyLines }],
      }),
    });

    if (!sendgridRes.ok) {
      const text = await sendgridRes.text();
      return new Response(text || 'Email provider error', { status: 502 });
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(String(err.message || err), { status: 500 });
  }
}
```

## Deploy with Wrangler

1. Install Wrangler: `npm install -g wrangler`
2. Add your secret: `wrangler secret put SENDGRID_API_KEY`
3. Configure `wrangler.toml` (set `name`, `account_id`, and route if needed)
4. Deploy: `wrangler publish`

## Notes

- You can swap SendGrid for Mailgun, Postmark, or any provider.
- Ensure CORS or routing matches how your site is hosted (if the Worker is on a different domain, configure fetch from the frontend accordingly).
- The frontend in this repo tries `POST /api/waitlist` and falls back to `mailto:` if the request fails.
