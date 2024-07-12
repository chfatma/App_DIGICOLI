import React, { useState } from 'react';
import './ListDesColisFilter.css';

const ListDesColisFilter = () => {
  const [showStatusOptions, setShowStatusOptions] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('Tout');
  const [selectedDate, setSelectedDate] = useState('');

  const statuses = ["En cours", "Terminé", "Annulé", "Tout"];

  const handleStatusSelect = (status) => {
    setSelectedStatus(status);
    setShowStatusOptions(false);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setSelectedStatus('Tout'); 
  };

  return (
    <div className="list-des-colis-filter-container">
      <div className="filter-card">
        <div className="card-header" onClick={() => setShowStatusOptions(!showStatusOptions)}>
          <div className="icon-circle">
            <i className="fa fa-list-alt"></i>
          </div>
          <span className="card-title">Statut</span>
          <i className={`fa ${showStatusOptions ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
        </div>
        <div className="selected-status-display">
          {selectedStatus}
        </div>
        <div className={`status-options ${showStatusOptions ? 'active' : ''}`}>
          {statuses.map((status, index) => (
            <div
              key={index}
              className={`status-option ${status === selectedStatus ? 'selected' : ''}`}
              onClick={() => handleStatusSelect(status)}
            >
              {status}
            </div>
          ))}
        </div>
      </div>

      <div className="filter-card">
        <div className="card-header">
          <div className="icon-circle">
            <i className="fa fa-calendar"></i>
          </div>
          <span className="card-title">Jours</span>
        </div>
        <div className="selected-date-display">
          {selectedDate || 'jj/mm/aaaa'}
        </div>
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="date-input"
        />
      </div>
    </div>
  );
};

export default ListDesColisFilter;
