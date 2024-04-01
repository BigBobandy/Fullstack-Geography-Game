import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGuesses } from "../../store/actions/guessActions.js";
import {
  fetchDailyChallengeId,
  fetchDailyChallengeImages,
} from "../../store/slices/challengeSlice.js";
import { resetGuessState } from "../../store/slices/guessSlice";
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
        dispatch(resetGuessState());
        dispatch(fetchDailyChallengeImages());
        dispatch(getGuesses(newChallengeId.challengeId));
      })
      .catch((error) => console.error("Failed to fetch challenge ID:", error));
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-fit w-full md:w-[60%] lg:max-w-lg my-4 p-4 bg-neutral-content rounded-md">
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
