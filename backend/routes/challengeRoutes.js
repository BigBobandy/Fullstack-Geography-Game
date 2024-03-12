const express = require("express");
const router = express.Router();
const {
  getDailyChallenge,
  getChallengeId,
} = require("../controllers/challengeController");

router.get("/daily", getDailyChallenge);

router.get("/daily/id", getChallengeId);

module.exports = router;
