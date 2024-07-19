import React from 'react';
import Navbar from '../Navbar/Navbar';


import './Layout.css';

import MenuClients from '../Menu/MenuClient';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <MenuClients />
      <div className="content menu-open">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
