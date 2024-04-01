import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGuesses } from "../../store/actions/guessActions.js";
import {
  fetchDailyChallengeId,
  fetchDailyChallengeImages,
} from "../../store/slices/challengeSlice.js";
import GameArea from "./GameArea.jsx";
import GuessInput from "./GuessInput.jsx";
import GuessList from "./GuessList.jsx";

const Game = () => {
  const [totalGuessSlots, setTotalGuessSlots] = useState(6);
  const dispatch = useDispatch();
  const { challengeId, previousChallengeId } = useSelector(
    (state) => state.challenge
  );

  useEffect(() => {
    dispatch(fetchDailyChallengeId())
      .unwrap()
      .then((newChallengeId) => {
        dispatch(fetchDailyChallengeImages());
        dispatch(getGuesses(newChallengeId.challengeId));
      })
      .catch((error) => console.error("Failed to fetch challenge ID:", error));
  }, [dispatch]);

  return (
    <div
      className="flex flex-col  h-[90vh] my-4 p-4 bg-neutral-content 
    rounded-md lg:w-[30vw]  lg:mx-auto md:w-[75vw] md:mx-auto sm:w-[60vw] overflow-hidden"
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
