import React from "react";
import { useSelector } from "react-redux";
import Game from "../Game/Game";
import Header from "../UI/Header";

function Home() {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <main className="overflow-hidden flex flex-col justify-center items-center ">
      <Header />
      <Game />
    </main>
  );
}

export default Home;
