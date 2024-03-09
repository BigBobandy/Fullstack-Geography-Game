/**
 * Performs weighted selection from a list of countries.
 * Each country's chance of being selected is proportional to its area.
 *
 * @param {Array} countries - The list of countries to select from.
 * @returns {Object} - The selected country.
 */
function weightedSelectByArea(countries) {
  // first calculate the total area of all countries
  const totalArea = countries.reduce((acc, curr) => acc + curr.area, 0);

  // then select a random number between 0 and the total area
  let randomArea = Math.random() * totalArea;

  // iterate through the countries and subtract their area from the random number
  for (const country of countries) {
    randomArea -= country.area;

    // if the random number is less than or equal to 0, select this country
    if (randomArea <= 0) {
      return country;
    }
  }
  // Fallback to return a random country if the loop completes without selection
  console.log(
    "No country was selected, returning a random country as fallback."
  );
  return countries[Math.floor(Math.random() * countries.length)];
}

module.exports = weightedSelectByArea;
