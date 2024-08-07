import React, { useState } from 'react';
import './ListDesColisFilter.css';

const ListDesColisFilter = ({ onFilterChange }) => {
  const options = ['Tout', 'En cours', 'Livré'];

  const [selectedOption, setSelectedOption] = useState('Tout');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const handleToggleOptions = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onFilterChange(option, selectedDate);
  };

  const handleDateChange = (event) => {
    const date = event.target.value;
    setSelectedDate(date);
    onFilterChange(selectedOption, date); 
  };

  return (
    <div className="filters-container">
      <div className={`filter-card ${isOpen ? 'open' : ''}`}>
        <div className="filter-content" onClick={handleToggleOptions}>
          <div className="filter-icon">
            <i className="fa fa-filter" aria-hidden="true"></i>
          </div>
          <div className="filter-label">
            <span>État</span>
          </div>
          <div className="arrow-icon">
            <i className={`fa ${isOpen ? 'fa-angle-up' : 'fa-angle-down'}`} aria-hidden="true"></i>
          </div>
        </div>
        <div className="selected-option">
          <span>{selectedOption}</span>
        </div>
        {isOpen && (
          <div className="options">
            {options.map((option, index) => (
              <div
                key={index}
                className={`option ${option === selectedOption ? 'selected' : ''}`}
                onClick={() => handleOptionSelect(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
      
    
      <div className="filter-card date-card">
        <div className="filter-content">
          <div className="filter-icon">
            <i className="fa fa-calendar" aria-hidden="true"></i>
          </div>
          <div className="filter-label">
            <span>Jour</span>
          </div>
        </div>
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="date-input"
        />
      </div>
    </div>
  );
};

export default ListDesColisFilter;
