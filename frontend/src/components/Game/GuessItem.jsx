import React from "react";
import { directionArrows } from "../../utils/directionMap.js";

const GuessItem = ({ guessDetails }) => {
  //destructuring the guess object
  const {
    guessFlag,
    guessCode,
    guess,
    isCorrect,
    distance,
    direction,
    proximityPercentage,
    hint,
    hintUsed,
  } = guessDetails;

  if (!guess && !hintUsed) {
    // Handle the case where guess is null or undefined and hint is not used
    return <div className="bg-base-300 rounded-lg my-1 col-span-7 h-8"></div>;
  }

  // Detect if the hint is a flag to render it differently
  const isFlagHint = hintUsed && hint?.startsWith("Flag:");

  // if hint is available, display the hint
  if (hintUsed && hint) {
    return (
      <div className="bg-base-200 rounded-lg my-1 col-span-7 h-8 flex items-center justify-center font-semibold">
        {isFlagHint ? (
          <>
            <h2 className="font-bold">Hint - Flag: </h2>
            <img
              src={hint.replace("Flag: ", "")}
              alt="Country Flag"
              className="ml-2 h-6 w-auto"
            />
          </>
        ) : (
          <>
            <h2 className="font-bold mr-2">Hint: </h2>
            <span>{hint}</span>
          </>
        )}
      </div>
    );
  }

  // Find the image file name from the directionArrows object
  const arrowImage = direction ? directionArrows[direction] : null;

  const imagePath = arrowImage
    ? new URL(`../../assets/arrows/${arrowImage}`, import.meta.url).href
    : "";

  return (
    <div className="grid grid-cols-8 gap-1 text-center font-semibold">
      <div
        className={`${
          isCorrect ? "bg-accent" : "bg-base-200"
        } rounded-lg flex items-center h-8 col-span-4 animate-reveal pl-2`}
      >
        {guessFlag && (
          <img
            src={guessFlag}
            alt={guessCode}
            className="h-8 w-10 rounded-lg mr-4"
          />
        )}
        {guessCode && <span className="font-bold mr-1">{guessCode}</span>}
        {guess && <span>{guess}</span>}
      </div>

      <div
        className={`${
          isCorrect ? "bg-accent" : "bg-base-200"
        } rounded-lg flex items-center justify-center h-8 col-span-2 animate-reveal`}
      >
        <span className="font-bold text-sm mr-4">
          {isCorrect ? "0 km" : `${distance} km`}
        </span>
      </div>
      <div
        className={`${
          isCorrect ? "bg-accent" : "bg-base-200"
        } rounded-lg flex items-center justify-center h-8 col-span-1 animate-reveal`}
      >
        {isCorrect ? (
          <span className="text-2xl">🎉</span>
        ) : (
          arrowImage && (
            <img src={imagePath} alt={direction} className="h-8 w-10" />
          )
        )}
      </div>

      <div
        className={`${
          isCorrect ? "bg-accent" : "bg-base-200"
        } rounded-lg flex items-center justify-center h-8 col-span-1 animate-reveal animate-pop`}
      >
        <span className="font-bold text-sm text-base-content shadow-2xl">
          {proximityPercentage}%
        </span>
      </div>
    </div>
  );
};

export default GuessItem;
