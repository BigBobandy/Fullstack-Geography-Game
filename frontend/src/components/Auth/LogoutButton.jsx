import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import { persistor } from "../../store/store";

const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(logout());

    // Clear the persisted state
    await persistor.purge();
  };

  return (
    <button className="btn" onClick={handleLogout}>
      Logout <FontAwesomeIcon icon={faUser} />
    </button>
  );
};

export default LogoutButton;
