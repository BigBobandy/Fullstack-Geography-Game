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
        isCorrect: Boolean, // true or false
        hintsUsed: Number, // 0-3
        hint: String, // Continent, Capital, Flag
        distance: Number, // in km
        direction: String, // N, NE, E, SE, S, SW, W, NW
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
