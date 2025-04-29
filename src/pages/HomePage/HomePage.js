import React, { useState, useEffect, useRef, useContext } from 'react';
import { SearchContext } from '../../components/Layout/Layout';
import articlesData from '../../data/articles.json';
import './HomePage.css';
import Carousel from '../../components/Carousel/Carousel';
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import ArticleCard from '../../components/ArticleCard/ArticleCard';
import Sidebar from '../../components/Sidebar/Sidebar';
import GuideSection from '../../components/GuideSection/GuideSection';
import Pagination from '../../components/Pagination/Pagination';
import { Link } from 'react-router-dom';
import { useCallback } from 'react';


const shuffleArray = (array) => {
  let currentIndex = array.length, randomIndex;
  const newArray = [...array];

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [newArray[currentIndex], newArray[randomIndex]] = [
      newArray[randomIndex], newArray[currentIndex]];
  }

  return newArray;
};


const HomePage = () => {
  const { searchQuery } = useContext(SearchContext);
  const recentArticlesRef = useRef(null);
  const hasScrolledForSearch = useRef(false);
  const [allArticles, setAllArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryStartIndex, setCategoryStartIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 576);
  const [categoryItemWidth, setCategoryItemWidth] = useState(130);
  const categoryListRef = useRef(null);
  const articlesPerPage = 6;
  const categoriesToShowDesktop = 6;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 576);
    window.addEventListener('resize', checkMobile);
    checkMobile();
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const shuffledArticles = shuffleArray(articlesData);
    setAllArticles(shuffledArticles);
  }, []);

  useEffect(() => {
    let articlesToFilter = allArticles;

    // Apply category filter
    if (selectedCategory) {
      articlesToFilter = articlesToFilter.filter(article => article.category === selectedCategory);
    }

    // Apply search filter (case-insensitive title check)
    if (searchQuery && searchQuery.trim() !== '') {
      const lowerCaseQuery = searchQuery.toLowerCase();
      articlesToFilter = articlesToFilter.filter(article =>
        article.title.toLowerCase().includes(lowerCaseQuery)
      );
    }

    setFilteredArticles(articlesToFilter);
    setCurrentPage(1);

    const queryIsActive = searchQuery && searchQuery.trim() !== '';
    if (queryIsActive && !hasScrolledForSearch.current && recentArticlesRef.current) {
      recentArticlesRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      hasScrolledForSearch.current = true;
    } else if (!queryIsActive) {
      hasScrolledForSearch.current = false;
    }

  }, [searchQuery, selectedCategory, allArticles]);

  const handleCategorySelect = (category) => {
     if (selectedCategory === category) {
       setSelectedCategory(null);
     } else {
       setSelectedCategory(category);
     }
  };

  const measureCategoryItemWidth = useCallback(() => {
    if (categoryListRef.current && categoryListRef.current.children.length > 1) {
      const firstItem = categoryListRef.current.children[0];
      const secondItem = categoryListRef.current.children[1];
      const widthWithGap = secondItem.offsetLeft - firstItem.offsetLeft;
      setCategoryItemWidth(widthWithGap > 0 ? widthWithGap : 130);
    } else if (categoryListRef.current && categoryListRef.current.children.length === 1) {
       const firstItem = categoryListRef.current.children[0];
       setCategoryItemWidth(firstItem.offsetWidth > 0 ? firstItem.offsetWidth + 15 : 130);
    }
  }, []);

  useEffect(() => {
    measureCategoryItemWidth();
    window.addEventListener('resize', measureCategoryItemWidth);
    return () => window.removeEventListener('resize', measureCategoryItemWidth);
  }, [measureCategoryItemWidth]);

  const categories = [...new Set(allArticles.map(article => article.category))];
  const totalCategories = categories.length + 1;

  const categoryScrollStep = isMobile ? 3 : categoriesToShowDesktop;
  const visibleCategoriesEstimate = isMobile ? 3 : categoriesToShowDesktop;

  const handleNextCategory = () => {
    const maxStartIndex = Math.max(0, totalCategories - visibleCategoriesEstimate);
    setCategoryStartIndex(prevIndex => Math.min(prevIndex + categoryScrollStep, maxStartIndex));
  };

  const handlePrevCategory = () => {
    setCategoryStartIndex(prevIndex => Math.max(prevIndex - categoryScrollStep, 0));
  };

  const translateXValue = -categoryStartIndex * categoryItemWidth;

  const canScrollPrevCategory = categoryStartIndex > 0;
  const canScrollNextCategory = categoryStartIndex < Math.max(0, totalCategories - visibleCategoriesEstimate);

  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
     if (recentArticlesRef.current) {
       const rect = recentArticlesRef.current.getBoundingClientRect();
       const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
       const targetPosition = rect.top + scrollTop - 80;
       window.scrollTo({ top: targetPosition, behavior: 'smooth' });
     } else {
       window.scrollTo({ top: 0, behavior: 'smooth' });
     }
  };

  const featuredArticles = allArticles.slice(0, 3);

  return (
    <div className="home-page">
      <section className="hero-section">
        <h2>Featured Stories</h2>
        <Carousel articles={featuredArticles} />
      </section>

      <section className="category-section">
        <div className="container">
          <div className="section-header">
            <Link to="/categories" className="explore-category-link">
              <h2>Explore by category</h2>
            </Link>
            <div className="category-nav-buttons">
              <button
                aria-label="Previous Category"
                onClick={handlePrevCategory}
                disabled={!canScrollPrevCategory}
              >
                &#10094;
              </button>
              <button
                aria-label="Next Category"
                onClick={handleNextCategory}
                disabled={!canScrollNextCategory}
              >
                &#10095;
              </button>
            </div>
          </div>
        <div className="category-list-wrapper">
          <div ref={categoryListRef}
            className="category-list"
            style={{ transform: `translateX(${translateXValue}px)` }}
          >
            <div
              className={`category-card ${selectedCategory === null ? 'category-card-active' : ''}`}
              onClick={() => handleCategorySelect(null)}
              style={{ cursor: 'pointer' }}
            >
              All
            </div>
            {categories.map(category => (
              <CategoryCard
                key={category}
                category={category}
              onCategorySelect={handleCategorySelect}
              isActive={selectedCategory === category}
            />
          ))}
          </div>
        </div>
    </div>
      </section>

      <div className="container">
        <div className="main-content-area">
          <section className="recent-articles-section" ref={recentArticlesRef}>
            <h2>Recent Articles</h2>
            <div className="article-list">
            {currentArticles.map((article, index) => (
              <React.Fragment key={article.id}>
                <ArticleCard article={article} />
                {currentPage === 1 && indexOfFirstArticle + index === 2 && <GuideSection />}
              </React.Fragment>
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
          </section>

        <Sidebar />
      </div>
    </div>

  </div>
  );
};

export default HomePage;
