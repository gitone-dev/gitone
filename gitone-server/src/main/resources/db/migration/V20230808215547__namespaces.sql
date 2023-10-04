CREATE TABLE namespaces (
  id serial PRIMARY KEY,
  created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
  type integer NOT NULL,
  parent_id integer DEFAULT 0 NOT NULL,
  traversal_ids integer[] DEFAULT '{}'::integer[] NOT NULL,
  name character varying NOT NULL,
  path character varying NOT NULL,
  full_name character varying NOT NULL,
  full_path character varying NOT NULL,
  visibility integer DEFAULT 20 NOT NULL,
  description character varying DEFAULT ''::character varying NOT NULL
);

CREATE UNIQUE INDEX index_namespaces_on_full_path ON namespaces USING btree (lower(full_path::character varying));
CREATE UNIQUE INDEX index_namespaces_on_parent_id_and_path ON namespaces USING btree (parent_id, lower(path::character varying));
CREATE INDEX index_namespaces_on_traversal_ids ON namespaces USING gin (traversal_ids);
CREATE INDEX index_namespaces_on_created_at ON namespaces USING btree (created_at);
CREATE INDEX index_namespaces_on_paernt_id ON namespaces USING btree (parent_id);

CREATE OR REPLACE FUNCTION trigger_traversal_ids() RETURNS TRIGGER AS
$$
BEGIN NEW.traversal_ids := NEW.traversal_ids || NEW.id;
RETURN NEW;
END;
$$
LANGUAGE plpgsql volatile;

CREATE TRIGGER trigger_namespaces_on_traversal_ids
BEFORE INSERT OR UPDATE OF traversal_ids ON namespaces
FOR EACH ROW EXECUTE PROCEDURE trigger_traversal_ids();
