import React from 'react';
import './Pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const displayPages = pageNumbers;

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };


  if (totalPages <= 1) {
    return null;
  }

  return (
    <section className="pagination-section">
      <div className="pagination-container">
        <div className="pagination-controls">
          <button
            className="pagination-button pagination-button-outline pagination-button-icon"
            onClick={handlePrevious}
            disabled={currentPage === 1} // Disable if on first page
            aria-label="Previous Page"
          >
            {'<'}
          </button>

          {/* TODO: Add logic here for handling many pages (e.g., showing first, last, current, and ellipses) */}
          {displayPages.map(page => (
            <button
              key={page}
              className={`pagination-button pagination-button-sm ${
                page === currentPage // Highlight the current page
                  ? 'pagination-button-active'
                  : 'pagination-button-outline'
              }`}
              onClick={() => onPageChange(page)}
              aria-label={`Go to page ${page}`}
              aria-current={page === currentPage ? 'page' : undefined} // Accessibility
            >
              {page}
            </button>
          ))}

          <button
            className="pagination-button pagination-button-outline pagination-button-icon"
            onClick={handleNext}
            disabled={currentPage === totalPages} // Disable if on last page
            aria-label="Next Page"
          >
            {'>'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Pagination;
