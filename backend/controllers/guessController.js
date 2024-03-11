const Guess = require("../models/guessModel");
const DailyChallenge = require("../models/dailyChallengeModel");

async function submitGuess(req, res) {
  const userId = req.user.id;
  const { challengeId, guess, guessNum } = req.body;

  try {
    // Fetch the Daily Challenge
    const challenge = await DailyChallenge.findById(challengeId).populate(
      "dailyCountry"
    );

    if (!challenge) {
      return res.status(404).send("Daily challenge not found.");
    }

    // Determine if the guess is correct
    const isCorrect =
      challenge.dailyCountry.name.toLowerCase() === guess.toLowerCase();

    // Find or Create a Guess document for the user and the challenge
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

    // Add the new guess to the guesses array
    userGuess.guesses.push({
      guessNum: guessNum,
      guess: guess,
      isCorrect: isCorrect,
    });

    // Update isComplete if the guess is correct
    if (isCorrect) {
      userGuess.isComplete = true;
    }

    await userGuess.save();

    // Construct feedback message
    let feedbackMessage = isCorrect
      ? "Correct! You've guessed the country."
      : "Incorrect guess. Try again!";

    // Respond with guess result and feedback
    res.json({ success: true, isCorrect, message: feedbackMessage });
  } catch (err) {
    console.error("Error submitting guess:", err);
    res.status(500).send("Error submitting guess.");
  }
}

module.exports = { submitGuess };
