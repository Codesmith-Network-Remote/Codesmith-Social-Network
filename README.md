# Codesmith-Social-Network
Social network application for current Codesmith residents and alumni


## Development Configuration

1. Clone this repo

2. In the `<repo>/server/` directory, create a `secrets.js` file. It should have the following content:
```
const secrets = { 
  CLIENT_SECRET: '<OAuth Client Secret>', 
  PG_URI: 'postgres://<PostgreSQL Connection String>'
};

module.exports = secrets;
```
Replace OAuth Client Secret and PG_URI with the configuration strings appropriate to your implementation.

3. Use the `npm run dev` command to start both the Express.js API server and a development Webpack server concurrently. By default, they will listen on ports 3000 and 8080 respectively.

4. Open a web browser to http://localhost:8080


