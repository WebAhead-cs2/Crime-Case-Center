BEGIN;

DROP TABLE IF EXISTS users,crime,witness,password;

CREATE TABLE users (
  id serial PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL
  
);


CREATE TABLE crime (
  id serial PRIMARY KEY,
  type nchar(10),
  location nchar (10),
  date date,
  time time,
  userID int REFERENCES users(id),
  description text,
  title varchar(255)
);

CREATE TABLE witness (
  id serial PRIMARY KEY,
  description text,
  crimeID int REFERENCES crime(id)
);

CREATE TABLE password (
  id serial PRIMARY KEY,
  password  VARCHAR(255),
  userID int REFERENCES users(id)
);


INSERT INTO users (name, username) VALUES
  ('souheil', 'skittan');
  
  INSERT INTO users (name, username) VALUES
  ('moayad', 'mshibli');

  INSERT INTO users (name, username) VALUES
  ('noor', 'naborhal');

  
  


COMMIT;