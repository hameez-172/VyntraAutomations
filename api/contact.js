/* =====================================================================
   Contact form handler (Vercel serverless function).
   The form on the home page sends its data here. This file forwards it to
   YOUR n8n (or any) webhook, so you can save it to Google Sheets,
   GoHighLevel, email, Slack, etc.

   Setup: in Vercel -> Project -> Settings -> Environment Variables add
     LEAD_WEBHOOK_URL = your n8n Webhook (Production) URL
   then redeploy once.
   ===================================================================== */
const MAX = 2000;
const clean = (v) => String(v == null ? '' : v).replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, MAX);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  body = body || {};

  const lead = {
    name: clean(body.name),
    practice: clean(body.practice),
    email: clean(body.email),
    phone: clean(body.phone),
    locations: clean(body.locations),
    interest: clean(body.interest),
    message: clean(body.message),
    page: clean(body.page),
    referrer: clean(body.referrer),
    utm_source: clean(body.utm_source),
    utm_medium: clean(body.utm_medium),
    utm_campaign: clean(body.utm_campaign),
    source: 'website_form',
    receivedAt: new Date().toISOString()
  };

  if (!lead.name || !lead.practice || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email) || !lead.interest) {
    return res.status(400).json({ error: 'Please fill in your name, practice, a valid email and what you want to fix first.' });
  }

  const hook = process.env.LEAD_WEBHOOK_URL;
  if (!hook) {
    console.error('LEAD_WEBHOOK_URL is not set. Lead was NOT saved:', lead.email);
    return res.status(500).json({ error: 'Form is not connected yet.' });
  }

  try {
    const r = await fetch(hook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead)
    });
    if (!r.ok) throw new Error('Webhook responded ' + r.status);
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Lead forward failed:', err.message);
    return res.status(502).json({ error: 'Could not send. Please try again.' });
  }
};
