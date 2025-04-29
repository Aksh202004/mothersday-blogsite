import React, { useState, useRef, useEffect, useCallback } from 'react';
import ArticleCard from '../ArticleCard/ArticleCard';
import './ArticleCarousel.css';

const ArticleCarousel = ({ title, articles }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 576);
  const listRef = useRef(null);
  const itemsToShow = 2;
  const gap = 20;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 576);
    window.addEventListener('resize', checkMobile);
    checkMobile();
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const measureItemWidth = useCallback(() => {
    if (listRef.current && listRef.current.children.length > 0) {
      const firstItem = listRef.current.children[0];
      requestAnimationFrame(() => {
        const width = firstItem.offsetWidth;
        setItemWidth(width);
      });
    }
  }, []);

  useEffect(() => {
    measureItemWidth();
    window.addEventListener('resize', measureItemWidth);
    measureItemWidth();
    return () => window.removeEventListener('resize', measureItemWidth);
  }, [articles, isMobile, measureItemWidth]);

  const scrollStep = isMobile ? 1 : itemsToShow;

  const handlePrev = () => {
    setStartIndex(prevIndex => Math.max(prevIndex - scrollStep, 0));
  };

  const handleNext = () => {
    const maxStartIndex = Math.max(0, articles.length - (isMobile ? 1 : itemsToShow));
    setStartIndex(prevIndex => Math.min(prevIndex + scrollStep, maxStartIndex));
  };

  const translateXValue = itemWidth > 0 ? -startIndex * (itemWidth + gap) : 0;
  const canScrollPrev = startIndex > 0;
  const canScrollNext = startIndex < Math.max(0, articles.length - (isMobile ? 1 : itemsToShow));

  if (!articles || articles.length === 0) {
    return (
      <section className="article-carousel-section">
        <div className="article-carousel-header">
          <h2 className="article-carousel-title">{title}</h2>
        </div>
        <p>No articles to display.</p>
      </section>
    );
  }

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
