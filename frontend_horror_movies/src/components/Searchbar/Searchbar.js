import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Searchbar.css";

function Searchbar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (search === "" || search.length < 2) return;
    navigate(`/search?query=${encodeURIComponent(search)}`);
    setSearch("");
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
