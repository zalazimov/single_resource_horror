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
  const { results, setResults, setIsLoading, isLoading, posterImage } =
    useContext(MovieContext);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    fetchBySubstring(query)
      .then((res) => {
        setResults(res.data);
        setIsLoading(false);
      })
      .catch((e) => setIsLoading(false));
  }, [query]);

  return (
    <Overlay isLoading={isLoading}>
      <div className="container my-4">
        <section className="row text-center mt-5 results-section">
          <header>
            {results && (
              <div className="py-3 text-warning fs-4">{`Search results for: "${query}"`}</div>
            )}
          </header>

          {results ? (
            results
              .slice(0, results.length > 32 ? 32 : results.length)
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
              })
          ) : (
            <div className="container text-center mt-5">
              <div className="py-3 text-warning fs-4">
                {`Search results for: "${query}"`}
                <h2>Sorry no results</h2>
                <button onClick={() => window.history.back()}>back</button>
              </div>
            </div>
          )}
        </section>
      </div>
    </Overlay>
  );
}

export default SearchRes;
