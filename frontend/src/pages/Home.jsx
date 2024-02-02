import React from "react";
import { useSelector } from "react-redux";

function Home() {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <main className="bg-neutral-content border-solid border-2 border-primary-content rounded-md min-h-[90vh] my-4 w-full p-4">
      <h1 className="font-bold">Geography-Genius</h1>
      <p className="text-lg">Welcome, {user.displayName}</p>
    </main>
  );
}

export default Home;
