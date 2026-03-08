import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// Use your Render secret
const CLIENT_ID = process.env.SOUNDCLOUD_CLIENT_ID;

if (!CLIENT_ID) {
    console.error("❌ Missing SOUNDCLOUD_CLIENT_ID environment variable");
    process.exit(1);
}

// Allow frontend to fetch from anywhere
app.use(cors());

app.get('/search', async (req, res) => {
    const query = req.query.q;
    if (!query) return res.status(400).json({ error: "Missing query" });

    const url = `https://api-v2.soundcloud.com/search/tracks?q=${encodeURIComponent(query)}&client_id=${CLIENT_ID}&limit=10`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch from SoundCloud" });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));