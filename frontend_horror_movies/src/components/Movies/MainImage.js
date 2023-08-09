import React, { useState } from "react";
import { Link } from "react-router-dom";
import { stockbanner } from "../../assets";

import "./Main.css";

const MainImage = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const currentImage = images[currentImageIndex];
  let imagesource = stockbanner;
  if (currentImage.backdrop_path)
    imagesource = `https://image.tmdb.org/t/p/w1066_and_h600_bestv2${currentImage.backdrop_path}`;

  const handlePrevClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="main-image-container">
      <img
        className="main-image opacity-25 img-fluid"
        src={imagesource}
        alt={currentImage.original_title}
        style={{ maxHeight: "80vh" }}
      />
      <Link to={`/movies/${currentImage.id}`}>
        <div className="overlay text-warning fs-1 fw-bold mb-5">
          {currentImage.original_title} ({currentImage.release_date.slice(0, 4)}
          )
        </div>
      </Link>
      <div className="overview d-none d-md-flex fs-5 mt-5 text-warning">
        <div className="container">
          {currentImage.overview && currentImage.overview.length > 300
            ? currentImage.overview.slice(0, 300) + "..."
            : currentImage.overview || currentImage.tagline}
        </div>
      </div>
      {images.length > 1 && (
        <div>
          <button className="arrow arrow-prev" onClick={handlePrevClick}>
            &lt;
          </button>
          <button className="arrow arrow-next" onClick={handleNextClick}>
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default MainImage;
