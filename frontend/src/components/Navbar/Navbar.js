import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import './Navbar.css';

const Navbar = () => {
  const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userRole, setUserRole] = useState('');
  const [userId, setUserId] = useState('');
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

  useEffect(() => {
    // Fetch user data from local storage
    const storedName = localStorage.getItem('userNom');
    const storedEmail = localStorage.getItem('userEmail');
    const storedRole = localStorage.getItem('userRole');
    const storedId = localStorage.getItem('userId');

    setUserName(storedName || ''); // Default to empty string if not found
    setUserEmail(storedEmail || '');
    setUserRole(storedRole || '');
    setUserId(storedId || '');
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' }); 
      localStorage.clear(); // Clear all local storage on logout
  
      // Replace the current entry in the history stack with the login page
      navigate('/', { replace: true });
  
      // Clear history stack to prevent navigation back to the previous page
      window.history.pushState(null, '', '/');
      window.addEventListener('popstate', () => {
        window.history.pushState(null, '', '/');
      });
    } catch (error) {
      console.error('Logout failed:', error);
    }
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
          | Bonjour : {userName}
        </div>
        <button className="navbar-button" onClick={toggleProfilePopup}>
          <i className="fa fa-user-circle"></i>
        </button>
        {isProfilePopupOpen && (
          <div className="profile-popup" ref={popupRef}>
            <div className="profile-header">
              <img src="path/to/profile-image.jpg" alt="Profile" className="profile-image" />
              <h3>{userName}</h3>
              <p>Email: {userEmail}</p>
            </div>
            <div className="profile-actions">
            <Link to="/edit-profile">
                <button className="buttonnn">Edit Profile</button>
              </Link>
           
              <button className="buttonnn" onClick={handleLogout}>Logout</button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
