const Country = require("../../models/countryModel");
const Guess = require("../../models/guessModel");
const {
  calculateDistance,
  calculateBearing,
  bearingToCardinal,
  calculateProximityPercentage,
} = require("../utils/distanceCalculator");

// handles returning calculated values for an incorrect guess
function handleIncorrectGuess(guessedLocation, correctLocation, maxDistance) {
  const distance = calculateDistance(
    guessedLocation.latitude,
    guessedLocation.longitude,
    correctLocation.latitude,
    correctLocation.longitude
  );

  const proximityPercentage = calculateProximityPercentage(
    distance,
    maxDistance
  );

  const bearing = calculateBearing(
    guessedLocation.latitude,
    guessedLocation.longitude,
    correctLocation.latitude,
    correctLocation.longitude
  );

  const direction = bearingToCardinal(bearing);

  return { distance, direction, proximityPercentage };
}

function checkGameOver(userGuessDoc) {
  // first check if the game is already been marked as complete
  if (userGuessDoc.isComplete) {
    return {
      gameOver: true,
      message: "Game over. You have completed this challenge.",
    };
  }

  // check if the user used all of their guesses
  if (userGuessDoc.guesses.length > 6) {
    userGuessDoc.isComplete = true;
    userGuessDoc.save();
    return {
      gameOver: true,
      message: "Game over. You cannot make any more guesses.",
    };
  }

  // if neither condition is met, then the game is not over
  return { gameOver: false };
}

module.exports = {
  handleIncorrectGuess,
  checkGameOver,
};
