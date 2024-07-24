import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Ramassage.css';

const Ramassage = () => {
  const [clients, setClients] = useState([]);
  const [livreurs, setLivreurs] = useState([]);
  const [pickups, setPickups] = useState([]); // Added state for pickups
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedLivreur, setSelectedLivreur] = useState('');

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('http://localhost:3000/clients');
        setClients(response.data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    const fetchLivreurs = async () => {
      try {
        const response = await axios.get('http://localhost:3000/users/role/livreur');
        setLivreurs(response.data);
      } catch (error) {
        console.error('Error fetching livreurs:', error);
      }
    };

    const fetchPickups = async () => {
      try {
        const response = await axios.get('http://localhost:3000/pickups'); // Adjust the endpoint as needed
        setPickups(response.data);
      } catch (error) {
        console.error('Error fetching pickups:', error);
      }
    };

    fetchClients();
    fetchLivreurs();
    fetchPickups(); // Fetch pickups data
  }, []);

  const handleClientChange = (event) => {
    setSelectedClient(event.target.value);
  };

  const handleLivreurChange = (event) => {
    setSelectedLivreur(event.target.value);
  };

  return (
    <div className="ramassage-container">
      <h2>Ajouter PIKUP</h2>
      <div className="cards-container">
        <div className="form-card">
          <form>
            <div className="form-row">
              <div className="form-group">
                <label>CLIENT</label>
                <select value={selectedClient} onChange={handleClientChange}>
                  <option value="">Select a client</option>
                  {clients.map(client => (
                    <option key={client.id} value={client.id}>{client.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>DATE</label>
                <input type="date" />
              </div>
              <div className="form-group">
                <label>TOTAL COLIS</label>
                <input type="number" />
              </div>
              <div className="form-group">
                <label>LIVREUR</label>
                <select value={selectedLivreur} onChange={handleLivreurChange}>
                  <option value="">Select a livreur</option>
                  {livreurs.map(livreur => (
                    <option key={livreur.id} value={livreur.id}>{livreur.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <button type="submit">Ajouter</button>
          </form>
        </div>
      </div>
      <h2>Liste des PIKUPS</h2>
      <div className="cards-container">
        <div className="table-card">
          <h2>PIKUPS</h2>
          <table>
            <thead>
              <tr>
                <th>Client</th>
                <th>Date</th>
                <th>Total Colis</th>
                <th>Livreur</th>
              </tr>
            </thead>
            <tbody>
              {pickups.map((pickup, index) => (
                <tr key={index}>
                  <td>{pickup.client}</td>
                  <td>{pickup.date}</td>
                  <td>{pickup.totalColis}</td>
                  <td>{pickup.livreur}</td>
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
