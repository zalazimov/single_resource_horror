import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const API = process.env.REACT_APP_API_URL;

function Movies() {
  const [movies, setMovies] = useState([]);

  async function fetchMoviesData() {
    try {
      const result = await axios.get(`${API}/movies/limit/20`);
      //   console.log(result.data);
      setMovies(result.data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchMoviesData();
  }, []);

  return (
    <div>
      <div className="container text-center">
        <main className="row my-5">
          {movies &&
            movies.map((movie) => {
              return (
                <div key={movie.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                  <Link to={`/movies/${movie.id}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/w1280${movie.poster_path}`}
                      alt={movie.title}
                      height="250 px"
                    ></img>
                    <p className="mt-1 fs-6">
                      {movie.original_title} ({movie.release_date.slice(0, 4)})
                    </p>
                  </Link>
                </div>
              );
            })}
        </main>
      </div>
    </div>
  );
}

export default Movies;
