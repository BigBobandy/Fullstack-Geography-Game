const selectCountry = require("../services/countryService");

async function handleGameLogic() {
  try {
    // step 1 - select country for challenge
    const selectedCountry = await selectCountry();
    console.log("Selected country: ", selectedCountry.name);

    // step 2 - use selected country to set the challenge in database
  } catch (err) {
    console.error("Error in game logic", err);
    throw err;
  }
}

module.exports = handleGameLogic;
