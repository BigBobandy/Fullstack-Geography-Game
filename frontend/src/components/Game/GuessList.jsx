import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGuesses } from "../../store/actions/guessActions.js";
import GuessItem from "./GuessItem.jsx";

const GuessList = ({ totalGuessSlots }) => {
  const guesses = useSelector((state) => state.guess?.guesses ?? []);
  const challengeId = useSelector((state) => state.challenge.challengeId);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGuesses(challengeId));
  }, [dispatch, challengeId]);

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
