CREATE TABLE members (
  id serial PRIMARY KEY,
  created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
  namespace_id integer NOT NULL,
  user_id integer NOT NULL,
  access integer DEFAULT 0 NOT NULL,
  created_by_id integer NOT NULL
);

CREATE UNIQUE INDEX index_members_on_namespace_id_and_user_id ON members USING btree (namespace_id, user_id);
CREATE INDEX index_members_on_namespace_id ON members USING btree (namespace_id);
CREATE INDEX index_members_on_user_id ON members USING btree (user_id);
