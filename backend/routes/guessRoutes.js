const express = require("express");
const router = express.Router();
const {
  submitGuess,
  getGuesses,
  submitHint,
} = require("../controllers/guessController");

router.post("/submit", submitGuess);

router.post("/hint/:id", submitHint);

router.get("/get/:id", getGuesses);

module.exports = router;
