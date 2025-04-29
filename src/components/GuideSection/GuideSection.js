import React from 'react';
import './GuideSection.css'; // We will create this CSS file next

const GuideSection = () => {
  const guides = [
    { title: "Mystery of Asia", price: "$29" },
    { title: "Mystery of Europe", price: "$29" },
    { title: "Mystery of Australia", price: "$29" },
    { title: "Mystery of Africa", price: "$29" },
    { title: "Mystery of USA", price: "$29" },
  ];

  return (
    <div className="guide-section-container">
      <h2 className="guide-section-title">
        Find your complete guide to everywhere you need to visit
      </h2>
      <div className="guide-grid">
        {guides.map((guide, index) => (
          <div key={index} className="guide-item">
            {/* Wrapper for image and overlays */}
            <div className="guide-image-wrapper">
              {/* Actual Image */}
              <img
                src="/images/placeholder.png"
                alt={guide.title}
                className="guide-image"
              />
              {/* Price - positioned absolutely relative to wrapper */}
              <div className="guide-price">{guide.price}</div>
              {/* Title - positioned absolutely relative to wrapper */}
              <div className="guide-item-title">{guide.title}</div>
            </div>
            {/* Buy Button - outside the wrapper */}
            <button className="guide-buy-button">
              Buy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuideSection;
