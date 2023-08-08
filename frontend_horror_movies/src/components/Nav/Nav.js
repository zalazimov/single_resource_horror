import React from "react";
import { Link } from "react-router-dom";
import { terrorlogo } from "../../assets";
import Searchbar from "../Searchbar/Searchbar";

function Nav() {
  return (
    <nav className="navbar navbar-expand-sm navbar-light fixed-top bg-dark fixed-top border-bottom border-black">
      <Link className="navbar-brand text-warning" to="/movies">
        <img
          src={terrorlogo}
          alt="Logo"
          width="280"
          className="d-inline-block align-top px-4"
        />
      </Link>
      <div className="collapse navbar-collapse d-flex flex-wrap" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item px-5">
            <Link className="nav-link text-warning" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item px-5">
            <Link className="nav-link text-warning" to="/index">
              Index
            </Link>
          </li>
          <li className="nav-item px-5">
            <Link className="nav-link text-warning" to="/create">
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
