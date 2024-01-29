import React from "react";

const Login = () => {
  const googleClientId =
    "924598981847-lf7a0r5qv93mc8ui4jfvl309j0rom97u.apps.googleusercontent.com";
  const redirectUri = "http://localhost:3000/auth/google/redirect";

  function handleLoginWithGoogle() {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&client_id=${googleClientId}&scope=profile email`;
  }

  return (
    <main className="h-screen flex flex-col justify-center items-center ">
      <div className="bg-neutral-content border-solid border-2 border-primary-content rounded-md p-8 ">
        <div className="flex justify-center pb-4">
          <h1 className="font-bold flex flex-row gap-2">
            Geography <img src="/globe.png" alt="Globe" className="h-6 w-6" />
            Genius
          </h1>
        </div>

        <div className="flex flex-col gap-4 mt-4">
          <button
            className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg"
            onClick={handleLoginWithGoogle}
          >
            Login with Google
          </button>
          {/* Other login buttons */}
        </div>
      </div>
    </main>
  );
};

export default Login;
