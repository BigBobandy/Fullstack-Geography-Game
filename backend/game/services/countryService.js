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

async function selectCountries() {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Adjust 'today' to the start of the day

  // Check if a challenge for today already exists
  const existingChallenge = await DailyChallenge.findOne({
    challengeDate: today,
  });

  if (existingChallenge) {
    return existingChallenge.dailyCountries;
  }

  try {
    let countries = await getAllCountries();

    // If there are countries that have never been used, filter them
    const neverUsedCountries = countries.filter(
      (country) => country.lastUsed === null
    );

    // Decide the pool of countries to apply weighted selection on
    let selectionPool =
      neverUsedCountries.length > 0 ? neverUsedCountries : countries;

    let selectedCountries = [];

    // Select 3 countries
    for (let i = 0; i < 3; i++) {
      // apply weighted selection to the pool
      const selectedCountry = weightedSelectByArea(selectionPool);
      selectedCountries.push(selectedCountry);

      // Update the selectionPool to exclude the selected country
      selectionPool = selectionPool.filter(
        (country) => !country._id.equals(selectedCountry._id)
      );

      // Update the lastUsed field of the selected country
      selectedCountry.lastUsed = new Date();
      await selectedCountry.save();
    }

    console.log(
      "Selected countries: ",
      selectedCountries.map((country) => country.name)
    );

    return selectedCountries.map((country) => country._id); // return array of ids
  } catch (err) {
    console.error("Error selecting country: ", err);
    throw err;
  }
}

module.exports = selectCountries;
