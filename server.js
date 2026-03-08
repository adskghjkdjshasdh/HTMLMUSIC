const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const CLIENT_ID = process.env.SOUNDCLOUD_CLIENT_ID;

if (!CLIENT_ID) {
    console.error("❌ Missing SOUNDCLOUD_CLIENT_ID environment variable");
    process.exit(1);
}

// Serve static HTML from root
app.use(express.static("."));

// Allow frontend to fetch from this backend
app.use(cors());

// Search endpoint
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