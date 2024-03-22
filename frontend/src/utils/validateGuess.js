import countries from "./countries";

const validateGuess = (guess) => {
  return countries.some(
    (country) => country.split(" - ")[1].toLowerCase() === guess.toLowerCase()
  );
};

export default validateGuess;
