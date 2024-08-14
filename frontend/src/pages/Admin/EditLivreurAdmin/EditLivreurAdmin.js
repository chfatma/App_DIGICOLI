import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EditLivreurAdmin.css';

const BASE_URL = 'http://localhost:3001/api/livreurs';

const EditLivreurAdmin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const adminId = localStorage.getItem('adminId');

  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    date_naissance: '',
    telephone: '',
    email: '',
    address: '',
    governorate: '',
    adminId,
  });

  useEffect(() => {
    const fetchLivreur = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/${id}`, { params: { adminId } });
        const livreurData = response.data;
        // Format the date to YYYY-MM-DD
        const formattedDate = new Date(livreurData.date_naissance).toISOString().split('T')[0];
        setFormData({
          ...livreurData,
          date_naissance: formattedDate,
        });
      } catch (error) {
        console.error('Error fetching livreur:', error);
      }
    };

    fetchLivreur();
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
        navigate('/livreurs'); 
      }
    } catch (error) {
      console.error('Error updating livreur:', error);
    }
  };

  return (
    <div className="edit-livreur">
      <div className="edit-livreur-container">
        <div className="section-title">Edit Livreur</div>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
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
              <label htmlFor="prenom">Prénom:</label>
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
              <label htmlFor="telephone">Téléphone:</label>
              <input
                type="text"
                id="telephone"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-row">
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
            <div className="input-group">
              <label htmlFor="address">Adresse:</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="governorate">Gouvernorat:</label>
              <input
                type="text"
                id="governorate"
                name="governorate"
                value={formData.governorate}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-actions">
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditLivreurAdmin;
