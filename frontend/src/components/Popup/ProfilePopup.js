import React, { useState } from 'react';
import './ProfilePopup.css';

const ProfilePopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="profile-popup-container">
      <button className="profile-button" onClick={togglePopup}>
        <i className="fa fa-user-circle"></i> Profile
      </button>
      {isOpen && (
        <div className="profile-popup">
          <div className="profile-header">
            <img src="profile-image-url" alt="Profile" className="profile-image" />
            <h3>John Doe</h3>
            <p>john.doe@example.com</p>
          </div>
          <div className="profile-details">
            <p><strong>Phone:</strong> +1234567890</p>
            <p><strong>Address:</strong> 123 Main St, City, Country</p>
          </div>
          <div className="profile-actions">
            <button className="profile-action-button" onClick={() => alert('Settings clicked!')}>
              Settings
            </button>
            <button className="profile-action-button" onClick={() => alert('Logout clicked!')}>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePopup;
