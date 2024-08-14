import React from 'react';
import { Link, useLocation } from 'react-router-dom'; 
import './Menu.css';

const MenuClients = () => {
  const location = useLocation();

  return (
    <aside className="menu open">
      <div className="navbar-logo">
        <img src={process.env.PUBLIC_URL + '/favicon.png'} alt="Logo" />
      </div>
      <ul>
        <li className={location.pathname === '/SuiviColi' ? 'active' : ''}>
          <Link to="/SuiviColi">
            <i className="fa fa-truck"></i> Suivi Colis
          </Link>
        </li>
        <li className={location.pathname === '/paiement' ? 'active' : ''}>
          <Link to="/paiement"> 
            <i className="fa fa-users"></i> Paiement
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default MenuClients;
