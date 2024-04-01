const UserStats = require("../../models/userStatsModel");
const { updateParticipationStreak } = require("./dailyParticipationService");
const moment = require("moment-timezone");

async function updateUserStats({ userId, guessDetails, isGameWon }) {
  // retrieve user stats doc
  let userStats = await UserStats.findOne({ user: userId });

  // if user stats doc does not exist, create a new one
  if (!userStats) {
    userStats = new UserStats({
      user: userId,
      correctGuesses: [],
      lastParticipationDate: new Date(0),
      streakUpdatedToday: false,
    });
    await userStats.save(); // save the new doc before trying to access it
  }

  // daily reset of lastParticipationDate
  const todayStart = moment.tz("America/New_York").startOf("day").toDate();

  // Convert lastParticipationDate to the start of the day in the "America/New_York" timezone for comparison
  let lastParticipationDate = moment(userStats.lastParticipationDate)
    .tz("America/New_York")
    .startOf("day")
    .toDate();

  if (lastParticipationDate < today) {
    userStats.streakUpdatedToday = false; // Reset the flag for the new day
    userStats.lastParticipationDate = todayStart; // Update last participation date to today
  }

  // if the streak has not been updated today, update it
  if (!userStats.streakUpdatedToday) {
    await updateParticipationStreak(userId);

    userStats.totalGames += 1;

    userStats.streakUpdatedToday = true;
  }

  // update total guesses
  userStats.totalGuesses += 1;

  // Handle a correct guess
  if (guessDetails.isCorrect) {
    // Check if the country has already been guessed correctly before
    const existingEntry = userStats.correctGuesses.find(
      (c) => c.name === guessDetails.guess
    );
    if (!existingEntry) {
      userStats.correctGuesses.push({
        name: guessDetails.guess,
        flag: guessDetails.guessFlag,
      });
    }
  }

  // Handle a game win
  if (isGameWon) {
    userStats.totalWins += 1;
  }

  await userStats.save();
}

module.exports = { updateUserStats };
