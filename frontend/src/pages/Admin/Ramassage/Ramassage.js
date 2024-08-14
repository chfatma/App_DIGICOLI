import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdEdit, MdDelete } from 'react-icons/md';
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
  const [editId, setEditId] = useState(null); // Track the ID of the pickup being edited

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

  const handleEdit = (pickup) => {
    setEditId(pickup.id); // Set the ID of the pickup being edited
    setSelectedClient(pickup.clientId);
    setSelectedLivreur(pickup.livreurId);
    setDistribution(pickup.distribution);
    setDate(pickup.date);
    setTotalColis(pickup.totalColis);
  };

  const handleDelete = async (pickupId) => {
    try {
      const response = await axios.delete(`http://localhost:3001/api/pickups/${pickupId}`);
      if (response.status === 204) {
        setPickups(pickups.filter(pickup => pickup.id !== pickupId));
        setSuccess('Pickup deleted successfully!');
        setError('');
      } else {
        setError('Failed to delete pickup.');
      }
    } catch (error) {
      console.error('Error deleting pickup:', error);
      setError('Failed to delete pickup.');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const pickupData = {
      clientId: selectedClient,
      livreurId: selectedLivreur,
      distribution,
      date,
      totalColis,
      adminId,
    };

    try {
      if (editId) {
        // Update existing pickup
        const response = await axios.put(`http://localhost:3001/api/pickups/${editId}`, pickupData);
        if (response.status === 200) {
          setPickups(pickups.map(pickup => pickup.id === editId ? response.data.pickup : pickup));
          setEditId(null); // Clear edit ID
          setSuccess('Pickup updated successfully!');
        } else {
          setError('Failed to update pickup.');
        }
      } else {
        // Create new pickup
        const response = await axios.post('http://localhost:3001/api/pickups', pickupData);
        if (response.status === 201) {
          setPickups([...pickups, response.data.pickup]);
          setSuccess('Pickup added successfully!');
        } else {
          setError('Failed to add pickup.');
        }
      }
      setError('');
      setSelectedClient('');
      setSelectedLivreur('');
      setDistribution('');
      setDate('');
      setTotalColis('');
    } catch (error) {
      console.error('Error submitting pickup:', error);
      setError('Failed to submit pickup.');
    }
  };

  return (
    <div className="ramassage-container">
    <div className="dashboard-header">
      <h1 className="dashboard-title">Ramassage</h1>
    </div>
        <div className="form-card">
            <div className="add-rama-card-header">

              <h2>{editId ? 'Edit Pickup' : 'Ajouter Pickup'}</h2>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
            </div>
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
            <div className="button-containerrama">
              <button type="submit">{editId ? 'Update' : 'Ajouter'}</button>
            </div>
          </form>
      </div>
      <div className="titlerama">Liste des Pickups</div>
      <div className="cards-containerrama">
        <div className="table-card">
          <table className="rama-table">
            <thead>
              <tr>
                <th>Client</th>
                <th>Date</th>
                <th>Total Colis</th>
                <th>Livreur</th>
                <th>Distribution</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pickups.map(pickup => (
                <tr key={pickup.id}>
                  <td>{getClientName(pickup.clientId)}</td>
                  <td>{pickup.date}</td>
                  <td>{pickup.totalColis}</td>
                  <td>{getLivreurName(pickup.livreurId)}</td>
                  <td>{pickup.distribution}</td>
                  <td>
                    <button className="edit-button-rama" 
                       onClick={() => handleEdit(pickup)}>
                        <MdEdit />
                       </button>
                    <button className="delete-button-rama"
                        onClick={() => handleDelete(pickup.id)}>
                          <MdDelete />
                        </button>
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

export default Ramassage;
