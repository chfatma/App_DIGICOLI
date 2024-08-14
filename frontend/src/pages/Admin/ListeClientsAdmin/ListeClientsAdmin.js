import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdEdit, MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import './ListeClientsAdmin.css';

const BASE_URL = 'http://localhost:3001/api/clients';

const gouvernorats = [
  'Ariana', 'Béja', 'Ben Arous', 'Bizerte', 'El Kef', 'El Mahdia',
  'Ezzahra', 'Gafsa', 'Gabès', 'Jendouba', 'Kairouan', 'Kasserine',
  'Kébili', 'Kef', 'Médnine', 'Monastir', 'Sfax', 'Sidi Bouzid',
  'Siliana', 'Sousse', 'Tataouine', 'Tunis', 'Zaghouan'
];

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

  const [clients, setClients] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const clientsPerPage = 10;

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get(BASE_URL, { params: { adminId } });
        setClients(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des clients :', error);
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
    const newClient = {
      ...formData,
      motdepasse: generatedPassword,
    };

    try {
      const response = await axios.post(BASE_URL, newClient);
      if (response.status === 201) {
        setClients([...clients, response.data]);
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
      console.error('Erreur lors de l\'ajout du client :', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`, { params: { adminId } });
      setClients(clients.filter(client => client.id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression du client :', error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: '2-digit', month: '2-digit', day: '2-digit' };
    return new Intl.DateTimeFormat('fr-FR', options).format(new Date(dateString));
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const offset = currentPage * clientsPerPage;
  const currentPageData = clients.slice(offset, offset + clientsPerPage);

  return (
    <div className="client-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Clients</h1>
      </div>
      <div className="client-list-admin">
        <form onSubmit={handleSubmit} className="client-form">
          <div className="add-client-card-header">
            <span className="add-client-card-title">Ajouter Client</span>
          </div>
          <div className="form-row">
            <div className="input-group">
              <label htmlFor="nom">Nom :</label>
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
              <label htmlFor="prenom">Prénom :</label>
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
              <label htmlFor="date_naissance">Date de Naissance :</label>
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
              <label htmlFor="telephone">Téléphone :</label>
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
              <label htmlFor="email">Email :</label>
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
            <div className="input-group address-input">
              <label htmlFor="address">Adresse :</label>
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
              <label htmlFor="governorate">Gouvernorat :</label>
              <select
                id="governorate"
                name="governorate"
                value={formData.governorate}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Choisir un gouvernorat</option>
                {gouvernorats.map((gov) => (
                  <option key={gov} value={gov}>{gov}</option>
                ))}
              </select>
            </div>
            <div className="input-group colis-input">
              <label htmlFor="colisALivrer">Colis à Livrer :</label>
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
            <button type="submit">Ajouter Client</button>
          </div>
        </form>
        </div>

        <div className="add-clients-card-title"  >Liste Client</div>
        <div className="table-card" style={{ height: '500px' }} >
          <div className="clients-table-wrapper" >
            <table className="clients-table">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Prénom</th>
                  <th>Date de Naissance</th>
                  <th>Téléphone</th>
                  <th>Email</th>
                  <th>Adresse</th>
                  <th>Gouvernorat</th>
                  <th>Colis à Livrer</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentPageData.map(client => (
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
      <button className="edit-button-liv">
        <MdEdit />
      </button>
    </Link>

    <button
      className="delete-button-liv"
      onClick={() => handleDelete(client.id)}
    >
      <MdDelete />
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
