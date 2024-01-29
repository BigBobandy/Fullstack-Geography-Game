const passport = require("passport");

// Controller function for logging in with Google
const loginWithGoogle = (req, res, next) => {
  passport.authenticate("google", { scope: ["profile", "email"] })(
    req,
    res,
    next
  );
};

module.exports = {
  loginWithGoogle,
};
