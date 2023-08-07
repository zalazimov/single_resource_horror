import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MovieContext } from "../Context/context";

import "./Searchbar.css";

function Searchbar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { setIsLoading } = useContext(MovieContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (search === "") return;
    setIsLoading(true);
    navigate(`/search?query=${encodeURIComponent(search)}`);
    setSearch("");
    setIsLoading(false);
  };
  return (
    <form className="d-flex" role="search" onSubmit={handleSubmit}>
      <input
        className="form-control me-2 searchbar"
        type="search"
        placeholder="Search movies..."
        aria-label="Search"
        name="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button className="btn btn-outline-warning" type="submit">
        Search
      </button>
    </form>
  );
}

export default Searchbar;
