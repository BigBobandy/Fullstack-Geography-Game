const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo");

module.exports = function authMiddleware(app) {
  // initialize passport and session middleware
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      store: MongoStore.create({
        mongoUrl: process.env.ATLAS_URI,
      }),
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.use((req, res, next) => {
    if (req.session && req.session.passport && req.session.passport.user) {
      req.user = req.session.passport.user;
    }
    next();
  });
};
