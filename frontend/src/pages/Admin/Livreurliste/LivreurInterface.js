import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LivreurInterface.css';
import { MdEdit, MdDelete } from 'react-icons/md';
import LivreurListe from './LivreurlisteFilterAdmin'; // Ensure this path is correct

const LivreurInterface = () => {
  const [livreurs, setLivreurs] = useState([]);
  const [selectedGouvernement, setSelectedGouvernement] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    dateNaissance: '',
    telephone: '',
    email: '',
    adresse: '',
    governorate: ''
  });

  const navigate = useNavigate(); // Initialize useNavigate hook

  // Get adminId from localStorage
  const adminId = localStorage.getItem('adminId');

  useEffect(() => {
    const fetchLivreurs = async () => {
      try {
        if (!adminId) {
          console.error('Admin ID not found in localStorage');
          return;
        }
        const response = await fetch(`http://localhost:3001/api/livreurs?adminId=${adminId}`);
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched livreurs:', data);
          // Format dates for display
          const formattedData = data.map(livreur => ({
            ...livreur,
            date_naissance: new Date(livreur.date_naissance).toISOString().split('T')[0] // Ensure consistent format
          }));
          setLivreurs(formattedData);
        } else {
          console.error('Failed to fetch livreurs:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching livreurs:', error);
      }
    };

    fetchLivreurs();
  }, [adminId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const defaultPassword = `${formData.prenom}${formData.telephone}`; // Concatenate first name and phone number

    const newUser = {
      email: formData.email,
      nom: formData.nom, // Use 'nom' for last name as per backend
      prenom: formData.prenom, // Use 'prenom' for first name as per backend
      motdepasse: defaultPassword, // Adjusted to match backend property
      telephone: formData.telephone, // Adjusted to match backend property
      address: formData.adresse, // Adjusted to match backend property
      governorate: formData.governorat, // Keep as is if matches backend
      date_naissance: formData.dateNaissance, // Use the same format for date
      adminId // Include adminId in the request payload
    };

    console.log('Submitting new user data:', newUser); // Log data being sent

    try {
      const response = await fetch('http://localhost:3001/api/livreurs/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      });

      if (response.ok) {
        const result = await response.json();
        console.log('User added successfully:', result);
        setLivreurs([...livreurs, result]);
        setFormData({
          nom: '',
          prenom: '',
          dateNaissance: '',
          telephone: '',
          email: '',
          adresse: '',
          governorat: ''
        });
      } else {
        console.error('Failed to add user:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/livreurs/${id}?adminId=${adminId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        console.log('User deleted successfully');
        setLivreurs(livreurs.filter(livreur => livreur.id !== id));
      } else {
        console.error('Failed to delete user:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-livreur/${id}`); // Navigate to the edit page with the user id
  };

  const filteredLivreurs = livreurs.filter((livreur) => {
    if (selectedGouvernement !== 'Tout' && livreur.governorat !== selectedGouvernement) {
      return false;
    }
    if (selectedDate && livreur.date_naissance !== selectedDate) {
      return false;
    }
    return true;
  });

  return (
    <div className="livreur-page">
      <LivreurListe
        selectedGouvernement={selectedGouvernement}
        setSelectedGouvernement={setSelectedGouvernement}
        setSelectedDate={setSelectedDate}
      />
      <div className="title">Ajouter livreur</div>
      <div className="cards">
        <form className="livreur-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="nom">Nom</label>
              <input
                type="text"
                id="nom"
                name="nom"
                value={formData.nom}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="prenom">Prénom</label>
              <input
                type="text"
                id="prenom"
                name="prenom"
                value={formData.prenom}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="dateNaissance">Date de Naissance</label>
              <input
                type="date"
                id="dateNaissance"
                name="dateNaissance"
                value={formData.dateNaissance}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="telephone">Téléphone</label>
              <input
                type="text"
                id="telephone"
                name="telephone"
                value={formData.telephone}
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
          <div className="form-row">
            <div className="form-group adresse">
              <label htmlFor="adresse">Adresse</label>
              <input
                type="text"
                id="adresse"
                name="adresse"
                value={formData.adresse}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group governorat">
              <label htmlFor="governorat">Governorat</label>
              <input
                type="text"
                id="governorat"
                name="governorat"
                value={formData.governorat}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="button-container">
            <button type="submit" className="add-button">Ajouter</button>
          </div>
        </form>
      </div>

      <div className="title">Liste des livreurs</div>
      <div className="cards">
        <div className="livreurs-table-container">
          <table className="livreurs-table">
            <thead>
              <tr>
                <th>Nom & Prénom</th>
                <th>Date de Naissance</th>
                <th>Téléphone</th>
                <th>Email</th>
                <th>Adresse</th>
                <th>Governorat</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLivreurs.map((livreur) => (
                <tr key={livreur.id}>
                  <td>{livreur.prenom} {livreur.nom}</td>
                  <td>{livreur.date_naissance}</td>
                  <td>{livreur.telephone}</td>
                  <td>{livreur.email}</td>
                  <td>{livreur.address}</td>
                  <td>{livreur.governorate}</td>
                  <td>
                    <button className="icon-button" onClick={() => handleDelete(livreur.id)}><MdDelete /></button>
                    <button className="icon-button" onClick={() => handleEdit(livreur.id)}><MdEdit /></button>
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

export default LivreurInterface;
