const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let users = {};

// NEW: get user data
app.post('/user', (req, res) => {
  const { userId } = req.body;

  if (!users[userId]) {
    users[userId] = { coins: 0 };
  }

  res.json(users[userId]);
});

// EXISTING: tap endpoint
app.post('/tap', (req, res) => {
  const { userId } = req.body;

  if (!users[userId]) {
    users[userId] = { coins: 0 };
  }

  users[userId].coins += 1;

  res.json(users[userId]);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});