// server.js

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let users = {};

// Get user + passive income
app.post('/user', (req, res) => {
  const { userId } = req.body;

  if (!users[userId]) {
    users[userId] = {
      coins: 0,
      level: 1,
      income: 1,
      lastUpdate: Date.now(),
      boost: false
    };
  }

  const user = users[userId];

  const now = Date.now();
  const seconds = (now - user.lastUpdate) / 1000;

  const multiplier = user.boost ? 2 : 1;
  user.coins += seconds * user.income * multiplier;
  user.lastUpdate = now;

  res.json(user);
});

// Upgrade
app.post('/upgrade', (req, res) => {
  const { userId } = req.body;
  const user = users[userId];

  const cost = user.level * 10;

  if (user.coins >= cost) {
    user.coins -= cost;
    user.level += 1;
    user.income += 1;
  }

  res.json(user);
});

// Boost
app.post('/boost', (req, res) => {
  const { userId } = req.body;
  const user = users[userId];

  user.boost = true;

  setTimeout(() => {
    user.boost = false;
  }, 30000);

  res.json({ message: "Boost active" });
});

app.get('/', (req, res) => {
  res.send('Backend running');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});