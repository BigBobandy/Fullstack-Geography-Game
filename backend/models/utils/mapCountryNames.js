const fs = require("fs");

const rawData = fs.readFileSync("./exportedData.json");
const countries = JSON.parse(rawData);

function saveCountryNames(countries) {
  const formattedData = countries.map((country) => {
    return {
      [country.alpha3Code]: country.name,
    };
  });

  const jsonData = JSON.stringify(formattedData, null, 2);

  fs.writeFileSync("./countryNames.json", jsonData);
}

saveCountryNames(countries);
