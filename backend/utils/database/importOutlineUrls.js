const mongoose = require("mongoose");
const fs = require("fs");
const connectDB = require("../../config/db");
const Country = require("../../models/countrySchema");

const rawData = fs.readFileSync("./exportedData.json");
const countries = JSON.parse(rawData);

function getAlpha3CodeFromName(name) {
  const country = countries.find((country) => country.name === name);
  return country ? country.alpha3Code : null;
}

const importOutlineUrls = async () => {
  let session;

  try {
    // Connect to the database
    await connectDB();

    // Start a session for the transaction
    session = await mongoose.startSession();
    session.startTransaction();

    // Fetch all country documents
    const countries = await Country.find().session(session);

    for (let country of countries) {
      // Get the alpha-3 code for the country
      const alpha3Code = getAlpha3CodeFromName(country.name);

      if (alpha3Code === undefined || alpha3Code === null) {
        throw new Error(`Alpha-3 code not found for ${country.name}`);
      }

      // Update the country document
      country.alpha3Code = alpha3Code;
      country.outlineImageUrl = `/assets/outline/${alpha3Code}-${country.name}.svg`;

      await country.save({ session }); // Pass the session to the save operation
      console.log(`Updated ${country.name}`);
    }

    // Commit the transaction
    await session.commitTransaction();
    console.log("All countries have been updated successfully.");
  } catch (err) {
    // If an error occurred, log it and abort the transaction
    console.error("Failed to update countries:", err);
    await session.abortTransaction();
    session.endSession();
  } finally {
    if (session) {
      session.endSession();
    }

    // Disconnect from the database
    await mongoose.connection.close();
  }
};

importOutlineUrls();

// // Function that checks if every country in the database has an alpha-3 code
// async function checkAlpha3Codes() {
//   try {
//     await connectDB();
//   } catch (err) {
//     console.error("Error connecting to database: ", err.message);
//     process.exit(1);
//   }

//   const countries = await Country.find();

//   let missingAlpha3Codes = 0;

//   try {
//     for (let country of countries) {
//       if (!country.alpha3Code) {
//         missingAlpha3Codes++;
//         console.log(`No alpha-3 code found for ${country.name}`);
//       }
//     }

//     if (missingAlpha3Codes === 0) {
//       console.log("All countries have an alpha-3 code.");
//     } else {
//       console.log(
//         `${missingAlpha3Codes} countries are missing an alpha-3 code.`
//       );
//     }
//   } catch (err) {
//     console.error(`Error checking alpha-3 codes: ${err.message}`);
//   } finally {
//     mongoose.connection.close().then(() => {
//       console.log("Mongoose connection disconnected");
//       process.exit(0);
//     });
//   }
// }

// checkAlpha3Codes();
