import React from 'react';
import Navbar from '../Navbar/Navbar';

import MenuLivreure from '../Menu/MenuLivreur'
import './Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <MenuLivreure />
      <div className="content menu-open">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
