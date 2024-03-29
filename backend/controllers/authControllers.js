const passport = require("passport");

// Controller function for logging in with Google
const loginWithGoogle = (req, res, next) => {
  console.log("Initiating Google OAuth flow");
  passport.authenticate("google", { scope: ["profile", "email"] })(
    req,
    res,
    next
  );
};

module.exports = {
  loginWithGoogle,
};
