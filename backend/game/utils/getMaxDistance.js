const mongoose = require("mongoose");
const Country = require("../../models/countryModel");
const { calculateDistance } = require("./distanceCalculator");
const connectDB = require("../../config/db");

async function getMaxDistance() {
  await connectDB();

  try {
    // fetch all countries in the database
    console.log("Fetching all countries...");
    const allCountries = await Country.find();
    console.log(`Found ${allCountries.length} countries.`);

    for (const targetCountry of allCountries) {
      let maxDistance = 0;
      console.log(`Processing target country: ${targetCountry.name}`);

      for (const otherCountry of allCountries) {
        if (targetCountry._id.equals(otherCountry._id)) continue; // skip the same coutry

        console.log(
          `Calculating distance from ${targetCountry.name} to ${otherCountry.name}...`
        );
        const distance = calculateDistance(
          targetCountry.location.latitude,
          targetCountry.location.longitude,
          otherCountry.location.latitude,
          otherCountry.location.longitude
        );

        if (!isNaN(distance)) {
          maxDistance = Math.max(maxDistance, distance); // Update maxDistance only with valid numbers
          console.log(
            `Updated max distance for ${targetCountry.name}: ${maxDistance} km`
          );
        } else {
          console.log(
            `Distance calculation resulted in NaN for ${targetCountry.name} to ${otherCountry.name}`
          );
        }

        maxDistance = Math.round(maxDistance); // Round it to the nearest whole number
        console.log(
          `Final max distance for ${targetCountry.name}: ${maxDistance} km`
        );

        // update the country's maxDistance field
        await Country.updateOne(
          { _id: targetCountry._id },
          { $set: { maxDistance: maxDistance } }
        );
        console.log(`Max distance updated for ${targetCountry.name}.`);
      }
    }

    console.log("All countries updated with maxDistance field.");
  } catch (error) {
    mongoose.connection.close();
    console.error("Error during maxDistance calculation: ", error);
  } finally {
    mongoose.connection.close();
  }
}

getMaxDistance();
