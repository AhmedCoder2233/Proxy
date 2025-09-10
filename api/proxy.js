// File: api/proxy.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  // Handle preflight (OPTIONS)
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.status(200).end();
  }

  const hfUrl = 'https://huggingface.co/spaces/AhmedKing241/Backend' + req.url.replace('/api/proxy', '');

  try {
    const response = await fetch(hfUrl, {
      method: req.method,
      headers: {
        'Content-Type': req.headers['content-type'] || 'application/json'
      },
      body: ['GET', 'HEAD'].includes(req.method) ? null : req.body
    });

    const data = await response.text();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(response.status).send(data);
  } catch (err) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(500).json({ error: 'Proxy error', details: err.message });
  }
}
