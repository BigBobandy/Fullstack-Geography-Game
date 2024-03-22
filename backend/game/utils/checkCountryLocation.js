const mongoose = require("mongoose");
const Country = require("../../models/countryModel");
const connectDB = require("../../config/db");

connectDB().then(() => {
  checkCountryLocations();
});

async function checkCountryLocations() {
  try {
    const allCountries = await Country.find();

    let invalidLocations = [];

    allCountries.forEach((country) => {
      const { latitude, longitude } = country.location;
      if (
        latitude === undefined ||
        longitude === undefined ||
        isNaN(latitude) ||
        isNaN(longitude)
      ) {
        invalidLocations.push({
          name: country.name,
          latitude,
          longitude,
        });
      }
    });

    if (invalidLocations.length > 0) {
      console.log("Countries with invalid location data:", invalidLocations);
    } else {
      console.log("All countries have valid location data.");
    }
  } catch (error) {
    console.error("Error checking country locations:", error);
  }
}
