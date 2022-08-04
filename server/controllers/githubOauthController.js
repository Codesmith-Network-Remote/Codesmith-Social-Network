// const passport = require('passport');
// const UserModel = require('../models/UserModel');
// const keys = require('../secrets');

// const GitHubStrategy = require('passport-github2').Strategy;


// passport.use(
//   new GitHubStrategy(
//     {
//       clientID: keys.github.CLIENT_ID,
//       clientSecret: keys.github.CLIENT_SECRET,
//       callbackURL: 'http://localhost:8080/auth/github/callback',
//     },
//     (accessToken, refreshToken, profile, done) => {
//       // UserModel.findOrCreate({ githubId: profile.id }, function (err, user) {
//       //   return cb(err, user);
//       // });
//       // verifyUserExists, createUser,
//       console.log(profile.username);
//       console.log(profile.email);
//       return(done, profile);
//     }
//   )
// );
