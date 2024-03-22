const express = require("express");
const router = express.Router();

const {
  getUserProfile,
  getUserStats,
} = require("../controllers/userControllers");

router.get("/profile", getUserProfile);

router.get("/stats", getUserStats);

module.exports = router;
