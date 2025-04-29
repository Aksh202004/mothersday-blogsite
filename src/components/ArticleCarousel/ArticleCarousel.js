import React, { useState, useRef, useEffect } from 'react';
import ArticleCard from '../ArticleCard/ArticleCard';
import './ArticleCarousel.css';

const ArticleCarousel = ({ title, articles }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const listRef = useRef(null);
  const itemsToShow = 2;
  const gap = 20;

  useEffect(() => {
    const measureItemWidth = () => {
      if (listRef.current && listRef.current.children.length > 0) {
        const firstItem = listRef.current.children[0];
        const width = firstItem.offsetWidth;
        setItemWidth(width);
      }
    };

    measureItemWidth();
    window.addEventListener('resize', measureItemWidth);
    return () => window.removeEventListener('resize', measureItemWidth);
  }, [articles]);

  const handlePrev = () => {
    setStartIndex(prevIndex => Math.max(prevIndex - itemsToShow, 0));
  };

  const handleNext = () => {
    setStartIndex(prevIndex => Math.min(prevIndex + itemsToShow, articles.length - itemsToShow));
  };

  const translateXValue = itemWidth > 0 ? -startIndex * (itemWidth + gap) : 0;
  const canScrollPrev = startIndex > 0;
  const canScrollNext = articles.length > itemsToShow && startIndex < articles.length - itemsToShow;

  return (
    <section className="article-carousel-section">
      <div className="article-carousel-header">
        <h2 className="article-carousel-title">{title}</h2>
        <div className="article-carousel-nav">
          <button onClick={handlePrev} disabled={!canScrollPrev} aria-label={`Previous ${title}`}>
            &#10094;
          </button>
          <button onClick={handleNext} disabled={!canScrollNext} aria-label={`Next ${title}`}>
            &#10095;
          </button>
        </div>
      </div>
      <div className="article-carousel-list-wrapper">
        <div
          ref={listRef}
          className="article-carousel-list"
          style={{ transform: `translateX(${translateXValue}px)` }}
        >
          {articles.map(article => (
            <div key={article.id} className="article-carousel-item">
              <ArticleCard article={article} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArticleCarousel;
