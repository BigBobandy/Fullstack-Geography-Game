import { faRankingStar, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = () => {
  return (
    <header className="flex items-center justify-between bg-neutral-content py-1 text-neutral rounded-md">
      <div className="flex items-center">
        <h1 className=" text-md font-bold">Geography Genius</h1>
      </div>
      <img src="/globe.png" alt="Globe" className="h-6 w-6" />
      <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg">
        Leaderboard
        <FontAwesomeIcon icon={faRankingStar} />
      </button>
      <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg">
        Stats
        <FontAwesomeIcon icon={faStar} />
      </button>
    </header>
  );
};

export default Navbar;
