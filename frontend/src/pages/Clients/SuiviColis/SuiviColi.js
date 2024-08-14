import React, { useState, useEffect } from 'react';
import './SuiviColi.css';

function ClientPage() {
  const [codeId, setCodeId] = useState('');
  const [colisData, setColisData] = useState(null);
  const [livreurData, setLivreurData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLivreurData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/livreurs');
        if (!response.ok) {
          throw new Error(`Échec de la récupération des données du livreur : ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Données du livreur récupérées :', data);
        setLivreurData(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données du livreur :', error);
        setLivreurData([]);
        setError(error.message);
      }
    };

    fetchLivreurData();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/colis/code/${codeId}`);
      if (!response.ok) {
        throw new Error(`Échec de la récupération du colis : ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setColisData(data);
      setError('');
    } catch (error) {
      console.error('Erreur lors de la récupération du colis :', error);
      setColisData(null);
      setError('Erreur lors de la récupération du colis. Veuillez vérifier le code et réessayer.');
    }
  };

  const getLivreurName = (livreurId) => {
    console.log('Recherche du livreur avec l\'ID :', livreurId);
    const livreur = livreurData.find(livreur => livreur.id === Number(livreurId));
    console.log('Livreur trouvé :', livreur);
    return livreur ? `${livreur.nom} ${livreur.prenom}` : 'N/A';
  };

  return (
    <div className="container">
      <div className="add-suivi-card-header">
        <span className="add-suivi-card-title">Suivi de votre colis</span>
      </div>
      <form>
        <label>Code ID du colis :</label>
        <input 
          type="text" 
          value={codeId} 
          onChange={e => setCodeId(e.target.value)} 
          placeholder="Entrez le code du colis"
        />
        <div className="buttonREch">
        <button 
          type="button" 
          onClick={handleSearch}
        >
          Rechercher
        </button>
        </div>
      </form>
      {error && <div className="error-message">{error}</div>}
      {colisData && (
        <div className="localisation-container">
          <h3>Localisation de votre colis :</h3>
          <table>
            <tbody>
              <tr>
                <td><strong>Code :</strong></td>
                <td>{colisData.code}</td>
              </tr>
              <tr>
                <td><strong>Suivi de l'emplacement :</strong></td>
                <td>{colisData.suiviEmplacement}</td>
              </tr>
              <tr>
                <td><strong>Expéditeur :</strong></td>
                <td>{colisData.expediteur}</td>
              </tr>
              <tr>
                <td><strong>Destinataire :</strong></td>
                <td>{colisData.destinataire}</td>
              </tr>
              <tr>
                <td><strong>Téléphone :</strong></td>
                <td>{colisData.telephone}</td>
              </tr>
              <tr>
                <td><strong>Montant :</strong></td>
                <td>{colisData.montant}</td>
              </tr>
              <tr>
                <td><strong>Dépôt :</strong></td>
                <td>{colisData.depot}</td>
              </tr>
              <tr>
                <td><strong>Adresse :</strong></td>
                <td>{colisData.adresse}</td>
              </tr>
              <tr>
                <td><strong>Livreur :</strong></td>
                <td>{getLivreurName(colisData.livreurId)}</td>
              </tr>
              <tr>
                <td><strong>Statut :</strong></td>
                <td>{colisData.statut}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ClientPage;
