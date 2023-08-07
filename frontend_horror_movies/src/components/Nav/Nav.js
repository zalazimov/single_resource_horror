import React from "react";
import { Link } from "react-router-dom";
import { reel } from "../../assets";
import Searchbar from "../Searchbar/Searchbar";

function Nav() {
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light fixed-top">
      <Link className="navbar-brand" to="/">
        <img
          src={reel}
          alt="Logo"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />
        FormidulosusDB
      </Link>
      <div className="collapse navbar-collapse d-flex flex-wrap" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item px-5">
            <Link className="nav-link" to="/movies">
              Home
            </Link>
          </li>
          <li className="nav-item px-5">
            <Link className="nav-link" to="/collections">
              Collections
            </Link>
          </li>
          <li className="nav-item px-5">
            <Link className="nav-link" to="/create">
              Add Movie
            </Link>
          </li>
        </ul>
        <Searchbar />
      </div>
    </nav>
  );
}

export default Nav;
