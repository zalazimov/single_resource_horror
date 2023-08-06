import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainImage from "../Movies/MainImage";
import { fetchMovieById } from "../api";
import { MovieContext } from "../Context/context";
import Overlay from "../../common/Overlay";

function Movie() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null)
  const navigate = useNavigate()
  const { isLoading, setIsLoading } = useContext(MovieContext)

  useEffect(() => {
    fetchMovieById(id).then(res => { setIsLoading(false); setMovie(res.data[0]); }).catch(e => navigate('/404'))
  }, [id]);

  function formatDate(args) {
    const date = new Date(args);

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);

    return formattedDate

  }
  return <div className="container my-4">
    <Overlay isLoading={isLoading}>
      {
        movie && <> <MainImage images={[movie]} />
          <main className="container">
            <div className="row">
              <div className="col-md-6 py-2 px-5">
                <h2>{movie.revenue ? 'Revenue: ' + movie.revenue : 'Popularity: ' + movie.popularity}</h2>
                <h4>running time <span className="badge bg-info">{movie.runtime ? movie.runtime : '64'}m</span></h4>
                <h4>release date <span className="badge bg-info">{formatDate(movie.release_date)}</span></h4>
                <p>Lang: {movie.original_language}</p>
              </div>
              <div className="col-md-6">
                <img src={`https://image.tmdb.org/t/p/w1280${movie.poster_path}`} alt={movie.original_title} className="img-fluid rounded-1" style={{ maxWidth: '400px' }} />
                <div className="mt-3">
                  <h2>{movie.original_title}</h2>
                  <p>{movie.genre_names}</p>
                </div>
              </div>
            </div>
          </main> </>

      }
    </Overlay>
  </div>;
}

export default Movie;
