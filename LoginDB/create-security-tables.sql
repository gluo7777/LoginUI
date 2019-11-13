CREATE DATABASE loginapp;

\c loginapp;

CREATE SCHEMA IF NOT EXISTS security;

CREATE TABLE IF NOT EXISTS security.users(
    id BIGSERIAL PRIMARY KEY
    ,username TEXT UNIQUE NOT NULL
    ,password TEXT NOT NULL
    ,enabled BOOLEAN NOT NULL
    ,first_name TEXT
    ,last_name TEXT
    ,email TEXT
    ,date_of_birth TIMESTAMP
);

CREATE INDEX IF NOT EXISTS users_username_index on security.users (username);

CREATE TABLE IF NOT EXISTS security.authorities (
    id BIGSERIAL PRIMARY KEY
    ,user_id BIGINT REFERENCES security.users (id) ON DELETE CASCADE
    ,authority TEXT NOT NULL
    ,UNIQUE(user_id,authority)
);

CREATE TABLE IF NOT EXISTS security.questions (
    id BIGSERIAL PRIMARY KEY
    ,user_id BIGINT REFERENCES security.users (id) ON DELETE CASCADE
    ,question TEXT NOT NULL
    ,answer TEXT NOT NULL
    ,hint TEXT
    ,case_sensitive BOOLEAN DEFAULT(false)
    ,ignore_spaces BOOLEAN DEFAULT(true)
);