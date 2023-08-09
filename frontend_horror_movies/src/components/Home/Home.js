import React from "react";
import { Link } from "react-router-dom";
import { terrorlogo } from "../../assets";
import "./Home.css";

function Home() {
  return (
    <div className="container-fluid min-vh-100">
      <div className="mt-5 text-center">
        <div className="py-5 text-center">
          <img className="img-fluid" src={terrorlogo} alt="main logo" />
        </div>
        <div className="w-50 text-center mx-auto">
          <h4 className="text-warning">
            Welcome to TerrorFlick, an extensive database of all horror movies
            dating as far back as the 1950s!
          </h4>
          <h4 className="text-warning">
            You can search for your favorite horror films by title. To check out
            our featured films, click{" "}
            <Link className="" to="/movies">
              here
            </Link>{" "}
            or just click on the logo on the top left of your screen!
          </h4>
          <h4 className="text-warning">
            You may discover a new favorite that you can add to your collection!
          </h4>
        </div>
      </div>
    </div>
  );
}

export default Home;
