const Country = require("../../models/countryModel");
const connectDB = require("../../config/db");
const mongoose = require("mongoose");

// function to find countries with area below certain threshold
async function findCountriesWithSmallArea() {
  try {
    await connectDB();
  } catch (err) {
    console.error("Error connecting to database: ", err.message);
    process.exit(1);
  }

  const countries = await Country.find();

  const countriesWithSmallArea = [];

  try {
    countries.forEach((country) => {
      if (country.area < 300) {
        countriesWithSmallArea.push({
          id: country._id,
          name: country.name,
          area: country.area,
        });
      }
    });

    console.log(countriesWithSmallArea);
  } catch (err) {
    console.error("Error finding countries with small area: ", err.message);
    process.exit(1);
  } finally {
    mongoose.connection.close();
  }
}

findCountriesWithSmallArea();
