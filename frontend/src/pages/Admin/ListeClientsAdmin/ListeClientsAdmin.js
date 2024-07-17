import React, { useState } from 'react';
import './ListeClientsAdmin.css';
import TousClientLivreurFilter from './ListeClientsAdminFilter';

const ListeClientsAdmin = () => {
  const initialTableData = [
    { id: 1, nom: 'tesst', domaine: 'tesst', telephone: 'tesst', adresse: 'tesst', email: 'tesst', gouvernorat: 'Tunis', colisALivrer: 3 },
    { id: 2, nom: 'tessth', domaine: 'tesst', telephone: 'tesst', adresse: 'tesstt', email: 'tesst', gouvernorat: 'Sfax', colisALivrer: 1 },
  
  ];

  const [tableData] = useState(initialTableData);
  const [filteredData, setFilteredData] = useState(initialTableData);

  const handleFilterChange = (selectedOption) => {
    if (selectedOption === 'Tout par défaut') {
      setFilteredData(tableData); 
    } else {
      const filtered = tableData.filter((item) => item.gouvernorat === selectedOption);
      setFilteredData(filtered);
    }
  };

  return (
    <div className="tous-clients-livreur">
      <h2 className="section-title">Ajouter Client</h2>
      <div className="card-container">
        <div className="tous-clients-livreur-container">
          <div className="input-row">
            <div className="input-wrapper">
              <label>Nom & Prénom</label>
              <input type="text" />
            </div>
            <div className="input-wrapper">
              <label>Date de Naissance</label>
              <input type="text" />
            </div>
            <div className="input-wrapper">
              <label>Téléphone</label>
              <input type="text" />
            </div>
            <div className="input-wrapper">
              <label>Email</label>
              <input type="text" />
            </div>
          </div>
          <div className="input-row">
            <div className="input-wrapper">
              <label>Adresse</label>
              <input type="text" />
            </div>
            <div className="input-wrapper input-gouvernorat">
              <label>Gouvernorat</label>
              <input type="text" />
            </div>
          </div>
          <div className="button-wrapper">
            <button className="normal-button">Ajouter</button>
          </div>
        </div>
      </div>

      <TousClientLivreurFilter onFilterChange={handleFilterChange} />   {/* fix heeeeeer*/}
      <h2 className="section-title">Liste des Client</h2>
      <div className="additional-card">
        <h2 className="card-title">Clients</h2>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Domaine</th>
                <th>Téléphone</th>
                <th>Adresse</th>
                <th>Email</th>
                <th>Gouvernorat</th>
                <th>Colis à Livrer</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row) => (
                <tr key={row.id}>
                  <td>{row.nom}</td>
                  <td>{row.domaine}</td>
                  <td>{row.telephone}</td>
                  <td>{row.adresse}</td>
                  <td>{row.email}</td>
                  <td>{row.gouvernorat}</td>
                  <td>{row.colisALivrer}</td>
                  <td>
                    <button className="action-button">Save</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListeClientsAdmin;
