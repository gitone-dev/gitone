CREATE TABLE oauth2_authorization_consents (
  id serial PRIMARY KEY,
  created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
  registered_client_id character varying NOT NULL,
  principal_name character varying NOT NULL,
  authorities character varying[]
);

CREATE UNIQUE INDEX index_oauth2_authorization_consents_on_registered_client_id_and_principal_name ON oauth2_authorization_consents USING btree (registered_client_id, principal_name);
