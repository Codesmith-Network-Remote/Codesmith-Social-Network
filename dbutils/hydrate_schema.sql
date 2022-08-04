CREATE TABLE "residents" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "name" varchar NOT NULL,
  "photo" varchar,
  "cohort" varchar NOT NULL,
  "organization" varchar,
  "linkedin" varchar NOT NULL,
  "message" varchar,
  "email" varchar,
  "hiringroles" character varying[] default '{}'::character varying[]
);

ALTER TABLE "residents"
ADD COLUMN "industry" varchar