import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Ramassage.css';

const Ramassage = () => {
  const [clients, setClients] = useState([]);
  const [livreurs, setLivreurs] = useState([]);
  const [pickups, setPickups] = useState([]);
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedLivreur, setSelectedLivreur] = useState('');
  const [distribution, setDistribution] = useState('');
  const [date, setDate] = useState('');
  const [totalColis, setTotalColis] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Liste des états tunisiens
  const states = [
    "Tunis", "Sfax", "Sousse", "Kairouan", "Bizerte", "Nabeul", "Kasserine", "Sidi Bouzid",
    "Gabès", "Mednine", "Tozeur", "Jendouba", "Le Kef", "Zaghouan", "Siliana", "Mahdia",
    "La Manouba", "Ariana", "Ben Arous", "Tataouine", "Gafsa", "Medenine", "Sidi Bou Said", "Kebili"
  ];

  const getLivreurName = (livreurId) => {
    const livreur = livreurs.find(livreur => livreur.id === livreurId);
    return livreur ? `${livreur.nom} ${livreur.prenom}` : 'N/A';
  };

  const getClientName = (clientId) => {
    const client = clients.find(client => client.id === clientId);
    return client ? `${client.nom} ${client.prenom}` : 'N/A';
  };

  // Récupérer adminId depuis localStorage
  const adminId = localStorage.getItem('adminId');

  useEffect(() => {
    if (!adminId) {
      console.error('Admin ID not found in localStorage');
      return;
    }

    const fetchClients = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/clients?adminId=${adminId}`);
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched clients:', data);
          setClients(data);
        } else {
          console.error('Failed to fetch clients:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    const fetchLivreurs = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/livreurs?adminId=${adminId}`);
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched livreurs:', data);
          setLivreurs(data);
        } else {
          console.error('Failed to fetch livreurs:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching livreurs:', error);
      }
    };

    const fetchPickups = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/pickups/admin/pickup', { params: { adminId } });
        setPickups(response.data);
      } catch (error) {
        console.error('Error fetching pickups:', error);
      }
    };

    fetchClients();
    fetchLivreurs();
    fetchPickups();
  }, [adminId]);

  const handleClientChange = (event) => {
    setSelectedClient(event.target.value);
  };

  const handleLivreurChange = (event) => {
    setSelectedLivreur(event.target.value);
  };

  const handleDistributionChange = (event) => {
    setDistribution(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleTotalColisChange = (event) => {
    setTotalColis(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newPickup = {
      clientId: selectedClient,
      livreurId: selectedLivreur,
      distribution,
      date,
      totalColis,
      adminId,
    };

    try {
      const response = await fetch('http://localhost:3001/api/pickups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPickup),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Response from backend:', data);
        setPickups(prevPickups => [...prevPickups, data]);
        setSelectedClient('');
        setSelectedLivreur('');
        setDistribution('');
        setDate('');
        setTotalColis('');
        setSuccess('Pickup added successfully!');
        setError('');
      } else {
        const errorData = await response.json();
        console.error('Failed to add pickup:', errorData);
        setError(errorData.message || 'Failed to add pickup.');
      }
    } catch (error) {
      console.error('Error adding pickup:', error);
      setError('Failed to add pickup.');
    }
  };

  return (
    <div className="ramassage-container">
      <h2>Ajouter Pickup</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <div className="cards-container">
        <div className="form-card">
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Client</label>
                <select value={selectedClient} onChange={handleClientChange}>
                  <option value="">Select a client</option>
                  {clients.map(client => (
                    <option key={client.id} value={client.id}>{`${client.nom} ${client.prenom}`}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Date</label>
                <input type="date" value={date} onChange={handleDateChange} />
              </div>
              <div className="form-group">
                <label>Total Colis</label>
                <input type="number" value={totalColis} onChange={handleTotalColisChange} />
              </div>
              <div className="form-group">
                <label>Distribution</label>
                <select value={distribution} onChange={handleDistributionChange}>
                  <option value="">Select a state</option>
                  {states.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Livreur</label>
                <select value={selectedLivreur} onChange={handleLivreurChange}>
                  <option value="">Select a livreur</option>
                  {livreurs.map(livreur => (
                    <option key={livreur.id} value={livreur.id}>{`${livreur.nom} ${livreur.prenom}`}</option>
                  ))}
                </select>
              </div>
            </div>
            <button type="submit">Ajouter</button>
          </form>
        </div>
      </div>
      <h2>Liste des Pickups</h2>
      <div className="cards-container">
        <div className="table-card">
          <table>
            <thead>
              <tr>
                <th>Client</th>
                <th>Date</th>
                <th>Total Colis</th>
                <th>Livreur</th>
                <th>Distribution</th>
              </tr>
            </thead>
            <tbody>
              {pickups.map((pickup, index) => (
                <tr key={index}>
                  <td>{getClientName(pickup.clientId)}</td>
                  <td>{pickup.date}</td>
                  <td>{pickup.totalColis}</td>
                  <td>{getLivreurName(pickup.livreurId)}</td>
                  <td>{pickup.distribution}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Ramassage;
