import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import articlesData from '../../data/articles.json';
import './SearchDialog.css';

const SearchDialog = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Effect to filter articles when searchTerm changes
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults([]); // Clear results if search is empty
      return;
    }

    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const results = articlesData.filter(article =>
      article.title.toLowerCase().includes(lowerCaseSearchTerm)
    );
    setSearchResults(results);

  }, [searchTerm]);

  // Effect to clear search term when dialog closes
  useEffect(() => {
    if (!isOpen) {
      setSearchTerm('');
      setSearchResults([]);
    }
  }, [isOpen]);

  // Prevent rendering if not open
  if (!isOpen) {
    return null;
  }

  // Handle closing the dialog when clicking a result link
  const handleResultClick = () => {
    onClose(); // Close the dialog
  };

  return (
    <div className="search-dialog-overlay" onClick={onClose}> {/* Close on overlay click */}
      <div className="search-dialog-content" onClick={(e) => e.stopPropagation()}> {/* Prevent closing when clicking inside */}
        <button className="search-dialog-close" onClick={onClose} aria-label="Close search">
          &times; {/* Close icon */}
        </button>
        <h2>Search Articles</h2>
        <input
          type="text"
          placeholder="Enter article title..."
          className="search-dialog-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          autoFocus // Focus input when dialog opens
        />
        <div className="search-dialog-results">
          {searchTerm && searchResults.length > 0 && (
            <ul>
              {searchResults.map(article => (
                <li key={article.id}>
                  <Link to={`/articles/${article.id}`} onClick={handleResultClick}>
                    {article.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {searchTerm && searchResults.length === 0 && (
            <p>No articles found matching "{searchTerm}".</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchDialog;
