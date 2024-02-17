const express = require("express");
const bodyParser = require("body-parser");
const sql = require("mssql");
const customCorsMiddleware = require("./middleware/customCorsMiddleware");
const dbConfig = require("./config/dbConfig"); // Import the SQL Server configuration
require("dotenv").config();

const app = express();
const NODE_APP_PORT = process.env.SERVER_PORT || 5001;

// Middleware
app.use(bodyParser.json());
app.use(customCorsMiddleware);

// API to fetch users data
app.get("/users", async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig); // Use dbConfig for SQL Server configuration
    const result = await pool.request().query("SELECT * FROM users");
    res.json(result.recordset);
  } catch (err) {
    console.error("SQL error", err);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: err.message });
  }
});

// Start server
app.listen(NODE_APP_PORT, () =>
  console.log(`Node server running on ${NODE_APP_PORT}`)
);
