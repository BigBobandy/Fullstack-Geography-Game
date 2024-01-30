import React from "react";

const LoginButton = () => {
  const googleClientId =
    "924598981847-lf7a0r5qv93mc8ui4jfvl309j0rom97u.apps.googleusercontent.com";
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
