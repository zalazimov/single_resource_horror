import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { stockbanner } from '../../assets';

import './Main.css'

const MainImage = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const currentImage = images[currentImageIndex];
  let imagesource = stockbanner
  if (currentImage.backdrop_path) imagesource = `https://image.tmdb.org/t/p/w1066_and_h600_bestv2${currentImage.backdrop_path}`;

  const handlePrevClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="main-image-container py-4">
      <img className="main-image" src={imagesource} alt={currentImage.original_title} />
      <Link to={`/movies/${currentImage.id}`}>
      <div className="overlay">{currentImage.original_title}</div>
      </Link>
      <div className="overview d-none d-md-flex">{currentImage.overview ? (currentImage.overview.length > 300 ? currentImage.overview.slice(0, 300) + "..." : currentImage.overview): currentImage.tagline}</div>
      <button className="arrow arrow-prev" onClick={handlePrevClick}>
        &lt;
      </button>
      <button className="arrow arrow-next" onClick={handleNextClick}>
        &gt;
      </button>
    </div>
  );
};

export default MainImage;
