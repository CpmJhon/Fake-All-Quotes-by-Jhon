// api/generate.js - proxy sederhana (jika dibutuhkan)
export default async function handler(req, res) {
    const { endpoint, params } = req.body;
    const targetUrl = `https://api.zenzxz.my.id${endpoint}?${new URLSearchParams(params).toString()}`;
    
    try {
        const response = await fetch(targetUrl);
        const buffer = await response.arrayBuffer();
        res.setHeader('Content-Type', response.headers.get('content-type'));
        res.send(Buffer.from(buffer));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
