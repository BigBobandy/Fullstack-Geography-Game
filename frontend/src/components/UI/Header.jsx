import {
  faQuestionCircle,
  faRankingStar,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useSelector } from "react-redux";
import LeaderboardModal from "./LeaderboardModal.jsx";
import StatsModal from "./StatsModal.jsx";
import TutorialModal from "./TutorialModal.jsx";

const Header = () => {
  const user = useSelector((state) => state.auth.user);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [showTutorialModal, setShowTutorialModal] = useState(false);
  const [showLeaderboardModal, setShowLeaderboardModal] = useState(false);

  return (
    <header
      className="flex items-center justify-between py-1 text-neutral rounded-md lg:mx-auto 
      md:mx-auto lg:max-w-lg w-full md:w-[60%] my-4 px-4"
    >
      {showStatsModal && <StatsModal setShowStatsModal={setShowStatsModal} />}
      {showTutorialModal && (
        <TutorialModal setShowTutorialModal={setShowTutorialModal} />
      )}
      {showLeaderboardModal && (
        <LeaderboardModal setShowLeaderboardModal={setShowLeaderboardModal} />
      )}
      <div className="flex items-center">
        <h1 className="text-md sm:text:sm font-bold flex items-center">
          Geography
          <img src="/globe.png" alt="Globe" className="h-6 w-6 mx-2" /> Genius
        </h1>
      </div>

      <div className="flex justify-center gap-1 sm:ml-2">
        <button
          className="btn btn-sm "
          onClick={() => setShowTutorialModal(true)}
        >
          <FontAwesomeIcon icon={faQuestionCircle} />
        </button>
        <button
          className="btn btn-sm "
          onClick={() => setShowLeaderboardModal(true)}
        >
          <FontAwesomeIcon icon={faRankingStar} />
        </button>
        <button className="btn btn-sm " onClick={() => setShowStatsModal(true)}>
          <FontAwesomeIcon icon={faStar} />
        </button>
      </div>
    </header>
  );
};

export default Header;
