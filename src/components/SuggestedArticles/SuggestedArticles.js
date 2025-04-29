import React from 'react';
import { Link } from 'react-router-dom';
import articlesData from '../../data/articles.json';
import './SuggestedArticles.css'; // We'll create this next

const SuggestedArticles = ({ currentArticleId, currentArticleCategory }) => {
  // Filter articles: same category, not the current one, limit to 3
  const suggested = articlesData.filter(
    article => article.category === currentArticleCategory && article.id !== currentArticleId
  ).slice(0, 3); // Limit to 3 suggestions

  // Don't render the section if no suggestions are found
  if (suggested.length === 0) {
    return null;
  }

  return (
    <section className="suggested-articles-section container"> {/* Add container */}
      <h2 className="suggested-articles-title">Interesting Articles to Read</h2>
      <div className="suggested-articles-grid">
        {suggested.map(article => (
          <div key={article.id} className="suggested-article-card">
            {/* Image Placeholder */}
            <Link to={`/articles/${article.id}`} className="suggested-article-image-link">
              <div className="suggested-article-image-placeholder">
                <span>🖼️</span> {/* Placeholder */}
              </div>
            </Link>
            {/* Meta Info */}
            <div className="suggested-article-meta">
              <span className="category">#{article.category}</span>
              <span className="separator">·</span>
              <span className="read-time">{article.readingTime} minutes reading</span>
            </div>
            {/* Title */}
            <h3 className="suggested-article-title">
              <Link to={`/articles/${article.id}`}>{article.title}</Link>
            </h3>
            {/* Excerpt */}
            <p className="suggested-article-excerpt">{article.excerpt}</p>
            {/* Read More Button */}
            <Link to={`/articles/${article.id}`} className="suggested-article-read-more">
              Read more
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SuggestedArticles;
