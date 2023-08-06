import React from 'react';
import { Link } from 'react-router-dom';
import { reel } from '../../assets';
import Searchbar from '../Searchbar/Searchbar';

function Nav() {
  //getMoviesByTitle
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        <img src={reel} alt="Logo" width="30" height="30" className="d-inline-block align-top" />
        FormidulosusDB
      </Link>
      <Searchbar/>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/movies">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/collections">Collections</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/create">Add Movie</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
