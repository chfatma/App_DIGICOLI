import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditColis.css';

const EditColis = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [colis, setColis] = useState(null);
  const [livreurData, setLivreurData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const adminId = localStorage.getItem('adminId');

  useEffect(() => {
    const fetchColis = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/colis/${id}`);
        if (response.ok) {
          const data = await response.json();
          setColis(data);
        } else {
          setError('Failed to fetch colis data.');
        }
      } catch (error) {
        setError('Error fetching colis data.');
      } finally {
        setLoading(false);
      }
    };

    const fetchLivreurs = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/livreurs?adminId=${adminId}`);
        if (response.ok) {
          const data = await response.json();
          setLivreurData(data);
        } else {
          setError('Failed to fetch livreurs data.');
        }
      } catch (error) {
        setError('Error fetching livreurs data.');
      }
    };

    fetchColis();
    fetchLivreurs();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setColis(prevColis => ({
      ...prevColis,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3001/api/colis/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(colis),
      });

      if (response.ok) {
        navigate('/liste-colis-admin');
      } else {
        setError('Failed to update colis.');
      }
    } catch (error) {
      setError('Error updating colis.');
    }
  };

  return (
    <div className="edit-colis-container">
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      {colis && (
        <div className="edit-colis-card">
          <div className="edit-colis-card-header">
            <span className="edit-colis-card-title">Éditer Colis</span>
          </div>
          <form className="edit-colis-form-container" onSubmit={handleSubmit}>
            <div className="edit-colis-form-row">
              {['code', 'expediteur', 'destinataire', 'telephone'].map(field => (
                <div className="edit-colis-input-group" key={field}>
                  <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                  <input
                    type="text"
                    id={field}
                    name={field}
                    value={colis[field]}
                    onChange={handleChange}
                    required
                  />
                </div>
              ))}
            </div>
            <div className="edit-colis-form-row">
              {['montant', 'depot', 'adresse'].map(field => (
                <div className="edit-colis-input-group" key={field}>
                  <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                  <input
                    type="text"
                    id={field}
                    name={field}
                    value={colis[field]}
                    onChange={handleChange}
                    required
                  />
                </div>
              ))}
              <div className="edit-colis-input-group">
                <label htmlFor="statut">Statut</label>
                <select
                  id="statut"
                  name="statut"
                  value={colis.statut}
                  onChange={handleChange}
                  required
                >
                  <option value="En Attente">En Attente</option>
                  <option value="En Livraison">En Livraison</option>
                  <option value="Livré">Livré</option>
                </select>
              </div>
            </div>
            <div className="edit-colis-input-group">
              <label htmlFor="livreurId">Livreur</label>
              <select
                id="livreurId"
                name="livreurId"
                value={colis.livreurId}
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
            <button type="submit" className="edit-colis-submit-btn">Mettre à jour</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditColis;
