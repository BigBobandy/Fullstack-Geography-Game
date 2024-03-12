import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitGuess } from "../../store/slices/guessSlice";
import GuessButton from "./GuessButton";

const GuessInput = () => {
  const challengeId = useSelector((state) => state.challenge.challengeId);
  const [guess, setGuess] = useState("");
  const dispatch = useDispatch();
  const [guessNum, setGuessNum] = useState(1);

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(submitGuess({ challengeId, guess, guessNum }));
    setGuess("");
    setGuessNum(guessNum + 1);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-row justify-between mt-2 w-full"
    >
      <input
        type="text"
        value={guess}
        placeholder="Guess a country..."
        className="input input-bordered w-full"
        onChange={(event) => setGuess(event.target.value)}
      />
      <GuessButton />
    </form>
  );
};

export default GuessInput;
