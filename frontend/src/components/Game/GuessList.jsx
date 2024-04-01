import { createSelector } from "@reduxjs/toolkit";
import React from "react";
import { useSelector } from "react-redux";

const selectGuesses = createSelector(
  (state) => state.guess.guesses,
  (guesses) => guesses ?? []
);

import GuessItem from "./GuessItem.jsx";

const GuessList = ({ totalGuessSlots }) => {
  const guesses = useSelector(selectGuesses);

  const placeholders = totalGuessSlots - guesses.length;

  const placeholderArray = new Array(placeholders).fill(0);

  return (
    <div className="flex flex-col gap-1">
      {guesses.map((guess, index) => (
        <GuessItem key={index} guessDetails={guess} />
      ))}
      {placeholderArray.map((_, index) => (
        <div
          key={`placeholder-${index}`}
          className="bg-base-300 rounded-lg my-1 col-span-7 h-8"
        ></div>
      ))}
    </div>
  );
};
export default GuessList;
