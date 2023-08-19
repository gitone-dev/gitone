CREATE TABLE users (
  id serial PRIMARY KEY,
  created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
  namespace_id integer NOT NULL,
  email character varying NOT NULL,
  name character varying NOT NULL,
  username character varying NOT NULL ,
  password character varying NOT NULL,
  reset_password_token character varying,
  reset_password_sent_at timestamp with time zone,
  active boolean DEFAULT false NOT NULL,
  role integer DEFAULT 0 NOT NULL
);

CREATE UNIQUE INDEX index_users_on_namespace_id ON users USING btree (namespace_id);
CREATE UNIQUE INDEX index_users_on_email ON users USING btree (lower(email::character varying));
CREATE UNIQUE INDEX index_users_on_username ON users USING btree (lower(username::character varying));
CREATE UNIQUE INDEX index_users_on_reset_password_token ON users USING btree (reset_password_token);
