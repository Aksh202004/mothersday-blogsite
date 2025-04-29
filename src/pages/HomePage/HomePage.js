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

// Helper function to shuffle an array (Fisher-Yates/Knuth Shuffle)
const shuffleArray = (array) => {
  let currentIndex = array.length, randomIndex;
  const newArray = [...array]; // Create a copy to avoid mutating the original import

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
  const articlesPerPage = 6;
  const categoriesToShow = 6;

  useEffect(() => {
    // Load and shuffle articles once on mount
    const shuffledArticles = shuffleArray(articlesData);
    setAllArticles(shuffledArticles);
  }, []);

  // Effect to handle filtering based on category and search query
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
    setCurrentPage(1); // Reset page whenever filters change

    // Scroll to recent articles section only when search becomes active
    const queryIsActive = searchQuery && searchQuery.trim() !== '';
    if (queryIsActive && !hasScrolledForSearch.current && recentArticlesRef.current) {
      recentArticlesRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      hasScrolledForSearch.current = true; // Mark that we've scrolled for this search activation
    } else if (!queryIsActive) {
      hasScrolledForSearch.current = false; // Reset scroll tracking when search is cleared
    }

  }, [searchQuery, selectedCategory, allArticles]);


  // Handle category selection
  const handleCategorySelect = (category) => {
     if (selectedCategory === category) {
       // If clicking the *same* specific category again, treat it as clicking "All"
       setSelectedCategory(null);
     } else {
       setSelectedCategory(category);
     }
  };

  // Category Carousel Logic
  const handleNextCategory = () => {
    setCategoryStartIndex(prevIndex => Math.min(prevIndex + categoriesToShow, categories.length - categoriesToShow));
  };

  const handlePrevCategory = () => {
    setCategoryStartIndex(prevIndex => Math.max(prevIndex - categoriesToShow, 0));
  };

  // Pagination Logic
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const featuredArticles = allArticles.slice(0, 3);
  const categories = [...new Set(allArticles.map(article => article.category))];
  const categoryCardWidthEstimate = 130; // Adjust this based on actual CSS/content
  const translateXValue = -categoryStartIndex * categoryCardWidthEstimate;


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
                disabled={categoryStartIndex === 0}
              >
                &#10094;
              </button>
              <button
                aria-label="Next Category"
                onClick={handleNextCategory}
                disabled={categoryStartIndex >= categories.length - categoriesToShow}
              >
                &#10095;
              </button>
            </div>
          </div>
        <div className="category-list-wrapper">
          <div
            className="category-list"
            style={{ transform: `translateX(${translateXValue}px)` }}
          >
            {/* "All" Category Button */}
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
                {/* Display GuideSection only after the third article on the first page */}
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
