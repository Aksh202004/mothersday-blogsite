import React from 'react';
import { Link } from 'react-router-dom';
import './ArticleCard.css'; 

const ArticleCard = ({ article }) => {
  if (!article) {
    return null; 
  }

  return (
    <article className="article-card">
      {article.imageUrl && (
        <Link to={`/articles/${article.id}`} className="card-image-link">
          <img
            src={process.env.PUBLIC_URL + article.imageUrl}
            alt={article.title}
            className="card-image"
          />
        </Link>
      )}
      <div className="card-content">
        <div>
          <span className="card-category">{article.category}</span>

          <span className="card-reading-time-meta">{article.readingTime} min read</span>
        </div>
        <h3 className="card-title">
          <Link to={`/articles/${article.id}`}>{article.title}</Link>
        </h3>
        <p className="card-excerpt">{article.excerpt}</p>
        <div className="card-footer">
          <Link to={`/articles/${article.id}`} className="read-more-link">
            Read More &rarr;
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;
