\c loginapp;

-- Set Up
SET client_encoding = WIN1252;

-- Delete Users
DELETE FROM security.users CASCADE; -- should cascade to authorities and questions.
-- Reset Sequences
ALTER SEQUENCE security.users_id_seq RESTART WITH 1;
ALTER SEQUENCE security.authorities_id_seq RESTART WITH 1;
ALTER SEQUENCE security.questions_id_seq RESTART WITH 1;
ALTER SEQUENCE profile.addresses_id_seq RESTART WITH 1;
ALTER SEQUENCE profile.preferences_id_seq RESTART WITH 1;

-- Add Users
-- COPY security.users FROM 'data/users.csv' WITH (FORMAT csv, DELIMITER ',', NULL '');
\copy security.users(username,password,enabled,first_name,last_name,email,gender,date_of_birth) FROM 'data/users.csv' DELIMITER ',' NULL '' HEADER CSV;

-- Add Authorities for each User
CREATE TEMPORARY TABLE temp_authorities (
    username TEXT NOT NULL
    ,authority TEXT NOT NULL
);

\copy temp_authorities(username,authority) FROM 'data/authorities.csv' DELIMITER ',' NULL '' HEADER CSV;

INSERT INTO security.authorities(user_id,authority) SELECT id,authority FROM security.users a JOIN temp_authorities b ON a.username = b.username;

-- Add Questions for each User
CREATE TEMPORARY TABLE temp_questions (
    username TEXT NOT NULL
    ,question TEXT NOT NULL
    ,answer TEXT NOT NULL
    ,hint TEXT
    ,case_sensitive BOOLEAN DEFAULT(false)
    ,ignore_spaces BOOLEAN DEFAULT(true)
);

\copy temp_questions FROM 'data/questions.csv' DELIMITER ',' NULL '' HEADER CSV;

INSERT INTO security.questions(user_id,question,answer,hint,case_sensitive,ignore_spaces) SELECT a.id,b.question,b.answer,b.hint,b.case_sensitive,b.ignore_spaces FROM security.users a JOIN temp_questions b ON a.username = b.username;

-- Add Profile Information for each User
CREATE TEMPORARY TABLE temp_profiles (
    username TEXT NOT NULL
    ,address_line_1 TEXT NOT NULL
    ,address_line_2 TEXT
    ,room_number TEXT
    ,city TEXT NOT NULL
    ,state TEXT NOT NULL
    ,zipcode TEXT NOT NULL
    ,phone_number TEXT
    ,newsletter BOOLEAN
);

\copy temp_profiles FROM 'data/profiles.csv' DELIMITER ',' NULL '' HEADER CSV;

INSERT INTO profile.addresses(user_id,address_line_1,address_line_2,room_number,city,state,zipcode,phone_number) SELECT a.id,b.address_line_1,b.address_line_2,b.room_number,b.city,b.state,b.zipcode,b.phone_number FROM security.users a JOIN temp_profiles b ON a.username = b.username;

INSERT INTO profile.preferences(user_id,newsletter) SELECT a.id,b.newsletter FROM security.users a JOIN temp_profiles b ON a.username = b.username;

-- Verify
SELECT COUNT(*) "Users" FROM security.users;
SELECT COUNT(*) "Authorities" FROM security.authorities;
SELECT COUNT(*) "Questions" FROM security.questions;
SELECT COUNT(*) "Addresses" FROM profile.addresses;
SELECT COUNT(*) "Preferences" FROM profile.preferences;
