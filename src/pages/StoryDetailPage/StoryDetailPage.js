import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import articlesData from '../../data/articles.json'; // Original data
import newArticlesData from '../../data/newarticles.json'; // New data for stories 1-15
import SuggestedArticles from '../../components/SuggestedArticles/SuggestedArticles';
import ArticleSection from '../../components/ArticleSection/ArticleSection';
import './StoryDetailPage.css';

// Helper function to generate URL-friendly IDs from titles
const generateSectionId = (title) => {
  if (!title) return `section-${Math.random().toString(36).substring(7)}`;
  return title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
};

const StoryDetailPage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [sections, setSections] = useState([]);

  const getRandomElement = (arr) => {
    if (!arr || arr.length === 0) return null;
    return arr[Math.floor(Math.random() * arr.length)];
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    // Combine data sources to extract all possible metadata values
    const allArticles = [...articlesData, ...newArticlesData];
    const allAuthors = [...new Set(allArticles.map(a => a.authorName).filter(Boolean))];
    const allCategories = [...new Set(allArticles.map(a => a.category).filter(Boolean))];
    const allReadingTimes = [...new Set(allArticles.map(a => a.readingTime).filter(Boolean))];

    // Determine which data source to use based on ID
    const articleIdNum = parseInt(id.replace('story-', ''), 10);
    const useNewData = !isNaN(articleIdNum) && articleIdNum <= 15;
    const dataSource = useNewData ? newArticlesData : articlesData;

    let foundArticle = dataSource.find(a => a.id === id);

    // Apply fallbacks if metadata is missing
    if (foundArticle) {
      const finalArticle = { ...foundArticle }; // Clone to avoid modifying original data
      if (!finalArticle.authorName) {
        finalArticle.authorName = getRandomElement(allAuthors) || 'Unknown Author';
      }
      if (!finalArticle.category) {
        finalArticle.category = getRandomElement(allCategories) || 'General';
      }
      if (!finalArticle.readingTime) {
        finalArticle.readingTime = getRandomElement(allReadingTimes) || 5;
      }
      setArticle(finalArticle);

      // Extract sections for Overview if content is an array
      if (Array.isArray(finalArticle.fullContent)) {
        const extractedSections = finalArticle.fullContent
          .filter(item => item.type === 'section' && item.title)
          .map(item => ({
            title: item.title,
            id: generateSectionId(item.title)
          }));
        setSections(extractedSections);
      } else {
        setSections([]);
      }

    } else {
       setArticle(null);
       setSections([]);
    }

  }, [id]);

  if (!article) {
    return <div className="loading">Loading article...</div>;
  }

  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const [year, month, day] = dateString.split('-');
      return `${day}.${month}.${year}`;
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateString;
    }
  };

  const renderContent = (contentItem, index) => {
    if (!contentItem) return null;

    switch (contentItem.type) {
      // Handle specific paragraph types from newarticles.json if needed elsewhere,
      // or just handle the general case if they only appear in the main body logic.
      // For now, focus on the 'section' type which needs array handling.
      case 'paragraph': // Keep original handling for articles > 15
        return <p key={index} className="article-paragraph">{contentItem.text}</p>;
      case 'section':
        // Pass the original text structure (potentially array of arrays)
        // The ArticleSection component will handle rendering paragraphs
        return (
          <ArticleSection
            key={index}
            id={generateSectionId(contentItem.title)}
            title={contentItem.title}
            image={contentItem.image}
            text={contentItem.text}
          />
        );
      default:
        // Keep fallback for plain string content
        if (typeof contentItem === 'string') {
           return <p key={index} className="article-paragraph">{contentItem}</p>;
        }
        return null;
    }
  };

  const articleIdNum = parseInt(id.replace('story-', ''), 10);
  const useNewLayout = !isNaN(articleIdNum) && articleIdNum <= 15;

  // Original content rendering logic (for articles > 15)
  const originalContentToRender = Array.isArray(article.fullContent)
    ? article.fullContent.map(renderContent)
    : <p className="article-paragraph">{article.fullContent}</p>;

  return (
    <div className="story-detail-page">
      <div
        className="article-header-image"
        style={{ backgroundImage: `url(${process.env.PUBLIC_URL + (article.imageUrl || '/images/placeholder.png')})` }}
      >
        {/* Intentionally empty - background image */}
      </div>

      <div className="article-content-box container">
        <div className="article-header">
          <h1 className="article-title">{article.title}</h1>

          <div className="meta-socials-wrapper">
            <div className="meta-info">
              <span className="category">{article.category}</span>
              <span className="separator">·</span>
              <span className="read-time">{article.readingTime} minutes reading</span>
              <span className="separator">·</span>
              <span className="date">{formatDate(article.submissionDate)}</span>
            </div>
            <div className="article-socials-right">
              <a href="#" className="social-link" aria-label="Instagram">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.6672 12C8.6672 10.1591 10.1591 8.6664 12 8.6664C13.8409 8.6664 15.3336 10.1591 15.3336 12C15.3336 13.8409 13.8409 15.3336 12 15.3336C10.1591 15.3336 8.6672 13.8409 8.6672 12ZM6.86512 12C6.86512 14.836 9.164 17.1349 12 17.1349C14.836 17.1349 17.1349 14.836 17.1349 12C17.1349 9.164 14.836 6.86512 12 6.86512C9.164 6.86512 6.86512 9.164 6.86512 12ZM16.1382 6.66152C16.1381 6.89886 16.2084 7.13089 16.3401 7.32829C16.4719 7.52568 16.6593 7.67956 16.8785 7.77047C17.0977 7.86138 17.339 7.88525 17.5718 7.83904C17.8046 7.79283 18.0185 7.67862 18.1863 7.51087C18.3542 7.34311 18.4686 7.12934 18.515 6.89658C18.5614 6.66382 18.5377 6.42253 18.447 6.20322C18.3563 5.98392 18.2025 5.79644 18.0052 5.6645C17.808 5.53257 17.576 5.4621 17.3386 5.462H17.3382C17.02 5.46215 16.715 5.58856 16.49 5.81347C16.265 6.03837 16.1384 6.34339 16.1382 6.66152ZM7.96 20.1398C6.98504 20.0954 6.45512 19.933 6.10296 19.7958C5.63608 19.614 5.30296 19.3975 4.95272 19.0478C4.60248 18.698 4.38568 18.3652 4.20472 17.8983C4.06744 17.5463 3.90504 17.0162 3.86072 16.0413C3.81224 14.9872 3.80256 14.6706 3.80256 12.0001C3.80256 9.3296 3.81304 9.01384 3.86072 7.95888C3.90512 6.98392 4.06872 6.45488 4.20472 6.10184C4.38648 5.63496 4.60296 5.30184 4.95272 4.9516C5.30248 4.60136 5.63528 4.38456 6.10296 4.2036C6.45496 4.06632 6.98504 3.90392 7.96 3.8596C9.01408 3.81112 9.33072 3.80144 12 3.80144C14.6693 3.80144 14.9862 3.81192 16.0412 3.8596C17.0162 3.904 17.5452 4.0676 17.8982 4.2036C18.3651 4.38456 18.6982 4.60184 19.0485 4.9516C19.3987 5.30136 19.6147 5.63496 19.7965 6.10184C19.9338 6.45384 20.0962 6.98392 20.1405 7.95888C20.189 9.01384 20.1986 9.3296 20.1986 12.0001C20.1986 14.6706 20.189 14.9863 20.1405 16.0413C20.0961 17.0162 19.9329 17.5462 19.7965 17.8983C19.6147 18.3652 19.3982 18.6983 19.0485 19.0478C18.6987 19.3972 18.3651 19.614 17.8982 19.7958C17.5462 19.933 17.0162 20.0954 16.0412 20.1398C14.9871 20.1882 14.6705 20.1979 12 20.1979C9.32952 20.1979 9.01376 20.1882 7.96 20.1398ZM7.8772 2.06056C6.81264 2.10904 6.0852 2.27784 5.44992 2.52504C4.792 2.78032 4.23504 3.1228 3.67848 3.67848C3.12192 4.23416 2.78032 4.792 2.52504 5.44992C2.27784 6.0856 2.10904 6.81264 2.06056 7.8772C2.01128 8.94344 2 9.28432 2 12C2 14.7157 2.01128 15.0566 2.06056 16.1228C2.10904 17.1874 2.27784 17.9144 2.52504 18.5501C2.78032 19.2076 3.122 19.7661 3.67848 20.3215C4.23496 20.877 4.792 21.219 5.44992 21.475C6.0864 21.7222 6.81264 21.891 7.8772 21.9394C8.944 21.9879 9.28432 22 12 22C14.7157 22 15.0566 21.9887 16.1228 21.9394C17.1874 21.891 17.9144 21.7222 18.5501 21.475C19.2076 21.219 19.765 20.8772 20.3215 20.3215C20.8781 19.7658 21.219 19.2076 21.475 18.5501C21.7222 17.9144 21.8918 17.1874 21.9394 16.1228C21.9879 15.0558 21.9992 14.7157 21.9992 12C21.9992 9.28432 21.9879 8.94344 21.9394 7.8772C21.891 6.81256 21.7222 6.0852 21.475 5.44992C21.219 4.7924 20.8772 4.23504 20.3215 3.67848C19.7658 3.12192 19.2076 2.78032 18.5509 2.52504C17.9144 2.27784 17.1874 2.10824 16.1236 2.06056C15.0574 2.01208 14.7165 2 12.0008 2C9.28512 2 8.944 2.01128 7.8772 2.06056Z" fill="#FFFFFF"/>
                  <path d="M8.6672 12C8.6672 10.1591 10.1591 8.6664 12 8.6664C13.8409 8.6664 15.3336 10.1591 15.3336 12C15.3336 13.8409 13.8409 15.3336 12 15.3336C10.1591 15.3336 8.6672 13.8409 8.6672 12ZM6.86512 12C6.86512 14.836 9.164 17.1349 12 17.1349C14.836 17.1349 17.1349 14.836 17.1349 12C17.1349 9.164 14.836 6.86512 12 6.86512C9.164 6.86512 6.86512 9.164 6.86512 12ZM16.1382 6.66152C16.1381 6.89886 16.2084 7.13089 16.3401 7.32829C16.4719 7.52568 16.6593 7.67956 16.8785 7.77047C17.0977 7.86138 17.339 7.88525 17.5718 7.83904C17.8046 7.79283 18.0185 7.67862 18.1863 7.51087C18.3542 7.34311 18.4686 7.12934 18.515 6.89658C18.5614 6.66382 18.5377 6.42253 18.447 6.20322C18.3563 5.98392 18.2025 5.79644 18.0052 5.6645C17.808 5.53257 17.576 5.4621 17.3386 5.462H17.3382C17.02 5.46215 16.715 5.58856 16.49 5.81347C16.265 6.03837 16.1384 6.34339 16.1382 6.66152ZM7.96 20.1398C6.98504 20.0954 6.45512 19.933 6.10296 19.7958C5.63608 19.614 5.30296 19.3975 4.95272 19.0478C4.60248 18.698 4.38568 18.3652 4.20472 17.8983C4.06744 17.5463 3.90504 17.0162 3.86072 16.0413C3.81224 14.9872 3.80256 14.6706 3.80256 12.0001C3.80256 9.3296 3.81304 9.01384 3.86072 7.95888C3.90512 6.98392 4.06872 6.45488 4.20472 6.10184C4.38648 5.63496 4.60296 5.30184 4.95272 4.9516C5.30248 4.60136 5.63528 4.38456 6.10296 4.2036C6.45496 4.06632 6.98504 3.90392 7.96 3.8596C9.01408 3.81112 9.33072 3.80144 12 3.80144C14.6693 3.80144 14.9862 3.81192 16.0412 3.8596C17.0162 3.904 17.5452 4.0676 17.8982 4.2036C18.3651 4.38456 18.6982 4.60184 19.0485 4.9516C19.3987 5.30136 19.6147 5.63496 19.7965 6.10184C19.9338 6.45384 20.0962 6.98392 20.1405 7.95888C20.189 9.01384 20.1986 9.3296 20.1986 12.0001C20.1986 14.6706 20.189 14.9863 20.1405 16.0413C20.0961 17.0162 19.9329 17.5462 19.7965 17.8983C19.6147 18.3652 19.3982 18.6983 19.0485 19.0478C18.6987 19.3972 18.3651 19.614 17.8982 19.7958C17.5462 19.933 17.0162 20.0954 16.0412 20.1398C14.9871 20.1882 14.6705 20.1979 12 20.1979C9.32952 20.1979 9.01376 20.1882 7.96 20.1398ZM7.8772 2.06056C6.81264 2.10904 6.0852 2.27784 5.44992 2.52504C4.792 2.78032 4.23504 3.1228 3.67848 3.67848C3.12192 4.23416 2.78032 4.792 2.52504 5.44992C2.27784 6.0856 2.10904 6.81264 2.06056 7.8772C2.01128 8.94344 2 9.28432 2 12C2 14.7157 2.01128 15.0566 2.06056 16.1228C2.10904 17.1874 2.27784 17.9144 2.52504 18.5501C2.78032 19.2076 3.122 19.7661 3.67848 20.3215C4.23496 20.877 4.792 21.219 5.44992 21.475C6.0864 21.7222 6.81264 21.891 7.8772 21.9394C8.944 21.9879 9.28432 22 12 22C14.7157 22 15.0566 21.9887 16.1228 21.9394C17.1874 21.891 17.9144 21.7222 18.5501 21.475C19.2076 21.219 19.765 20.8772 20.3215 20.3215C20.8781 19.7658 21.219 19.2076 21.475 18.5501C21.7222 17.9144 21.8918 17.1874 21.9394 16.1228C21.9879 15.0558 21.9992 14.7157 21.9992 12C21.9992 9.28432 21.9879 8.94344 21.9394 7.8772C21.891 6.81256 21.7222 6.0852 21.475 5.44992C21.219 4.7924 20.8772 4.23504 20.3215 3.67848C19.7658 3.12192 19.2076 2.78032 18.5509 2.52504C17.9144 2.27784 17.1874 2.10824 16.1236 2.06056C15.0574 2.01208 14.7165 2 12.0008 2C9.28512 2 8.944 2.01128 7.8772 2.06056Z" fill="#FFFFFF"/>
                </svg>
              </a>
              <a href="#" className="social-link" aria-label="LinkedIn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.7065 3H4.34844C3.62264 3 3.04199 3.58065 3.04199 4.30645V19.6935C3.04199 20.3903 3.62264 21 4.34844 21H19.6485C20.3743 21 20.9549 20.4194 20.9549 19.6935V4.27742C21.013 3.58065 20.4323 3 19.7065 3ZM8.35491 18.3H5.71297V9.73548H8.35491V18.3ZM7.01942 8.54516C6.14846 8.54516 5.4807 7.84839 5.4807 7.00645C5.4807 6.16452 6.17749 5.46774 7.01942 5.46774C7.86136 5.46774 8.55813 6.16452 8.55813 7.00645C8.55813 7.84839 7.91942 8.54516 7.01942 8.54516ZM18.371 18.3H15.7291V14.1484C15.7291 13.1613 15.7001 11.8548 14.3356 11.8548C12.942 11.8548 12.7388 12.9581 12.7388 14.0613V18.3H10.0968V9.73548H12.6807V10.9258H12.7097C13.0872 10.229 13.9291 9.53226 15.2356 9.53226C17.9356 9.53226 18.4291 11.2742 18.4291 13.6548V18.3H18.371Z" fill="#FFFFFF"/>
                </svg>
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.7512 2.96094H20.818L14.1179 10.6187L22 21.0391H15.8284L10.9946 14.7191L5.4636 21.0391H2.39492L9.56132 12.8483L2 2.96094H8.32824L12.6976 8.73762L17.7512 2.96094ZM16.6748 19.2035H18.3742L7.40492 4.70014H5.58132L16.6748 19.2035Z" fill="#FFFFFF"/>
                </svg>
              </a>
              <a href="#" className="social-link" aria-label="Facebook">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21.5806 7.19355C21.3548 6.32258 20.6774 5.64516 19.8065 5.41935C18.2581 5 12 5 12 5C12 5 5.74194 5 4.19355 5.41935C3.32258 5.64516 2.64516 6.32258 2.41935 7.19355C2 8.77419 2 12 2 12C2 12 2 15.2581 2.41935 16.8065C2.64516 17.6774 3.32258 18.3548 4.19355 18.5806C5.74194 19 12 19 12 19C12 19 18.2581 19 19.8065 18.5806C20.6774 18.3548 21.3548 17.6774 21.5806 16.8065C22 15.2581 22 12 22 12C22 12 22 8.77419 21.5806 7.19355ZM10 15V9L15.1935 12L10 15Z" fill="#FFFFFF"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="article-main-content-wrapper">
          {sections.length > 0 && (
            <aside className="overview-section">
              <h4 className="overview-title">Overview</h4>
              <ul className="overview-list">
                {sections.map(section => (
                  <li key={section.id}>
                    <a href={`#${section.id}`} className="overview-link">
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </aside>
          )}

          <div className="article-body">
            {useNewLayout && article.fullContent && Array.isArray(article.fullContent) ? (
              // New Layout for stories 1-15 based on newarticles.json structure
              <>
                {/* Quote (from paragraph-1) */}
                {article.fullContent.find(item => item.type === 'paragraph-1') && (
                  <blockquote className="article-quote">
                    <em>{article.fullContent.find(item => item.type === 'paragraph-1').text}</em>
                  </blockquote>
                )}

                {/* paragraph-2 */}
                {article.fullContent.find(item => item.type === 'paragraph-2') && (
                  <p className="article-paragraph">
                    {article.fullContent.find(item => item.type === 'paragraph-2').text.join(' ')}
                  </p>
                )}

                {/* paragraph-3 */}
                {article.fullContent.find(item => item.type === 'paragraph-3') && (
                  <p className="article-paragraph">
                    {article.fullContent.find(item => item.type === 'paragraph-3').text.join(' ')}
                  </p>
                )}

                {/* Render remaining content (sections), skipping specific paragraphs */}
                {article.fullContent
                  .filter(item => !['paragraph-1', 'paragraph-2', 'paragraph-3'].includes(item.type))
                  .map(renderContent)
                }
              </>
            ) : (
              // Original Layout for stories > 15 or non-array content
              originalContentToRender
            )}
          </div>
        </div>

      </div>

      {article && (
        <SuggestedArticles
          currentArticleId={article.id}
          currentArticleCategory={article.category}
        />
      )}

    </div>
  );
};

export default StoryDetailPage;
