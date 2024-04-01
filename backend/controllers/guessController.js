const mongoose = require("mongoose");
const Country = require("../models/countryModel");
const { updateUserStats } = require("../game/services/statsService");
const {
  checkGameOver,
  handleIncorrectGuess,
} = require("../game/services/guessService");
const { provideHint } = require("../game/services/hintService");
const {
  fetchChallengeById,
  createOrFindUserGuess,
} = require("../game/services/dataServices");

async function submitGuess(req, res) {
  const userId = req.user;
  const { challengeId, guess, guessNum } = req.body;

  try {
    // fetch the Daily Challenge
    const challenge = await fetchChallengeById(challengeId);

    // try to find the user's guess document for the current challenge
    let userGuessDoc = await createOrFindUserGuess(userId, challengeId);

    // check if the game is already over before processing the guess
    const gameStatus = checkGameOver(userGuessDoc);

    if (gameStatus.gameOver) {
      return res.status(400).json({
        isComplete: true,
        message: gameStatus.message,
      });
    }

    // find country that the user guessed
    const guessedCountry = await Country.findOne({
      name: guess,
    });

    // set the current country that the user is attempting to guess
    const currentCountry =
      challenge.dailyCountries[userGuessDoc.currentCountryIndex];

    // check if the user's guess is correct
    const isCorrect =
      guessedCountry && currentCountry.equals(guessedCountry._id);

    let distance, direction, proximityPercentage;

    if (isCorrect) {
      // handle a correct guess
      if (
        userGuessDoc.currentCountryIndex <
        challenge.dailyCountries.length - 1
      ) {
        userGuessDoc.currentCountryIndex++;
      } else {
        userGuessDoc.isComplete = true;
      }
    } else {
      // handle an incorrect guess
      const calculations = handleIncorrectGuess(
        guessedCountry.location,
        currentCountry.location,
        currentCountry.maxDistance
      );

      distance = calculations.distance;
      direction = calculations.direction;
      proximityPercentage = calculations.proximityPercentage;
    }

    // construct guess object to save to the user's guess document
    const guessDetails = {
      countryId: currentCountry._id,
      guessNum,
      guess,
      isCorrect,
      guessFlag: guessedCountry.flag,
      guessCode: guessedCountry.code,
      distance: isCorrect ? null : Math.round(distance), // only include if the answer is incorrect
      direction: isCorrect ? null : direction,
      proximityPercentage: isCorrect ? 100 : proximityPercentage,
    };

    // add the guess to the user's guess document
    userGuessDoc.guesses.push(guessDetails);
    await userGuessDoc.save();

    // update the user's stats based on the guess
    await updateUserStats({ userId, guessDetails });

    // respond with guess result and feedback
    res.json({
      success: true,
      isCorrect,
      guess: guessDetails,
      currentCountryIndex: userGuessDoc.currentCountryIndex,
      isComplete: userGuessDoc.isComplete,
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
    // first try to find the user's existing guess document for the challenge
    let userGuess = await createOrFindUserGuess(userId, challengeId);

    res.json({
      currentCountryIndex: userGuess.currentCountryIndex,
      guesses: userGuess.guesses,
      isComplete: userGuess.isComplete,
    });
  } catch (err) {
    console.error("Error fetching guesses:", err);
    res.status(500).send("Error fetching guesses.");
  }
}

module.exports = { submitGuess, getGuesses, submitHint };
