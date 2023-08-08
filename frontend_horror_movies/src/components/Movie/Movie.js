import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Overlay from "../../common/Overlay";
import MainImage from "../Movies/MainImage";
import { avgpopularity } from "../helper";
import { fetchMovieById } from "../api";
import { MovieContext, FormContext } from "../Context/context";
import { FaTrash, FaEdit, FaThumbsUp } from "react-icons/fa";
import DeleteMovie from "../DeleteMovie/DeleteMovie";
import EditMovie from "../EditMovie/EditMovie";
import "./Movie.css";

function Movie() {
  const { isLoading, setIsLoading, posterImage, formatDate, data } =
    useContext(MovieContext);
  const { id } = useParams();
  const stockposter = posterImage();
  const [movie, setMovie] = useState(null);
  const [showForm, setShowForm] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [entry, setEntry] = useState({});
  const [showDel, setShowDel] = useState(false);
  const [popul, setPopul] = useState(null);
  const navigate = useNavigate();

  const formContextValue = {
    setMovie,
    movie,
    setShowForm,
    setEntry,
    entry,
    selectedOptions,
    setSelectedOptions,
    setShowDel,
    id,
  };

  useEffect(() => {
    setIsLoading(true);
    fetchMovieById(id)
      .then((res) => {
        setMovie(res.data[0]);
        setIsLoading(false);
        setEntry(res.data[0]);
        setPopul(() =>
          avgpopularity(
            res.data[0].original_title,
            data || JSON.parse(localStorage.getItem("avgpopularity"))
          )
        );
      })
      .catch((e) => navigate("/404"));
  }, [id]);

  const handleCloseModal = () => {
    setShowForm(false);
  };

  const handleClickEdit = () => {
    setSelectedOptions(() => entry.genre_names.split(","));
    setShowForm(true);
  };

  const handleClickTrash = () => {
    setShowForm(true);
    setShowDel(true);
  };

  return (
    <FormContext.Provider value={formContextValue}>
      <Overlay isLoading={isLoading}>
        <div className="container">
          {movie && (
            <>
              {" "}
              <MainImage images={[movie]} />
              <main className="container">
                <div className="row">
                  <div className="col-md-6 py-2 px-5">
                    <div className="">
                      <h2 className="text-warning">
                        {movie.title ?? movie.original_title}
                      </h2>
                      <p className="text-warning">{movie.genre_names}</p>
                    </div>

                    <h5 className="text-warning">
                      <span className="fw-bolder">Release Date</span>:{" "}
                      {formatDate(movie.release_date)}
                    </h5>
                    <h5 className="text-warning">
                      <span className="fw-bolder">Runtime</span>:{" "}
                      {movie.runtime > 0 ? movie.runtime : "64"} minutes
                    </h5>
                    {movie.revenue ? (
                      <h6 className="text-warning">
                        <span className="fw-bolder">Revenue</span>:{" "}
                        {movie.revenue}
                      </h6>
                    ) : (
                      " "
                    )}
                    {movie.popularity ? (
                      <h6 className="text-warning">
                        <span className="fw-bolder">Popularity Rating</span>:{" "}
                        {movie.popularity}
                      </h6>
                    ) : (
                      " "
                    )}
                    <p className="text-warning">
                      <span className="fw-bolder">Overview</span>:{" "}
                      {movie.overview || movie.tagline}
                    </p>
                    <p className="text-warning">
                      Language:{" "}
                      {movie.original_language === "en"
                        ? "English"
                        : movie.original_language === "fr"
                        ? "French"
                        : movie.original_language === "ja"
                        ? "Japanese"
                        : movie.original_language === "it"
                        ? "Italian"
                        : movie.original_language === "es"
                        ? "Spanish"
                        : movie.original_language}
                    </p>
                    {popul && (
                      <div>
                        <div className="row">
                          <div className="col-md-6 d-flex align-items-center">
                            <p className="mb-0 mr-2 text-warning">
                              This movie is popular
                            </p>
                            <FaThumbsUp className="mx-2 popular-icon text-warning" />
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="row">
                      <div
                        onClick={handleClickTrash}
                        className="pointer-cursor"
                      >
                        <FaTrash className="col-sm-1 icon delete-icon text-danger" />
                      </div>
                      <div onClick={handleClickEdit}>
                        <FaEdit className="col-sm-1 icon edit-icon text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 mx-auto">
                    <div className="container">
                      <div className="text-center">
                        <img
                          src={
                            movie.poster_path
                              ? `https://image.tmdb.org/t/p/w1280${movie.poster_path}`
                              : stockposter
                          }
                          alt={movie.original_title}
                          className="img-fluid rounded-1 text-align-center"
                          style={{ maxWidth: "300px" }}
                        />

                        <div className="mt-1">Original Movie Poster</div>
                      </div>
                    </div>
                  </div>
                </div>
              </main>{" "}
            </>
          )}
          {showForm && (
            <div
              className="modal"
              tabIndex="-1"
              role="dialog"
              style={{ display: "block" }}
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  {!showDel ? (
                    <EditMovie />
                  ) : (
                    <DeleteMovie title={movie.original_title} />
                  )}
                </div>
              </div>
            </div>
          )}
          {showForm && (
            <div
              className="modal-backdrop fade show"
              onClick={handleCloseModal}
            ></div>
          )}
        </div>
      </Overlay>
    </FormContext.Provider>
  );
}

export default Movie;
