import React, { useState, useEffect, useCallback } from 'react';
import './LivreurlisteFilterAdmin.css';

const LivreurListe = ({ selectedGouvernement, setSelectedGouvernement, setSelectedDate }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedDate, setSelectedDateInternal] = useState('');
  const [selectedGouvernementInternal, setSelectedGouvernementInternal] = useState('Tout');

  const gouvernements = [ "Tunis", "Sfax", "Sousse", "Monastir", "Kairouan", "Bizerte", "Nabeul", "Kasserine",
    "Sidi Bouzid", "Gabès", "Mednine", "Tozeur", "Jendouba", "Le Kef", "Zaghouan", "Siliana",
    "Mahdia", "La Manouba", "Ariana", "Ben Arous", "Tataouine", "Gafsa", "Medenine", "Sidi Bou Said", "Kebili","Tout"];

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
    if (!event.target.closest('.gouvernement-card-custom')) {
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
    <div className="livreur-list-container-custom">
      <div className="left-content-custom"></div>
      <div className="right-content-custom">
        <div className="small-button-custom gouvernement-card-custom">
          <div className="card-title-custom" onClick={toggleDropdown}>
            <div className="icon-circle-custom">
              <i className="fa fa-map-pin"></i>
            </div>
            <span className="title-text-custom">Gouvernement</span>
            <i className={`fa ${showDropdown ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
          </div>
          <div className="selected-gouvernement-custom">{selectedGouvernementInternal}</div>
          {showDropdown && (
            <div className="gouvernement-dropdown-custom">
              {gouvernements.map((gouvernement, index) => (
                <div
                  key={index}
                  className={`dropdown-item-custom ${gouvernement === selectedGouvernement ? 'selected-custom' : ''}`}
                  onClick={() => handleGouvernementSelect(gouvernement)}
                >
                  {gouvernement}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="small-button-custom date-card-custom">
          <div className="icon-title-custom">
            <div className="icon-circle-custom">
              <i className="fa fa-calendar"></i>
            </div>
            <span className="title-text-custom">Date</span>
          </div>
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="date-input-custom"
          />
        </div>
      </div>
    </div>
  );
};

export default LivreurListe;
