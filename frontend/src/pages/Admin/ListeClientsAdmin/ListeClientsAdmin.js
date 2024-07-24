import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ListeClientsAdmin.css';
import TousClientLivreurFilter from './ListeClientsAdminFilter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const ListeClientsAdmin = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    date_naissance: '',
    phone: '',
    email: '',
    address: '',
    governorate: '',
    role: 'client',
    password: '', 
    colisALivrer: ''
  });

  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('http://localhost:3000/clients');
        const clients = response.data.map(client => ({
          ...client,
          date_naissance: client.date_naissance ? formatDate(client.date_naissance) : ''
        }));
        setTableData(clients);
        setFilteredData(clients);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };
    fetchClients();
  }, []);

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
    setFormData(prevData => {
      const updatedData = { ...prevData, [name]: value };
      if (name === 'first_name' || name === 'phone') {
        updatedData.password = `${updatedData.first_name}${updatedData.phone}`;
      }
      return updatedData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      ...formData,
      date_naissance: formData.date_naissance ? formatDate(formData.date_naissance) : '',
    };

    try {
      await axios.post('http://localhost:3000/clients', dataToSend);
      alert('Client ajouté avec succès!');
      setFormData({
        first_name: '',
        last_name: '',
        date_naissance: '',
        phone: '',
        email: '',
        address: '',
        governorate: '',
        role: 'client',
        password: '',
        colisALivrer: ''
      });
      const response = await axios.get('http://localhost:3000/clients');
      const clients = response.data.map(client => ({
        ...client,
        date_naissance: client.date_naissance ? formatDate(client.date_naissance) : ''
      }));
      setTableData(clients);
      setFilteredData(clients);
    } catch (error) {
      console.error('Error adding client:', error);
    }
  };

  const handleFilterChange = (selectedOption) => {
    if (selectedOption === 'Tout par défaut') {
      setFilteredData(tableData); 
    } else {
      const filtered = tableData.filter((item) => item.governorate === selectedOption);
      setFilteredData(filtered);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/clients/${id}`);
      alert('Client supprimé avec succès!');
      const response = await axios.get('http://localhost:3000/clients');
      const clients = response.data.map(client => ({
        ...client,
        date_naissance: client.date_naissance ? formatDate(client.date_naissance) : ''
      }));
      setTableData(clients);
      setFilteredData(clients);
    } catch (error) {
      console.error('Error deleting client:', error);
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
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                />
              </div>
              <div className="input-wrapper">
                <label>Prénom</label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
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
                  name="phone"
                  value={formData.phone}
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

      <TousClientLivreurFilter onFilterChange={handleFilterChange} />
      <h2 className="section-title">Liste des Clients</h2>
      <div className="additional-card">
        <h2 className="card-title">Clients</h2>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Nom et prénom</th>
                <th>Date de Naissance</th>
                <th>Téléphone</th>
                <th>Adresse</th>
                <th>Email</th>
                <th>Gouvernorat</th>
                <th>Colis à Livrer</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row) => (
                <tr key={row.id}>
                  <td>{row.first_name && row.last_name ? `${row.first_name} ${row.last_name}` : '-'}</td>
                  <td>{row.date_naissance || '-'}</td>
                  <td>{row.phone || '-'}</td>
                  <td>{row.address || '-'}</td>
                  <td>{row.email || '-'}</td>
                  <td>{row.governorate || '-'}</td>
                  <td>{row.colisALivrer || '-'}</td>
                  <td>
                    <Link to={`/edit-client-admin/${row.id}`}>
                      <button className="icon-button">
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                    </Link>
                    <button className="icon-button" onClick={() => handleDelete(row.id)}>
                      <FontAwesomeIcon icon={faTrash} />
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

export default ListeClientsAdmin;
