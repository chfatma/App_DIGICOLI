import React from 'react';
import './Client.css';

const clients = [
  { id: 1, firstName: 'test', lastName: 'test', address: 'test', telephone: 'test' },
  { id: 2, firstName: 'test', lastName: 'test', address: 'test', telephone: 'test' },
  { id: 3, firstName: 'test', lastName: 'test', address: 'test', telephone: 'test' }
];
const Client = () => {
  return (
    <div className="client-page">
      <div className="client-header">
        <h1>Clients</h1>
        <button className="btn btn-primary">Ajouter Client</button>
      </div>
      <div className="client-cards">
        {clients.map(client => (
          <div className="client-card" key={client.id}>
            <div className="client-icon">
              <i className="fa fa-user"></i>
            </div>
            <div className="client-info">
              <h2>{client.firstName} {client.lastName}</h2>
              <div className="client-details">
                <p>
                  <i className="fa fa-map-marker-alt"></i> {client.address}
                </p>
                <p>
                  <i className="fa fa-phone"></i> {client.telephone}
                </p>
              </div>
              <div className="btn-container">
                <button className="btn btn-outline-red">
                   Supprimer
                </button>
                <button className="btn btn-outline-green">
                   Modifier
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Client;