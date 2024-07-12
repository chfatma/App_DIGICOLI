import React from 'react';
import { Link } from 'react-router-dom'; 
import './Menu.css';

const Menu = () => {
  return (
    <aside className="menu open">
      <div className="navbar-logo">
        <img src={process.env.PUBLIC_URL + '/favicon.png'} alt="Logo" />
      </div>
      <ul>
       
        <li>
          <Link to="/livreurs">
            <i className="fa fa-tachometer-alt"></i> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/livlistcoli">
            <i className="fa fa-box"></i> Listes des colis
          </Link>
        </li>
        <li>
          <Link to="/TousClientsLivreur">
            <i className="fa fa-users"></i> Client
          </Link>
        </li>
       
        <li>
          <Link to="/livlistcoli">
            <i className="fa fa-star"></i> Evaluation
          </Link>
        </li>
       
        <li>
          <Link to="/chat">
            <i className="fa fa-comments"></i> Chat
          </Link>
        </li>
        <li>
          <Link to="/Emplacement">
            <i className="fa fa-life-ring"></i> Support
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Menu;
