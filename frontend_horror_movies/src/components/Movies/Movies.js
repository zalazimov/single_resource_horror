import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Movies() {
  const [movies, setMovies] = useState([]);

  async function fetchMoviesData() {
    try {
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchMoviesData();
  }, []);

  return <div>Movies</div>;
}

export default Movies;
