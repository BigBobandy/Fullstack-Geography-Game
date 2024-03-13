import React from "react";
import { useSelector } from "react-redux";
import GuessItem from "./GuessItem";

const GuessList = ({ totalGuessSlots }) => {
  const guesses = useSelector((state) => state.guess?.guesses ?? []);

  if (!Array.isArray(guesses)) {
    // Handle the case where guesses is not an array
    console.error("guesses is not an array:", guesses);
    return null;
  }

  console.log(totalGuessSlots, guesses);

  const placeholders = totalGuessSlots - guesses.length;

  const placeholderArray = new Array(placeholders).fill(0);

  return (
    <div className="flex flex-col lg:gap-1 gap-4">
      {guesses.map((guess, index) => (
        <GuessItem key={index} guess={guess} />
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
