const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/userModel");

const callbackURL =
  process.env.NODE_ENV === "production"
    ? `${process.env.CLIENT_URL}/auth/google/redirect`
    : "http://localhost:3000/auth/google/redirect";

passport.use(
  new GoogleStrategy(
    {
      // options for the google strategy
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: callbackURL,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        // Check if the user already exists
        let existingUser = await User.findOne({ googleId: profile.id });

        if (existingUser) {
          // If the user already exists, pass the user to the done function
          return done(null, existingUser);
        } else {
          // If the user does not exist, create a new user
          const newUser = await User.create({
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails[0].value, // Assumes the user has an email
            profileImage: profile.photos[0].value, // Assumes the user has a profile image
          });
          return done(null, newUser);
        }
      } catch (error) {
        console.error("Error during user search or creation:", error);
        return done(error);
      }
    }
  )
);

// decide what data from user object should be stored in the session
passport.serializeUser((user, done) => {
  done(null, user.id); // Serialize user by user ID
});

// opposite of serializeUser, takes the ID and returns the user object
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user); // Deserialize user by finding the user by ID
  } catch (err) {
    done(err);
  }
});
