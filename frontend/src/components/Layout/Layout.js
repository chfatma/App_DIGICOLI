import React from 'react';
import Navbar from '../Navbar/Navbar';


import './Layout.css';



import MenuAdmin from './../Menu/MenuAdmin';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <MenuAdmin />
      <div className="content menu-open">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default Layout;