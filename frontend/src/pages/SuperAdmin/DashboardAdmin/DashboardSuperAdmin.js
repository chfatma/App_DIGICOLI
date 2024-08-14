import React from 'react';
import './DashboardSuperAdmin.css';
import Chart3 from '../DoughnutChart/Doughnut Chart3/DoughnutChart33';
import Chart2 from '../DoughnutChart/Doughnut Chart2/DoughnutChart22';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Tableau de Bord</h1>
      </div>
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <div className="card-header">
            <div className="card-circle">
              <i className="fa fa-users"></i>
            </div>
            <div className="card-content">
              <h2 className="card-title">150</h2>
              <p className="card-phrase">Total Admins</p>
              <p className="card-percentage">5%</p>
            </div>
          </div>
        </div>
        <div className="dashboard-card">
          <div className="card-header">
            <div className="card-circle">
              <i className="fa fa-certificate"></i>
            </div>
            <div className="card-content">
              <h2 className="card-title">1,200</h2>
              <p className="card-phrase">Licences Vendues</p>
              <p className="card-percentage">8%</p>
            </div>
          </div>
        </div>
        <div className="dashboard-card">
          <div className="card-header">
            <div className="card-circle">
              <i className="fa fa-calendar-times"></i>
            </div>
            <div className="card-content">
              <h2 className="card-title">25</h2>
              <p className="card-phrase">Total Annulé</p>
            </div>
          </div>
        </div>
        <div className="dashboard-card">
          <div className="card-header">
            <div className="card-circle">
              <i className="fa fa-dollar-sign"></i>
            </div>
            <div className="card-content">
              <h2 className="card-title">50,000</h2>
              <p className="card-phrase">Total Revenu</p>
              <p className="card-percentage">12%</p>
            </div>
          </div>
        </div>
      </div>
      <div className="dashboard-large-cards">
        <div className="dashboard-large-card">
          <Chart3 /> {/* Intégration du composant Chart1 */}
        </div>
        <div className="dashboard-large-card">
          <Chart2 />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
