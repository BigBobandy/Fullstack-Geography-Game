import React from "react";

const GuessDropdown = ({
  filteredCountries,
  highlightedIndex,
  handleCountrySelect,
  setHighlightedIndex,
}) => {
  return (
    <ul
      className="list-none bg-base-200 mt-2 rounded-lg h-[20vh] overflow-hidden w-fit shadow-lg max-h-60 
                 overflow-y-auto text-left px-4 py-2"
    >
      {filteredCountries.map((country, index) => (
        <li
          key={index}
          className={`cursor-pointer hover:bg-base-300 text-xl my-2 ${
            index === highlightedIndex ? "bg-base-300" : ""
          }`}
          onClick={() => handleCountrySelect(country)}
          onMouseEnter={() => setHighlightedIndex(index)}
          onMouseLeave={() => setHighlightedIndex(-1)}
        >
          {country}
        </li>
      ))}
    </ul>
  );
};

export default GuessDropdown;
