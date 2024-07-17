import React from 'react';
import './Dashboard.css';
import Chart1 from '../DoughnutChart/Doughnut Chart1/DoughnutChart11';
import Chart2 from '../DoughnutChart/Doughnut Chart2/DoughnutChart22';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
        <div className="filter-card-container">
          <div className="filter-card">
            <div className="filter-icon">
              <i className="fa fa-filter"></i>
            </div>
            <p className="filter-text">Filter</p>
          </div>
        </div>
      </div>
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <div className="card-header">
            <div className="card-circle">
              <i className="fa fa-user"></i>
            </div>
            <div className="card-content">
              <h2 className="card-title">750</h2>
              <p className="card-phrase">Total des colis</p>
              <p className="card-percentage">4%</p>
            </div>
          </div>
        </div>
        <div className="dashboard-card">
          <div className="card-header">
            <div className="card-circle">
              <i className="fa fa-cog"></i>
            </div>
            <div className="card-content">
              <h2 className="card-title">374</h2>
              <p className="card-phrase">Total delivre</p>
              <p className="card-percentage">5%</p>
            </div>
          </div>
        </div>
        <div className="dashboard-card">
          <div className="card-header">
            <div className="card-circle">
              <i className="fa fa-envelope"></i>
            </div>
            <div className="card-content">
              <h2 className="card-title">3</h2>
              <p className="card-phrase">Total annule</p>
            </div>
          </div>
        </div>
        <div className="dashboard-card">
          <div className="card-header">
            <div className="card-circle">
              <i className="fa fa-chart-bar"></i>
            </div>
            <div className="card-content">
              <h2 className="card-title">800</h2>
              <p className="card-phrase">Total revenu</p>
              <p className="card-percentage">12%</p>
            </div>
          </div>
        </div>
      </div>
      <div className="dashboard-large-cards">
        <div className="dashboard-large-card">
         
        <h3>Chart 1</h3>
  <Chart1 /> {/* Intégration du composant Chart1 */}
</div>
<div className="dashboard-large-card">

  <h3>Chart 2</h3>
  <Chart2 />
    </div>
  </div>
</div>
  );
};

export default Dashboard;