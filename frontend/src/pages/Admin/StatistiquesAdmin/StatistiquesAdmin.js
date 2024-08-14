import React from 'react';
import './StatistiquesAdmin.css';
import Chart1 from '../DoughnutChart/Doughnut Chart1/DoughnutChart11';
import Chart2 from '../DoughnutChart/Doughnut Chart2/DoughnutChart22';
import Chart3 from '../DoughnutChart/Doughnut Chart3/DoughnutChart33';
import Chart4 from '../DoughnutChart/Doughnut Chart4/DoughnutChart44';

 
const Dashboard = () => {
  return (
    <div className="dashboard-container">
       <div className="dashboard-header">
        <h1 className="dashboard-title">Statistiques</h1>
      </div>
      <div className="dashboard-large-cards">
        <div className="dashboard-large-card">
         <Chart3 /> {/* Intégration du composant Chart1 */}
      </div>
      <div className="dashboard-large-card">
        <Chart2 />
      </div>
      <div className="dashboard-large-card">
        <Chart1 />
      </div>
      <div className="dashboard-large-card">
        <Chart4 />
      </div>
    </div>
  </div>
  );
};

export default Dashboard;