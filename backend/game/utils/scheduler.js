const cron = require("node-cron");
const selectCountry = require("../services/countryService");
const setDailyChallenge = require("../services/challengeService");

// function to setup a new daily challenge
async function setupNewDailyChallenge() {
  try {
    const selectedCountry = await selectCountry();
    await setDailyChallenge(selectedCountry._id);

    console.log("New daily challenge set");
  } catch (err) {
    console.error("Error setting up new daily challenge: ", err);
  }
}

// shcedule the task to run at midnight everyday
cron.schedule("0 0 * * *", () => {
  console.log("Running a task every day at midnight");
  setupNewDailyChallenge();
});
