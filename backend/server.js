const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");

// Start the express server
const app = express();
// Connect to the database
connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
