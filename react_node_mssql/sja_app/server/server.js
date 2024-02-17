// server.js
const express = require("express");
const bodyParser = require("body-parser");
const customCorsMiddleware = require("./middleware/customCorsMiddleware");
const userRouter = require("./routes/userRouter"); // Import the user router
require("dotenv").config();

const app = express();
const NODE_APP_PORT = process.env.SERVER_PORT || 5001;

// Middleware
app.use(bodyParser.json());
app.use(customCorsMiddleware);

// Use the user router for user-related routes
app.use("/api", userRouter);

// Start server
app.listen(NODE_APP_PORT, () =>
  console.log(`Node server running on ${NODE_APP_PORT}`)
);
