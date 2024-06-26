const DailyChallenge = require("../../models/dailyChallengeModel");
const moment = require("moment-timezone");

async function setDailyChallenge(selectedCountryIds) {
  try {
    const todayStart = moment.tz("America/New_York").startOf("day").toDate();
    const todayEnd = moment.tz("America/New_York").endOf("day").toDate();

    // Check if a challenge for today already exists
    const existingChallenge = await DailyChallenge.findOne({
      challengeDate: {
        $gte: todayStart,
        $lt: todayEnd,
      },
    }).populate("dailyCountries");

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
        challengeDate: todayStart,
        challengeNumber: challengeNumber,
      });

      await newChallenge.save();
      console.log(
        "New daily challenge set for",
        todayStart.toDateString(),
        "with challenge number",
        challengeNumber
      );
    } else {
      const countryNames = existingChallenge.dailyCountries
        .map((country) => country.name)
        .join(", ");
      console.log(
        "Challenge for today already exists with countries: ",
        countryNames
      );
    }
  } catch (error) {
    console.error("Error setting daily challenge:", error);
  }
}

module.exports = setDailyChallenge;
