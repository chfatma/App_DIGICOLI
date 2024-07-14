import React, { useState } from 'react';
import './ListDesColis.css';
import ListDesColisFilter from './ListDesColisFilter';

const ListDesColis = () => {
  const fakeColisData = [
    { id: 1, code: 'C001', expediteur: 'Alice', destinataire: 'Bob', telephone: '1234567890', montant: '100', depot: 'Depot A', adresse: 'Adresse A', statut: 'En cours' },
    { id: 2, code: 'C002', expediteur: 'Charlie', destinataire: 'David', telephone: '0987654321', montant: '200', depot: 'Depot B', adresse: 'Adresse B', statut: 'Terminé' },
    // Add more data as needed
  ];

  const [colisData, setColisData] = useState(fakeColisData);

  const handleStatusChange = (e, id) => {
    const { value } = e.target;
    const updatedColisData = colisData.map(colis => {
      if (colis.id === id) {
        return { ...colis, statut: value };
      }
      return colis;
    });
    setColisData(updatedColisData);
  };

  return (
    <div className="list-des-colis-container">
      <ListDesColisFilter />
      <div className="colis-card">
        <div className="card-header">
          <span className="card-title">Liste des Colis</span>
        </div>
        <div className="table-container">
          <table className="colis-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Expéditeur</th>
                <th>Destinataire</th>
                <th>Téléphone</th>
                <th>Montant</th>
                <th>Dépôt</th>
                <th>Adresse</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {colisData.map(colis => (
                <tr key={colis.id}>
                  <td>{colis.code}</td>
                  <td>{colis.expediteur}</td>
                  <td>{colis.destinataire}</td>
                  <td>{colis.telephone}</td>
                  <td>{colis.montant}</td>
                  <td>{colis.depot}</td>
                  <td>{colis.adresse}</td>
                  <td>
                    <select
                      value={colis.statut}
                      onChange={(e) => handleStatusChange(e, colis.id)}
                    >
                      <option value="En cours">En cours</option>
                      <option value="Terminé">Terminé</option>
                      <option value="Livre">Livre</option>
                      <option value="En Attente">En Attente</option>
                      <option value="Annuler">Annuler</option>
                    </select>
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

export default ListDesColis;
