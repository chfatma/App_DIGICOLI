import React, { useState } from 'react';
import './LivreurInterface.css';
import { MdEdit, MdDelete } from 'react-icons/md';
import LivreurListe from './Livreurliste';
const LivreurInterface = () => {
  const [livreurs] = useState([
    { id: 1, nom: 'Mohamed Abid', dateNaissance: '2000-12-12', telephone: '21659321', email: 'exemple@example.fr', adresse: 'xxxxxxxxxxxx', governorat: 'Tunisie' },
    { id: 2, nom: 'Mohamed Abid', dateNaissance: '1988-05-21', telephone: '21659321', email: 'exemple@example.fr', adresse: 'xxxxxxxxxxxx', governorat: 'Sousse' },
    { id: 3, nom: 'Mohamed Abid', dateNaissance: '1988-05-21', telephone: '21659321', email: 'exemple@example.fr', adresse: 'xxxxxxxxxxxx', governorat: 'Sousse' },
    { id: 4, nom: 'Mohamed Abid', dateNaissance: '1988-05-21', telephone: '21659321', email: 'exemple@example.fr', adresse: 'xxxxxxxxxxxx', governorat: 'Sousse' },
    { id: 5, nom: 'Mohamed Abid', dateNaissance: '1988-05-21', telephone: '21659321', email: 'exemple@example.fr', adresse: 'xxxxxxxxxxxx', governorat: 'Sousse' },
    { id: 6, nom: 'Mohamed Abid', dateNaissance: '1988-05-21', telephone: '21659321', email: 'exemple@example.fr', adresse: 'xxxxxxxxxxxx', governorat: 'Sousse' },
    { id: 7, nom: 'Mohamed Abid', dateNaissance: '1988-05-21', telephone: '21659321', email: 'exemple@example.fr', adresse: 'xxxxxxxxxxxx', governorat: 'Sousse' },
    { id: 8, nom: 'Mohamed Abid', dateNaissance: '1988-05-21', telephone: '21659321', email: 'exemple@example.fr', adresse: 'xxxxxxxxxxxx', governorat: 'Sousse' },
    { id: 9, nom: 'Mohamed Abid', dateNaissance: '1988-05-21', telephone: '21659321', email: 'exemple@example.fr', adresse: 'xxxxxxxxxxxx', governorat: 'Sousse' },
  ]);

  const [selectedGouvernement, setSelectedGouvernement] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const filteredLivreurs = livreurs.filter((livreur) => {
    if (selectedGouvernement !== 'Tout' && livreur.governorat !== selectedGouvernement) {
      return false;
    }
    if (selectedDate && livreur.dateNaissance !== selectedDate) {
      return false;
    }
    return true;
  });

  return (
    <div className="livreur-page">
      <LivreurListe
        selectedGouvernement={selectedGouvernement}
        setSelectedGouvernement={setSelectedGouvernement}
        setSelectedDate={setSelectedDate}
      />
      <div className="title">Ajouter livreur</div>
      <div className="cards">
        <form className="livreur-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="nomPrenom">Nom & Prénom</label>
              <input type="text" id="nomPrenom" name="nomPrenom" required />
            </div>
            <div className="form-group">
              <label htmlFor="dateNaissance">Date de Naissance</label>
              <input type="date" id="dateNaissance" name="dateNaissance" required />
            </div>
            <div className="form-group">
              <label htmlFor="telephone">Téléphone</label>
              <input type="text" id="telephone" name="telephone" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group adresse">
              <label htmlFor="adresse">Adresse</label>
              <input type="text" id="adresse" name="adresse" required />
            </div>
            <div className="form-group governorat">
              <label htmlFor="governorat">Governorat</label>
              <input type="text" id="governorat" name="governorat" required />
            </div>
          </div>
          <div className="button-container">
            <button type="submit" className="add-button">Ajouter</button>
          </div>
        </form>
      </div>

      <div className="title">Liste des livreurs</div>
      <div className="cards">
        <div className="livreurs-table-container">
          <table className="livreurs-table">
            <thead>
              <tr>
                <th>Nom & Prénom</th>
                <th>Date de Naissance</th>
                <th>Téléphone</th>
                <th>Email</th>
                <th>Adresse</th>
                <th>Governorat</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLivreurs.map((livreur) => (
                <tr key={livreur.id}>
                  <td>{livreur.nom}</td>
                  <td>{livreur.dateNaissance}</td>
                  <td>{livreur.telephone}</td>
                  <td>{livreur.email}</td>
                  <td>{livreur.adresse}</td>
                  <td>{livreur.governorat}</td>
                  <td>
                    <button className="icon-button"><MdDelete /></button>
                    <button className="icon-button"><MdEdit /></button>
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

export default LivreurInterface;
