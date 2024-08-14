import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LivreurInterface.css';
import { MdEdit, MdDelete } from 'react-icons/md';
import LivreurListe from './LivreurlisteFilterAdmin'; 

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

  // List of Tunisian governorates
  const governorates = [
    "Tunis", "Sfax", "Sousse", "Monastir", "Kairouan", "Bizerte", "Nabeul", "Kasserine",
    "Sidi Bouzid", "Gabès", "Mednine", "Tozeur", "Jendouba", "Le Kef", "Zaghouan", "Siliana",
    "Mahdia", "La Manouba", "Ariana", "Ben Arous", "Tataouine", "Gafsa", "Medenine", "Sidi Bou Said", "Kebili"
  ];

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

    const defaultPassword = `${formData.prenom}${formData.telephone}`; 

    const newUser = {
      email: formData.email,
      nom: formData.nom, 
      prenom: formData.prenom,
      motdepasse: defaultPassword, 
      telephone: formData.telephone, 
      address: formData.adresse, 
      governorate: formData.governorate, 
      date_naissance: formData.dateNaissance,
      adminId 
    };

    console.log('Submitting new user data:', newUser); // Log data 

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
          governorate: ''
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

  const handleEdit = (livreurId) => {
    navigate(`/edit-livreur/${livreurId}`);
  };

  const filteredLivreurs = livreurs.filter((livreur) => {
    if (selectedGouvernement !== 'Tout' && livreur.governorate !== selectedGouvernement) {
      return false;
    }
    if (selectedDate && livreur.date_naissance !== selectedDate) {
      return false;
    }
    return true;
  });

  return (
    <div className="livreur-page">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Livreurs</h1>
      </div>
      <LivreurListe
        selectedGouvernement={selectedGouvernement}
        setSelectedGouvernement={setSelectedGouvernement}
        setSelectedDate={setSelectedDate}
      />
      <div className="cards">
        <div className="add-livreurs-card-header">
          <span className="add-livreurs-card-title">Ajouter Livreurs</span>
        </div>
        <form className="livreur-form"  onSubmit={handleSubmit}>
          <div className="form-row" >
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
            <div className="form-group">
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
            <div className="form-group">
              <label htmlFor="governorate">Governorat</label>
              <select
                id="governorate"
                name="governorate"
                value={formData.governorate}
                onChange={handleInputChange}
                required
              >
                <option value="">Sélectionner un gouvernorat</option>
                {governorates.map(governorate => (
                  <option key={governorate} value={governorate}>{governorate}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="button-containerliv">
            <button type="submit" >Ajouter Livreur</button>
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
                    <button 
                     className="edit-button-liv"
                    onClick={() => handleEdit(livreur.id)}>
                      <MdEdit />
                    </button>
                    <button
                     className="delete-button-liv"
                    onClick={() => handleDelete(livreur.id)}>
                      <MdDelete />
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

export default LivreurInterface;