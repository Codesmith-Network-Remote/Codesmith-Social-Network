process.env.EXPRESS_PORT = 5000;
module.exports = () => {
  global.testServer = require('./server/server.js');
};
