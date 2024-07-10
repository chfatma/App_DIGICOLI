import React, { useState, useEffect } from 'react';
import './LivreurListe.css';

const LivreurListe = () => {
  const [currentDate, setCurrentDate] = useState('');
  const [setSelectedGouvernement] = useState(''); 

  const [showDropdown, setShowDropdown] = useState(false);

  const gouvernements = ["Tunis", "Sousse", "Sfax"];

  const handleGouvernementSelect = (gouvernement) => {
    setSelectedGouvernement(gouvernement);
    setShowDropdown(false); 
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleOutsideClick = (event) => {
    if (!event.target.closest('.gouvernement-card')) {
      setShowDropdown(false);
    }
  };

 
  useEffect(() => {
    const today = new Date();
    const formattedDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
    setCurrentDate(formattedDate);
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div className="livreur-list-container">
   
      <div className="left-content">
     
      </div>
      
      <div className="right-content">
        <div className="small-button gouvernement-card">
          <div className="card-title" onClick={toggleDropdown}>
            <div className="icon-circle">
              <i className="fa fa-map-pin"></i>
            </div>
            <span className="title-text">Gouvernement</span>
            <i className={`fa ${showDropdown ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
          </div>
          {showDropdown && (
            <div className="gouvernement-dropdown">
              {gouvernements.map((gouvernement, index) => (
                <div
                  key={index}
                  className="dropdown-item"
                  onClick={() => handleGouvernementSelect(gouvernement)}
                >
                  {gouvernement}
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="small-button date-card">
          <div className="card-title">
            <div className="icon-circle">
              <i className="fa fa-calendar"></i>
            </div>
            <span className="title-text">Date</span>
          </div>
          <div className="date-info">{currentDate}</div>
        </div>
      </div>
    </div>
  );
}

export default LivreurListe;
