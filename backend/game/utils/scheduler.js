const cron = require("node-cron");
require("tz-node").default;
const selectCountries = require("../services/countryService");
const setDailyChallenge = require("../services/challengeService");

// function to setup a new daily challenge
async function setupNewDailyChallenge() {
  try {
    const selectedCountries = await selectCountries();
    await setDailyChallenge(selectedCountries);

    console.log("New daily challenge set");
  } catch (err) {
    console.error("Error setting up new daily challenge: ", err);
  }
}

// shcedule the task to run at midnight everyday
cron.schedule(
  "0 0 * * *",
  () => {
    console.log("Running a task every day at midnight");
    setupNewDailyChallenge();
  },
  {
    timezone: "America/New_York",
  }
);
