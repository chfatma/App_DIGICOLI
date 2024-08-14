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
          throw new Error(`Failed to fetch livreur data: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Fetched livreur data:', data);
        setLivreurData(data);
      } catch (error) {
        console.error('Error fetching livreur data:', error);
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
        throw new Error(`Failed to fetch colis: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setColisData(data);
      setError('');
    } catch (error) {
      console.error('Error fetching colis:', error);
      setColisData(null);
      setError('Error fetching colis. Please check the code and try again.');
    }
  };

  const getLivreurName = (livreurId) => {
    console.log('Looking for Livreur with ID:', livreurId);
    const livreur = livreurData.find(livreur => livreur.id === Number(livreurId));
    console.log('Found Livreur:', livreur);
    return livreur ? `${livreur.nom} ${livreur.prenom}` : 'N/A';
  };

  return (
    <div className="container">
      <h2>Suivi de votre colis</h2>
      <form>
        <label>Code ID de la colis :</label>
        <input 
          type="text" 
          value={codeId} 
          onChange={e => setCodeId(e.target.value)} 
          placeholder="Entrez le code du colis"
        />
        <button 
          type="button" 
          onClick={handleSearch}
        >
          Rechercher
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
      {colisData && (
        <div className="localisation-container">
          <h3>Localisation de votre colis :</h3>
          <table>
            <tbody>
              <tr>
                <td><strong>Code:</strong></td>
                <td>{colisData.code}</td>
              </tr>
              <tr>
                <td><strong>Expéditeur:</strong></td>
                <td>{colisData.expediteur}</td>
              </tr>
              <tr>
                <td><strong>Destinataire:</strong></td>
                <td>{colisData.destinataire}</td>
              </tr>
              <tr>
                <td><strong>Téléphone:</strong></td>
                <td>{colisData.telephone}</td>
              </tr>
              <tr>
                <td><strong>Montant:</strong></td>
                <td>{colisData.montant}</td>
              </tr>
              <tr>
                <td><strong>Depot:</strong></td>
                <td>{colisData.depot}</td>
              </tr>
              <tr>
                <td><strong>Adresse:</strong></td>
                <td>{colisData.adresse}</td>
              </tr>
              <tr>
                <td><strong>Suivi Emplacement:</strong></td>
                <td>{colisData.suiviEmplacement}</td>
              </tr>
              <tr>
                <td><strong>Livreur:</strong></td>
                <td>{getLivreurName(colisData.livreurId)}</td>
              </tr>
              <tr>
                <td><strong>Statut:</strong></td>
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
