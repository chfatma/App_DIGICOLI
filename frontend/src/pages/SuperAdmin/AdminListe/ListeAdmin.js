import React, { useState, useEffect } from 'react';
import './ListeAdmin.css';

const ListeAdmin = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    date_naissance: '',
    telephone: '',
    email: '',
    address: '',
    governorate: '',
    role: 'admin',
    motdepasse: '',
  });

  const [admins, setAdmins] = useState([]);
  const [superadminId, setSuperadminId] = useState('');

  useEffect(() => {
    const storedSuperadminId = localStorage.getItem('superadminId');
    console.log('Retrieved superadminId from local storage:', storedSuperadminId);
    setSuperadminId(storedSuperadminId);

    const fetchAdmins = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/admins/superadmin/${storedSuperadminId}`);
        if (response.ok) {
          const adminsData = await response.json();
          console.log('Fetched Admins:', adminsData);
          setAdmins(adminsData);
        } else {
          console.error('Failed to fetch admins');
        }
      } catch (error) {
        console.error('Error fetching admins:', error);
      }
    };

    if (storedSuperadminId) {
      fetchAdmins();
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const adminData = {
      ...formData,
      motdepasse: formData.nom + formData.telephone,
      superadminId,
    };
  
    console.log('Data Sent to Backend:', adminData);
  
    try {
      const response = await fetch('http://localhost:3001/api/admins', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(adminData),
      });
  
      if (response.ok) {
        const newAdmin = await response.json();
        console.log('New Admin Added:', newAdmin);
        setAdmins([...admins, newAdmin]);
        setFormData({
          nom: '',
          prenom: '',
          date_naissance: '',
          telephone: '',
          email: '',
          address: '',
          governorate: '',
          role: 'admin',
          motdepasse: ''
        });
      } else {
        const errorData = await response.json();
        console.error('Error from Backend:', errorData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/admins/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setAdmins(admins.filter(admin => admin.id !== id));
      } else {
        console.error('Failed to delete admin');
      }
    } catch (error) {
      console.error('Error deleting admin:', error);
    }
  };

  return (
    <div className="admin-container">
      <div className="form-card">
        <div className="form-title">Ajouter Admin</div>
        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="grid-container">
            {['nom', 'prenom', 'date_naissance', 'telephone', 'email', 'address', 'governorate'].map(field => (
              <div className="form-group" key={field}>
                <label htmlFor={field} className="form-label">
                  {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                </label>
                <input
                  id={field}
                  type={field === 'date_naissance' ? 'date' : 'text'}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
            ))}
          
          </div>
          <button type="submit" className="submit-button">Ajouter</button>
        </form>
      </div>

      <div className="table-card">
        <div className="table-title">Liste des Admins</div>
        <div className="table-container">
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin.id}>
                  <td>{admin.nom}</td>
                  <td>{admin.prenom}</td>
                  <td>{admin.date_naissance}</td>
                  <td>{admin.telephone}</td>
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
    </div>
  );
};

export default ListeAdmin;
