const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const authMiddleware = require("./config/authMiddleware");
require("./config/passportSetup");

// Start the express server
const app = express();

// Use morgan to log requests
app.use(morgan("dev"));

// Use helmet to secure Express headers
app.use(helmet());

// Enable CORS
app.use(cors());

// use auth middleware
authMiddleware(app);

// Connect to the database
connectDB();

// Import routes
const authRoutes = require("./routes/authRoutes");

// Use routes
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
