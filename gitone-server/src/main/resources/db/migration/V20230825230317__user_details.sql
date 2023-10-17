CREATE TABLE user_details (
  id integer primary key,
  email character varying NOT NULL,
  password character varying NOT NULL,
  reset_password_token character varying,
  reset_password_sent_at timestamp with time zone,
  active boolean DEFAULT false NOT NULL,
  role integer DEFAULT 0 NOT NULL,
  location character varying DEFAULT ''::character varying NOT NULL,
  website_url character varying DEFAULT ''::character varying NOT NULL
);

CREATE UNIQUE INDEX index_user_details_on_email ON user_details USING btree (lower(email::character varying));
CREATE UNIQUE INDEX index_user_details_on_reset_password_token ON user_details USING btree (reset_password_token);
