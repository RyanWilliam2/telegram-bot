const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let users = {};

// Get user data
app.post('/user', (req, res) => {
  const { userId } = req.body;

  if (!users[userId]) {
    users[userId] = { coins: 0 };
  }

  res.json(users[userId]);
});

// Tap endpoint (increase coins)
app.post('/tap', (req, res) => {
  const { userId } = req.body;

  if (!users[userId]) {
    users[userId] = { coins: 0 };
  }

  users[userId].coins += 1;

  res.json(users[userId]);
});

// Root route (for testing in browser)
app.get('/', (req, res) => {
  res.send('Bot backend is running');
});

// IMPORTANT: Render-compatible port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});