// server/server.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.get('/api/stocks', (req, res) => {
  // Sample response
  res.json({ stocks: ['AAPL', 'GOOGL', 'MSFT'] });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
