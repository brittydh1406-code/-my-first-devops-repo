const express = require('express');
const { Pool } = require('pg');

const app = express();
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok' });
  } catch (e) {
    res.status(500).json({ status: 'error', error: e.message });
  }
});

app.get('/api/items/count', async (req, res) => {
  const r = await pool.query('SELECT COUNT(*) FROM items');
  res.json({ count: parseInt(r.rows[0].count) });
});

app.listen(process.env.APP_PORT, () => {
  console.log(`Listening on ${process.env.APP_PORT}`);
});
