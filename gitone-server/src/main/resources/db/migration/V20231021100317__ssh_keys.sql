CREATE TABLE ssh_keys (
  id serial PRIMARY KEY,
  created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
  namespace_id integer NOT NULL,
  title character varying NOT NULL,
  key character varying NOT NULL,
  fingerprint bytea NOT NULL,
  usages integer[] DEFAULT '{}'::integer[] NOT NULL,
  last_used_at timestamp with time zone,
  expires_at timestamp with time zone,
  created_by_id integer NOT NULL
);

CREATE UNIQUE INDEX index_ssh_keys_on_fingerprint ON ssh_keys USING btree (fingerprint);
CREATE INDEX index_ssh_keys_on_namespace_id ON ssh_keys USING btree (namespace_id);
