// File: api/proxy.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  const HF_BACKEND = 'https://huggingface.co/spaces/AhmedKing241/Backend' + req.url.replace('/api/proxy', '');

  // Preflight response
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const response = await fetch(HF_BACKEND, {
      method: req.method,
      headers: req.headers,
      body: ['GET', 'HEAD'].includes(req.method) ? null : req.body,
    });

    const data = await response.text();
    return res.status(response.status).send(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
