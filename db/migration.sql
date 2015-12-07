CREATE DATABASE thoughtful_db;
\c thoughtful_db

CREATE TABLE accounts ( id SERIAL PRIMARY KEY, user_name VARCHAR(255), user_email VARCHAR(255), full_name VARCHAR(255), password_digest VARCHAR(255) );

CREATE TABLE quotes ( id SERIAL PRIMARY KEY, user_id INTEGER, quote VARCHAR(255) );

CREATE TABLE images ( id SERIAL PRIMARY KEY, user_id INTEGER, image TEXT );

\dt
