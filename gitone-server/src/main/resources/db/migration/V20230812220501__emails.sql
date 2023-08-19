CREATE TABLE emails (
  id serial PRIMARY KEY,
  created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
  user_id integer NOT NULL,
  email character varying NOT NULL,
  confirmation_token character varying NOT NULL,
  confirmation_sent_at timestamp with time zone,
  confirmed_at timestamp with time zone
);

CREATE UNIQUE INDEX index_emails_on_email ON emails USING btree (lower(email::character varying));
CREATE UNIQUE INDEX index_emails_on_confirmation_token ON emails USING btree (confirmation_token);
CREATE INDEX index_emails_on_user_id ON emails USING btree (user_id)
