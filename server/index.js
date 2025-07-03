const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('@dotenvx/dotenvx').config()

const app = express();
const port = process.env.SERVER_PORT;
const env = process.env.ENVIRONMENT;

// Middleware
app.use(cors());
app.use(express.json());


app.listen(port, () => {
  console.log(`Server running on port ${port} on ${env}`);
});

app.get("/", (req, res) => {
  res.json({ message: "Hello from Express!" });
});