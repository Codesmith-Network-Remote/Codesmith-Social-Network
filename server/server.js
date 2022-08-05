const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
// const https = require('https');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3000;
const residentRouter = require('./routes/resident');
const organizationRouter = require('./routes/organization');
const cohortRouter = require('./routes/cohort');
const oauthRouter = require('./routes/oauthRouter');
const verifyRouter = require('./routes/verifyRouter');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const session = require('express-session');

const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = require('./secrets');

const db = require('./models/UserModel');

// const server = https.createServer({ key, cert }, app);


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


passport.use(new GitHubStrategy({
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  callbackURL: 'http://localhost:8080/auth/github/callback',
  scope: [ 'user:email' ]
}, async function verify(accessToken, refreshToken, profile, done) {
  console.log(`Got profile from GH`, profile);
  const user = { gh_profile: profile._json.html_url, email: profile.emails[0].value, name: profile._json.name, gh_organization: profile._json.company, gh_login: profile._json.login};
  const gh_login = user.gh_login;
  const text = 'SELECT id FROM residents WHERE gh_login = $1';
  // let shouldSkipCreateUser = undefined;

  try {
    const idFound = await db.query(text, [gh_login]);
    if (idFound.rows.length) {
      console.log('We found an id',idFound.rows[0]);
      return done(null, idFound.rows[0]);
      // cookie('userId', idFound.rows[0].id);
    } else {
      console.log('No such user exists. Creating one');
      // shouldSkipCreateUser = false;
      const values = [user.name, '', '', '', '', '', user.email, user.gh_login, user.gh_profile];
      const text = 'INSERT INTO residents (name, photo, cohort, organization, linkedin, message, email, gh_login, gh_profile) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)';
      await db.query(text, values);
      const userCreated = await db.query('SELECT id FROM residents ORDER BY id DESC LIMIT 1');
      console.log(userCreated.rows[0].id);
  
      // res.cookie('userId', userCreated.rows[0].id);
      
      return done(null, userCreated.rows[0]);

    } 
  } catch (error) {
    return done({ log: `userControllers.verifyUserExists error: ${error}`, message: 'Erorr found @ userControllers.VerifyUserExists' });
  }
}));


const  githubFindOrCreate = async (user, callback) => {

  const gh_login = user.gh_login;
  const text = 'SELECT id FROM residents WHERE gh_login = $1';
  // let shouldSkipCreateUser = undefined;

  try {
    const idFound = await db.query(text, [gh_login]);
    if (idFound.rows.length) {
      console.log('We found an id',idFound.rows[0]);
      return callback(null, idFound.rows[0]);
      // cookie('userId', idFound.rows[0].id);
    } else {
      console.log('No such user exists. Creating one');
      // shouldSkipCreateUser = false;
      const values = [user.name, '', '', '', '', '', '', user.gh_login, user.gh_profile];
      const text = 'INSERT INTO residents (name, photo, cohort, organization, linkedin, message, email, gh_login, gh_profile) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)';
      await db.query(text, values);
      const userCreated = await db.query('SELECT id FROM residents ORDER BY id DESC LIMIT 1');
      console.log('Created a user: ');
      console.log(userCreated.rows[0]);
  
      // res.cookie('userId', userCreated.rows[0].id);
      
      return callback(null, userCreated.rows[0]);

    } 
  } catch (error) {
    return callback({ log: `userControllers.verifyUserExists error: ${error}`, message: 'Erorr found @ userControllers.VerifyUserExists' });
  }

  return callback({ log: 'githubFindOrCreate error: unknown error', message: 'Fell through try/catch without successfully calling done()'});
};


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/failedlogin');
}


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({origin: 'http://localhost:8080'}));
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());


app.use('/residents', ensureAuthenticated, residentRouter);

app.use('/organizations', ensureAuthenticated, organizationRouter);

app.use('/cohort', ensureAuthenticated, cohortRouter);

app.use('/login', oauthRouter);

app.use('/verifyuser', verifyRouter);

// Serve index.html
app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../src/', 'index.html'));
});

app.get('/failedlogin', (req, res) => {
  res.status(401).sendFile(path.resolve(__dirname, '../src/', 'failedlogin.html'));
});


app.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/failedlogin' }),
  function(req, res) {
    // console.log('req', req)
    // console.log('res', res)
    res.cookie('userId', req.user.id);
    res.cookie('gh-auth', 1);
    res.redirect('/');
  });


// Serve bundle.js
app.get('/dist/bundle.js', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../dist/', 'bundle.js'));
});

// Once we have React router working, this will keep the page from breaking if you're not on the homepage.
app.get('/*', (req, res) => {
  return res.status(200).redirect('/');
});

// catch-all route handler for any requests to an unknown route
app.use('*', (req, res) => res.sendStatus(404));



// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' }, 
  };

  const errorObj = Object.assign(defaultErr, err); 
  console.log(errorObj.log);

  res.status(errorObj.status).send(errorObj.message);
});

// start server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;