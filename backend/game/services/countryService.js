const Country = require("../../models/countryModel");
const DailyChallenge = require("../../models/dailyChallengeModel");
const weightedSelectByArea = require("../utils/weightedSelection");
const moment = require("moment-timezone");

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
  const todayStart = moment.tz("America/New_York").startOf("day").toDate();
  const todayEnd = moment.tz("America/New_York").endOf("day").toDate();

  // Check if a challenge for today already exists
  const existingChallenge = await DailyChallenge.findOne({
    challengeDate: {
      $gte: todayStart,
      $lt: todayEnd,
    },
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
      selectedCountry.lastUsed = moment.tz("America/New_York").toDate();
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
