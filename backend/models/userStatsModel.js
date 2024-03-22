const mongoose = require("mongoose");

const correctGuessesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  flag: { type: String, required: true },
});

const userStatsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // A user can only have one userStats document
    },
    totalGames: {
      type: Number,
      default: 0,
    },
    totalWins: {
      type: Number,
      default: 0,
    },
    totalGuesses: {
      type: Number,
      default: 0,
    },
    averageGuesses: {
      type: Number,
      default: 0,
    },
    currentStreak: {
      type: Number,
      default: 0,
    },
    longestStreak: {
      type: Number,
      default: 0,
    },
    hintsUsed: {
      type: Number,
      default: 0,
    },
    correctGuesses: [correctGuessesSchema],
    lastParticipationDate: {
      type: Date,
      default: null,
    },
    streakUpdatedToday: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserStats", userStatsSchema);
