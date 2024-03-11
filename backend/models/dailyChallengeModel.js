const mongoose = require("mongoose");

const dailyChallengeSchema = new mongoose.Schema(
  {
    dailyCountry: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
      required: true,
    },

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
  },
  { timestamps: true }
);

// index for challengeDate
dailyChallengeSchema.index({ challengeDate: 1 });

module.exports = mongoose.model("DailyChallenge", dailyChallengeSchema);
