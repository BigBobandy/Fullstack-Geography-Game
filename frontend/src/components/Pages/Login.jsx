import React, { useState } from "react";
import LoginButton from "../Auth/LoginButton";
import Privacy from "../Auth/PrivacyModal";

const Login = () => {
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  return (
    <main className="h-screen flex flex-col justify-center items-center ">
      {showPrivacyModal && (
        <Privacy setShowPrivacyModal={setShowPrivacyModal} />
      )}
      <div
        className="flex flex-col justify-between bg-neutral-content border-solid border-2
       border-primary-content rounded-md p-6 pb-0 min-h-fit h-1/5"
      >
        <div className="flex justify-center pb-4">
          <h1 className="font-bold flex flex-row gap-2 text-2xl items-center">
            Geography <img src="/globe.png" alt="Globe" className="h-7 w-7 " />
            Genius
          </h1>
        </div>

        <div className="flex flex-col gap-4 mt-4">
          <LoginButton />
        </div>
        <div className="sticky bottom-0 mt-4 mb-2">
          <p>
            Review our{" "}
            <button
              className="underline font-bold hover:text-accent"
              onClick={() => setShowPrivacyModal(true)}
            >
              privacy policy
            </button>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Login;
