const express = require("express");
const router = express.Router();
const { getDailyChallenge } = require("../controllers/challengeController");

router.get("/daily", getDailyChallenge);

module.exports = router;
