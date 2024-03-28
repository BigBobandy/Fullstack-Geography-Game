const express = require("express");
const passport = require("passport");
const router = express.Router();
const { loginWithGoogle } = require("../controllers/authControllers");

const clientUrl =
  process.env.NODE_ENV === "production"
    ? process.env.CLIENT_URL
    : "http://localhost:5173";

router.get("/google", loginWithGoogle);

router.get(
  "/google/redirect",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // Successful authentication, redirect back to the client application.
    res.redirect(`${clientUrl}/auth/success`);
  }
);

module.exports = router;
