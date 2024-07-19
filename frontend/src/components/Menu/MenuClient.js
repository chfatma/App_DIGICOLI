import React from 'react';
import { Link } from 'react-router-dom'; 
import './Menu.css';

const MenuClients = () => {
  return (
    <aside className="menu open">
      <div className="navbar-logo">
        <img src={process.env.PUBLIC_URL + '/favicon.png'} alt="Logo" />
      </div>
      <ul>
       
        <li>
          <Link to="/dashboard">
            <i className="fa fa-tachometer-alt"></i> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/listecolisclient">
            <i className="fa fa-box"></i> Listes des colis
          </Link>
        </li>
        <li>
          <Link to="/Paiement">
            <i className="fa fa-users"></i> Paiement
          </Link>
        </li>
        <li>
          <Link to="/Evaluation">
            <i className="fa fa-star"></i> Evaluation
          </Link>
        </li>
        <li>
          <Link to="/support">
            <i className="fa fa-life-ring"></i> Support
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default MenuClients;
