import React, { useState } from "react";
import { useNavigate } from "react-router";
import { selectLan, validateForm, genreNames, generateDates, } from "../helper";
import { newEntry } from "../api";

function CreateMovie() {
  let navigate = useNavigate();
  const dates = generateDates();
  const [selectedOptions, setSelectedOptions] = useState(['Horror']);
  const [entry, setEntry] = useState({
    'original_title': '', 'title': '', 'overview': '', 'vote_count': 1, 'tagline': '', 'poster_path': '', 'vote_average': 3.0,
    'budget': 0, 'runtime': 64, 'genre_names': 'Horror',
    'release_date': new Date(), 'status': 'Released', 'original_language': 'en', 'revenue': 0
  });

  const handleSelectChange = (event) => {
    let selectedValues = Array.from(event.target.selectedOptions, option => option.value);
    if (!selectedValues.length) selectedValues = ['Horror']
    setSelectedOptions(selectedValues);
    setEntry({...entry, ['genre_names']: selectedValues.join(', ')})
  };

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(entry);
    try {

      if (!validateForm.every(item => entry[item] !== '' || entry[item] !== null)) {
        alert(
          "Please enter some information for either the overview or the tagline!"
        );
        return;
      }

      await newEntry(entry).then((response) => {
        navigate(`/movies/${response.data.id}`);
      });
    } catch (e) {
      console.log(e);
    }
  }

  function handleMovieInput(e) {
    setEntry({ ...entry, [e.target.name]: e.target.value });
  }

  return (
    <div className="container mt-5 mb-5">
      <h3 className="text-center mb-4">New Movie</h3>
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">
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
                Genre
              </label>
              <select
                multiple
                value={selectedOptions}
                onChange={handleSelectChange}
                className="form-control"
                id="genre_names"
              >
                {genreNames.map((option, i) => (
                  <option key={`${option.substring(0,2)}${i}`} value={option}>{option}</option>
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
      </div>
    </div>
  );
}

export default CreateMovie;



