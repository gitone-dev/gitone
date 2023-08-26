CREATE TABLE user_details (
  id integer primary key,
  bio character varying DEFAULT ''::character varying NOT NULL,
  location character varying DEFAULT ''::character varying NOT NULL,
  website_url character varying DEFAULT ''::character varying NOT NULL
);
