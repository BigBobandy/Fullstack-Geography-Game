import { useState } from "react";
import guessSlice from "../../store/slices/guessSlice";
import GameArea from "./GameArea";
import GuessInput from "./GuessInput";
import GuessList from "./GuessList";

const Game = () => {
  const [totalGuessSlots, setTotalGuessSlots] = useState(6);

  return (
    <div
      className="flex flex-col justify-between min-h-[90vh] my-4 p-4 bg-neutral-content border-2 border-primary-content 
    rounded-md lg:w-[30vw]  lg:mx-auto md:w-[75vw] md:mx-auto"
    >
      <GameArea />
      <GuessList totalGuessSlots={totalGuessSlots} />
      <GuessInput
        totalGuessSlots={totalGuessSlots}
        setTotalGuessSlots={setTotalGuessSlots}
      />
    </div>
  );
};

export default Game;
