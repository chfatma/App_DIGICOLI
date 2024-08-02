import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const BASE_URL = 'http://localhost:3001/api/clients';

const EditClient = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const adminId = localStorage.getItem('adminId'); // Retrieve the adminId from localStorage

  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    date_naissance: '',
    telephone: '',
    email: '',
    address: '',
    governorate: '',
    colisALivrer: '',
    role: 'client',
    adminId,
  });

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/${id}`, { params: { adminId } });
        const clientData = response.data;
        // Format the date to YYYY-MM-DD
        const formattedDate = new Date(clientData.date_naissance).toISOString().split('T')[0];
        setFormData({
          ...clientData,
          date_naissance: formattedDate,
        });
      } catch (error) {
        console.error('Error fetching client:', error);
      }
    };

    fetchClient();
  }, [id, adminId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`${BASE_URL}/${id}`, formData);
      if (response.status === 200) {
        navigate('/ListeClientsAdmin'); // Navigate back to the ListeClientsAdmin page
      }
    } catch (error) {
      console.error('Error updating client:', error);
    }
  };

  return (
    <div className="edit-client">
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          {/* First row of inputs */}
          <div className="input-group">
            <label htmlFor="nom">Nom:</label>
            <input
              type="text"
              id="nom"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="prenom">Prenom:</label>
            <input
              type="text"
              id="prenom"
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="date_naissance">Date de Naissance:</label>
            <input
              type="date"
              id="date_naissance"
              name="date_naissance"
              value={formData.date_naissance}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="telephone">Telephone:</label>
            <input
              type="tel"
              id="telephone"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="second-row">
          {/* Second row of inputs */}
          <div className="input-group address-input">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group governorate-input">
            <label htmlFor="governorate">Governorate:</label>
            <input
              type="text"
              id="governorate"
              name="governorate"
              value={formData.governorate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group colis-input">
            <label htmlFor="colisALivrer">Colis à Livrer:</label>
            <input
              type="text"
              id="colisALivrer"
              name="colisALivrer"
              value={formData.colisALivrer}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit">Update Client</button>
        </div>
      </form>
    </div>
  );
};

export default EditClient;
