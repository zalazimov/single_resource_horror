import React, { useEffect, useContext } from "react";
import { MovieContext } from "../Context/context";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchBySubstring } from "../api";
import Overlay from "../../common/Overlay";

function SearchRes() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('query');
    const { results, setResults, setIsLoading, isLoading, posterImage, } = useContext(MovieContext);
    const navigate = useNavigate()

    useEffect(() => {
        setIsLoading(true)
        fetchBySubstring(query).then(res => { setIsLoading(false); setResults(res.data) }).catch(e => navigate('/movies'))
    }, [query])

    return (
        <div>
            <Overlay isLoading={isLoading}>
                <div className="container my-4">
                    <section className="row text-center">
                        {results &&
                            results.slice(0, results.length > 10 ? 10 : results.length).map((movie) => {
                                return (
                                    <div key={movie.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                                        <Link to={`/movies/${movie.id}`}>
                                            <img
                                                src={posterImage(movie)}
                                                alt={movie.original_title}
                                                height="250px"
                                                width="180px"
                                                className="rounded-1"
                                            ></img>
                                            <p className="mt-1 fs-6">
                                                {movie.original_title} ({movie.release_date.slice(0, 4)})
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

export default SearchRes;