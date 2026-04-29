// server.js

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let users = {};

// Get user (with passive income)
app.post('/user', (req, res) => {
  const { userId } = req.body;

  if (!users[userId]) {
    users[userId] = {
      coins: 0,
      level: 1,
      income: 1,
      lastUpdate: Date.now()
    };
  }

  const user = users[userId];

  const now = Date.now();
  const seconds = (now - user.lastUpdate) / 1000;

  user.coins += seconds * user.income;
  user.lastUpdate = now;

  res.json(user);
});

// Upgrade (max level 5)
app.post('/upgrade', (req, res) => {
  const { userId } = req.body;
  const user = users[userId];

  if (!user) return res.json({ error: "User not found" });

  const cost = user.level * 10;

  if (user.coins >= cost && user.level < 5) {
    user.coins -= cost;
    user.level += 1;
    user.income += 1;
  }

  res.json(user);
});

app.get('/', (req, res) => {
  res.send("Backend running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));