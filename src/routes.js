const express = require('express');
const router = express.Router();

router.post('/message', async (req, res) => {
  const { message } = req.body;
  req.redis.set('message', message);
  res.send({ status: 'Message saved' });
});

router.get('/message', async (req, res) => {
  req.redis.get('message', (err, reply) => {
    if (err) return res.send({ error: err });
    res.send({ message: reply });
  });
});

router.post('/user', async (req, res) => {
  const { name, email } = req.body;
  const client = await req.db.connect();
  try {
    const result = await client.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email]);
    res.send(result.rows[0]);
  } finally {
    client.release();
  }
});

module.exports = router;
