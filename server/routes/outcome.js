const express = require('express');
const userControllers = require('../controllers/UserControllers');
const router = express.Router();

router.get('/', userControllers.loadOrgs, userControllers.loadIndustries, 
  (req, res) => {
    console.log('got to this endpoint');
    return res.status(200).json({ orgs: res.locals.orgsLoad, industries: res.locals.industriesLoad });
  }
);

module.exports = router;