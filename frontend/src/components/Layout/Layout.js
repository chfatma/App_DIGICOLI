import React from 'react';
import Navbar from '../Navbar/Navbar';
import Menu from '../Menu/Menu';
import './Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Menu />
      <div className="content menu-open">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
