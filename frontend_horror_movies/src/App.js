import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateMovie from "./components/CreateMovie/CreateMovie";
import EditMovie from "./components/EditMovie/EditMovie";
import SearchRes from "./components/SearchRes/SearchRes";
import Movies from "./components/Movies/Movies";
import Nav from "./components/Nav/Nav";
import { MovieContext } from "./components/Context/context";
import { useState } from 'react'
import Spinner from "./common/Spinner";

import "./App.css";

function App() {
  const Home = React.lazy(() => import("./components/Movies/Movies"));
  const Movie = React.lazy(() => import("./components/Movie/Movie"));

  const [movies, setMovies] = useState(null);
  const [movie, setMovieById] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);

  const movieContextValue = {
    setMovies,
    movies,
    movie,
    setMovieById,
    isLoading,
    setIsLoading,
    results,
    setResults,
  }
  return (
    <div className="App">
      
      <React.Suspense fallback={<Spinner />}>
      <MovieContext.Provider value={movieContextValue}>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:id" element={<Movie />} />
          <Route path="/search" element={<SearchRes />} />
          <Route path="/" element={<CreateMovie />} />
          <Route path="/:id" element={<EditMovie />} />
          <Route path="/404" element={<h1>404 Error Not Found</h1>} />
          <Route path="*" element={<h1>404 Error Not Found</h1>} />
        </Routes>
      </Router>
      </MovieContext.Provider>
      </React.Suspense>
    </div>
  );
}

export default App;
