import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; 
import './Menu.css';

const Menu = () => {
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
          <Link to="/DashboardLivreur" onClick={() => handleClick('/livreurs')}>
            <i className="fa fa-tachometer-alt"></i> Dashboard
          </Link>
        </li>
        <li className={active === '/livlistcoli' ? 'active' : ''}>
          <Link to="/livlistcoli" onClick={() => handleClick('/livlistcoli')}>
            <i className="fa fa-box"></i> Listes des colis
          </Link>
        </li>
        <li className={active === '/TousClientsLivreur' ? 'active' : ''}>
          <Link to="/TousClientsLivreur" onClick={() => handleClick('/TousClientsLivreur')}>
            <i className="fa fa-users"></i> Client
          </Link>
        </li>
        <li className={active === '/Ramassage' ? 'active' : ''}>
          <Link to="/Ramassage" onClick={() => handleClick('/Ramassage')}>
            <i className="fa fa-map-marker"></i> Ramassage
          </Link>
        </li>
        <li className={active === '/evaluation' ? 'active' : ''}>
          <Link to="/evaluation" onClick={() => handleClick('/Evaluation')}>
            <i className="fa fa-star"></i> Evaluation
          </Link>
        </li>
        <li className={active === '/chat' ? 'active' : ''}>
          <Link to="/chat" onClick={() => handleClick('/chat')}>
            <i className="fa fa-comments"></i> Chat
          </Link>
        </li>
        <li className={active === '/Emplacement' ? 'active' : ''}>
          <Link to="/Emplacement" onClick={() => handleClick('/Emplacement')}>
            <i className="fa fa-map-marker"></i> Emplacement
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Menu;
