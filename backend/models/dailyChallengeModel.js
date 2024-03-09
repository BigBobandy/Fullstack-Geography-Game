const mongoose = require("mongoose");

const dailyChallengeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    dailyCountry: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
      required: true,
    },
    guesses: [
      {
        guessNum: Number, // 1-6
        guess: String, // Country name
        isCorrect: Boolean, // true or false
        hintsUsed: Number, // 0-3
        hint: String, // Continent, Capital, Flag
        distance: Number, // in km
        direction: String, // N, NE, E, SE, S, SW, W, NW
      },
    ],
    challengeDate: {
      type: Date,
      required: true,
    },
    isComplete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DailyChallenge", dailyChallengeSchema);
