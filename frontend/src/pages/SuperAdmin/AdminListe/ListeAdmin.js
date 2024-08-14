import React, { useState, useEffect } from 'react';
import './ListeAdmin.css';
import { MdEdit, MdDelete } from 'react-icons/md';

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
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const governorates = ['Tunis', 'Sousse', 'Sfax', 'Ariana', 'Ben Arous', 'Bizerte', 'Gabès', 'Gafsa', 'Kairouan', 'Kasserine', 'Kébili', 'Le Kef', 'Mahdia', 'La Manouba', 'Médenine', 'Monastir', 'Nabeul', 'Sidi Bouzid', 'Siliana', 'Tataouine', 'Tozeur', 'Zaghouan'];

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
      const response = await fetch(editMode ? `http://localhost:3001/api/admins/${editId}` : 'http://localhost:3001/api/admins', {
        method: editMode ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(adminData),
      });
  
      if (response.ok) {
        const newAdmin = await response.json();
        console.log('Admin saved:', newAdmin);

        if (editMode) {
          setAdmins(admins.map(admin => (admin.id === editId ? newAdmin : admin)));
        } else {
          setAdmins([...admins, newAdmin]);
        }

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
        setEditMode(false);
        setEditId(null);
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

  const handleEdit = (admin) => {
    setFormData({
      nom: admin.nom,
      prenom: admin.prenom,
      date_naissance: admin.date_naissance,
      telephone: admin.telephone,
      email: admin.email,
      address: admin.address,
      governorate: admin.governorate,
      role: admin.role,
      motdepasse: '' // Assume password is not editable or handled separately
    });
    setEditMode(true);
    setEditId(admin.id);
  };

  return (
    <div className="admin-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Administrateurs</h1>
      </div>
      <div className="form-cardSA">
        <div className="form-titleSA">{editMode ? 'Edit Admin' : 'Ajouter Admin'}</div>
        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="grid-container">
            {['nom', 'prenom', 'date_naissance', 'telephone', 'email', 'address'].map(field => (
              <div className="form-groupSA" key={field}>
                <label htmlFor={field} >
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
            <div className="form-groupSA">
              <label htmlFor="governorate" >Gouvernorat</label>
              <select
                id="governorate"
                name="governorate"
                value={formData.governorate}
                onChange={handleChange}
                required
              >
                <option value="">Sélectionnez un gouvernorat</option>
                {governorates.map((gov, index) => (
                  <option key={index} value={gov}>{gov}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="button-containerSA">
            <button type="submit" >{editMode ? 'Update' : 'Ajouter'}</button>
          </div>
        </form>
      </div>
      <div className="table-title">Liste des Admins</div>
      <div className="table-card">
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
                <th>Actions</th>
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
                      className="edit-buttonSA"
                      onClick={() => handleEdit(admin)}
                    >
                      <MdEdit size={20} />
                    </button>
                    <button 
                      className="delete-buttonSA"
                      onClick={() => handleDelete(admin.id)}
                    >
                      <MdDelete size={20} />
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
