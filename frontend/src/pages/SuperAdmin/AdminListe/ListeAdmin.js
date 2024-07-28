import React, { useState, useEffect } from 'react';
import './ListeAdmin.css';

const ListeAdmin = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    dateDeNaissance: '',
    telephone: '',
    email: '',
    adresse: '',
    gouvernorat: ''
  });
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    // Fetch admins from the API
    fetch('http://localhost:3000/admins') // Adjust the endpoint if needed
      .then(response => response.json())
      .then(data => {
        console.log('Fetched admins:', data); // Debug log to verify data
        setAdmins(data);
      })
      .catch(error => console.error('Error fetching admins:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const password = formData.prenom + formData.telephone;

    const userData = {
      email: formData.email,
      first_name: formData.prenom,
      last_name: formData.nom,
      password,
      phone: formData.telephone,
      address: formData.adresse,
      governorate: formData.gouvernorat,
      role: 'admin',
      date_naissance: formData.dateDeNaissance,
    };

    fetch('http://localhost:3000/admins', { // Adjust the endpoint if needed
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Admin added:', data);
      setAdmins(prevAdmins => [...prevAdmins, data]); // Using functional update
      setFormData({
        nom: '',
        prenom: '',
        dateDeNaissance: '',
        telephone: '',
        email: '',
        adresse: '',
        gouvernorat: '',
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/admins/${id}`, { // Adjust the endpoint if needed
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        setAdmins(admins.filter(admin => admin.id !== id));
        console.log('Admin deleted:', id);
      } else {
        console.error('Error deleting admin:', response.statusText);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <div className="admin-container">
      <div className="form-card">
        <div className="form-title">Ajouter Admin</div>
        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="grid-container">
            <div className="form-group">
              <label htmlFor="nom" className="form-label">Nom</label>
              <input
                id="nom"
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="prenom" className="form-label">Prénom</label>
              <input
                id="prenom"
                type="text"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="dateDeNaissance" className="form-label">Date de Naissance</label>
              <input
                id="dateDeNaissance"
                type="date"
                name="dateDeNaissance"
                value={formData.dateDeNaissance}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="telephone" className="form-label">Téléphone</label>
              <input
                id="telephone"
                type="text"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="adresse" className="form-label">Adresse</label>
              <input
                id="adresse"
                type="text"
                name="adresse"
                value={formData.adresse}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="gouvernorat" className="form-label">Gouvernorat</label>
              <input
                id="gouvernorat"
                type="text"
                name="gouvernorat"
                value={formData.gouvernorat}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
          </div>
          <button type="submit" className="submit-button">Ajouter</button>
        </form>
      </div>

      <div className="table-card">
        <div className="table-title">Liste des Admins</div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Date de Naissance</th>
              <th>Téléphone</th>
              <th>Email</th>
              <th>Adresse</th>
              <th>Gouvernorat</th>
              <th>Action</th> {/* New column for action buttons */}
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.id}>
                <td>{admin.last_name}</td>
                <td>{admin.first_name}</td>
                <td>{admin.date_naissance}</td>
                <td>{admin.phone}</td>
                <td>{admin.email}</td>
                <td>{admin.address}</td>
                <td>{admin.governorate}</td>
                <td>
                  <button 
                    className="delete-button"
                    onClick={() => handleDelete(admin.id)}
                  >
                    <span role="img" aria-label="delete">🗑️</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListeAdmin;
