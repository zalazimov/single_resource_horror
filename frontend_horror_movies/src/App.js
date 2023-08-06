import React,{ useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EditMovie from "./components/EditMovie/EditMovie";
import Nav from "./components/Nav/Nav";
import { MovieContext } from "./components/Context/context";
import Spinner from "./common/Spinner";
import { posterImage, formatDate, } from "./components/helper";
import CreateMovie from "./components/CreateMovie/CreateMovie";
import "./App.css";


function App() {
  const Home = React.lazy(() => import("./components/Movies/Movies"));
  const Movie = React.lazy(() => import("./components/Movie/Movie"));
  const SearchRes = React.lazy(() => import("./components/SearchRes/SearchRes"));
  const Movies = React.lazy(() => import("./components/Movies/Movies"));

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
    posterImage,
    formatDate,
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
          <Route path="/create" element={<CreateMovie />} />
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
