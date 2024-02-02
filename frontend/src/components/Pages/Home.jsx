import React from "react";
import { useSelector } from "react-redux";
import Header from "../UI/Header";

function Home() {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <main className=" items-center w-3/4 h-3/4">
      <div className="bg-neutral-content border-solid border-2 border-primary-content rounded-md min-h-[90vh] my-4 w-full p-4">
        <Header />
        <h1 className="font-bold">Geography-Genius</h1>
        <p className="text-lg">Welcome, {user.displayName}</p>
      </div>
    </main>
  );
}

export default Home;
