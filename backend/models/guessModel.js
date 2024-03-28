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
    currentCountryIndex: {
      type: Number,
      required: true,
      default: 0,
    },
    guesses: [
      {
        countryId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Country",
        },
        guessNum: Number,
        guess: String,
        guessFlag: String,
        guessCode: String,
        isCorrect: Boolean,
        hintUsed: Boolean,
        hint: String,
        distance: Number,
        direction: String,
        proximityPercentage: Number,
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
