import React from 'react';
import './DashboardClient.css';
import { FaUser, FaCog, FaEnvelope, FaChartBar } from 'react-icons/fa';

const DashboardClient = () => {
  const data = [
    {
      icon: <FaUser />,
      value: 750,
      label: 'Total des colis',
      percentage: '4%',
    },
    {
      icon: <FaCog />,
      value: 374,
      label: 'Total delivre',
      percentage: '5%',
    },
    {
      icon: <FaEnvelope />,
      value: 3,
      label: 'Total annule',
      percentage: '1%',
    },
    {
      icon: <FaChartBar />,
      value: 800,
      label: 'Total revenu',
      percentage: '12%',
    },
  ];

  return (
    <div className="dashboard-client-container">
      {data.map((item, index) => (
        <div key={index} className="dashboard-client-card">
          <div className="dashboard-client-icon">{item.icon}</div>
          <div className="dashboard-client-info">
            <h3>{item.value}</h3>
            <p>{item.label}</p>
            <span className="dashboard-client-percentage">{item.percentage}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardClient;
