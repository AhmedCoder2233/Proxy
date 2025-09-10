import fetch from 'node-fetch';

export default async function handler(req, res) {
  const url = 'https://huggingface.co/spaces/AhmedKing241/Backend' + req.url.replace('/api/proxy', '');
  
  try {
    const backendRes = await fetch(url, {
      method: req.method,
      headers: req.headers,
      body: req.method !== 'GET' ? req.body : undefined,
    });

    const data = await backendRes.json();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(backendRes.status).send(data);
  } catch (error) {
    res.status(500).json({ error: 'Proxy error' });
  }
}
