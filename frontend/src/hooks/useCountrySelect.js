import { useState } from "react";
import countries from "../utils/countries";

const useCountrySelect = () => {
  const [guess, setGuess] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const filterCountries = (inputValue) => {
    const searchQuery = inputValue.toLowerCase();
    const matches = countries.filter((country) =>
      country.toLowerCase().includes(searchQuery)
    );
    setFilteredCountries(matches);
  };

  const selectCountry = (selectedCountry) => {
    const countryName = selectedCountry.split(" - ")[1];
    setGuess(countryName);
    setFilteredCountries([]);
    setHighlightedIndex(-1);
  };

  return {
    guess,
    setGuess,
    filteredCountries,
    setFilteredCountries,
    highlightedIndex,
    setHighlightedIndex,
    filterCountries,
    selectCountry,
  };
};

export default useCountrySelect;
