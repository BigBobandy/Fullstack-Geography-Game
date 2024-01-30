import React from "react";
import { useDispatch } from "react-redux";
import { loginStart } from "../store/slices/authSlice";
import googleClientId from "../utils/config";

const LoginButton = () => {
  const redirectUri = "http://localhost:3000/auth/google/redirect";

  function handleLoginWithGoogle() {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&client_id=${googleClientId}&scope=profile email`;
  }

  return (
    <button
      className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg font-bold"
      onClick={handleLoginWithGoogle}
    >
      Login with Google
    </button>
  );
};

export default LoginButton;
