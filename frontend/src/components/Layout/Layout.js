
import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import Menu from '../Menu/Menu';
import './Layout.css';

const Layout = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(true);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="layout">
      <Navbar toggleMenu={toggleMenu} />
      <Menu isOpen={menuOpen} />
      <div className={`content ${menuOpen ? 'menu-open' : ''}`}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
