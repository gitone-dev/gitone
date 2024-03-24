CREATE TABLE releases (
  id serial PRIMARY KEY,
  created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
  project_id integer NOT NULL,
  tag_name character varying NOT NULL,
  title character varying NOT NULL,
  description character varying DEFAULT ''::character varying NOT NULL,
  created_by_id integer NOT NULL
);

CREATE UNIQUE INDEX index_releases_on_project_id_and_tag_name ON releases USING btree (project_id, tag_name);
