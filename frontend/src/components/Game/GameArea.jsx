import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDailyChallengeId,
  fetchDailyChallengeImage,
} from "../../store/slices/challengeSlice";
import { resetGuessState } from "../../store/slices/guessSlice";

const GameArea = () => {
  const dispatch = useDispatch();
  const {
    imageUrl,
    isLoading,
    isError,
    errorMessage,
    challengeId,
    previousChallengeId,
  } = useSelector((state) => state.challenge);

  useEffect(() => {
    dispatch(fetchDailyChallengeImage());
    dispatch(fetchDailyChallengeId()).then(() => {
      if (challengeId !== previousChallengeId) {
        dispatch(resetGuessState());
      }
    });
  }, [dispatch, challengeId, previousChallengeId]);

  if (isLoading) {
    return (
      <div>
        <h1 className="font-bold text-xl">Loading...</h1>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <h1 className="font-bold text-xl">Error: {errorMessage}</h1>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-bold text-xl">Can you guess what country this is?</h1>
      {imageUrl && (
        <div className="flex justify-center h-[35vh]">
          <img src={imageUrl} alt="Country Outline" />
        </div>
      )}
    </div>
  );
};

export default GameArea;
