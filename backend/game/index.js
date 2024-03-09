const handleGameLogic = require("./controllers/gameController");

async function startGame() {
  try {
    await handleGameLogic();
  } catch (err) {
    console.error("Error starting game: ", err);
  }
}

module.exports = startGame;
