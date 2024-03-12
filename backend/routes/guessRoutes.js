const express = require("express");
const router = express.Router();
const { submitGuess } = require("../controllers/guessController");

router.post("/submit", submitGuess);

module.exports = router;
