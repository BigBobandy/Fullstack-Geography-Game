import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useCountrySelect from "../../hooks/useCountrySelect";
import useToast from "../../hooks/useToast";
import { submitGuess, submitHint } from "../../store/actions/guessActions";
import countries from "../../utils/countries";
import validateGuess from "../../utils/validateGuess";
import { Toast } from "../UI/Toast";
import GuessButton from "./GuessButton";
import GuessDropdown from "./GuessDropdown";
import HintButton from "./HintButton";

const GuessInput = ({ totalGuessSlots }) => {
  const challengeId = useSelector((state) => state.challenge.challengeId);
  const { isCorrect, guesses } = useSelector((state) => state.guess);
  const dispatch = useDispatch();
  const [guessNum, setGuessNum] = useState(1);
  const wrapperRef = useRef(null);
  const isGameEnded = isCorrect || guesses.length >= 6;
  const hintUsed = guesses.some((guess) => guess.hintUsed);
  const disabledHintButton = isGameEnded || hintUsed || guesses.length === 5;
  const { showToast, toastMessage, triggerToast, closeToast } = useToast();
  const {
    guess,
    setGuess,
    filteredCountries,
    setFilteredCountries,
    highlightedIndex,
    setHighlightedIndex,
    filterCountries,
    selectCountry,
  } = useCountrySelect();

  // Handle changes in the input field
  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setGuess(inputValue);
    filterCountries(inputValue);
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
      selectCountry(filteredCountries[highlightedIndex]);
    }
  };

  // Close the list if clicking outside the component
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setFilteredCountries([]);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle the submission of the guess
  const handleSubmit = (event) => {
    event.preventDefault();

    // Use validateGuess from utils
    if (!validateGuess(guess)) {
      triggerToast("Please select a valid country from the list.");
      return;
    }

    dispatch(submitGuess({ challengeId, guess, guessNum }));
    setGuess("");
    setGuessNum(guessNum + 1);
  };

  // handle the request for a hint
  const handleHintRequest = () => {
    dispatch(submitHint(challengeId));
  };

  return (
    <div ref={wrapperRef}>
      <Toast message={toastMessage} show={showToast} onClose={closeToast} />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-between mt-2 w-full"
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
        <div className="flex flex-row gap-5 mt-2 w-full justify-between">
          <GuessButton disabled={isGameEnded} />
          <HintButton
            disabled={disabledHintButton}
            onClick={handleHintRequest}
          />
        </div>
      </form>
      {filteredCountries.length > 0 && (
        <GuessDropdown
          filteredCountries={filteredCountries}
          highlightedIndex={highlightedIndex}
          handleCountrySelect={selectCountry}
          setHighlightedIndex={setHighlightedIndex}
        />
      )}
    </div>
  );
};

export default GuessInput;
