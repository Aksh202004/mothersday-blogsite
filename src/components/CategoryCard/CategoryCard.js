import React from 'react';
import './CategoryCard.css';

const CategoryCard = ({ category, onCategorySelect, isActive }) => {

  const handleClick = () => {
    onCategorySelect(category);
  };

  const cardClassName = `category-card ${isActive ? 'category-card-active' : ''}`;

  return (
    <div className={cardClassName} onClick={handleClick}>
      {category}
    </div>
  );
};

export default CategoryCard;
