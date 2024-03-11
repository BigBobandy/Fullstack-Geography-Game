const connectDB = require("../../config/db");
const Country = require("../../models/countryModel");
const fs = require("fs");
const mongoose = require("mongoose");

// Read and parse the exported data
const rawData = fs.readFileSync("./exportedData.json");
const exportedData = JSON.parse(rawData);

const rawCountries = fs.readFileSync("./countriesToRepair.json");
const countriesToRepair = JSON.parse(rawCountries);

console.log(countriesToRepair[1].missingFields);

// // Function to find countries with missing data
// async function findMissingCountryData() {
//   try {
//     await connectDB();
//   } catch (err) {
//     console.error("Error connecting to database: ", err.message);
//     process.exit(1);
//   }

//   const countries = await Country.find();

//   const countriesWithMissingData = [];

//   try {
//     countries.forEach((country) => {
//       const missingFields = [];
//       const fieldsToCheck = [
//         "name",
//         "alpha3Code",
//         "capital",
//         "location",
//         "flag",
//         "unMember",
//         "timezones",
//         "area",
//         "region",
//         "subregion",
//         "outlineImageUrl",
//       ];

//       fieldsToCheck.forEach((field) => {
//         if (
//           !country[field] ||
//           (Array.isArray(country[field]) && country[field].length === 0)
//         ) {
//           missingFields.push(field);
//         }
//       });

//       if (missingFields.length > 0) {
//         countriesWithMissingData.push({
//           id: country._id,
//           name: country.name,
//           missingFields,
//         });
//       }
//     });

//     fs.writeFileSync(
//       "counriesToRepair.json",
//       JSON.stringify(countriesWithMissingData)
//     );
//   } catch (err) {
//     console.error("Error finding countries with missing data: ", err.message);
//     process.exit(1);
//   } finally {
//     mongoose.connection.close().then(() => {
//       console.log("Mongoose connection disconnected");
//       process.exit(0);
//     });
//   }
// }

// Function to repair missing country data
async function repairCountryData() {
  try {
    await connectDB();
  } catch (err) {
    console.error("Error connecting to database: ", err.message);
    process.exit(1);
  }

  for (const country of countriesToRepair) {
    const dataToRepair = exportedData.find((c) => c.name === country.name);

    if (!dataToRepair) {
      console.log(`No exported data found for ${country.name} `);
      continue;
    }

    const updateData = {};
    country.missingFields.forEach((field) => {
      if (dataToRepair[field] !== undefined) {
        updateData[field] = dataToRepair[field];
      }
    });

    if (Object.keys(updateData).length > 0) {
      try {
        await Country.updateOne({ _id: country.id }, { $set: updateData });
        console.log(`Updated ${country.name} with: `, updateData);
      } catch (err) {
        console.error(`Error updating ${country.name}: ${err.message}`);
      }
    } else {
      console.log(`No data to update for ${country.name}`);
    }
  }

  mongoose.connection.close().then(() => {
    console.log("Mongoose connection disconnected");
    process.exit(0);
  });
}

// Main function to run the repair
async function main() {
  if (countriesToRepair.length === 0) {
    console.log("No countries to repair");
    process.exit(0);
  } else {
    await repairCountryData();
  }
}

// Run the main function
main().catch((err) => {
  console.error("Error running repairCountryData: ", err.message);
  process.exit(1);
});
