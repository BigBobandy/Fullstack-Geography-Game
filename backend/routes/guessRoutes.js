const express = require("express");
const router = express.Router();
const { submitGuess, getGuesses } = require("../controllers/guessController");

router.post("/submit", submitGuess);

router.get("/:id", getGuesses);

module.exports = router;
