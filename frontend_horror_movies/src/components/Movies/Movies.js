import React, { useEffect, useContext } from "react";
import { MovieContext } from "../Context/context";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { fetchMoviesData } from "../api";
import MainImage from "./MainImage";
import Overlay from "../../common/Overlay";

function Movies() {
  const navigate = useNavigate();

  const { movies, setMovies, isLoading, setIsLoading } =
    useContext(MovieContext);

  useEffect(() => {
    setIsLoading(true);
    fetchMoviesData()
      .then((res) => {
        let arr = [];
        while (arr.length < 12) {
          let n = Math.floor(Math.random() * res.data.length);
          if (!arr.includes(n)) arr.push(n);
        }
        setIsLoading(false);
        setMovies(() => arr.map((item) => res.data[item]));
      })
      .catch((e) => navigate("/404"));
  }, []);

  return (
    <div>
      <Overlay isLoading={isLoading}>
        <div className="container my-4">
          <>{movies && <MainImage images={movies} />}</>
          <section className="row text-center">
            {movies &&
              movies.map((movie) => {
                return (
                  <div
                    key={movie.id}
                    className="col-lg-3 col-md-4 col-sm-6 mb-4"
                  >
                    <Link to={`/movies/${movie.id}`}>
                      <img
                        src={`https://image.tmdb.org/t/p/w1280${movie.poster_path}`}
                        alt={movie.original_title}
                        height="250px"
                        width="180px"
                        className="rounded-1"
                      ></img>
                      <p className="mt-1 fs-6">
                        {movie.original_title} ({movie.release_date.slice(0, 4)}
                        )
                      </p>
                    </Link>
                  </div>
                );
              })}
          </section>
        </div>
      </Overlay>
    </div>
  );
}

export default Movies;
