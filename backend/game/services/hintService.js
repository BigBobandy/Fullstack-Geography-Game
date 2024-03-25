const Guess = require("../../models/guessModel");
const DailyChallenge = require("../../models/dailyChallengeModel");
const UserStats = require("../../models/userStatsModel");

async function provideHint(userId, challengeId) {
  try {
    // check the number of guesses made by the user for the current challenge
    const userGuesses = await Guess.findOne({
      challenge: challengeId,
      user: userId,
    });

    if (
      !userGuesses || // user has not made any guesses
      userGuesses.guesses.length >= 5 || // user has reached the guess limit
      userGuesses.guesses.some((g) => g.hintUsed) // user has already used a hint
    ) {
      throw new Error(
        "Cannot provide hint: guess limit reached or hint already used."
      );
    }

    // find the daily challenge to get the selected country for the day
    const dailyChallenge = await DailyChallenge.findById(challengeId).populate({
      path: "dailyCountry",
      select: "capital continent flag",
    });

    if (!dailyChallenge) {
      throw new Error("Challenge not found.");
    }

    // randomly decide the type of hint to return
    const hintType = Math.floor(Math.random() * 3) + 1; // generates 1, 2, or 3
    let hint;

    switch (hintType) {
      case 1:
        hint = `Capital City: ${dailyChallenge.dailyCountry.capital}`;
        break;
      case 2:
        hint = `Continental Region: ${dailyChallenge.dailyCountry.continent[0]}`;
        break;
      case 3:
        hint = `Flag: ${dailyChallenge.dailyCountry.flag}`;
        break;
      default:
        throw new Error("Failed to generate hint.");
    }

    // record that the user used a hint in the guess model
    userGuesses.guesses.push({
      guessNum: userGuesses.guesses.length + 1,
      hintUsed: true,
      hint: hint,
    });

    await userGuesses.save();

    // update the user's stats to reflect the hint usage
    const userStats = await UserStats.findOne({ user: userId });
    userStats.hintsUsed += 1;

    await userStats.save();

    return hint;
  } catch (err) {
    console.error("Error providing hint: ", err);
  }
}

module.exports = { provideHint };
