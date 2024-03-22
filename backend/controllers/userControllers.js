const User = require("../models/userModel");
const UserStats = require("../models/userStatsModel");

// Handles the GET request to /api/user/profile
async function getUserProfile(req, res) {
  try {
    // check if the user is logged in
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // get the user data from the database
    const user = await User.findById(req.user);

    // if user wasn't found
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // if user was found return the user data
    res.json({
      profileImage: user.profileImage,
      displayName: user.displayName,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

// handles the GET request to /api/user/stats
async function getUserStats(req, res) {
  try {
    const userId = req.user;

    const userStats = await UserStats.findOne({ user: userId });

    if (userStats) {
      // if found return the user stats document
      return res.json(userStats);
    } else {
      // if not found return empty object with placeholder values
      return res.json({
        totalGames: 0,
        totalWins: 0,
        totalGuesses: 0,
        averageGuesses: 0,
        currentStreak: 0,
        longestStreak: 0,
        hintsUsed: 0,
        correctGuesses: [],
      });
    }
  } catch (err) {
    console.error("Error fetching user stats:", err);
    return res.status(500).send("Error fetching user stats.");
  }
}

module.exports = { getUserProfile, getUserStats };
