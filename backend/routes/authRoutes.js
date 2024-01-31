const express = require("express");
const passport = require("passport");
const router = express.Router();
const { loginWithGoogle } = require("../controllers/authControllers");

router.get("/google", loginWithGoogle);

router.get(
  "/google/redirect",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // Successful authentication, redirect back to the client application.
    res.redirect("http://localhost:5173/auth/success");
  }
);

module.exports = router;
