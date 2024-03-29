const DailyChallenge = require("../../models/dailyChallengeModel");

async function setDailyChallenge(selectedCountryIds) {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Adjust 'today' to the start of the day

    // Check if a challenge for today already exists
    const existingChallenge = await DailyChallenge.findOne({
      challengeDate: today,
    });

    if (!existingChallenge) {
      // Find the most recent challenge to get the last challenge number
      const lastChallenge = await DailyChallenge.findOne().sort({
        challengeDate: -1,
      });

      let challengeNumber = 1; // Default if no challenges have been set yet
      if (lastChallenge) {
        challengeNumber = lastChallenge.challengeNumber + 1;
      }

      // Create a new challenge
      const newChallenge = new DailyChallenge({
        dailyCountries: selectedCountryIds,
        challengeDate: today,
        challengeNumber: challengeNumber,
      });

      await newChallenge.save();
      console.log(
        "New daily challenge set for",
        today,
        "with challenge number",
        challengeNumber
      );
    } else {
      console.log("Challenge for today already exists.");
    }
  } catch (error) {
    console.error("Error setting daily challenge:", error);
  }
}

module.exports = setDailyChallenge;
