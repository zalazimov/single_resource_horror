import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EditMovie from "./components/EditMovie/EditMovie";
import Nav from "./components/Nav/Nav";
import Home from "./components/Home/Home";
import CreateMovie from "./components/CreateMovie/CreateMovie";
import { MovieContext } from "./components/Context/context";
import Spinner from "./common/Spinner";
import { posterImage, formatDate } from "./components/helper";
import "./App.css";
import { fetchPopularMovies } from "./components/api";

function App() {
  const Movies = React.lazy(() => import("./components/Movies/Movies"));
  const Movie = React.lazy(() => import("./components/Movie/Movie"));
  const Index = React.lazy(() => import("./components/DBIndex/Index"));
  const SearchRes = React.lazy(() => import("./components/SearchRes/SearchRes"));

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  const movieContextValue = {
    isLoading,
    setIsLoading,
    posterImage,
    formatDate,
    data,
  };

  useEffect(() => {
    fetchPopularMovies().then(res => { setData(res.data); localStorage.setItem('avgpopularity', JSON.stringify(res.data)) }).catch(e => console.log(e))
  }, [])

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
              <Route path="/index" element={<Index />} />
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
