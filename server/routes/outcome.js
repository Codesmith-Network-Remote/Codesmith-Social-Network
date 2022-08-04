const express = require('express');
const userControllers = require('../controllers/UserControllers');
const router = express.Router();

router.get('/', userControllers.loadOrgs, userControllers.loadIndustries, userControllers.loadCohorts, 
  (req, res) => {
    console.log('got to this endpoint');
    return res.status(200).json({orgs: res.locals.orgsLoad, industries: res.locals.industriesLoad, cohorts: res.locals.cohortsLoad});
  }
);

module.exports = router;