const connectDB = require("../../config/db");
const Country = require("../../models/countryModel");
const mongoose = require("mongoose");

async function initializeLastUsedField() {
  try {
    await connectDB();

    const result = await Country.updateMany({}, { $set: { lastUsed: null } });

    console.log(`${result.n} documents updated`);
  } catch (err) {
    console.error(err);
    return;
  } finally {
    mongoose.disconnect();
  }
}

// initializeLastUsedField();

async function checkThisField(countryName, field) {
  try {
    await connectDB();

    const result = await Country.findOne({ name: countryName });

    // check the field for the selected country
    console.log(result[field]);
  } catch (err) {
    console.error(err);
    return;
  } finally {
    mongoose.disconnect();
  }
}

// checkThisField("Canada", "capital");
