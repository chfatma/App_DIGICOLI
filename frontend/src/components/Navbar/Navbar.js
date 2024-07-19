import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Navbar.css';

const Navbar = () => {
  const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
  const popupRef = useRef(null);
  const navigate = useNavigate();

  const toggleProfilePopup = () => {
    setIsProfilePopupOpen(!isProfilePopupOpen);
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setIsProfilePopupOpen(false);
    }
  };

  useEffect(() => {
    if (isProfilePopupOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfilePopupOpen]);

  const handleEditProfile = () => {
    navigate('/EditProfile');
    setIsProfilePopupOpen(false); 
  };

  return (
    <nav className="navbar">
      <div className="navbar-search">
        <input type="text" placeholder="Search..." className="search-input" />
        <button className="search-button">
          <i className="fa fa-search"></i>
        </button>
      </div>
      <div className="navbar-items">
        <button className="navbar-button">
          <i className="fa fa-bell"></i>
        </button>
        <button className="navbar-button">
          <i className="fa fa-comments"></i>
        </button>
        <div className="navbar-greeting">
          | Bonjour : Amira
        </div>
        <button className="navbar-button" onClick={toggleProfilePopup}>
          <i className="fa fa-user-circle"></i>
        </button>
        {isProfilePopupOpen && (
          <div className="profile-popup" ref={popupRef}>
            <div className="profile-header">
              <img src="path/to/profile-image.jpg" alt="Profile" className="profile-image" />
              <h3>Nom Prénom</h3>
              <p>Email: amira@example.com</p>
            </div>
            <div className="profile-actions">
              <button className="profile-button" onClick={handleEditProfile}>Modifier</button>
              <button className="profile-button">Logout</button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
