import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EditClientAdmin.css';

const EditClientAdmin = () => {
  const { id } = useParams(); // Get the client ID from the URL params
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    date_naissance: '',
    phone: '',
    email: '',
    address: '',
    governorate: '',
    role: 'client',
    password: '',  // Password should be handled securely in real applications
    colisALivrer: ''
  });

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/clients/${id}`);
        const clientData = response.data;

        console.log('Fetched client data:', clientData); // Debugging line

        // Ensure date format is correct
        const formattedDate = clientData.date_naissance
          ? new Date(clientData.date_naissance).toISOString().split('T')[0]
          : '';

        setFormData({
          ...clientData,
          date_naissance: formattedDate
        });
      } catch (error) {
        console.error('Error fetching client data:', error);
      }
    };
    fetchClientData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Changing field ${name} to ${value}`); // Debugging line
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/clients/${id}`, formData);
      alert('Client modifié avec succès!');
      navigate('/liste-clients-admin'); // Navigate back to the list page
    } catch (error) {
      console.error('Error updating client:', error);
    }
  };

  return (
    <div className="edit-client-admin">
      <h2>Edit Client</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-row">
          <div className="input-wrapper">
            <label>Nom</label>
            <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} />
          </div>
          <div className="input-wrapper">
            <label>Prénom</label>
            <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} />
          </div>
          <div className="input-wrapper">
            <label>Date de Naissance</label>
            <input
              type="date"
              name="date_naissance"
              value={formData.date_naissance}
              onChange={handleChange}
              placeholder="YYYY-MM-DD"
            />
          </div>
          <div className="input-wrapper">
            <label>Téléphone</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
          </div>
          <div className="input-wrapper">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </div>
        </div>
        <div className="input-row">
          <div className="input-wrapper">
            <label>Adresse</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} />
          </div>
          <div className="input-wrapper">
            <label>Colis à Livrer</label>
            <input type="text" name="colisALivrer" value={formData.colisALivrer} onChange={handleChange} />
          </div>
          <div className="input-wrapper">
            <label>Gouvernorat</label>
            <input type="text" name="governorate" value={formData.governorate} onChange={handleChange} />
          </div>
        </div>
        <div className="button-wrapper">
          <button className="normal-button" type="submit">Save Changes</button>
        </div>
      </form>
    </div>
  );
};

export default EditClientAdmin;
