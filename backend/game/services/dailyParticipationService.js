const UserStats = require("../../models/userStatsModel");
const moment = require("moment-timezone");

// Ensures the date is adjusted to EST and starts at the beginning of the day
function getEffectiveGameDate(date, timezone = "America/New_York") {
  return moment(date).tz(timezone).startOf("day").toDate();
}

// Checks if two dates are consecutive, considering timezone adjustments
function isConsecutiveDay(previous, current) {
  const prevDate = moment(previous).startOf("day");
  const currDate = moment(current).startOf("day");
  return currDate.diff(prevDate, "days") === 1;
}

// Updates user's participation streak and checks for the longest streak
async function updateParticipationStreak(userId) {
  let userStats = await UserStats.findOne({ user: userId });

  if (!userStats) {
    console.error("User stats not found for user", userId);
    return;
  }

  const today = getEffectiveGameDate(new Date());
  let lastParticipationDate = userStats.lastParticipationDate
    ? getEffectiveGameDate(userStats.lastParticipationDate)
    : null;

  // If it's a new day of participation and not the same day
  if (!lastParticipationDate || lastParticipationDate < today) {
    if (
      lastParticipationDate &&
      isConsecutiveDay(lastParticipationDate, today)
    ) {
      // If consecutive, increment the current streak
      userStats.currentStreak += 1;
    } else {
      // If not consecutive, reset the current streak
      userStats.currentStreak = 1;
    }

    // Update the longest streak if the current streak is greater
    if (userStats.currentStreak > userStats.longestStreak) {
      userStats.longestStreak = userStats.currentStreak;
    }

    userStats.lastParticipationDate = today; // Update last participation to today
    await userStats.save();
  }
}

module.exports = { updateParticipationStreak };
