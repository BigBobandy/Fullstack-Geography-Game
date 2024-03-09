const Country = require("../../models/countryModel");
const weightedSelectByArea = require("../utils/weightedSelection");

async function getAllCountries() {
  try {
    // Connect to the database
    await connectDB();

    const countries = await Country.find({});
    return countries;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    // Close the connection
    mongoose.connection.close();
  }
}

async function selectCountry() {
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

    // try {
    //   // Update the lastUsed field of the selected country
    //   selectedCountry.lastUsed = new Date();
    //   await selectedCountry.save();
    // } catch (err) {
    //   console.error(
    //     `Error updating lastUsed field for selected country, ${selectedCountry}:`,
    //     err
    //   );
    //   throw err;
    // }

    return selectedCountry;
  } catch (err) {
    console.error("Error selecting country: ", err);
    throw err;
  }
}

module.exports = selectCountry;
