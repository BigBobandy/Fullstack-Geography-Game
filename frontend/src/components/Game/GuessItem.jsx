import React from "react";

const GuessItem = ({ guess }) => {
  if (!guess) {
    // Handle the case where guess is null or undefined
    return <div className="bg-base-300 rounded-lg my-1 col-span-7 h-8"></div>;
  }

  const guessFlag = guess.guessFlag;
  const guessCode = guess.guessCode;
  const guessText = guess.guess;
  const isCorrect = guess.isCorrect;

  return (
    <div className="flex justify-between items-center flex-row bg-base-300 rounded-lg my-1 col-span-7 h-8">
      <div className="flex justify-center items-center">
        {guessFlag && (
          <img
            src={guessFlag}
            alt={guessCode}
            className="h-8 w-8 rounded-lg mr-4"
          />
        )}
        {guessCode && <span className="font-bold mr-4">{guessCode}</span>}
        {guessText && <span className="text-md">{guessText}</span>}
      </div>

      <div>
        {isCorrect ? (
          <span className="font-bold mr-4 text-green-500">Correct!</span>
        ) : (
          <span className="font-bold mr-4 text-red-500">Incorrect</span>
        )}
      </div>
    </div>
  );
};

export default GuessItem;
