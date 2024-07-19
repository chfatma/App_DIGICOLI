import React, { useState } from 'react';
import './ListeColisAdminFilter.css';

const ListeColisAdminFilter = ({ onFilterChange }) => {
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
    <div className="listcolis-filters-wrapper">
      <div className="listcolis-filters-container">
        <div className={`listcolis-filter-card ${isOpen ? 'listcolis-open' : ''}`}>
          <div className="listcolis-filter-content" onClick={handleToggleOptions}>
            <div className="listcolis-filter-icon">
              <i className="fa fa-filter" aria-hidden="true"></i>
            </div>
            <div className="listcolis-filter-label">
              <span>État</span>
            </div>
            <div className="listcolis-arrow-icon">
              <i className={`fa ${isOpen ? 'fa-angle-up' : 'fa-angle-down'}`} aria-hidden="true"></i>
            </div>
          </div>
          <div className="listcolis-selected-options">
            <span>{selectedOption}</span>
          </div>
          {isOpen && (
            <div className="listcolis-options">
              {options.map((option, index) => (
                <div
                  key={index}
                  className={`listcolis-option ${option === selectedOption ? 'listcolis-selected' : ''}`}
                  onClick={() => handleOptionSelect(option)}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
        
     
        <div className="listcolis-filter-card listcolis-date-card">
          <div className="listcolis-filter-content">
            <div className="listcolis-filter-icon">
              <i className="fa fa-calendar" aria-hidden="true"></i>
            </div>
            <div className="listcolis-filter-label">
              <span>Jour</span>
            </div>
          </div>
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="listcolis-date-input"
          />
        </div>
      </div>
    </div>
  );
};

export default ListeColisAdminFilter;
