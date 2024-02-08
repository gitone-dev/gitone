CREATE TABLE oauth2_authorizations (
  id serial PRIMARY KEY,
  created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
  uuid character varying NOT NULL,
  registered_client_id character varying NOT NULL,
  principal_name character varying NOT NULL,
  authorization_grant_type character varying NOT NULL,
  authorized_scopes character varying[],
  attributes jsonb,
  state character varying,
  authorization_code_value text,
  authorization_code_issued_at timestamp with time zone,
  authorization_code_expires_at timestamp with time zone,
  authorization_code_metadata jsonb,
  access_token_value text,
  access_token_issued_at timestamp with time zone,
  access_token_expires_at timestamp with time zone,
  access_token_metadata jsonb,
  access_token_type character varying,
  access_token_scopes character varying[],
  oidc_id_token_value text,
  oidc_id_token_issued_at timestamp with time zone,
  oidc_id_token_expires_at timestamp with time zone,
  oidc_id_token_metadata jsonb,
  oidc_id_token_claims jsonb,
  refresh_token_value text,
  refresh_token_issued_at timestamp with time zone,
  refresh_token_expires_at timestamp with time zone,
  refresh_token_metadata jsonb,
  user_code_value text,
  user_code_issued_at timestamp with time zone,
  user_code_expires_at timestamp with time zone,
  user_code_metadata jsonb,
  device_code_value text,
  device_code_issued_at timestamp with time zone,
  device_code_expires_at timestamp with time zone,
  device_code_metadata jsonb
);

CREATE UNIQUE INDEX index_oauth2_authorizations_on_uuid ON oauth2_authorizations USING btree (uuid);
CREATE UNIQUE INDEX index_oauth2_authorizations_on_authorization_code_value ON oauth2_authorizations USING btree (authorization_code_value);
CREATE UNIQUE INDEX index_oauth2_authorizations_on_access_token_value ON oauth2_authorizations USING btree (access_token_value);
CREATE UNIQUE INDEX index_oauth2_authorizations_on_oidc_id_token_value ON oauth2_authorizations USING btree (oidc_id_token_value);
CREATE UNIQUE INDEX index_oauth2_authorizations_on_refresh_token_value ON oauth2_authorizations USING btree (refresh_token_value);
CREATE UNIQUE INDEX index_oauth2_authorizations_on_user_code_value ON oauth2_authorizations USING btree (user_code_value);
CREATE UNIQUE INDEX index_oauth2_authorizations_on_device_code_value ON oauth2_authorizations USING btree (device_code_value);
