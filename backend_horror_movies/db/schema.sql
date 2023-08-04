DROP DATABASE IF EXISTS horror_db;
CREATE DATABASE horror_db;

\c horror_db;

DROP TABLE IF EXISTS public.horrmovies;

CREATE TABLE public.horrmovies (
	original_title text NOT NULL,
	title text NULL,
	original_language text NOT NULL,
	overview text NULL,
	tagline text NULL,
	release_date date NOT NULL,
	poster_path text NULL,
	popularity float8 NULL,
	vote_count int8 NULL,
	vote_average float8 NULL,
	budget float8 NULL,
	revenue float8 NULL,
	runtime int8 NOT NULL,
	status text NULL,
	genre_names text NOT NULL,
	collection int4 NULL,
	collection_name text NULL,
	id serial4 NOT NULL,
	CONSTRAINT check_both_columns_not_null CHECK (((overview IS NOT NULL) OR (tagline IS NOT NULL))),
	CONSTRAINT check_both_null_or_not_null CHECK ((((collection IS NULL) AND (collection_name IS NULL)) OR ((collection IS NOT NULL) AND (collection_name IS NOT NULL)))),
	CONSTRAINT horrmovies_pkey PRIMARY KEY (id)
);

CREATE TABLE public.banners (
	id int8 NULL,
	backdrop_path text NULL
);