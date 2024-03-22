const UserStats = require("../../models/userStatsModel");

// sets the given date to start of day
function setToStartOfDay(date) {
  const adjustedDate = new Date(date);
  adjustedDate.setHours(0, 0, 0, 0);
  return adjustedDate;
}

// checks if two dates are consecutive
function isConsecutiveDay(previous, current) {
  const difference = current - previous;
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  return difference === oneDay;
}

// updates user's participation streak
async function updateParticipationStreak(userId) {
  const userStats = await UserStats.findOne({ user: userId });

  if (!userStats) {
    console.error("User stats not found for user", userId);
    return;
  }

  // ensure streak doesn't get updated multiple times in a day
  if (userStats.streakUpdatedToday) {
    return;
  }

  const today = setToStartOfDay(new Date());
  let lastParticipationDate = userStats.lastParticipationDate
    ? setToStartOfDay(userStats.lastParticipationDate)
    : null;

  if (
    !lastParticipationDate ||
    !isConsecutiveDay(lastParticipationDate.getTime(), today.getTime())
  ) {
    userStats.currentStreak = 1; // Reset to 1 if not consecutive
  } else {
    userStats.currentStreak += 1; // Increment if consecutive
    // Check and update longest streak
    if (userStats.currentStreak > userStats.longestStreak) {
      userStats.longestStreak = userStats.currentStreak;
    }
  }

  // update total games
  userStats.totalGames += 1;

  userStats.lastParticipationDate = today; // Always update the last participation date
  await userStats.save();
}

module.exports = { updateParticipationStreak };
