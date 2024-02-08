CREATE TABLE oauth2_registered_clients (
  id serial PRIMARY KEY,
  created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
  namespace_id integer NOT NULL,
  uuid character varying NOT NULL,
  client_id character varying NOT NULL,
  client_id_issued_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
  client_secret character varying,
  client_secret_expires_at timestamp with time zone,
  client_name character varying NOT NULL,
  client_authentication_methods character varying[],
  authorization_grant_types character varying[],
  redirect_uris character varying[],
  post_logout_redirect_uris character varying[],
  scopes character varying[],
  client_settings jsonb,
  token_settings jsonb,
  description character varying DEFAULT ''::character varying NOT NULL,
  created_by_id integer NOT NULL
);

CREATE UNIQUE INDEX index_oauth2_registered_clients_on_uuid ON oauth2_registered_clients USING btree (uuid);
CREATE UNIQUE INDEX index_oauth2_registered_clients_on_client_id ON oauth2_registered_clients USING btree (client_id);
CREATE INDEX index_oauth2_registered_clients_on_namespace_id ON oauth2_registered_clients USING btree (namespace_id);
