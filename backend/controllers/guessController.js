const Guess = require("../models/guessModel");
const DailyChallenge = require("../models/dailyChallengeModel");
const Country = require("../models/countryModel");
const {
  calculateDistance,
  calculateBearing,
  bearingToCardinal,
} = require("../game/utils/distanceCalculator");

async function submitGuess(req, res) {
  const userId = req.user;
  const { challengeId, guess, guessNum } = req.body;

  try {
    // fetch the Daily Challenge
    const challenge = await DailyChallenge.findById(challengeId).populate(
      "dailyCountry"
    );

    if (!challenge) {
      return res.status(404).send("Daily challenge not found.");
    }

    // find the guessed country's document
    const guessedCountry = await Country.findOne({ name: guess });

    // determine if the guess is correct
    const isCorrect =
      challenge.dailyCountry.name.toLowerCase() === guess.toLowerCase();

    // find or Create a Guess document for the user and the challenge
    let userGuess = await Guess.findOne({
      user: userId,
      challenge: challengeId,
    });
    if (!userGuess) {
      userGuess = new Guess({
        user: userId,
        challenge: challengeId,
        guesses: [],
        isComplete: false,
      });
    }

    // check if the user has already made 6 guesses or has already guessed the correct country
    if (userGuess.isComplete || userGuess.guesses.length >= 6) {
      return res
        .status(400)
        .json({ message: "Game over. You cannot make any more guesses." });
    }

    let distance;
    let direction;

    // if the guess is incorrect, calculate distance, get bearing, and convert to cardinal direction
    if (!isCorrect) {
      const guessedCountryLocation = guessedCountry.location;
      const correctCountryLocation = challenge.dailyCountry.location;
      distance = calculateDistance(
        guessedCountryLocation.latitude,
        guessedCountryLocation.longitude,
        correctCountryLocation.latitude,
        correctCountryLocation.longitude
      );

      const bearing = calculateBearing(
        guessedCountryLocation.latitude,
        guessedCountryLocation.longitude,
        correctCountryLocation.latitude,
        correctCountryLocation.longitude
      );

      direction = bearingToCardinal(bearing);
    }

    // add the new guess to the guesses array*
    userGuess.guesses.push({
      guessNum: guessNum,
      guess: guess,
      guessFlag: guessedCountry.flag,
      guessCode: guessedCountry.alpha3Code,
      isCorrect: isCorrect,
      distance: distance,
      direction: direction,
    });

    // update isComplete if the guess is correct
    if (isCorrect) {
      userGuess.isComplete = true;
    }

    await userGuess.save();

    // construct feedback message
    let feedbackMessage = isCorrect
      ? "Correct! You've guessed the country."
      : "Incorrect guess. Try again!";

    // construct the guess object to return
    let guessDetails = {
      guessNum: guessNum,
      guess: guess,
      isCorrect: isCorrect,
      guessFlag: guessedCountry.flag,
      guessCode: guessedCountry.alpha3Code,
      distance: isCorrect ? null : Math.round(distance), // only include these if the answer is incorrect
      direction: isCorrect ? null : direction,
    };

    // respond with guess result and feedback
    res.json({
      success: true,
      isCorrect,
      message: feedbackMessage,
      guess: guessDetails,
    });
  } catch (err) {
    console.error("Error submitting guess:", err);
    res.status(500).send("Error submitting guess.");
  }
}

async function getGuesses(req, res) {
  const userId = req.user;
  const challengeId = req.params.id;

  try {
    const userGuess = await Guess.findOne({
      user: userId,
      challenge: challengeId,
    }).populate("guesses");

    if (!userGuess) {
      return res.json([]);
    }

    res.json(userGuess.guesses || []);
  } catch (err) {
    console.error("Error fetching guesses:", err);
    res.status(500).send("Error fetching guesses.");
  }
}

module.exports = { submitGuess, getGuesses };
