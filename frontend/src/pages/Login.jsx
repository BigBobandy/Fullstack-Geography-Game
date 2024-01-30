import React, { useState } from "react";
import LoginButton from "../components/LoginButton";
import Privacy from "../components/PrivacyModal";

const Login = () => {
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  return (
    <main className="h-screen flex flex-col justify-center items-center ">
      {showPrivacyModal && (
        <Privacy setShowPrivacyModal={setShowPrivacyModal} />
      )}
      <div className="bg-neutral-content border-solid border-2 border-primary-content rounded-md p-8 pb-0 h-auto">
        <div className="flex justify-center pb-4">
          <h1 className="font-bold flex flex-row gap-2">
            Geography <img src="/globe.png" alt="Globe" className="h-6 w-6" />
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
              className="underline font-bold"
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
