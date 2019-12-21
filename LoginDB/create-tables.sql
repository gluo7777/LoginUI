CREATE SCHEMA IF NOT EXISTS security;

CREATE TABLE IF NOT EXISTS security.users(
    id BIGSERIAL PRIMARY KEY
    ,username TEXT UNIQUE NOT NULL
    ,password TEXT NOT NULL
    ,enabled BOOLEAN NOT NULL
    ,first_name TEXT
    ,last_name TEXT
    ,email TEXT
    ,gender TEXT
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

CREATE SCHEMA IF NOT EXISTS profile;

CREATE TABLE IF NOT EXISTS profile.addresses(
    id BIGSERIAL PRIMARY KEY
    ,user_id BIGINT REFERENCES security.users (id) ON DELETE CASCADE
    ,address_line_1 TEXT NOT NULL
    ,address_line_2 TEXT
    ,room_number TEXT
    ,city TEXT NOT NULL
    ,state TEXT NOT NULL
    ,zipcode TEXT NOT NULL
    ,phone_number TEXT
);

CREATE TABLE IF NOT EXISTS profile.preferences(
    id BIGSERIAL PRIMARY KEY
    ,user_id BIGINT REFERENCES security.users (id) ON DELETE CASCADE
    ,newsletter BOOLEAN DEFAULT(true)
);