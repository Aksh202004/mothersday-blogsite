import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Carousel.css';

const Carousel = ({ articles }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!articles || articles.length === 0) {
    return <div className="carousel-empty">No featured articles available.</div>;
  }

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? articles.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === articles.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const currentArticle = articles[currentIndex];

  return (
    <div className="carousel-container">


      <div className="carousel-slide">
        {currentArticle.imageUrl && (
           <img
             src={process.env.PUBLIC_URL + currentArticle.imageUrl}
             alt={currentArticle.title}
             className="carousel-image"
           />
         )}
        <div className="carousel-caption">
          <div className="carousel-button-container">
             <button onClick={goToPrevious} className="carousel-button prev-button">
               &#10094;
             </button>
             <button onClick={goToNext} className="carousel-button next-button">
               &#10095;
             </button>
          </div>

          <h3>
            <Link to={`/articles/${currentArticle.id}`}>{currentArticle.title}</Link>
          </h3>
          <p>{currentArticle.excerpt}</p>
          <Link to={`/articles/${currentArticle.id}`} className="read-more-link">
            Read More &rarr;
          </Link>
        </div>
      </div>


    </div>
  );
};

export default Carousel;
