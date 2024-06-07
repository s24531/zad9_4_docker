const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const redis = require('redis');
const routes = require('./routes');

const app = express();
app.use(bodyParser.json());

const pool = new Pool({
  user: 'postgres',
  host: 'postgres',
  database: 'postgres',
  password: 'password',
  port: 5432,
});

const redisClient = redis.createClient({
  host: 'redis',
  port: 6379,
});

app.use((req, res, next) => {
  req.db = pool;
  req.redis = redisClient;
  next();
});

app.use('/', routes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

