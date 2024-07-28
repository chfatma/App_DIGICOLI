import React, { useState } from 'react';
import './SuiviColi.css';

function ClientPage() {
  const [codeId, setCodeId] = useState('');
  const [localisation, setLocalisation] = useState(null);

  const handleSearch = () => {
    // Appel à une API pour récupérer la localisation de la colis
    // Par exemple, en utilisant fetch ou Axios
    fetch(`https://api.example.com/colis/${codeId}`)
     .then(response => response.json())
     .then(data => setLocalisation(data.localisation));
  };

  return (
    <div className="container">
      <h2>Suivi de votre colis</h2>
      <form>
        <label>Code ID de la colis :</label>
        <input type="text" value={codeId} onChange={e => setCodeId(e.target.value)} />
        <button type="button" onClick={handleSearch}>Rechercher</button>
      </form>
      {localisation && (
        <div className="localisation-container">
          <h3>Localisation de votre colis :</h3>
          <div className="map">
            <div className="marker" style={{ top: '40%', left: '60%' }}>
              <i className="fas fa-map-marker-alt" />
            </div>
            <div className="localisation-text">
              <p>{localisation.ville}</p>
              <p>{localisation.station}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ClientPage;