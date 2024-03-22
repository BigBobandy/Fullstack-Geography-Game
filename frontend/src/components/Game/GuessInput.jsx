import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitGuess } from "../../store/slices/guessSlice";
import countries from "../../utils/countries";
import { Toast } from "../UI/Toast";
import GuessButton from "./GuessButton";

const GuessInput = ({ totalGuessSlots }) => {
  const challengeId = useSelector((state) => state.challenge.challengeId);
  const { isCorrect, guesses } = useSelector((state) => state.guess);
  const [guess, setGuess] = useState("");
  const dispatch = useDispatch();
  const [guessNum, setGuessNum] = useState(1);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const wrapperRef = useRef(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const isGameEnded = isCorrect || guesses.length >= 6;

  // Function to show the toast
  const showToastWithMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);

    // After 5 seconds, hide the toast
    setTimeout(() => {
      setShowToast(false);
    }, 5000);

    // Clear timeout if the component is unmounted to prevent memory leaks
    return () => clearTimeout(timer);
  };

  // useEffect that cleans up the timeout
  useEffect(() => {
    let toastTimeout;

    if (showToast) {
      toastTimeout = setTimeout(() => {
        setShowToast(false);
      }, 5000);
    }

    // Cleanup
    return () => {
      if (toastTimeout) {
        clearTimeout(toastTimeout);
      }
    };
  }, [showToast]);

  // Handle changes in the input field
  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setGuess(inputValue);

    // Filter countries based on input
    const searchQuery = inputValue.toLowerCase();
    const matches = countries.filter((country) =>
      country.toLowerCase().includes(searchQuery)
    );

    setFilteredCountries(matches);
  };

  // Handle focus on the input field to show all countries
  const handleFocus = () => {
    setFilteredCountries(countries);
  };

  // Function to handle keyboard navigation
  const handleKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      // Prevent the default action to stop scrolling the whole page
      event.preventDefault();
      setHighlightedIndex((prevIndex) =>
        prevIndex < filteredCountries.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlightedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    } else if (event.key === "Enter" && highlightedIndex >= 0) {
      event.preventDefault(); // Prevent form submission
      handleCountrySelect(filteredCountries[highlightedIndex]);
    }
  };

  // Handle selection of a country from the list
  const handleCountrySelect = (selectedCountry) => {
    const countryName = selectedCountry.split(" - ")[1];
    setGuess(countryName);
    setFilteredCountries([]);
    setHighlightedIndex(-1); // Reset the index when a country is selected
  };

  // Close the list if clicking outside the component
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setFilteredCountries([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  // Handle the submission of the guess
  const handleSubmit = (event) => {
    event.preventDefault();

    const isValidGuess = countries.some(
      (country) => country.split(" - ")[1].toLowerCase() === guess.toLowerCase()
    );

    if (!isValidGuess) {
      showToastWithMessage("Please select a valid country from the list.");
      return;
    }

    dispatch(submitGuess({ challengeId, guess, guessNum }));
    setGuess("");
    setFilteredCountries([]);
    setGuessNum(guessNum + 1);
  };

  // Function to close the toast
  const closeToast = () => {
    setShowToast(false);
  };

  return (
    <div ref={wrapperRef}>
      <Toast message={toastMessage} show={showToast} onClose={closeToast} />
      <form
        onSubmit={handleSubmit}
        className="flex flex-row justify-between mt-2 w-full"
        onKeyDown={handleKeyDown}
      >
        <input
          type="text"
          value={guess}
          placeholder="Guess a country..."
          className="input input-bordered w-full"
          onChange={handleInputChange}
          onFocus={handleFocus}
          disabled={isGameEnded}
        />
        <GuessButton disabled={isGameEnded} />
      </form>
      {filteredCountries.length > 0 && (
        <ul
          className="list-none bg-base-200 mt-2 rounded-lg h-[20vh] overflow-hidden shadow-lg max-h-60 
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
      )}
    </div>
  );
};

export default GuessInput;
