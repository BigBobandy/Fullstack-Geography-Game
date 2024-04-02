import React from "react";

const LeaderboardModal = ({ setShowLeaderboardModal }) => {
  return (
    <div className="w-full h-full fixed z-[1] left-0 top-0 flex flex-col items-center pt-14 sm:pt-24">
      <div className="bg-base-200 rounded-lg shadow-xl w-full sm:w-1/2 md:w-3/5 lg:w-1/4 max-h-3/4 overflow-y-auto">
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-xl ml-10 font-bold text-center flex-1">
            Leaderboard coming soon!
          </h2>
          <button
            className="btn btn-circle p-1 bg-base-200 hover:bg-base-300"
            onClick={() => setShowLeaderboardModal(false)}
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
      </div>
    </div>
  );
};

export default LeaderboardModal;
