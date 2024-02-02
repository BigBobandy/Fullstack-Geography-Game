import React, { useState } from "react";
import GuessButton from "./GuessButton";

const GuessInput = () => {
  const [guess, setGuess] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(guess);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" flex flex-row justify-between mt-2 w-full"
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
