const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Initialization
const db = new sqlite3.Database('./moods.db', (err) => {
  if (err) console.error(err.message);
  console.log('Connected to SQLite database.');
});

// Create Tables
db.run(`
  CREATE TABLE IF NOT EXISTS moods (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    mood TEXT,
    date TEXT
  )
`);

// Routes
app.post('/api/moods', (req, res) => {
  const { mood } = req.body;
  const date = new Date().toISOString().split('T')[0];

  db.run(`INSERT INTO moods (mood, date) VALUES (?, ?)`, [mood, date], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: this.lastID });
  });
});

app.get('/api/moods', (req, res) => {
  db.all(`SELECT * FROM moods`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.get('/api/music/:mood', async (req, res) => {
  const { mood } = req.params;

  try {
    const response = await axios.get(`https://api.spotify.com/v1/recommendations`, {
      params: { seed_genres: mood },
      headers: { Authorization: `Bearer ${process.env.SPOTIFY_API_TOKEN}` },
    });

    const tracks = response.data.tracks.map((track) => ({
      name: track.name,
      artist: track.artists[0].name,
      url: track.external_urls.spotify,
    }));

    res.json(tracks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch music recommendations' });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
