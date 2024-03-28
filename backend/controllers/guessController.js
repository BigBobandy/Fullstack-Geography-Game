const Guess = require("../models/guessModel");
const mongoose = require("mongoose");
const DailyChallenge = require("../models/dailyChallengeModel");
const Country = require("../models/countryModel");
const {
  calculateDistance,
  calculateBearing,
  bearingToCardinal,
  calculateProximityPercentage,
} = require("../game/utils/distanceCalculator");
const { updateUserStats } = require("../game/services/statsService");
const { provideHint } = require("../game/services/hintService");

// handles submitting a guess /api/challenge/guess/submit
async function submitGuess(req, res) {
  const userId = req.user;
  const { challengeId, guess, guessNum } = req.body;

  try {
    // fetch the Daily Challenge
    const challenge = await DailyChallenge.findById(challengeId).populate(
      "dailyCountries"
    );
    if (!challenge) {
      return res.status(404).send("Daily challenge not found.");
    }

    // try to find the user's guess document for the current challenge
    let userGuess = await Guess.findOne({
      user: userId,
      challenge: challengeId,
    });
    if (!userGuess) {
      // if it isnt there create one
      userGuess = new Guess({
        user: userId,
        challenge: challengeId,
        guesses: [],
        currentCountryIndex: 0, // Start at first country
        isComplete: false,
      });
    } else if (userGuess.isComplete || userGuess.guesses.length >= 6) {
      // game over if the user has already completed the challenge

      // set isComplete to true
      userGuess.isComplete = true;
      await userGuess.save();
      return res.status(400).json({
        isComplete: userGuess.isComplete,
        message: "Game over. You cannot make any more guesses.",
      });
    }

    // set the current country being guessed
    const currentCountry =
      challenge.dailyCountries[userGuess.currentCountryIndex];

    // find the country that the user guessed
    const guessedCountry = await Country.findOne({ name: guess });

    // check if the guess is correct
    const isCorrect =
      guessedCountry && currentCountry.equals(guessedCountry._id);

    // declare variables to store distance, direction, and proximity percentage
    let distance;
    let direction;
    let proximityPercentage;

    // if the guess is incorrect, calculate distance, get bearing, and convert to cardinal direction
    if (!isCorrect) {
      const guessedCountryLocation = guessedCountry.location;
      const correctCountryLocation =
        challenge.dailyCountries[userGuess.currentCountryIndex].location;

      distance = calculateDistance(
        guessedCountryLocation.latitude,
        guessedCountryLocation.longitude,
        correctCountryLocation.latitude,
        correctCountryLocation.longitude
      );

      // Calculate the proximity percentage
      proximityPercentage = calculateProximityPercentage(
        distance,
        guessedCountry.maxDistance
      );

      const bearing = calculateBearing(
        guessedCountryLocation.latitude,
        guessedCountryLocation.longitude,
        correctCountryLocation.latitude,
        correctCountryLocation.longitude
      );

      direction = bearingToCardinal(bearing);
    }

    // add the new guess to the guesses array
    userGuess.guesses.push({
      countryId: currentCountry, // Link guess to the country being guessed
      guessNum: guessNum,
      guess: guess,
      guessFlag: guessedCountry.flag,
      guessCode: guessedCountry.alpha3Code,
      isCorrect: isCorrect,
      distance: isCorrect ? null : Math.round(distance), // only include these if the answer is incorrect
      direction: isCorrect ? null : direction,
      proximityPercentage: isCorrect ? 100 : proximityPercentage,
    });

    // advance to the next country if the guess is correct or mark as complete
    if (isCorrect) {
      if (userGuess.currentCountryIndex < challenge.dailyCountries.length - 1) {
        userGuess.currentCountryIndex++; // Move to next country
      } else {
        userGuess.isComplete = true; // Last country guessed correctly
      }
    }
    await userGuess.save();

    // construct feedback message
    let feedbackMessage = isCorrect
      ? userGuess.isComplete
        ? "Challenge complete! Well done."
        : "Correct! Next country."
      : "Incorrect guess. Try again!";

    // construct the guess object to return
    let guessDetails = {
      countryId: currentCountry,
      guessNum: guessNum,
      guess: guess,
      isCorrect: isCorrect,
      guessFlag: guessedCountry.flag,
      guessCode: guessedCountry.alpha3Code,
      distance: isCorrect ? null : Math.round(distance), // only include if the answer is incorrect
      direction: isCorrect ? null : direction,
      proximityPercentage: isCorrect ? 100 : proximityPercentage,
    };

    // update user stats
    await updateUserStats({ userId, guessDetails });

    // respond with guess result and feedback
    res.json({
      success: true,
      isCorrect,
      message: feedbackMessage,
      guess: guessDetails,
      currentCountryIndex: userGuess.currentCountryIndex,
      isComplete: userGuess.isComplete,
    });
  } catch (err) {
    console.error("Error submitting guess:", err);
    res.status(500).send("Error submitting guess.");
  }
}
// handles providing a hint to the user /api/challenge/guess/hint/:id
async function submitHint(req, res) {
  const userId = req.user;
  const challengeId = req.params.id;

  try {
    const hint = await provideHint(userId, challengeId);

    // construct guess like object containing the hint to return
    const hintDetails = {
      guessNum: hint.guessNum,
      guess: null,
      isCorrect: false,
      guessFlag: null,
      guessCode: null,
      hint: hint.hint,
      hintUsed: true,
      distance: null,
      direction: null,
      proximityPercentage: null,
    };

    res.json({ hintDetails });
  } catch (err) {
    console.error("Error submitting hint:", err);
    res.status(500).send("Error submitting hint.");
  }
}

// handles fetching all guesses for a challenge /api/challenge/guess/get/:id
async function getGuesses(req, res) {
  const userId = req.user;
  const challengeId = req.params.id;

  // Validating challengeId to ensure it's not causing the CastError
  if (!mongoose.Types.ObjectId.isValid(challengeId)) {
    return res.status(400).json({ message: "Invalid challenge ID." });
  }

  try {
    const userGuess = await Guess.findOne({
      user: userId,
      challenge: challengeId,
    });

    if (!userGuess) {
      return res.json([]);
    }

    res.json({
      guesses: userGuess.guesses,
      currentCountryIndex: userGuess.currentCountryIndex,
      isComplete: userGuess.isComplete,
    });
  } catch (err) {
    console.error("Error fetching guesses:", err);
    res.status(500).send("Error fetching guesses.");
  }
}

module.exports = { submitGuess, getGuesses, submitHint };
