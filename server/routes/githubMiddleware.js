const { Router } = require('express');
const passport = require('passport');
const { route } = require('../server');

const gitRouter = Router();

gitRouter.get('/auth/github', passport.authenticate('github', {
  scope: ['profile']
},));

//callback route for github to redirect to
gitRouter.get(
  '/auth/github/redirect',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  }
);

module.exports = gitRouter;