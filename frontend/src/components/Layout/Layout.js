import React from 'react';
import Navbar from '../Navbar/Navbar';
import MenuAdmin from './../Menu/MenuAdmin';
import MenuLivreur from './../Menu/MenuLivreur'; 
import MenuClient from './../Menu/MenuClient'; 
import MenuSuperadmin from '../Menu/MenuSuperadmin';
import './Layout.css';

const Layout = ({ children, userRole }) => {
  const renderMenu = () => {
    switch (userRole) {
      case 'Superadmin':
        return <MenuSuperadmin />;
      case 'Admin':
        return <MenuAdmin />;
      case 'Livreur':
        return <MenuLivreur />;
      case 'Client':
        return <MenuClient />;
      default:
        return null;
    }
  };

  return (
    <div className="layout">
      {renderMenu()}
      <div className="content menu-open">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
