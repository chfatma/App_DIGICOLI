import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import qrCodeIcon from '../../../assets/qr-code.png'; 

import './ListeColisAdmin.css';
import ListeColisAdminFilter from './ListeColisAdminFilter';

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
    suiviEmplacement:'',
    statut: 'En Attente',
    livreurId: ''
  });
  const [livreurData, setLivreurData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const adminId = localStorage.getItem('adminId');

  useEffect(() => {
    const fetchColis = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3001/api/colis/admin/colis?adminId=${adminId}`);
        if (response.ok) {
          const data = await response.json();
          setColisData(data);
          setFilteredData(data);
        } else {
          setError('Failed to fetch colis data.');
        }
      } catch (error) {
        setError('Error fetching colis data.');
      } finally {
        setLoading(false);
      }
    };

    const fetchLivreurs = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/livreurs?adminId=${adminId}`);
        if (response.ok) {
          const data = await response.json();
          setLivreurData(data);
        } else {
          setError('Failed to fetch livreurs data.');
        }
      } catch (error) {
        setError('Error fetching livreurs data.');
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

      const responseBody = await response.json();

      if (response.ok) {
        setNewColis({
          code: '',
          expediteur: '',
          destinataire: '',
          telephone: '',
          montant: '',
          depot: '',
          adresse: '',
          suiviEmplacement:'',
          statut: 'En Attente',
          livreurId: ''
        });
        setFilteredData(prevData => [responseBody, ...prevData]);
      } else {
        setError('Failed to add new colis.');
      }
    } catch (error) {
      setError('Error adding new colis.');
    }
  };

  const handleEditClick = (id) => {
    navigate(`/edit-colis/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/colis/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setFilteredData(prevData => prevData.filter(colis => colis.id !== id));
      } else {
        setError('Failed to delete colis.');
      }
    } catch (error) {
      setError('Error deleting colis.');
    }
  };

// Helper function to get livreur's name by ID
const getLivreurName = (livreurId) => {
  // Ensure that livreurId is a number if id in livreurData is a number
  console.log('Looking for Livreur with ID:', livreurId);

  const livreur = livreurData.find(livreur => livreur.id === Number(livreurId));
  console.log('Found Livreur:', livreur);

  return livreur ? `${livreur.nom} ${livreur.prenom}` : 'N/A';
};


  return (
    <div className="liste-colis-admin-container">
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}

      <ListeColisAdminFilter onFilterChange={handleFilterChange} />

      <div className="add-colis-card">
        <div className="add-colis-card-header">
          <span className="add-colis-card-title">Ajouter Colis</span>
        </div>
        <form className="add-colis-form-container" onSubmit={handleSubmit}>
          <div className="add-colis-form-row">
            {['code', 'expediteur', 'destinataire', 'telephone' , 'suiviEmplacement'].map(field => (
              <div className="add-colis-input-group" key={field}>
                <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <input
                  type="text"
                  id={field}
                  name={field}
                  value={newColis[field]}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}
          </div>
          <div className="add-colis-form-row">
            {['montant', 'depot', 'adresse'].map(field => (
              <div className="add-colis-input-group" key={field}>
                <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <input
                  type="text"
                  id={field}
                  name={field}
                  value={newColis[field]}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}
            <div className="add-colis-input-group">
              <label htmlFor="statut">Statut</label>
              <select
                id="statut"
                name="statut"
                value={newColis.statut}
                onChange={handleChange}
                required
              >
                <option value="En Attente">En Attente</option>
                {/*        <option value="En Livraison">En Livraison</option>
                <option value="Livré">Livré</option>*/}
              </select>
            </div>
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
                  {livreur.nom} {livreur.prenom}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="add-colis-submit-btn">Ajouter Colis</button>
        </form>
      </div>

      <div className="colis-list">
        {filteredData.length > 0 ? (
          <table className="colis-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Expéditeur</th>
                <th>Destinataire</th>
                <th>Téléphone</th>
                <th>Montant</th>
                <th>Depot</th>
                <th>Adresse</th>
                <th>suiviEmplacement</th>
                <th>Livreur</th> 
                <th>Statut</th>
                <th>Actions</th>
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
                  <td>{colis.suiviEmplacement}</td>
                  <td>{getLivreurName(colis.livreurId)}</td> 
                  <td>{colis.statut}</td>
                  <td>
                    <img
                      src={qrCodeIcon}
                      alt="QR Code"
                      className="qr-code-icon"
                      onClick={() => handleQRCodeClick(colis)}
                      style={{ cursor: 'pointer', width: '15px', height: '15px' }}
                    />
                    <i
                      className="fa fa-edit icon-button"
                      onClick={() => handleEditClick(colis.id)}
                      style={{ cursor: 'pointer', width: '27px', height: '27px', marginLeft: '10px' }}
                    />
                    <i
                      className="fa fa-trash icon-button"
                      onClick={() => handleDelete(colis.id)}
                      style={{ cursor: 'pointer', width: '27px', height: '27px', marginLeft: '10px' }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Aucun colis trouvé.</p>
        )}
      </div>
    </div>
  );
};

export default ListeColisAdmin;
