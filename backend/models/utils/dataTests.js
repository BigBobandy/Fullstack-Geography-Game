const fs = require("fs");

const rawData = fs.readFileSync("./exportedData.json");
const countries = JSON.parse(rawData);

function findLargestCountry(countries) {
  let largestCountry = countries[0];
  for (let country of countries) {
    if (country.area > largestCountry.area) {
      largestCountry = country;
    }
  }
  return largestCountry;
}

console.log(findLargestCountry(countries));

// function findNullCountries(countries) {
//   const nullCountries = [];
//   for (let country of countries) {
//     if (!country.capital || !country.subregion) {
//       nullCountries.push(country.name);
//     }
//   }
//   return nullCountries;
// }

// console.log(findNullCountries(countries));

// function findAltSpellings(countries) {
//   const altSpellings = [];
//   for (let country of countries) {
//     if (country.altSpellings.length > 0) {
//       altSpellings.push(country.name);
//     }
//   }
//   return altSpellings;
// }

// console.log(findAltSpellings(countries));

// function findNoAltSpellings(countries) {
//   const noAltSpellings = [];
//   for (let country of countries) {
//     if (country.altSpellings.length === 1) {
//       noAltSpellings.push(country.name);
//     }
//   }
//   return noAltSpellings;
// }

// console.log(findNoAltSpellings(countries));

// function findMoreThanOneAltSpellings(countries) {
//   const moreThanOneAltSpellings = [];
//   for (let country of countries) {
//     if (country.altSpellings.length > 1) {
//       moreThanOneAltSpellings.push(country.name);
//     }
//   }
//   return moreThanOneAltSpellings;
// }

// console.log(findMoreThanOneAltSpellings(countries));
