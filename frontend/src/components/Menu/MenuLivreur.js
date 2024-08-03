import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; 
import './Menu.css';

const MenuLivreur = () => {
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);

  const handleClick = (path) => {
    setActive(path);
  };

  return (
    <aside className="menu open">
      <div className="navbar-logo">
        <img src={process.env.PUBLIC_URL + '/favicon.png'} alt="Logo" />
      </div>
      <ul>
        <li className={active === '/DashboardLivreur' ? 'active' : ''}>
          <Link to="/DashboardLivreur" onClick={() => handleClick('/DashboardLivreur')}>
            <i className="fa fa-tachometer-alt"></i> Dashboard
          </Link>
        </li>
        <li className={active === '/livlistcoli' ? 'active' : ''}>
          <Link to="/livlistcoli" onClick={() => handleClick('/livlistcoli')}>
            <i className="fa fa-box"></i> Listes des colis
          </Link>
        </li>
      
        <li className={active === '/evaluation' ? 'active' : ''}>
          <Link to="/evaluation" onClick={() => handleClick('/evaluation')}>
            <i className="fa fa-star"></i> Evaluation
          </Link>
        </li>
        <li className={active === '/chat' ? 'active' : ''}>
          <Link to="/chat" onClick={() => handleClick('/chat')}>
            <i className="fa fa-comments"></i> Chat
          </Link>
        </li>
        <li className={active === '/GoogleMapComponent' ? 'active' : ''}>
          <Link to="/GoogleMapComponent" onClick={() => handleClick('/GoogleMapComponent')}>
            <i className="fa fa-map-marker"></i> Emplacement
          </Link>
        </li>
        <li className={location.pathname === '/SupportLivreur' ? 'active' : ''}>
          <Link to="/SupportLivreur" onClick={() => handleClick('/SupportLivreur')}>
            <i className="fa fa-life-ring"></i> Support
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default MenuLivreur;
