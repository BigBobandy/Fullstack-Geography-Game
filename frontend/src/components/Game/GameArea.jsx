import React from "react";
import { useSelector } from "react-redux";

const GameArea = () => {
  const { imageUrls, isLoading, isError, errorMessage } = useSelector(
    (state) => state.challenge
  );
  const { currentCountryIndex } = useSelector((state) => state.guess);

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
      {imageUrls && imageUrls.length > 0 && (
        <div className="flex justify-center h-[35vh]">
          <img src={imageUrls[currentCountryIndex]} alt="Country Outline" />
        </div>
      )}
      <h2>Country: {currentCountryIndex + 1}/3</h2>
    </div>
  );
};

export default GameArea;
