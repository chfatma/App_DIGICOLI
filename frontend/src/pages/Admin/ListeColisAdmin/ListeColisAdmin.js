import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ListeColisAdmin.css';
import ListeColisAdminFilter from './ListeColisAdminFilter';
import qrCodeIcon from '../../../assets/qr-code.png';

const ListeColisAdmin = () => {
  const navigate = useNavigate();
  const [colisData, setColisData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  // Function to fetch colis data from the backend
  const fetchColisData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/colis');
      setColisData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error('Error fetching colis data:', error);
    }
  };

  useEffect(() => {
    fetchColisData();
  }, []);

  const handleFilterChange = (option, date) => {
    let filtered = colisData;

    if (option !== 'Tout') {
      filtered = colisData.filter(colis => colis.statut === option);
    }

    if (date) {
      // Apply date filtering if necessary
    }

    setFilteredData(filtered);
  };

  const handleQRCodeClick = (colis) => {
    navigate(`/QRCodeGenerator/${colis.id}`, { state: colis });
  };

  return (
    <div className="list-des-colis-container">
      <ListeColisAdminFilter onFilterChange={handleFilterChange} />
      <div className="colis-card">
        <div className="card-header">
          <span className="card-title">Liste des Colis</span>
        </div>
        <div className="table-container">
          <table className="colis-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Expéditeur</th>
                <th>Destinataire</th>
                <th>Téléphone</th>
                <th>Montant</th>
                <th>Dépôt</th>
                <th>Adresse</th>
                <th>Statut</th>
                <th>QR Code</th> {/* New column */}
              </tr>
            </thead>
            <tbody>
              {filteredData.map(colis => (
                <tr key={colis.id}>
                  <td>{colis.code}</td>
                  <td>{colis.expediteur}</td>
                  <td>{colis.destinataire}</td>
                  <td>{colis.telephone}</td>
                  <td>{colis.montant}</td>
                  <td>{colis.depot}</td>
                  <td>{colis.adresse}</td>
                  <td>{colis.statut}</td>
                  <td>
                    <button onClick={() => handleQRCodeClick(colis)}>
                      <img src={qrCodeIcon} alt="QR Code" style={{ width: '24px', height: '24px' }} /> {/* Set appropriate width and height */}
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

export default ListeColisAdmin;
