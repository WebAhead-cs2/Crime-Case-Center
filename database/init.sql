BEGIN;

DROP TABLE IF EXISTS users,crime,witness,password;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL,
  password  VARCHAR(255)
);


CREATE TABLE crime (
  id SERIAL PRIMARY KEY,
  type nchar(10),
  location nchar (10),
  date date,
  time time,
  description text
);

CREATE TABLE witness (
  id SERIAL PRIMARY KEY,
  description text
);

CREATE TABLE password (
  id SERIAL PRIMARY KEY,
  password  VARCHAR(255)
);


INSERT INTO users (name, username, password) VALUES
  ('mart', 'mart12', 'M12345');

COMMIT;