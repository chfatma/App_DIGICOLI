import React from 'react';
import { Link, useLocation } from 'react-router-dom'; 
import './Menu.css';

const MenuClients = () => {
  const location = useLocation(); // Use the useLocation hook

  return (
    <aside className="menu open">
      <div className="navbar-logo">
        <img src={process.env.PUBLIC_URL + '/favicon.png'} alt="Logo" />
      </div>
      <ul>
        <li className={location.pathname === '/DashboardClient' ? 'active' : ''}>
          <Link to="/DashboardClient">
            <i className="fa fa-tachometer-alt"></i> Dashboard
          </Link>
        </li>
        <li className={location.pathname === '/chat' ? 'active' : ''}>
          <Link to="/chat">
            <i className="fa fa-comments"></i> Chat
          </Link>
        </li>
        <li className={location.pathname === '/paiement' ? 'active' : ''}>
          <Link to="/paiement"> {/* Ensure the path is consistent */}
            <i className="fa fa-users"></i> Paiement
          </Link>
        </li>
        <li className={location.pathname === '/evaluation' ? 'active' : ''}>
          <Link to="/evaluation">
            <i className="fa fa-star"></i> Evaluation
          </Link>
        </li>
        <li className={location.pathname === '/support' ? 'active' : ''}>
          <Link to="/support">
            <i className="fa fa-life-ring"></i> Support
          </Link>
        </li>
        <li className={location.pathname === '/SuiviColi' ? 'active' : ''}>
          <Link to="/SuiviColi">
            <i className="fa fa-truck"></i> Suivi Colis
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default MenuClients;
