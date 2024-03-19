const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const authMiddleware = require("./config/authMiddleware");
require("./config/passportSetup");
const startGame = require("./game/index");

// Start the express server
const app = express();

// Serve static files
app.use("/assets/outline", express.static("./assets"));

// Use express.json to parse requests with JSON payloads
app.use(express.json());

// Use morgan to log requests
app.use(morgan("dev"));

// Use helmet to secure Express headers
app.use(helmet());

// Enable CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// use auth middleware
authMiddleware(app);

// Connect to the database
connectDB();

// Start the game
startGame();

// require the scheduler for the game's daily challenge
require("./game/utils/scheduler");

// Import routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const challengeRoutes = require("./routes/challengeRoutes");
const guessRoutes = require("./routes/guessRoutes");

// Use routes
app.use("/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/challenge", challengeRoutes);
app.use("/api/challenge/guess", guessRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
