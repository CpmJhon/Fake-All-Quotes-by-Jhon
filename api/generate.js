export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
    
    const { endpoint, params, baseUrl } = req.body;
    if (!endpoint) return res.status(400).json({ error: 'Endpoint required' });
    
    const apiBaseUrl = baseUrl || 'https://api.zenzxz.my.id';
    let targetUrl = `${apiBaseUrl}${endpoint}`;
    if (params && Object.keys(params).length) {
        targetUrl += `?${new URLSearchParams(params).toString()}`;
    }
    
    try {
        const response = await fetch(targetUrl);
        if (!response.ok) return res.status(response.status).json({ error: `API Error: ${response.statusText}` });
        
        const buffer = await response.arrayBuffer();
        const contentType = response.headers.get('content-type') || 'image/png';
        res.setHeader('Content-Type', contentType);
        res.send(Buffer.from(buffer));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}