import React, { useState, useEffect } from 'react';
import './ListeClientsAdmin.css';
import TousClientLivreurFilter from './ListeClientsAdminFilter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = 'http://localhost:3001/api/clients';

const ListeClientsAdmin = ({ adminId }) => {
  console.log('Admin ID:', adminId);
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

  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get(BASE_URL, { params: { adminId } });
        setTableData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error('Error fetching clients:', error.message);
      }
    };

    fetchClients();
  }, [adminId]);

  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newClient = {
        ...formData,
        date_naissance: formData.date_naissance ? formatDate(formData.date_naissance) : '',
      };

      const response = await axios.post(BASE_URL, newClient);
      const createdClient = response.data;
      setTableData(prevData => [...prevData, createdClient]);
      setFilteredData(prevData => [...prevData, createdClient]);

      alert('Client ajouté avec succès!');
      setFormData({
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
    } catch (error) {
      alert(`Error creating client: ${error.message}`);
    }
  };

  const handleFilterChange = (selectedOption) => {
    if (selectedOption === 'Tout par défaut') {
      setFilteredData(tableData);
    } else {
      const filtered = tableData.filter(item => item.governorate === selectedOption);
      setFilteredData(filtered);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`, { params: { adminId } });
      setTableData(prevData => prevData.filter(item => item.id !== id));
      setFilteredData(prevData => prevData.filter(item => item.id !== id));
      alert('Client supprimé avec succès!');
    } catch (error) {
      alert(`Error deleting client: ${error.message}`);
    }
  };

  return (
    <div className="tous-clients-livreur">
      <h2 className="section-title">Ajouter Client</h2>
      <div className="card-container">
        <div className="tous-clients-livreur-container">
          <form onSubmit={handleSubmit}>
            <div className="input-row">
              <div className="input-wrapper">
                <label>Nom</label>
                <input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                />
              </div>
              <div className="input-wrapper">
                <label>Prénom</label>
                <input
                  type="text"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleChange}
                />
              </div>
              <div className="input-wrapper">
                <label>Date de Naissance</label>
                <input
                  type="date"
                  name="date_naissance"
                  value={formData.date_naissance}
                  onChange={handleChange}
                />
              </div>
              <div className="input-wrapper">
                <label>Téléphone</label>
                <input
                  type="text"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                />
              </div>
              <div className="input-wrapper">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="input-row">
              <div className="input-wrapper">
                <label>Adresse</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
              <div className="input-wrapper">
                <label>Colis à Livrer</label>
                <input
                  type="text"
                  name="colisALivrer"
                  value={formData.colisALivrer}
                  onChange={handleChange}
                />
              </div>
              <div className="input-wrapper">
                <label>Gouvernorat</label>
                <input
                  type="text"
                  name="governorate"
                  value={formData.governorate}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="button-wrapper">
              <button className="normal-button" type="submit">Ajouter</button>
            </div>
          </form>
        </div>
      </div>

      <TousClientLivreurFilter handleFilterChange={handleFilterChange} />
      <div className="client-list">
        <h2 className="section-title">Liste des Clients</h2>
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Email</th>
              <th>Téléphone</th>
              <th>Adresse</th>
              <th>Gouvernorat</th>
              <th>Date de Naissance</th>
              <th>Colis à Livrer</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map(client => (
              <tr key={client.id}>
                <td>{client.nom}</td>
                <td>{client.prenom}</td>
                <td>{client.email}</td>
                <td>{client.telephone}</td>
                <td>{client.address}</td>
                <td>{client.governorate}</td>
                <td>{formatDate(client.date_naissance)}</td>
                <td>{client.colisALivrer}</td>
                <td>
                  <Link to={`/clients/edit/${client.id}`}>
                    <FontAwesomeIcon icon={faEdit} />
                  </Link>
                  <button onClick={() => handleDelete(client.id)}>
                    <FontAwesomeIcon icon={faTrash} />
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

export default ListeClientsAdmin;
