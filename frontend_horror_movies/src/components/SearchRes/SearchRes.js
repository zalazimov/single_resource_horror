import React, { useEffect, useContext } from "react";
import { MovieContext } from "../Context/context";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchBySubstring } from "../api";
import Overlay from "../../common/Overlay";

function SearchRes() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query");
  const { results, setResults, setIsLoading, isLoading, posterImage } = useContext(MovieContext);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    fetchBySubstring(query)
      .then((res) => {
          setResults(res.data);
          setIsLoading(false);
      })
      .catch((e) => navigate("/movies"));
  }, [query]);

  return (
    <Overlay isLoading={isLoading}>
      <div className="container my-4">
        <section className="row text-center mt-5">
          <header>
            {results && (
              <div className="py-3 text-warning fs-4">{`Search results for: "${query}"`}</div>
            )}
          </header>

          {results &&
            results
              .slice(0, results.length > 30 ? 30 : results.length)
              .map((movie) => {
                return (
                  <div
                    key={movie.id}
                    className="col-lg-3 col-md-4 col-sm-6 my-4"
                  >
                    <Link
                      className="link-underline link-underline-opacity-0 text-warning"
                      to={`/movies/${movie.id}`}
                    >
                      <img
                        src={
                          movie.poster_path
                            ? `https://image.tmdb.org/t/p/w1280${movie.poster_path}`
                            : posterImage()
                        }
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
  );
}

export default SearchRes;
