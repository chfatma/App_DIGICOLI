import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EditColis.css';

const BASE_URL = 'http://localhost:3001/api/colis';

const EditColis = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const adminId = localStorage.getItem('adminId');

  const [formData, setFormData] = useState({
    code: '',
    expediteur: '',
    destinataire: '',
    telephone: '',
    montant: '',
    depot: '',
    adresse: '',
    statut: 'En Attente',
    livreurId: '',
  });
  const [livreurData, setLivreurData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchColis = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching colis:', error);
        setError('Error fetching colis data.');
      } finally {
        setLoading(false);
      }
    };

    const fetchLivreurs = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/livreurs?adminId=${adminId}`);
        setLivreurData(response.data);
      } catch (error) {
        console.error('Error fetching livreurs:', error);
        setError('Error fetching livreurs data.');
      }
    };

    fetchColis();
    fetchLivreurs();
  }, [id, adminId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`${BASE_URL}/${id}`, formData);
      if (response.status === 200) {
        navigate('/Adminlistcoli');
      }
    } catch (error) {
      console.error('Error updating colis:', error);
      setError('Error updating colis.');
    }
  };

  return (
    <div className="edit-colis">
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      <div className="edit-colis-container">
        <div className="section-title">Éditer Colis</div>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="input-group">
              <label htmlFor="code">Code:</label>
              <input
                type="text"
                id="code"
                name="code"
                value={formData.code}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="expediteur">Expéditeur:</label>
              <input
                type="text"
                id="expediteur"
                name="expediteur"
                value={formData.expediteur}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="destinataire">Destinataire:</label>
              <input
                type="text"
                id="destinataire"
                name="destinataire"
                value={formData.destinataire}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="telephone">Téléphone:</label>
              <input
                type="text"
                id="telephone"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="montant">Montant:</label>
              <input
                type="text"
                id="montant"
                name="montant"
                value={formData.montant}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label htmlFor="depot">Dépot:</label>
              <input
                type="text"
                id="depot"
                name="depot"
                value={formData.depot}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="adresse">Adresse:</label>
              <input
                type="text"
                id="adresse"
                name="adresse"
                value={formData.adresse}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="statut">Statut:</label>
              <select
                id="statut"
                name="statut"
                value={formData.statut}
                onChange={handleChange}
                required
              >
                <option value="En Attente">En Attente</option>
                <option value="En Livraison">En Livraison</option>
                <option value="Livré">Livré</option>
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="livreurId">Livreur:</label>
              <select
                id="livreurId"
                name="livreurId"
                value={formData.livreurId}
                onChange={handleChange}
                required
              >
                <option value="">Sélectionner un livreur</option>
                {livreurData.map(livreur => (
                  <option key={livreur.id} value={livreur.id}>
                    {livreur.nom} {livreur.prenom}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit">Mettre à jour</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditColis;
