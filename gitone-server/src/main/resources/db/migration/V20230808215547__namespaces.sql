CREATE TABLE namespaces (
  id serial PRIMARY KEY,
  created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
  type integer NOT NULL,
  parent_id integer DEFAULT 0 NOT NULL,
  name character varying NOT NULL,
  path character varying NOT NULL,
  full_name character varying NOT NULL,
  full_path character varying NOT NULL,
  visibility integer DEFAULT 20 NOT NULL,
  description character varying DEFAULT ''::character varying NOT NULL
);

CREATE UNIQUE INDEX index_namespaces_on_full_path ON namespaces USING btree (lower(full_path::character varying));
CREATE UNIQUE INDEX index_namespaces_on_parent_id_and_path ON namespaces USING btree (parent_id, lower(path::character varying));
CREATE INDEX index_namespaces_on_paernt_id ON namespaces USING btree (parent_id);
