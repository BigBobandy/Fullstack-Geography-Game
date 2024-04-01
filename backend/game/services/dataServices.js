const Guess = require("../../models/guessModel");
const DailyChallenge = require("../../models/dailyChallengeModel");

async function fetchChallengeById(challengeId) {
  try {
    // fetch the Daily Challenge
    const challenge = await DailyChallenge.findById(challengeId).populate(
      "dailyCountries"
    );
    if (!challenge) {
      throw new Error("Daily challenge not found.");
    }

    return challenge;
  } catch (err) {
    console.error("Error finding challenge: ", err);
  }
}

async function createOrFindUserGuess(userId, challengeId) {
  let userGuess = await Guess.findOne({
    user: userId,
    challenge: challengeId,
  });

  if (!userGuess) {
    userGuess = new Guess({
      user: userId,
      challenge: challengeId,
      guesses: [],
      currentCountryIndex: 0,
      isComplete: false,
    });
    await userGuess.save();
  }

  return userGuess;
}

module.exports = { fetchChallengeById, createOrFindUserGuess };
