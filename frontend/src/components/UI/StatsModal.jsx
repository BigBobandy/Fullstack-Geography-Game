import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserStats } from "../../store/slices/userStatsSlice";

const StatsModal = ({ setShowStatsModal }) => {
  const dispatch = useDispatch();
  const { stats, isLoading, isError, errorMessage } = useSelector(
    (state) => state.userStats
  );

  useEffect(() => {
    dispatch(fetchUserStats());
  }, [dispatch]);

  return (
    <div className="w-full h-full fixed z-[1] left-0 top-0 flex flex-col items-center justify-start pt-12">
      <div className="bg-base-200 rounded-lg shadow-xl w-3/4">
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-xl ml-10 font-bold text-center flex-1">Stats</h2>

          <button
            className="btn btn-circle p-1  bg-base-200 hover:bg-base-300"
            onClick={() => setShowStatsModal(false)}
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
        <div className="p-4">
          {stats && (
            <div>
              <div className="p-4 grid grid-cols-3 gap-4">
                <div className="stat">
                  <p className="stat-value">{stats.totalGames}</p>
                  <p className="stat-title">Games Played</p>
                </div>
                <div className="stat">
                  <p className="stat-value">{stats.totalWins}</p>
                  <p className="stat-title">Games Won</p>
                </div>
                <div className="stat">
                  <p className="stat-value">{stats.totalGuesses}</p>
                  <p className="stat-title">Total Guesses</p>
                </div>
                <div className="stat">
                  <p className="stat-value">{stats.currentStreak}</p>
                  <p className="stat-title">Current Streak</p>
                </div>
                <div className="stat">
                  <p className="stat-value">{stats.longestStreak}</p>
                  <p className="stat-title">Longest Streak</p>
                </div>
                <div className="stat">
                  <p className="stat-value">{stats.hintsUsed}</p>
                  <p className="stat-title">Hints Used</p>
                </div>
              </div>
              <div>
                <h3 className="text-center text-lg font-semibold mb-4">
                  Countries Guessed Correctly{" "}
                  <span>{stats.correctGuesses.length}/252</span>
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {stats.correctGuesses.map((guess) => (
                    <div
                      key={guess._id}
                      className="stat-country flex flex-col items-center justify-center p-2"
                    >
                      <img
                        src={guess.flag}
                        alt={`${guess.name} flag`}
                        className="w-16 h-10 mb-2"
                      />
                      <span className="text-sm font-bold">{guess.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsModal;
