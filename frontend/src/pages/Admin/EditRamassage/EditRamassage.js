import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditRamassage.css';

const EditRamassage = () => {
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
  const [editingPickupId, setEditingPickupId] = useState(null);

  
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

    const fetchData = async () => {
      try {
        const [clientsResponse, livreursResponse, pickupsResponse] = await Promise.all([
          fetch(`http://localhost:3001/api/clients?adminId=${adminId}`),
          fetch(`http://localhost:3001/api/livreurs?adminId=${adminId}`),
          axios.get('http://localhost:3001/api/pickups/admin/pickup', { params: { adminId } })
        ]);

        if (clientsResponse.ok) {
          const data = await clientsResponse.json();
          setClients(data);
        } else {
          console.error('Failed to fetch clients:', clientsResponse.statusText);
        }

        if (livreursResponse.ok) {
          const data = await livreursResponse.json();
          setLivreurs(data);
        } else {
          console.error('Failed to fetch livreurs:', livreursResponse.statusText);
        }

        setPickups(pickupsResponse.data);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [adminId]);

  const handleChange = (setter) => (event) => setter(event.target.value);

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
      let response;
      if (editingPickupId) {
        // Update existing pickup
        response = await fetch(`http://localhost:3001/api/pickups/${editingPickupId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newPickup),
        });
        if (response.ok) {
          const updatedPickup = await response.json();
          setPickups(prevPickups =>
            prevPickups.map(pickup => (pickup.id === editingPickupId ? updatedPickup : pickup))
          );
          setSuccess('Pickup updated successfully!');
        } else {
          const errorData = await response.json();
          setError(errorData.message || 'Failed to update pickup.');
        }
      } else {
        // Add new pickup
        response = await fetch('http://localhost:3001/api/pickups', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newPickup),
        });
        if (response.ok) {
          const data = await response.json();
          setPickups(prevPickups => [...prevPickups, data]);
          setSuccess('Pickup added successfully!');
        } else {
          const errorData = await response.json();
          setError(errorData.message || 'Failed to add pickup.');
        }
      }

      // Clear form fields
      setSelectedClient('');
      setSelectedLivreur('');
      setDistribution('');
      setDate('');
      setTotalColis('');
      setEditingPickupId(null);
    } catch (error) {
      console.error('Error adding/updating pickup:', error);
      setError('Failed to add/update pickup.');
    }
  };

  const handleEdit = (pickupId) => {
    const pickupToEdit = pickups.find(pickup => pickup.id === pickupId);
    if (pickupToEdit) {
      setSelectedClient(pickupToEdit.clientId);
      setSelectedLivreur(pickupToEdit.livreurId);
      setDistribution(pickupToEdit.distribution);
      setDate(pickupToEdit.date);
      setTotalColis(pickupToEdit.totalColis);
      setEditingPickupId(pickupId);
    }
  };

  const handleDelete = async (pickupId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/pickups/${pickupId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setPickups(prevPickups => prevPickups.filter(pickup => pickup.id !== pickupId));
        setSuccess('Pickup deleted successfully!');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to delete pickup.');
      }
    } catch (error) {
      console.error('Error deleting pickup:', error);
      setError('Failed to delete pickup.');
    }
  };

  return (
    <div className="edit-ramassage-container">
      <h2>{editingPickupId ? 'Modifier Pickup' : 'Ajouter Pickup'}</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Client</label>
              <select value={selectedClient} onChange={handleChange(setSelectedClient)}>
                <option value="">Select a client</option>
                {clients.map(client => (
                  <option key={client.id} value={client.id}>{`${client.nom} ${client.prenom}`}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Date</label>
              <input type="date" value={date} onChange={handleChange(setDate)} />
            </div>
            <div className="form-group">
              <label>Total Colis</label>
              <input type="number" value={totalColis} onChange={handleChange(setTotalColis)} />
            </div>
            <div className="form-group">
              <label>Distribution</label>
              <select value={distribution} onChange={handleChange(setDistribution)}>
                <option value="">Select a state</option>
                {states.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Livreur</label>
              <select value={selectedLivreur} onChange={handleChange(setSelectedLivreur)}>
                <option value="">Select a livreur</option>
                {livreurs.map(livreur => (
                  <option key={livreur.id} value={livreur.id}>{`${livreur.nom} ${livreur.prenom}`}</option>
                ))}
              </select>
            </div>
          </div>
          <button type="submit">{editingPickupId ? 'Update Pickup' : 'Add Pickup'}</button>
        </form>
      </div>
      <div className="pickups-list">
        <h3>Pickups List</h3>
        <table>
          <thead>
            <tr>
              <th>Client</th>
              <th>Livreur</th>
              <th>Distribution</th>
              <th>Date</th>
              <th>Total Colis</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pickups.map(pickup => (
              <tr key={pickup.id}>
                <td>{getClientName(pickup.clientId)}</td>
                <td>{getLivreurName(pickup.livreurId)}</td>
                <td>{pickup.distribution}</td>
                <td>{new Date(pickup.date).toLocaleDateString()}</td>
                <td>{pickup.totalColis}</td>
                <td>
                  <button onClick={() => handleEdit(pickup.id)}>Edit</button>
                  <button onClick={() => handleDelete(pickup.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EditRamassage;
