import React, { useState } from 'react';
import './ListeColis.css';

const packages = [
  {
    id: 1,
    name: 'Produit1',
    departureAddress: 'test',
    deliveryAddress: 'test',
    status: 'En attente'
  },
  {
    id: 2,
    name: 'Produit 2',
    departureAddress: 'test',
    deliveryAddress: 'test',
    status: 'En cours'
  },
  {
    id: 3,
    name: 'Produit',
    departureAddress: 'test',
    deliveryAddress: 'test',
    status: 'Livrée'
  }
];

const ListeColis = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="colis-page">
      <h1>Liste des Colis</h1>
      <div className="table-container">
        <table className="colis-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Adresse de Départ</th>
              <th>Adresse de Livraison</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {packages.map(pkg => (
              <tr key={pkg.id}>
                <td>{pkg.name}</td>
                <td>{pkg.departureAddress}</td>
                <td>{pkg.deliveryAddress}</td>
                <td>{pkg.status}</td>
                <td>
                  <div className="dropdown">
                    <button className="btn btn-action" onClick={toggleDropdown}>Action</button>
                    {showDropdown && (
                      <div className="dropdown-content">
                        <button className="dropdown-item">Edit</button>
                        <button className="dropdown-item">Delete</button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListeColis;
