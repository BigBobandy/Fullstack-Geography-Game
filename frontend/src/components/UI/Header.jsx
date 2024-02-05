import {
  faQuestionCircle,
  faRankingStar,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";

const Header = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <header
      className="flex items-center justify-between bg-neutral-content py-1 text-neutral rounded-md 
    lg:w-[30vw] lg:mx-auto md:w-[75vw] md:mx-auto min-w-fit"
    >
      <div className="flex items-center">
        <h1 className="text-md font-bold flex items-center">
          Geography
          <img src="/globe.png" alt="Globe" className="h-6 w-6 mx-2" /> Genius
        </h1>
      </div>

      <div className="flex justify-center sm:gap-2 md:gap-3 lg:gap-4">
        <button className="btn btn-xs sm:btn-sm">
          <FontAwesomeIcon icon={faQuestionCircle} />
        </button>
        <button className="btn btn-xs sm:btn-sm">
          Leaderboard
          <FontAwesomeIcon icon={faRankingStar} />
        </button>
        <button className="btn btn-xs sm:btn-sm">
          Stats
          <FontAwesomeIcon icon={faStar} />
        </button>
      </div>
    </header>
  );
};

export default Header;
