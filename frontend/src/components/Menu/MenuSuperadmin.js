import React from 'react';
import { Link } from 'react-router-dom'; 
import './Menu.css';

const MenuSuperAdmin = () => {
  return (
    <aside className="menu open">
      <div className="navbar-logo">
        <img src={process.env.PUBLIC_URL + '/favicon.png'} alt="Logo" />
      </div>
      <ul>
      
        <li>
          <Link to="/DashboardAdmin">
            <i className="fa fa-tachometer-alt"></i> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/Statistics">
            <i className="fa fa-tachometer-alt"></i> StatisticsRate
          </Link>
        </li>
        <li>
          <Link to="/statistiques">
            <i className="fa fa-chart-bar"></i> Statistiques
          </Link>
        </li>
        <li>
          <Link to="/evaluation">
            <i className="fa fa-star"></i> Evaluation
          </Link>
        </li>
        <li>
          <Link to="/chat">
            <i className="fa fa-comments"></i> Chat
          </Link>
        </li>
        <li>
          <Link to="/ListeAdmin">
            <i className="fa fa-life-ring"></i> Admins
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default MenuSuperAdmin;
