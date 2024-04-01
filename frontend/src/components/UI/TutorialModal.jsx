import React from "react";

const TutorialModal = ({ setShowTutorialModal }) => {
  return (
    <div className="w-full h-full fixed z-[1] left-0 top-0 flex flex-col items-center pt-14 sm:pt-24">
      <div className="bg-base-200 rounded-lg shadow-xl w-full sm:w-1/2 max-h-3/4 overflow-y-auto">
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-xl ml-10 font-bold text-center flex-1">
            How to play
          </h2>

          <button
            className="btn btn-circle p-1  bg-base-200 hover:bg-base-300"
            onClick={() => setShowTutorialModal(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="modal-body p-4 text-left">
          <p className="mb-4">
            Welcome to <strong>Geography Genius</strong>, a Wordle type-game
            where you guess the country based on its outline. Here's how to
            play:
          </p>

          <ol className="list-decimal list-inside my-4 border-b">
            <li className="my-3">
              Every day, three countries are selected for the daily challenge.
              Your task is to guess all three countries correctly.
            </li>
            <li className="my-3">
              You have <strong>6 guesses</strong> to identify all three
              countries.
            </li>
            <li className="my-3">
              You may use a hint to help with your guesses, but be aware that
              using a hint counts as one of your guesses. A hint can reveal the
              country's capital, its continent, or its flag (chosen at random).
            </li>
            <li className="my-3">
              With each guess, you'll receive feedback on the distance to the
              correct country and a directional arrow pointing towards it,
              helping guide your next guess.
            </li>
            <li className="my-3">
              A new challenge begins daily at <strong>midnight EST</strong>.
            </li>

            <li className="my-3">
              Leaderboard for the best players is coming soon!
            </li>
          </ol>
          <div className="modal-footer mt-4 pt-4 ">
            {" "}
            <p className="text-sm">
              <strong>Geography Genius</strong> draws heavy inspiration from the
              mechanics of <strong>Tradle</strong> and <strong>Worldle</strong>,
              which in turn, were heavily inspired by, <strong>Wordle</strong>.
            </p>
          </div>
        </div>
        <div className="flex justify-center border-t">
          <p className="mr-3">
            Made by{" "}
            <a
              className="underline"
              href="https://twitter.com/Bobandies"
              target="_blank"
            >
              @Bobandies
            </a>
          </p>
          <p>
            Source code on{" "}
            <a
              className="underline"
              href="https://github.com/BigBobandy/Fullstack-Geography-Game"
              target="_blank"
            >
              Github
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TutorialModal;
