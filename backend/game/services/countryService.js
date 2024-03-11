const Country = require("../../models/countryModel");
const DailyChallenge = require("../../models/dailyChallengeModel");
const weightedSelectByArea = require("../utils/weightedSelection");

async function getAllCountries() {
  try {
    const countries = await Country.find({});
    return countries;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function selectCountry() {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Adjust 'today' to the start of the day

  // Check if a challenge for today already exists
  const existingChallenge = await DailyChallenge.findOne({
    challengeDate: today,
  });

  if (existingChallenge) {
    console.log("Challenge for today already exists.");
    return existingChallenge.dailyCountry;
  }

  try {
    let countries = await getAllCountries();

    // If there are countries that have never been used, filter them
    const neverUsedCountries = countries.filter(
      (country) => country.lastUsed === null
    );

    // Decide the pool of countries to apply weighted selection on
    const selectionPool =
      neverUsedCountries.length > 0 ? neverUsedCountries : countries;

    // Use the weighted selection utility
    const selectedCountry = weightedSelectByArea(selectionPool);
    console.log("Selected country: ", selectedCountry.name);

    try {
      // Update the lastUsed field of the selected country
      selectedCountry.lastUsed = new Date();
      await selectedCountry.save();
    } catch (err) {
      console.error(
        `Error updating lastUsed field for selected country, ${selectedCountry}:`,
        err
      );
      throw err;
    }

    return selectedCountry;
  } catch (err) {
    console.error("Error selecting country: ", err);
    throw err;
  }
}

module.exports = selectCountry;
