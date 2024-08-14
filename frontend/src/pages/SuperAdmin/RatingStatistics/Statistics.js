import React, { useState, useEffect } from 'react';
import './Statistics.css';

const Statistics = () => {
  const [ratingsByRole, setRatingsByRole] = useState([]);
  const [ratingsByStar, setRatingsByStar] = useState([]);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/evaluations/statistics');
        const data = await response.json();
        console.log('Données récupérées:', data);
        setRatingsByRole(data.ratingsByRole || []);
        setRatingsByStar(data.ratingsByStar || []);
      } catch (error) {
        console.error('Erreur lors de la récupération des statistiques:', error);
      }
    };

    fetchStatistics();
  }, []);

  return (
    <div className="statistics-container">
      <div className="dashboard-header">
        <h1 className="page-title">Statistiques d'Évaluation</h1>
      </div>

      <div className="statistics-section">
        <h2 className="section-title">Évaluations par Rôle</h2>
        {ratingsByRole.length > 0 ? (
          <div className="statistics-list">
            {ratingsByRole.map((item) => (
              <div className="statistics-item" key={item.evaluatorRole}>
                <span className="item-role">{item.evaluatorRole} :</span>
                <span className="item-count">{item.count}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-data">Aucune donnée disponible</p>
        )}
      </div>

      <div className="statistics-section">
        <h2 className="section-title">Évaluations par Étoile</h2>
        {ratingsByStar.length > 0 ? (
          <div className="statistics-list">
            {ratingsByStar.map((item) => (
              <div className="statistics-item" key={item.rating}>
                <span className="item-rating">{item.rating} Étoile(s) :</span>
                <span className="item-count">{item.count}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-data">Aucune donnée disponible</p>
        )}
      </div>
    </div>
  );
};

export default Statistics;
