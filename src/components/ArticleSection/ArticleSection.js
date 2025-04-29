import React from 'react';
import './ArticleSection.css';

const generateSectionId = (title) => {
  if (!title) return `section-${Math.random().toString(36).substring(7)}`;
  return title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
};

const ArticleSection = ({ title, image, text }) => {
  const sectionId = generateSectionId(title);

  return (
    <div id={sectionId} className="article-section">
      {image && (
        <img
          src={process.env.PUBLIC_URL + image}
          alt={title || 'Article section image'}
          className="section-image"
        />
      )}
      {title && <h3 className="section-title">{title}</h3>}
      {text && (
        <div className="section-text-content">
          {Array.isArray(text) && text.every(Array.isArray) ? (
            text.map((paragraphArray, pIndex) => (
              <p key={pIndex} className="section-text">
                {paragraphArray.join(' ')}
              </p>
            ))
          ) : typeof text === 'string' ? (
            <p className="section-text">{text}</p>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default ArticleSection;
