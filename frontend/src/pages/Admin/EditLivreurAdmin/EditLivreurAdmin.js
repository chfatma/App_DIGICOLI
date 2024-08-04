import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './EditLivreurAdmin.css'; // Import the CSS file

const EditLivreurAdmin = () => {
  const { id } = useParams(); // Extract the ID from the URL parameters
  const [livreur, setLivreur] = useState({
    nom: '',
    prenom: '',
    date_naissance: '',
    telephone: '',
    email: '',
    address: '',
    governorate: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const adminId = localStorage.getItem('adminId');

  useEffect(() => {
    const fetchLivreur = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/livreurs/${id}?adminId=${adminId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // Convert date string to date object
        if (data.date_naissance) {
          data.date_naissance = new Date(data.date_naissance).toISOString().split('T')[0];
        }
        setLivreur(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLivreur();
  }, [id, adminId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Convert date string to ISO format
      const updatedLivreur = {
        ...livreur,
        date_naissance: new Date(livreur.date_naissance).toISOString(),
      };
      const response = await fetch(`http://localhost:3001/api/livreurs/${id}?adminId=${adminId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedLivreur),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      alert('Livreur updated successfully');
    } catch (error) {
      alert('Failed to update livreur: ' + error.message);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  if (!livreur) return <div className="no-data">No data found</div>;

  return (
    <div className="card-container">
      <h1>Edit Livreur</h1>
      <form className="edit-form" onSubmit={handleSubmit}>
        <label>
          Nom:
          <input
            type="text"
            value={livreur.nom}
            onChange={(e) => setLivreur({ ...livreur, nom: e.target.value })}
          />
        </label>
        <label>
          Prénom:
          <input
            type="text"
            value={livreur.prenom}
            onChange={(e) => setLivreur({ ...livreur, prenom: e.target.value })}
          />
        </label>
        <label>
          Date de Naissance:
          <input
            type="date"
            value={livreur.date_naissance}
            onChange={(e) => setLivreur({ ...livreur, date_naissance: e.target.value })}
          />
        </label>
        <label>
          Téléphone:
          <input
            type="text"
            value={livreur.telephone}
            onChange={(e) => setLivreur({ ...livreur, telephone: e.target.value })}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={livreur.email}
            onChange={(e) => setLivreur({ ...livreur, email: e.target.value })}
          />
        </label>
        <label>
          Adresse:
          <input
            type="text"
            value={livreur.address}
            onChange={(e) => setLivreur({ ...livreur, address: e.target.value })}
          />
        </label>
        <label>
          Gouvernorat:
          <input
            type="text"
            value={livreur.governorate}
            onChange={(e) => setLivreur({ ...livreur, governorate: e.target.value })}
          />
        </label>
        <button type="submit">Update Livreur</button>
      </form>
    </div>
  );
};

export default EditLivreurAdmin;
