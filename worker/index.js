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
    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || ""; // set via Wrangler secrets

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
