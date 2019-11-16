\c loginapp;

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