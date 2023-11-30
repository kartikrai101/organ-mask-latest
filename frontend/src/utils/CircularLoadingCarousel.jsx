import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './CircularLoadingCarousel.css'; // Import your CSS file

const CircularLoadingCarousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: 'linear',
  };

  return (
    <div className="circular-loading-carousel">
      <Slider {...settings}>
        {/* Customize your slides here, e.g., loading spinners */}
        <div className="carousel-slide">
          <div className="loading-spinner"></div>
        </div>
        <div className="carousel-slide">
          <div className="loading-spinner"></div>
        </div>
        {/* Add more slides as needed */}
      </Slider>
    </div>
  );
};

export default CircularLoadingCarousel;