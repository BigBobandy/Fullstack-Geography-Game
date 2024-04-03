import React from "react";

const TutorialModal = ({ setShowTutorialModal }) => {
  return (
    <div className="w-full h-full fixed z-[1] left-0 top-0 flex flex-col items-center pt-14 sm:pt-1 md:pt-16">
      <div className="bg-base-200 rounded-lg shadow-xl w-[95%] sm:w-1/2 md:w-3/5 lg:w-1/4 max-h-3/4 overflow-y-auto">
        <div className="flex justify-between items-center border-b ">
          <h2 className="text-xl ml-10 font-bold text-center flex-1 ">
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
          <p className="mb-4 text-sm">
            Welcome to <strong>Geography Genius</strong>, a Wordle type-game
            where you guess the country based on its outline. Here's how to
            play:
          </p>

          <ol className="list-decimal list-inside my-4 border-b text-sm">
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
          </ol>

          <div className="text-sm font my-4 border-b ">
            <h3 className="font-bold mb-2">
              Where does this app get it's data from?
            </h3>
            <p>
              All country data is retrieved from the{" "}
              <a
                href="https://restcountries.com"
                target="_blank"
                className="underline font-bold"
              >
                Rest Countries API.
              </a>
            </p>
            <h3 className="font-bold my-2">
              Where do the country ountlines come from?
            </h3>
            <p>
              The outlines of countries presented in the challenges are rendered
              from GeoJSON data sourced from {""}
              <a
                href="http://www.naturalearthdata.com/"
                target="_blank"
                className="underline font-bold"
              >
                Natural Earth.
              </a>
            </p>
            <h3 className="font-bold my-2">
              How does this app calculate the distance for each guess?
            </h3>
            <p>
              The app calculates distance using the Haversine formula, which
              determines the "as-the-crow-flies" distance between the
              geographical centers (latitude and longitude) of your guessed
              country and the correct country.
            </p>
            <p className="mt-1">
              {" "}
              The distance calculation can sometimes seem misleading, especially
              with large, bordering countries. For example, if you guess a
              country right next to the correct one, the reported distance might
              still say you're 2000km away. This is because distance is
              calculated to the geographical center of each country, not its
              closest border.
            </p>
          </div>
          <div className="modal-footer mt-2  ">
            {" "}
            <p className="text-sm">
              <strong>Geography Genius</strong> draws heavy inspiration from the
              mechanics of <strong>Tradle</strong> and <strong>Worldle</strong>,
              which in turn, were heavily inspired by, <strong>Wordle</strong>.
            </p>
          </div>
        </div>

        <div className="flex justify-center border-t">
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
