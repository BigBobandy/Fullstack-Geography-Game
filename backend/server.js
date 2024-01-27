const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

// Start the express server
const app = express();

// Use morgan to log requests
app.use(morgan("dev"));

// Use helmet to secure Express headers
app.use(helmet());

// Enable CORS
app.use(cors());

// Connect to the database
connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
