import React, { useState } from 'react';
import './TousClientLivreurFilter.css';

const TousClientLivreurFilter = ({ onFilterChange }) => {
  const options = [
    'Tout par défaut',
    'Tunis',
    'sousse',
    
  ];

  const [selectedOption, setSelectedOption] = useState('Tout');
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleOptions = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onFilterChange(option); 
  };

  return (
    <div className={`filter-card ${isOpen ? 'open' : ''}`}>
      <div className="filter-content" onClick={handleToggleOptions}>
        <div className="filter-icon">
          <i className="fa fa-map-marker" aria-hidden="true"></i>
        </div>
        <div className="filter-label">
          <span>Gouvernorat</span>
        </div>
        <div className="arrow-icon">
          <i className={`fa ${isOpen ? 'fa-angle-up' : 'fa-angle-down'}`} aria-hidden="true"></i>
        </div>
      </div>
      <div className="options">
        {options.map((option, index) => (
          <div key={index} className="option" onClick={() => handleOptionSelect(option)}>
            {option}
          </div>
        ))}
      </div>
      <div className="selected-option">
        <span>{selectedOption}</span>
      </div>
    </div>
  );
};

export default TousClientLivreurFilter;
