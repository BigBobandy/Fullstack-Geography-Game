const mongoose = require("mongoose");

const dailyChallengeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
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
      index: true,
    },
    challengeNumber: {
      type: Number,
      required: true,
      default: 0,
    },
    isComplete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Compound index for both user and challengeDate
dailyChallengeSchema.index({ user: 1, challengeDate: 1 });

module.exports = mongoose.model("DailyChallenge", dailyChallengeSchema);
