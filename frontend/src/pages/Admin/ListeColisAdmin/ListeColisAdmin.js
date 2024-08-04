import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ListeColisAdmin.css';
import ListeColisAdminFilter from './ListeColisAdminFilter';
import qrCodeIcon from '../../../assets/qr-code.png';

const ListeColisAdmin = () => {
  const navigate = useNavigate();
  const [colisData, setColisData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [newColis, setNewColis] = useState({
    code: '',
    expediteur: '',
    destinataire: '',
    telephone: '',
    montant: '',
    depot: '',
    adresse: '',
    statut: 'En Attente',
    livreurId: ''
  });
  const [livreurData, setLivreurData] = useState([]);

  // Get adminId from localStorage
  const adminId = localStorage.getItem('adminId');

  useEffect(() => {
    const fetchColis = async () => {
      try {
        const adminId = localStorage.getItem('adminId'); // Make sure this is correctly set
        if (!adminId) {
          console.error('Admin ID not found in localStorage');
          return;
        }
        const response = await fetch(`http://localhost:3001/api/colis/admin/colis?adminId=${adminId}`);
        if (response.ok) {
          const data = await response.json();
          console.log('Colis Data:', data); // Debugging line
          setColisData(data);
          setFilteredData(data);
        } else {
          console.error('Failed to fetch colis data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching colis data:', error);
      }
    };
    
    const fetchLivreurs = async () => {
      try {
        if (!adminId) {
          console.error('Admin ID not found in localStorage');
          return;
        }
        const response = await fetch(`http://localhost:3001/api/livreurs?adminId=${adminId}`);
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched livreurs:', data);
          const formattedData = data.map(livreur => ({
            ...livreur,
            date_naissance: new Date(livreur.date_naissance).toISOString().split('T')[0]
          }));
          setLivreurData(formattedData);
        } else {
          console.error('Failed to fetch livreurs:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching livreurs:', error);
      }
    };

    fetchColis();
    fetchLivreurs();
  }, [adminId]);

  const handleFilterChange = (option, date) => {
    let filtered = colisData;

    if (option !== 'Tout') {
      filtered = colisData.filter(colis => colis.statut === option);
    }

    if (date) {
      // Apply date filtering if necessary
    }

    setFilteredData(filtered);
  };

  const handleQRCodeClick = (colis) => {
    navigate(`/QRCodeGenerator/${colis.id}`, { state: colis });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewColis(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log('Sending data to backend:', {
      ...newColis,
      adminId,
    });
  
    try {
      const response = await fetch('http://localhost:3001/api/colis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newColis,
          adminId,
        }),
      });
  
      console.log('Response Status:', response.status);
      const responseBody = await response.json();
      console.log('Response Body:', responseBody);
  
      if (response.ok) {
        setColisData(prevColisData => [
          ...prevColisData,
          responseBody
        ]);
  
        setNewColis({
          code: '',
          expediteur: '',
          destinataire: '',
          telephone: '',
          montant: '',
          depot: '',
          adresse: '',
          statut: 'En Attente',
          livreurId: '',
        });
      } else {
        console.error('Failed to add new colis:', responseBody);
      }
    } catch (error) {
      console.error('Error adding new colis:', error);
    }
  };
  
  return (
    <div className="liste-colis-admin-container">
      <ListeColisAdminFilter onFilterChange={handleFilterChange} />
      <div className="add-colis-card">
        <div className="add-colis-card-header">
          <span className="add-colis-card-title">Ajouter Colis</span>
        </div>
        <form className="add-colis-form-container" onSubmit={handleSubmit}>
          <div className="add-colis-form-row">
            <div className="add-colis-input-group">
              <label htmlFor="code">Code</label>
              <input
                type="text"
                id="code"
                name="code"
                value={newColis.code}
                onChange={handleChange}
                required
              />
            </div>
            <div className="add-colis-input-group">
              <label htmlFor="expediteur">Expéditeur</label>
              <input
                type="text"
                id="expediteur"
                name="expediteur"
                value={newColis.expediteur}
                onChange={handleChange}
                required
              />
            </div>
            <div className="add-colis-input-group">
              <label htmlFor="destinataire">Destinataire</label>
              <input
                type="text"
                id="destinataire"
                name="destinataire"
                value={newColis.destinataire}
                onChange={handleChange}
                required
              />
            </div>
            <div className="add-colis-input-group">
              <label htmlFor="telephone">Téléphone</label>
              <input
                type="text"
                id="telephone"
                name="telephone"
                value={newColis.telephone}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="add-colis-form-row">
            <div className="add-colis-input-group">
              <label htmlFor="montant">Montant</label>
              <input
                type="text"
                id="montant"
                name="montant"
                value={newColis.montant}
                onChange={handleChange}
                required
              />
            </div>
            <div className="add-colis-input-group">
              <label htmlFor="depot">Dépôt</label>
              <input
                type="text"
                id="depot"
                name="depot"
                value={newColis.depot}
                onChange={handleChange}
                required
              />
            </div>
            <div className="add-colis-input-group">
              <label htmlFor="adresse">Adresse</label>
              <input
                type="text"
                id="adresse"
                name="adresse"
                value={newColis.adresse}
                onChange={handleChange}
                required
              />
            </div>
            <div className="add-colis-input-group">
              <label htmlFor="statut">Statut</label>
              <select
                id="statut"
                name="statut"
                value={newColis.statut}
                onChange={handleChange}
              >
                <option value="En Attente">En Attente</option>
                <option value="En Cours">En Cours</option>
                <option value="Livré">Livré</option>
              </select>
            </div>
            <div className="add-colis-input-group">
              <label htmlFor="livreurId">Livreur</label>
              <select
                id="livreurId"
                name="livreurId"
                value={newColis.livreurId}
                onChange={handleChange}
                required
              >
                <option value="">Sélectionner un livreur</option>
                {livreurData.map(livreur => (
                  <option key={livreur.id} value={livreur.id}>
                    {livreur.nom}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="add-colis-button-container">
            <button type="submit">Ajouter</button>
          </div>
        </form>
      </div>
      <div className="colis-list-card">
        <div className="colis-list-card-header">
          <span className="colis-list-card-title">Liste des Colis</span>
        </div>
        <div className="colis-table-container">
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
                <th>QR Code</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map(colis => (
                <tr key={colis.id}>
                  <td>{colis.code}</td>
                  <td>{colis.expediteur}</td>
                  <td>{colis.destinataire}</td>
                  <td>{colis.telephone}</td>
                  <td>{colis.montant}</td>
                  <td>{colis.depot}</td>
                  <td>{colis.adresse}</td>
                  <td>{colis.statut}</td>
                  <td>
                   <img
                      src={qrCodeIcon}
                      alt="QR Code"
                      className="qr-code-icon"
                      onClick={() => handleQRCodeClick(colis)
                        
                      }
                      style={ {cursor: 'pointer', width: '25px',height:'25px'}}
                    />
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

export default ListeColisAdmin;
