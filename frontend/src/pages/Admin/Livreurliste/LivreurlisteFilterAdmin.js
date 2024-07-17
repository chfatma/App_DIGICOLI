import React, { useState, useEffect, useCallback } from 'react';
import './LivreurlisteFilterAdmin.css';

const LivreurListe = ({ selectedGouvernement, setSelectedGouvernement, setSelectedDate }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedDate, setSelectedDateInternal] = useState('');
  const [selectedGouvernementInternal, setSelectedGouvernementInternal] = useState('Tout');

  const gouvernements = ["Sousse", "Tunisie", "Tout"];

  useEffect(() => {
    setSelectedGouvernement('Tout');
    setSelectedGouvernementInternal('Tout');
  }, [setSelectedGouvernement]);

  const handleGouvernementSelect = (gouvernement) => {
    setSelectedGouvernement(gouvernement);
    setSelectedGouvernementInternal(gouvernement);
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleDateChange = (e) => {
    setSelectedDateInternal(e.target.value);
    setSelectedDate(e.target.value); 
  };

  const handleOutsideClick = useCallback((event) => {
    if (!event.target.closest('.gouvernement-card')) {
      setShowDropdown(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [handleOutsideClick]);

  return (
    <div className="livreur-list-container">
      <div className="left-content"></div>
      <div className="right-content">
        <div className="small-button gouvernement-card">
          <div className="card-title" onClick={toggleDropdown}>
            <div className="icon-circle" style={{ width: '35px', height: '35px' }}>
              <i className="fa fa-map-pin" style={{ width: '15px', height: '15px'  }}></i>
            </div>
            <span className="title-text">Gouvernement</span>
            <i className={`fa ${showDropdown ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
          </div>
          {showDropdown && (
            <div className="gouvernement-dropdown">
              {gouvernements.map((gouvernement, index) => (
                <div
                  key={index}
                  className={`dropdown-item ${gouvernement === selectedGouvernement ? 'selected' : ''}`}
                  onClick={() => handleGouvernementSelect(gouvernement)}
                >
                  {gouvernement}
                </div>
              ))}
            </div>
          )}
        </div>
        {!showDropdown && (
          <div className="selected-gouvernement">{selectedGouvernementInternal}</div>
        )}
        <div className="small-button date-card">
          <div className="icon-title">
            <div className="icon-circle" style={{ width: '35px', height: '35px' }}>
              <i className="fa fa-calendar" style={{ width: '15px', height: '15px'  }}></i>
            </div>
            <span className="title-text">Date</span>
          </div>
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="date-input"
          />
        </div>
      </div>
    </div>
  );
};

export default LivreurListe;
