const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');
const customCorsMiddleware = require('./middleware/customCorsMiddleware'); // Import the custom CORS middleware
require('dotenv').config();

const app = express();
const NODE_APP_PORT = process.env.SERVER_PORT || 5001; // Fallback to 5001 if SERVER_PORT is not defined

// Middleware
app.use(bodyParser.json());
app.use(customCorsMiddleware); // Use the custom CORS middleware here

// SQL Server configuration
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    trustServerCertificate: true
  }
};

// API to fetch users data
app.get('/users', async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query('SELECT * FROM users');
    res.json(result.recordset);
  } catch (err) {
    console.error('SQL error', err);
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
});

// Start server
app.listen(NODE_APP_PORT, () => console.log(`Node server running on ${NODE_APP_PORT}`));
