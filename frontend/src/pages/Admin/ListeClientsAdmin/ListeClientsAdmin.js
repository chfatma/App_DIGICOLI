import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ListeClientsAdmin.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const BASE_URL = 'http://localhost:3001/api/clients';

const ListeClientsAdmin = () => {
  const adminId = localStorage.getItem('adminId');

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
        console.error('Error fetching clients:', error);
      }
    };

    fetchClients();
  }, [adminId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const generatedPassword = `${formData.nom}${formData.telephone}`;
    const updatedFormData = {
      ...formData,
      motdepasse: generatedPassword,
    };

    console.log('Submitting data:', updatedFormData);

    try {
      const response = await axios.post(BASE_URL, updatedFormData);
      if (response.status === 201) {
        setTableData([...tableData, response.data]);
        setFilteredData([...filteredData, response.data]);
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
      }
    } catch (error) {
      console.error('Error adding client:', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`, { params: { adminId } });
      setTableData(tableData.filter(client => client.id !== id));
      setFilteredData(filteredData.filter(client => client.id !== id));
    } catch (error) {
      console.error('Error deleting client:', error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: '2-digit', month: '2-digit', day: '2-digit' };
    return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
  };

  return (
      <div className="client-list-admin">
        {/* <h1>Admin ID: {adminId}</h1>*/}  

        <form onSubmit={handleSubmit} className="client-form">
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
            <button type="submit">Add Client</button>
          </div>
        </form>
        <div className="table-card">
  <div className="clients-table-wrapper">
    <table className="clients-table">
      <thead>
        <tr>
          <th>Nom</th>
          <th>Prenom</th>
          <th>Date de Naissance</th>
          <th>Telephone</th>
          <th>Email</th>
          <th>Address</th>
          <th>Governorate</th>
          <th>Colis à Livrer</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredData.map(client => (
          <tr key={client.id}>
            <td>{client.nom}</td>
            <td>{client.prenom}</td>
            <td>{formatDate(client.date_naissance)}</td>
            <td>{client.telephone}</td>
            <td>{client.email}</td>
            <td>{client.address}</td>
            <td>{client.governorate}</td>
            <td>{client.colisALivrer}</td>
            <td>
  <div className="button-container">
    <Link to={`/edit-client/${client.id}`}>
      <FontAwesomeIcon icon={faEdit} />
    </Link>
    <button onClick={() => handleDelete(client.id)}>
      <FontAwesomeIcon icon={faTrash} />
    </button>
  </div>
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
