import React from 'react';
import './ListDesColis.css';
import ListDesColisFilter from './ListDesColisFilter';

const ListDesColis = () => {

  const fakeColisData = [
    { code: 'test', expediteur: 'test', destinataire: 'test', telephone: 'test', montant: 'test', depot: 'test', adresse: 'test', statut: 'En cours' },
    { code: 'test', expediteur: 'test', destinataire: 'test', telephone: 'test', montant: 'test', depot: 'test', adresse: 'test', statut: 'Terminé' },
   
    { code: 'test', expediteur: 'test', destinataire: 'test', telephone: 'test', montant: 'test', depot: 'test', adresse: 'test', statut: 'En cours' },
    { code: 'test', expediteur: 'test', destinataire: 'test', telephone: 'test', montant: 'test', depot: 'test', adresse: 'test', statut: 'Terminé' },
    { code: 'test', expediteur: 'test', destinataire: 'test', telephone: 'test', montant: 'test', depot: 'test', adresse: 'test', statut: 'En cours' },
    { code: 'test', expediteur: 'test', destinataire: 'test', telephone: 'test', montant: 'test', depot: 'test', adresse: 'test', statut: 'Terminé' },
    { code: 'test', expediteur: 'test', destinataire: 'test', telephone: 'test', montant: 'test', depot: 'test', adresse: 'test', statut: 'En cours' },
    { code: 'test', expediteur: 'test', destinataire: 'test', telephone: 'test', montant: 'test', depot: 'test', adresse: 'test', statut: 'Terminé' },
    { code: 'test', expediteur: 'test', destinataire: 'test', telephone: 'test', montant: 'test', depot: 'test', adresse: 'test', statut: 'En cours' },
    { code: 'test', expediteur: 'test', destinataire: 'test', telephone: 'test', montant: 'test', depot: 'test', adresse: 'test', statut: 'Terminé' },
    { code: 'test', expediteur: 'test', destinataire: 'test', telephone: 'test', montant: 'test', depot: 'test', adresse: 'test', statut: 'En cours' },
    { code: 'test', expediteur: 'test', destinataire: 'test', telephone: 'test', montant: 'test', depot: 'test', adresse: 'test', statut: 'Terminé' },
   
  ];

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
              {fakeColisData.map((colis, index) => (
                <tr key={index}>
                  <td>{colis.code}</td>
                  <td>{colis.expediteur}</td>
                  <td>{colis.destinataire}</td>
                  <td>{colis.telephone}</td>
                  <td>{colis.montant}</td>
                  <td>{colis.depot}</td>
                  <td>{colis.adresse}</td>
                  <td>{colis.statut}</td>
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