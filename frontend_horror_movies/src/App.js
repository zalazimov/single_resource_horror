import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateMovie from "./components/CreateMovie/CreateMovie";
import EditMovie from "./components/EditMovie/EditMovie";
import Home from "./components/Home/Home";
import Movie from "./components/Movie/Movie";
import Movies from "./components/Movies/Movies";
import Nav from "./components/Nav/Nav";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:id" element={<Movie />} />
          <Route path="/" element={<CreateMovie />} />
          <Route path="/:id" element={<EditMovie />} />
          <Route path="/404" element={<h1>404 Error Not Found</h1>} />
          <Route path="*" element={<h1>404 Error Not Found</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
