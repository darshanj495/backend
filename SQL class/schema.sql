CREATE TABLE user(
  id varchar(255) PRIMARY KEY,
  name varchar(255) unique,
  email varchar(255) unique NOT NULL,
  password varchar(255) NOT NULL
);