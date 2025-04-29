import React, { useState, useEffect } from 'react';
import articlesData from '../../data/articles.json';
import ArticleCarousel from '../../components/ArticleCarousel/ArticleCarousel';
import './CategoriesPage.css';

const CategoriesPage = () => {
  const [groupedArticles, setGroupedArticles] = useState({});

  useEffect(() => {
    const groups = articlesData.reduce((acc, article) => {
      const category = article.category || 'Uncategorized'; // Handle articles without a category
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(article);
      return acc;
    }, {});
    setGroupedArticles(groups);
  }, []);

  const categories = Object.keys(groupedArticles).sort();

  return (
    <div className="categories-page container">
      <h1 className="categories-page-title">Categories</h1>
      {categories.map(category => (
        <ArticleCarousel
          key={category}
          title={category}
          articles={groupedArticles[category]}
        />
      ))}
    </div>
  );
};

export default CategoriesPage;
