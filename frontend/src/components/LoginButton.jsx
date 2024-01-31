import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginStart } from "../store/slices/authSlice";
import googleClientId from "../utils/config";

const LoginButton = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);

  const redirectUri = "http://localhost:3000/auth/google/redirect";

  function handleLoginWithGoogle() {
    dispatch(loginStart());
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&client_id=${googleClientId}&scope=profile email`;
  }

  return (
    <button
      class="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg text-lg"
      onClick={handleLoginWithGoogle}
    >
      {isLoading ? (
        <span className="loading loading-infinity loading-md"></span>
      ) : (
        <>
          Login with Google{" "}
          <span>
            <FontAwesomeIcon icon={faGoogle} />
          </span>
        </>
      )}
    </button>
  );
};

export default LoginButton;
