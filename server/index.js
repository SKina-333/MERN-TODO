const express = require('express');
const connectDB = require('./configs/db');
const taskRoutes = require('./routes/taskRoutes');
const statusRoutes = require('./routes/statusRoutes');
const cors = require('cors');
require('@dotenvx/dotenvx').config()

const app = express();
const port = process.env.SERVER_PORT;
const env = process.env.ENVIRONMENT;
connectDB();


// Middleware
const corsOption = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200 
}
app.use(cors(corsOption));
app.use(express.json());


app.listen(port, () => {
  console.log(`Server running on port ${port} on ${env}`);
});

app.get("/", (req, res) => {
  res.json({ message: "Hello from Express!" });
});

app.use('/api/tasks', taskRoutes);
app.use('/api/status', statusRoutes);