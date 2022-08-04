CREATE TABLE "residents" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "name" varchar NOT NULL,
  "photo" varchar,
  "cohort" varchar NOT NULL,
  "organization" varchar,
  "industry" varchar,
  "linkedin" varchar NOT NULL,
  "message" varchar,
  "email" varchar,
  "gh_login" varchar,
  "gh_profile" varchar,
  "hiringroles" character varying[] default '{}'::character varying[]
);
