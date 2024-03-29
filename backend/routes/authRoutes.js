const express = require("express");
const passport = require("passport");
const router = express.Router();
const { loginWithGoogle } = require("../controllers/authControllers");

const clientUrl =
  process.env.NODE_ENV === "production"
    ? process.env.CLIENT_URL
    : "http://localhost:5173";

router.get("/google", loginWithGoogle);

router.get("/google/redirect", (req, res, next) => {
  console.log("Received Google OAuth redirect");
  passport.authenticate(
    "google",
    { failureRedirect: "/login" },
    (err, user, info) => {
      if (err) {
        console.error("Error during Google OAuth redirect:", err);
        return res.status(500).send(err.message);
      }
      if (!user) {
        console.error("No user returned in Google OAuth redirect:", info);
        return res.redirect("/login");
      }
      req.logIn(user, (err) => {
        if (err) {
          console.error("Error logging in after Google OAuth redirect:", err);
          return next(err);
        }
        console.log(
          "Successful authentication, redirecting to:",
          `${clientUrl}/auth/success`
        );
        res.redirect(`${clientUrl}/auth/success`);
      });
    }
  )(req, res, next);
});

module.exports = router;
