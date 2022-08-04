const express = require('express');
const userControllers = require('../controllers/UserControllers');
const router = express.Router();

router.get('/', userControllers.loadIndustries, (req, res) => {
  console.log('got to this endpoint');
  return res.status(200).json(res.locals.industriesLoad);
});

//find residents by organizaiton 
router.post('/residents', userControllers.findUserByIndustry, (req, res) => {
  return res.status(200).json(res.locals.usersFound);
});

module.exports = router;