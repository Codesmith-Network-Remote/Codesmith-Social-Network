
//need uri for testing table?
//before each: create table and create new pool

//test queries made to db;

//exchange code api

//call me api

//call email api

// oauthController.userComplete
  const text = `SELECT cohort FROM residents WHERE id=${req.cookies.userId} AND cohort=''`;


// Load list of all users when residents tab is clicked.
userControllers.loadUsers = async (req, res, next) => {
    const text = 'SELECT * FROM residents ORDER BY name';

  
  // Load list of all organizations when orgs tab is clicked.
  userControllers.loadOrgs = async (req, res, next) => {
    const text = 'SELECT DISTINCT organization FROM residents ORDER BY organization';

  
  // Load list of all cohorts when cohorts tab is clicked.
  userControllers.loadCohorts = async (req, res, next) => {
    const text = 'SELECT DISTINCT cohort FROM residents ORDER BY cohort';

  
  // Loads user profile when user is clicked throughout tabs.
  userControllers.loadUserProfile = async (req, res, next) => {
    const text = `SELECT * FROM residents WHERE id=${id}`;

  
  //Controller to find user.
  //If req.query.query exists, we are trying to find a specific user
  //Otherwise return all users in table
  userControllers.findUserByName = async (req, res, next) => {
    const text = `SELECT * FROM residents 
      WHERE LOWER(name) LIKE LOWER('%${req.body.name}%') 
      or LOWER(cohort) LIKE LOWER('%${req.body.name}%')
      or LOWER(organization) LIKE LOWER('%${req.body.name}%')
      ORDER BY name`;

  
  //Controller to find user by Id
  userControllers.findUserById = async (req, res, next) => {

    const text = `SELECT * FROM residents WHERE id=${req.body.id}`;

  
  //Controller to find users that work at a specific organization
  
  userControllers.findUserByOrganization = async (req, res, next) => {

    const text = `SELECT * FROM residents WHERE LOWER(organization)=LOWER('${req.body.organization}')`;

  
  //Controller to find users that work at a specific cohort
  
  userControllers.findUserByCohort = async (req, res, next) => {

    const text = `SELECT * FROM residents WHERE LOWER(cohort)=LOWER('${req.body.cohort}')`;

  
  //Check to see if user already exists in Codesmith Social Network Database
  userControllers.verifyUserExists = async (req, res, next) => {

    const text = 'SELECT id FROM residents WHERE email = $1';

  
  //create new User from either res.locals.newUser or req.body... Not sure from where yet.
  //@value ( res.locals.userCreated ) New user created in table residents
  userControllers.createUser = async (req, res, next) => {
      const text = 'INSERT INTO residents (name, photo, cohort, organization, linkedin, message, email) VALUES($1, $2, $3, $4, $5, $6, $7)';

  
  //update user requiring @value ( req.body.id )
  //req.body must also have name, photo, cohort, organization and linkedin to be not undefined
  //@value ( res.locals.updateUser ) return updated user
  userControllers.updateUser = async (req, res, next) => {
      const text = `UPDATE residents SET name='${name}', photo='${photo}', cohort='${cohort}', organization='${organization}', linkedin='${linkedin}', email='${email}' WHERE id='${req.body.id}'`;
  
  // Register new user
  userControllers.registerUser = async (req, res, next) => {
      const text = `UPDATE residents SET cohort='${cohort}', organization='${organization}', linkedin='${linkedin}' WHERE id='${id}'`;

  
  //delete user requiring @value ( req.body.id )
  userControllers.deleteUser = async (req, res, next) => {
      const text = `DELETE FROM residents WHERE id=${req.body.id}`;

  
  module.exports = userControllers;