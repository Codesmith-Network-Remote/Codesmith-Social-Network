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
const industryRouter = require('./routes/industry');
const cohortRouter = require('./routes/cohort');
const outcomeRouter = require('./routes/outcome');
const oauthRouter = require('./routes/oauthRouter');
const verifyRouter = require('./routes/verifyRouter');

// const server = https.createServer({ key, cert }, app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({origin: 'http://localhost:8080'}));

app.use('/residents', residentRouter);

app.use('/organizations', organizationRouter);

app.use('/industries', industryRouter);

app.use('/cohort', cohortRouter);

app.use('/outcomes', outcomeRouter)

app.use('/login', oauthRouter);

app.use('/verifyuser', verifyRouter);

// Serve index.html
app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../src/', 'index.html'));
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