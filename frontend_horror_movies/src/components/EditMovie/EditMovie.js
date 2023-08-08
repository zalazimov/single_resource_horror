import { useContext } from "react";
import { editMovieInDB } from "../api";
import {
  validateForm,
  compareObjects,
  genreNames,
  selectLan,
  generateDates,
} from "../helper";
import { FormContext } from "../Context/context";

function EditMovie() {
  const {
    setMovie,
    movie,
    setShowForm,
    setEntry,
    entry,
    selectedOptions,
    setSelectedOptions,
  } = useContext(FormContext);
  const dates = generateDates();

  const handleSelectChange = (event) => {
    let selectedValues = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    if (!selectedValues.length) selectedValues = ["Horror"];
    setSelectedOptions(selectedValues);
    setEntry({ ...entry, genre_names: selectedValues.join(", ") });
  };

  const handleCloseModal = () => {
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      compareObjects(entry, movie) ||
      !validateForm.every((item) => entry[item] !== "" || entry[item] !== null)
    ) {
      alert("Please enter on more fields");
      return;
    }
    let id = entry["id"];
    delete entry["id"];
    Object.keys(entry).forEach((item) => {
      if (entry[item] === "" || !entry[item]) delete entry[item];
    });
    await editMovieInDB(entry, id)
      .then((res) => {
        setShowForm(false);
        setMovie(res.data);
        setEntry(res.data);
      })
      .catch((e) => console.log(e));
    setShowForm(false);
  };

  function handleMovieInput(e) {
    setEntry({ ...entry, [e.target.name]: e.target.value });
  }
  return (
    <>
      <div className="modal-header">
        <h5 className="modal-title">Edit movie</h5>
        <button
          type="button"
          className="btn-close"
          onClick={handleCloseModal}
        ></button>
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
              value={entry.title ?? ""}
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
              value={entry.overview ?? ""}
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
              value={entry.tagline ?? ""}
            />
          </div>

          <div className="mb-3">
            <label className="fs-5 fw-medium form-label" htmlFor="release_date">
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
            <label className="fs-5 fw-medium form-label" htmlFor="vote_average">
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
              value={entry.vote_average ?? 3}
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
            <label className="fs-5 fw-medium form-label" htmlFor="genre_names">
              <span>
                Genre <p className="text-sm">{entry.genre_names}</p>
              </span>
            </label>
            <select
              multiple
              value={selectedOptions}
              onChange={handleSelectChange}
              className="form-control"
              id="genre_names"
            >
              {genreNames.map((option, i) => (
                <option key={`${option.substring(0, 2)}${i}`} value={option}>
                  {option}
                </option>
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
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleCloseModal}
        >
          Close
        </button>
      </div>
    </>
  );
}

export default EditMovie;
