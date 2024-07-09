import React, { useState } from 'react';
import './Livreurliste.css';
import { MdEdit, MdDelete } from 'react-icons/md';


const LivreurListe = () => {
  const [livreurs] = useState([
    { id: 1, nom: 'Mohamed Abid', dateNaissance: '21/05/1988', telephone: '21659321', email: 'exemple@example.fr', adresse: 'xxxxxxxxxxxx', governorat: 'Sousse' },
    { id: 2, nom: 'Mohamed Abid', dateNaissance: '21/05/1988', telephone: '21659321', email: 'exemple@example.fr', adresse: 'xxxxxxxxxxxx', governorat: 'Sousse' },
    { id: 3, nom: 'Mohamed Abid', dateNaissance: '21/05/1988', telephone: '21659321', email: 'exemple@example.fr', adresse: 'xxxxxxxxxxxx', governorat: 'Sousse' },
    { id: 4, nom: 'Mohamed Abid', dateNaissance: '21/05/1988', telephone: '21659321', email: 'exemple@example.fr', adresse: 'xxxxxxxxxxxx', governorat: 'Sousse' },
    { id: 5, nom: 'Mohamed Abid', dateNaissance: '21/05/1988', telephone: '21659321', email: 'exemple@example.fr', adresse: 'xxxxxxxxxxxx', governorat: 'Sousse' },
    { id: 6, nom: 'Mohamed Abid', dateNaissance: '21/05/1988', telephone: '21659321', email: 'exemple@example.fr', adresse: 'xxxxxxxxxxxx', governorat: 'Sousse' },
    { id: 7, nom: 'Mohamed Abid', dateNaissance: '21/05/1988', telephone: '21659321', email: 'exemple@example.fr', adresse: 'xxxxxxxxxxxx', governorat: 'Sousse' },
    { id: 8, nom: 'Mohamed Abid', dateNaissance: '21/05/1988', telephone: '21659321', email: 'exemple@example.fr', adresse: 'xxxxxxxxxxxx', governorat: 'Sousse' },
    { id: 9, nom: 'Mohamed Abid', dateNaissance: '21/05/1988', telephone: '21659321', email: 'exemple@example.fr', adresse: 'xxxxxxxxxxxx', governorat: 'Sousse' },
  ]);

  const handleLocationFilterClick = () => {

    console.log('Show all governorates in Tunisia');
  };

  const handleDateFilterClick = () => {
  
    console.log('Show calendar or date options');
  };

  const getCurrentDate = () => {
    const currentDate = new Date();
    return currentDate.toLocaleDateString('en-GB'); 
  };

  return (
    <div className="livreur-page">
        <div className="filter-cards-container">
        {/* First Filter Card - Filter by Governorat */}
        <div className="filter-card" onClick={handleLocationFilterClick}>
          <div className="filter-icon-container">
            <i className="fa fa-map-marker filter-icon"></i>
          </div>
          <div className="title">Gouvernant</div>
          <i className="fa fa-chevron-down arrow-icon"></i>
          <div className="dropdown-content">
            <div className="dropdown-item">Sousse</div>
            <div className="dropdown-item">Tunisie</div>
            <div className="dropdown-item">Tout</div>
          </div>
        </div>

        {/* Second Filter Card - Filter by Date */}
        <div className="filter-card" onClick={handleDateFilterClick}>
          <div className="filter-icon-container">
            <i className="fa fa-calendar filter-icon"></i>
          </div>
          <div className="title">Date</div>
          <i className="fa fa-chevron-down arrow-icon"></i>
          <div className="dropdown-content date-dropdown">
            <div className="dropdown-item">Calendrier</div>
            <div className="dropdown-item">Date du jour</div>
            <p className="current-date">{getCurrentDate()}</p>
          </div>
        </div>
      </div>                                       

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
            <div className="form-group">
              <label htmlFor="adresse">Adresse</label>
              <input type="text" id="adresse" name="adresse" required />
            </div>
            <div className="form-group governorat-input">
              <label htmlFor="governorat">Governorat</label>
              <input type="text" id="governorat" name="governorat" required />
            </div>
          </div>
          <div className="button-container">
            <button type="submit" className="add-button">Ajouter</button>
          </div>
        </form>
      </div>

      {/* Second Card - Liste des livreurs */}
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
              {livreurs.map((livreur) => (
                <tr key={livreur.id}>
                  <td>{livreur.nom}</td>
                  <td>{livreur.dateNaissance}</td>
                  <td>{livreur.telephone}</td>
                  <td>{livreur.email}</td>
                  <td>{livreur.adresse}</td>
                  <td>{livreur.governorat}</td>
                  <td>
                    {/* Action buttons with icons */}
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

export default LivreurListe;
