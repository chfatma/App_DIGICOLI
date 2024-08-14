import React from 'react';
import './DashboardLivreur.css';
import { FaUserAlt, FaCog, FaEnvelope, FaChartBar, FaFilter } from 'react-icons/fa';

const DashboardLivreur = () => {
  const stats = [
    { icon: <FaUserAlt />, number: 750, text: 'Total des colis', percentage: '4%' },
    { icon: <FaCog />, number: 374, text: 'Total delivre', percentage: '5%' },
    { icon: <FaEnvelope />, number: 3, text: 'Total annule', percentage: '5%' },
    { icon: <FaChartBar />, number: 800, text: 'Total revenu', percentage: '12%' },
  ];

  return (
    <div className="dashboard-livreur">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Tableau de bord</h1>
        <div className="filter-card-container">
          <div className="filter-card">
            <div className="filter-icon">
              <i className="fa fa-filter"></i>
            </div>
            <p className="filter-text">Filter</p>
          </div>
       
        </div>
      </div>
      {stats.map((stat, index) => (
        <div key={index} className="card">
          <div className="icon-circle">
            <div className="icon">{stat.icon}</div>
          </div>
          <div className="info">
            <h3>{stat.number}</h3>
            <p>{stat.text}</p>
            <p className="percentage">{stat.percentage}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardLivreur;
