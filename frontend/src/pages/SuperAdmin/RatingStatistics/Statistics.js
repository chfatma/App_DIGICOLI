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
        console.log('Fetched data:', data);
        setRatingsByRole(data.ratingsByRole || []);
        setRatingsByStar(data.ratingsByStar || []);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchStatistics();
  }, []);

  return (
    <div className="statistics-container">
      <h1 className="page-title">Evaluation Statistics</h1>

      <div className="statistics-section">
        <h2 className="section-title">Ratings by Role</h2>
        {ratingsByRole.length > 0 ? (
          <div className="statistics-list">
            {ratingsByRole.map((item) => (
              <div className="statistics-item" key={item.evaluatorRole}>
                <span className="item-role">{item.evaluatorRole}:</span>
                <span className="item-count">{item.count}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-data">No data available</p>
        )}
      </div>

      <div className="statistics-section">
        <h2 className="section-title">Ratings by Star</h2>
        {ratingsByStar.length > 0 ? (
          <div className="statistics-list">
            {ratingsByStar.map((item) => (
              <div className="statistics-item" key={item.rating}>
                <span className="item-rating">{item.rating} Star:</span>
                <span className="item-count">{item.count}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-data">No data available</p>
        )}
      </div>
    </div>
  );
};

export default Statistics;
