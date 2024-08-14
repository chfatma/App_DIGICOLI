import React from 'react';
import { Link, useLocation } from 'react-router-dom'; 
import './Menu.css';

const MenuSuperAdmin = () => {
  const location = useLocation();

  return (
    <aside className="menu open">
      <div className="navbar-logo">
        <img src={process.env.PUBLIC_URL + '/favicon.png'} alt="Logo" />
      </div>
      <ul>
        <li className={location.pathname === '/DashboardAdmin' ? 'active' : ''}>
          <Link to="/DashboardAdmin">
            <i className="fa fa-tachometer-alt"></i> Tableau de Bord
          </Link>
        </li>
        <li className={location.pathname === '/StatistiquesSuperAdmin' ? 'active' : ''}>
          <Link to="/StatistiquesSuperAdmin">
            <i className="fa fa-chart-bar"></i> Statistiques
          </Link>
        </li>
        <li className={location.pathname === '/RatingStatistics' ? 'active' : ''}>
          <Link to="/RatingStatistics">
            <i className="fa fa-star"></i> Statistiques d'Évaluation
          </Link>
        </li>
        <li>
          <Link to="/chat">
            <i className="fa fa-comments"></i> Discussions
          </Link>
        </li>
        <li className={location.pathname === '/ListeAdmin' ? 'active' : ''}>
          <Link to="/ListeAdmin">
            <i className="fa fa-life-ring"></i> Administrateurs
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default MenuSuperAdmin;
