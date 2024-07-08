import React from 'react';
import { Link } from 'react-router-dom'; 
import './Menu.css';

const Menu = ({ isOpen }) => {
  return (
    <aside className={`menu ${isOpen ? 'open' : ''}`}>
      <ul>
        <li>
          <Link to="/dashboard">
            <i className="fa fa-tachometer-alt"></i> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/ListeColis">
            <i className="fa fa-box"></i> Listes des colis
          </Link>
        </li>
        <li>
          <Link to="/client">
            <i className="fa fa-users"></i> Client
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
          <Link to="/creation-rapide">
            <i className="fa fa-plus-circle"></i> Création rapide
          </Link>
        </li>
        <li>
          <Link to="/livreurs">
            <i className="fa fa-truck"></i> Livreurs
          </Link>
        </li>
        <li>
          <Link to="/calendrier">
            <i className="fa fa-calendar"></i> Calendrier
          </Link>
        </li>
        <li>
          <Link to="/depots">
            <i className="fa fa-building"></i> Dépôts
          </Link>
        </li>
        <li>
          <Link to="/chat">
            <i className="fa fa-comments"></i> Chat
          </Link>
        </li>
        <li>
          <Link to="/support">
            <i className="fa fa-life-ring"></i> Support
          </Link>
        </li>
        {/* Add more menu items as needed */}
      </ul>
    </aside>
  );
};

export default Menu;
