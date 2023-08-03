DROP DATABASE IF EXISTS horror_db;
CREATE DATABASE horror_db;

\c horror_db;

DROP TABLE IF EXISTS public.horrmovies;

CREATE TABLE public.horrmovies (
	original_title text NULL,
	title text NULL,
	original_language text NULL,
	overview text NULL,
	tagline text NULL,
	release_date text NULL,
	poster_path text NULL,
	popularity float8 NULL,
	vote_count int8 NULL,
	vote_average float8 NULL,
	budget float8 NULL,
	revenue float8 NULL,
	runtime int8 NULL,
	status text NULL,
	adult bool NULL,
	backdrop_path text NULL,
	genre_names text NULL,
	collection float8 NULL,
	collection_name text NULL,
    id SERIAL PRIMARY KEY
);