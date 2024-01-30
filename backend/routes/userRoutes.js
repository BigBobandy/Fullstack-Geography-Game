const express = require("express");
const router = express.Router();

const { getUserProfile } = require("../controllers/userControllers");

router.get("/profile", getUserProfile);

module.exports = router;
