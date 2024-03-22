import React from "react";
import { directionArrows } from "../../utils/directionMap";

const GuessItem = ({ guess }) => {
  if (!guess) {
    // Handle the case where guess is null or undefined
    return <div className="bg-base-300 rounded-lg my-1 col-span-7 h-8"></div>;
  }

  const guessFlag = guess.guessFlag;
  const guessCode = guess.guessCode;
  const guessText = guess.guess;
  const isCorrect = guess.isCorrect;
  0;
  const guessDistance = guess.distance;
  const guessDirection = guess.direction;
  const guessProximity = guess.proximityPercentage;

  // Find the image file name from the directionArrows object
  const arrowImage = guessDirection ? directionArrows[guessDirection] : null;

  const imagePath = arrowImage
    ? new URL(`../../assets/arrows/${arrowImage}`, import.meta.url).href
    : "";

  return (
    <div className="grid grid-cols-7 gap-1 text-center font-semibold">
      <div className="bg-base-200 rounded-lg flex items-center h-8 col-span-3 animate-reveal pl-2">
        {guessFlag && (
          <img
            src={guessFlag}
            alt={guessCode}
            className="h-8 w-10 rounded-lg mr-4"
          />
        )}
        {guessCode && <span className="font-bold mr-1">{guessCode}</span>}
        {guessText && <span className="text-md">{guessText}</span>}
      </div>

      <div className="bg-base-200 rounded-lg flex items-center justify-center h-8 col-span-2 animate-reveal">
        {guessDistance && (
          <span className="font-bold mr-4">{guessDistance} km</span>
        )}
      </div>
      <div className="bg-base-200 rounded-lg flex items-center justify-center h-8 col-span-1 animate-reveal">
        {" "}
        {arrowImage && (
          <img src={imagePath} alt={guessDirection} className="h-8 w-10" />
        )}
      </div>

      <div className="bg-base-200 rounded-lg flex items-center justify-center h-8 col-span-1 animate-reveal animate-pop">
        <span className="font-bold text-blue-500">{guessProximity}%</span>
      </div>
    </div>
  );
};

export default GuessItem;
