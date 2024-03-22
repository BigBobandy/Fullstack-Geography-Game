const mongoose = require("mongoose");

const guessModel = new mongoose.Schema(
  {
    challenge: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DailyChallenge",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    guesses: [
      {
        guessNum: Number, // 1-6
        guess: String, // Country name
        guessFlag: String, // URL
        guessCode: String, // 3-letter country code
        isCorrect: Boolean, // true or false
        hintsUsed: Number, // 0-3
        hint: String, // Continent, Capital, Flag
        distance: Number, // in km
        direction: String, // N, NE, E, SE, S, SW, W, NW
        proximityPercentage: Number, // 0-100
      },
    ],
    isComplete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Guess", guessModel);
