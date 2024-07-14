import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Navbar.css';
import './ProfilePopup.css'; // Import the CSS for the profile popup

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleProfilePopup = () => {
    setIsProfileOpen(!isProfileOpen);
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
        {isProfileOpen && (
          <div className="profile-popup">
            <div className="profile-header">
              <img src="profile-image-url" alt="Profile" className="profile-image" />
              <h3>Amira</h3>
              <p className="profile-email">amira@example.com</p>
            </div>
            <div className="profile-details">
              <p><i className="fa fa-phone"></i> +1234567890</p>
              <p><i className="fa fa-map-marker"></i> 123 Main St, City, Country</p>
            </div>
            <div className="profile-actions">
              <button className="profile-action-button settings-button">
                <Link to="/profile">
                  <i className="fa fa-cog"></i> Settings
                </Link>
              </button>
              <button className="profile-action-button logout-button">
                <Link to="/">
                  <i className="fa fa-sign-out"></i> Logout
                </Link>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
