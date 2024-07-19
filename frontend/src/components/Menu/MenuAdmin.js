import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Menu.css';

const MenuAdmin = () => {
  const location = useLocation();
  
  return (
    <aside className="menu open">
      <div className="navbar-logo">
        <img src={process.env.PUBLIC_URL + '/favicon.png'} alt="Logo" />
      </div>
      <ul>
        <li className={location.pathname === '/dashboard' ? 'active' : ''}>
          <Link to="/dashboard">
            <i className="fa fa-tachometer-alt"></i> Dashboard
          </Link>
        </li>
        <li className={location.pathname === '/Adminlistcoli' ? 'active' : ''}>
          <Link to="/Adminlistcoli">
            <i className="fa fa-box"></i> Listes des colis
          </Link>
        </li>
        <li className={location.pathname === '/ListeClientsAdmin' ? 'active' : ''}>
          <Link to="/ListeClientsAdmin">
            <i className="fa fa-users"></i> Client
          </Link>
        </li>
        <li className={location.pathname === '/statistiques' ? 'active' : ''}>
          <Link to="/statistiques">
            <i className="fa fa-chart-bar"></i> Statistiques
          </Link>
        </li>
        <li className={location.pathname === '/evaluation' ? 'active' : ''}>
          <Link to="/evaluation">
            <i className="fa fa-star"></i> Evaluation
          </Link>
        </li>
        <li className={location.pathname === '/creation-rapide' ? 'active' : ''}>
          <Link to="/creation-rapide">
            <i className="fa fa-plus-circle"></i> Création rapide
          </Link>
        </li>
        <li className={location.pathname === '/livreurs' ? 'active' : ''}>
          <Link to="/livreurs">
            <i className="fa fa-truck"></i> Livreurs
          </Link>
        </li>
        <li className={location.pathname === '/Ramassage' ? 'active' : ''}>
          <Link to="/Ramassage">
            <i className="fa fa-arrows-alt"></i> Ramassage
          </Link>
        </li>
        <li className={location.pathname === '/calendrier' ? 'active' : ''}>
          <Link to="/calendrier">
            <i className="fa fa-calendar"></i> Calendrier
          </Link>
        </li>
        <li className={location.pathname === '/depots' ? 'active' : ''}>
          <Link to="/depots">
            <i className="fa fa-building"></i> Dépôts
          </Link>
        </li>
        <li className={location.pathname === '/chat' ? 'active' : ''}>
          <Link to="/chat">
            <i className="fa fa-comments"></i> Chat
          </Link>
        </li>
        <li className={location.pathname === '/support' ? 'active' : ''}>
          <Link to="/support">
            <i className="fa fa-life-ring"></i> Support
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default MenuAdmin;
