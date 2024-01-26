const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const connectDB = require("../../config/db");
const Country = require("../countrySchema");

// Read the JSON file with country data
const rawData = fs.readFileSync(path.join(__dirname, "exportedData.json"));
const countries = JSON.parse(rawData);

// Delete continent record from each country
const deleteContinent = async () => {
  await connectDB(); //connect to the database

  try {
    for (let country of countries) {
      const updatedCountry = await Country.findOneAndUpdate(
        // find the country by name
        { name: country.name },
        // use $unset to delete the continent field
        { $unset: { continent: 1 } }
      );
      console.log(`Updated ${updatedCountry.name} `);
    }
  } catch (err) {
    console.error("Error updating data: ", err);
  } finally {
    mongoose.disconnect();
  }
};

deleteContinent();

// // Transform the data to match the schema and insert it into the database
// const insertData = async () => {
//   await connectDB(); //connect to the database

//   try {
//     for (let country of countries) {
//       console.log(`Inserting ${country.name}`);
//       const newCountry = new Country({
//         name: country.name,
//         capital: country.capital || "N/A",
//         location: {
//           latitude: country.latlng[0],
//           longitude: country.latlng[1],
//         },
//         flag: country.flag,
//         region: country.region,
//         subregion: country.subregion || "N/A",
//       });

//       await newCountry.save();
//     }
//   } catch (err) {
//     console.error("Error importing data: ", err);
//   } finally {
//     mongoose.disconnect();
//   }
// };

// // insertData();

// const updateData = async () => {
//   await connectDB(); //connect to the database

//   try {
//     // add timezones and unMember fields to each country
//     for (let country of countries) {
//       console.log(`Updating ${country.name}`);
//       const updatedCountry = await Country.findOneAndUpdate(
//         { name: country.name },
//         {
//           timezones: country.timezones || ["N/A"],
//           unMember: country.unMember || false,
//           area: country.area || 0,
//         }
//       );
//       console.log(
//         `Updated ${updatedCountry.name} located in ${updatedCountry.continent}`
//       );
//     }
//   } catch (err) {
//     console.error("Error updating data: ", err);
//   } finally {
//     mongoose.disconnect();
//   }
// };

// updateData();
