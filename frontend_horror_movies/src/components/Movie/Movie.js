import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainImage from "../Movies/MainImage";
import { selectLan, validateForm, genreNames, generateDates, } from "../helper";
import { fetchMovieById, editMovieInDB, } from "../api";
import { MovieContext } from "../Context/context";
import { FaTrash, FaEdit } from 'react-icons/fa';
import Overlay from "../../common/Overlay";

function Movie() {
  const { isLoading, setIsLoading, posterImage, formatDate, } = useContext(MovieContext);
  const { id } = useParams();
  const dates = generateDates();
  const stockposter = posterImage()
  const [movie, setMovie] = useState(null)
  const [showForm, setShowForm] = useState(null)
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [entry, setEntry] = useState({});
  const navigate = useNavigate()

  const handleSelectChange = (event) => {
    let selectedValues = Array.from(event.target.selectedOptions, option => option.value);
    if (!selectedValues.length) selectedValues = ['Horror']
    setSelectedOptions(selectedValues);
    setEntry({ ...entry, ['genre_names']: selectedValues.join(', ') })
  };

  useEffect(() => {
    fetchMovieById(id).then(res => { setIsLoading(false); setMovie(res.data[0]); setEntry(res.data[0]); }).catch(e => navigate('/404'))
  }, [id]);

  const handleCloseModal = () => {
    setShowForm(false);
  };
  const handleClickIcons = () => {
    setSelectedOptions(() => entry.genre_names.split(','));
    setShowForm(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm.every(item => entry[item] !== '' || entry[item] !== null)) {
      alert(
        "Please enter on more fields"
      );
      return;
    }
    delete entry['id']
    Object.keys(entry).forEach(item => { if (entry[item] === '' || !entry[item]) delete entry[item] })
    await editMovieInDB(entry, id).then(res => { setShowForm(false); setMovie(res.data); setEntry(res.data); }).catch(e => console.log(e));
    setShowForm(false)

  }

  function handleMovieInput(e) {
    setEntry({ ...entry, [e.target.name]: e.target.value });
  }

  return <div className="container my-4">
    <Overlay isLoading={isLoading}>
      {
        movie && <> <MainImage images={[movie]} />
          <main className="container">
            <div className="row">
              <div className="col-md-6 py-2 px-5">
                {movie.revenue ? <h2>Revenue: {movie.revenue}</h2> : " "}
                {movie.popularity ? <h2>Popularity: {movie.popularity}</h2> : " "}
                <h4>running time <span className="badge bg-info">{movie.runtime > 0 ? movie.runtime : '64'}m</span></h4>
                <h4>release date <span className="badge bg-info">{formatDate(movie.release_date)}</span></h4>
                <p>Overview: {movie.overview || movie.tagline}</p>
                <p>Lang: {movie.original_language}</p>
                <div onClick={handleClickIcons}>
                  <FaTrash
                    className="icon delete-icon"
                  />
                  <FaEdit
                    className="icon edit-icon"
                  />

                </div>
              </div>
              <div className="col-md-6">
                <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w1280${movie.poster_path}` : stockposter} alt={movie.original_title} className="img-fluid rounded-1" style={{ maxWidth: '300px' }} />
                <div className="mt-3">
                  <h2>{movie.original_title}</h2>
                  <p>{movie.genre_names}</p>
                </div>
              </div>
            </div>
          </main> </>

      }
      {showForm && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: "block" }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">edit movie</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label
                      className="fs-5 fw-medium form-label"
                      htmlFor="original_title"
                    >
                      Original Title
                    </label>
                    <input
                      required
                      type="text"
                      name="original_title"
                      id="original_title"
                      className="form-control"
                      onChange={handleMovieInput}
                      value={entry.original_title}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="fs-5 fw-medium form-label" htmlFor="title">
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      className="form-control"
                      onChange={handleMovieInput}
                      value={entry.title}
                    />
                  </div>

                  <div className="mb-3">
                    <label
                      className="fs-5 fw-medium form-label"
                      htmlFor="original_language"
                    >
                      Original Language
                    </label>
                    <select
                      required
                      className="form-control"
                      id="original_language"
                      name="original_language"
                      value={entry.original_language}
                      onChange={(e) => setEntry(e.target.value)}
                    >
                      {selectLan.map((item, i) => {
                        return (
                          <option value={item} key={i}>
                            {item}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="fs-5 fw-medium form-label" htmlFor="overview">
                      Overview
                    </label>
                    <textarea
                      required
                      placeholder="Brief Synopsis of the movie..."
                      name="overview"
                      id="overview"
                      className="form-control"
                      rows="3"
                      onChange={handleMovieInput}
                      value={entry.overview}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="fs-5 fw-medium form-label" htmlFor="tagline">
                      Tagline
                    </label>
                    <input
                      type="text"
                      name="tagline"
                      id="tagline"
                      className="form-control"
                      onChange={handleMovieInput}
                      value={entry.tagline}
                    />
                  </div>

                  <div className="mb-3">
                    <label
                      className="fs-5 fw-medium form-label"
                      htmlFor="release_date"
                    >
                      Release Date
                    </label>
                    <select
                      required
                      className="form-control"
                      id="release_date"
                      name="release_date"
                      value={entry.release_date}
                      onChange={handleMovieInput}
                    >
                      {dates.map((option, i) => (
                        <option key={i} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label
                      className="fs-5 fw-medium form-label"
                      htmlFor="vote_average"
                    >
                      Your Score
                    </label>
                    <input
                      placeholder="1 - 10"
                      type="number"
                      step="0.10"
                      min="1"
                      max="10"
                      name="vote_average"
                      id="vote_average"
                      className="form-control"
                      onChange={handleMovieInput}
                      value={entry.vote_average}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="fs-5 fw-medium form-label" htmlFor="runtime">
                      Runtime (in minutes)
                    </label>
                    <input
                      required
                      placeholder="Enter number, like 120"
                      type="number"
                      step="1"
                      min="1"
                      max="999"
                      name="runtime"
                      id="runtime"
                      className="form-control"
                      onChange={handleMovieInput}
                      value={entry.runtime}
                    />
                  </div>

                  <div className="mb-3">
                    <label
                      className="fs-5 fw-medium form-label"
                      htmlFor="genre_names"
                    >
                      <span>Genre <p className="text-sm">{entry.genre_names}</p></span>
                    </label>
                    <select
                      multiple
                      value={selectedOptions}
                      onChange={handleSelectChange}
                      className="form-control"
                      id="genre_names"
                    >
                      {genreNames.map((option, i) => (
                        <option key={`${option.substring(0, 2)}${i}`} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  <div className="d-grid gap-2 mt-4 col-6">
                    <button className="btn btn-primary" type="submit">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showForm && <div className="modal-backdrop fade show" onClick={handleCloseModal}></div>}
    </Overlay>
  </div>;
}

export default Movie;
