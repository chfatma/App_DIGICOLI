import React from 'react';
import './Navbar.css';

const Navbar = () => {
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
        <button className="navbar-button">
          <i className="fa fa-user-circle"></i>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
