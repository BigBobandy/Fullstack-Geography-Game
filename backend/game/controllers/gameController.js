const selectCountry = require("../services/countryService");
const setDailyChallenge = require("../services/challengeService");

async function handleGameLogic() {
  try {
    // step 1 - select country for challenge
    const selectedCountry = await selectCountry();

    // step 2 - use selected country to set the challenge in database
    await setDailyChallenge(selectedCountry._id);

    // step 3 - end game logic
  } catch (err) {
    console.error("Error in game logic", err);
    throw err;
  }
}

module.exports = handleGameLogic;
