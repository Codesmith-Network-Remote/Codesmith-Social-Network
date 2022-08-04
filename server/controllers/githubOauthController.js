const passport = require('passport');
const UserModel = require('../models/UserModel');
const keys = require('../secrets');
const passportSetup = require('../routes/githubMiddleware');
const GitHubStrategy = require('passport-github2').Strategy;
const session = require('express-session');
passport.use(
  new GitHubStrategy(
    {
      clientID: keys.github.CLIENT_ID,
      clientSecret: keys.github.CLIENT_SECRET,
      callbackURL: 'http://localhost:8080/auth/github/callback',
    },
    (accessToken, refreshToken, profile, cb) => {
      // UserModel.findOrCreate({ githubId: profile.id }, function (err, user) {
      //   return cb(err, user);
      // });
      console.table({accessToken, refreshToken, profile, cb});
      return(cb, '999');
    }
  )
);
