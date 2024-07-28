// src/components/EditSuperAdmin.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditAdmin.css';

const EditSuperAdmin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [SuperAdmin, setSuperAdmin] = useState(null);
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    birthDate: '',
    phone: '',
    email: '',
    address: '',
    governorate: ''
  });

  useEffect(() => {
    const fetchSuperAdmin = async () => {
      try {
        const response = await fetch(`http://localhost:3000/users/${id}`);
        if (response.ok) {
          const data = await response.json();
          setSuperAdmin(data);

          // Format the date correctly for the date input
          const formattedDate = new Date(data.date_naissance).toISOString().split('T')[0];
          
          setFormData({
            lastName: data.last_name,
            firstName: data.first_name,
            birthDate: formattedDate,
            phone: data.phone,
            email: data.email,
            address: data.address,
            governorate: data.governorate
          });
        } else {
          console.error('Failed to fetch superAdmin:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching superAdmin:', error);
      }
    };
    
    fetchSuperAdmin();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const updatedSuperAdmin = {
      last_name: formData.lastName,
      first_name: formData.firstName,
      date_naissance: formData.birthDate,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      governorate: formData.governorate,
      role: 'superadmin'
    };
  
    try {
      const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedSuperAdmin)
      });
  
      if (response.ok) {
        console.log('SuperAdmin updated successfully');
        navigate('/superAdmins');
      } else {
        console.error('Failed to update superAdmin:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <div className="edit-superAdmin-container">
      <h2 className="page-title">Edit client</h2>
      {SuperAdmin ? (
        <form className="edit-superAdmin-form" onSubmit={handleSubmit}>
          <div className="form-group-row">
            <div className="form-group">
              <label htmlFor="lastName">Nom</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="firstName">Prénom</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="birthDate">Date de Naissance</label>
              <input
                type="date"
                id="birthDate"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Téléphone</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="form-group-row">
            <div className="form-group form-group-wide">
              <label htmlFor="address">Adresse</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group form-group-narrow">
              <label htmlFor="governorate">Governorat</label>
              <input
                type="text"
                id="governorate"
                name="governorate"
                value={formData.governorate}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="button-wrapper">
            <button type="submit" className="submit-button">Save</button>
          </div>
        </form>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EditSuperAdmin;
