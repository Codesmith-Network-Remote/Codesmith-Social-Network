# Codesmith-Social-Network
Social network application for current Codesmith residents and alumni

## Creating a new DB for development Use

1. Register a new database on elephantsql.com and take note of the DB connection string.

2. Run the table hydration script using your DB connection string
```
psql -d postgres://<database username>:<database password>@<database host>/<database name>  -f ./dbutils/hydrate_schema.sql
```

## Development Configuration

1. Clone this repo

2. `cd Codesmith-Social-Network`

3. `npm install`

4. In the `<repo>/server/` directory, createa a `secrets.js` file. It should have the following content:
```
const secrets = { 
  CLIENT_SECRET: '<OAuth Client Secret>', 
  PG_URI: 'postgres://<PostgreSQL Connection String>'
};

module.exports = secrets;
```
Replace OAuth Client Secret and PG_URI with the configuration strings appropriate to your implementation.

5. Use the `npm run dev` command to start both the Express.js API server and a development Webpack server concurrently. By default, they will listen on ports 3000 and 8080 respectively.

6. Open a web browser to http://localhost:8080

## Backing up your development DB
```
pg_dump -v -h <database hostname> -U <database user> -C <database name> -f ./database_backup.sql
```
If you are using ElephantSQL, this process can take some time. Be patient!