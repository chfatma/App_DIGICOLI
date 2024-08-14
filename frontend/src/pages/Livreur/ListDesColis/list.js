import React, { useState, useEffect } from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';
import './ListDesColis.css';
import ListDesColisFilter from './ListDesColisFilter';

const ListDesColis = () => {
  const [colisData, setColisData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const livreurId = localStorage.getItem('livreurId');
        if (!livreurId) {
          console.error('Livreur ID not found in local storage');
          return;
        }

        const response = await fetch(`http://localhost:3001/api/colis/livreur/${livreurId}`);
        if (response.ok) {
          const data = await response.json();
          setColisData(data);
          setFilteredData(data);
        } else {
          console.error('Failed to fetch colis data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching colis data:', error);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (option, date) => {
    let filtered = colisData;

    if (option !== 'Tout') {
      filtered = colisData.filter(colis => colis.statut === option);
    }

    if (date) {
      // Implement date filtering if needed
    }

    setFilteredData(filtered);
  };

  const handleUpdate = async (id, updatedColis) => {
    try {
      const response = await fetch(`http://localhost:3001/api/colis/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedColis),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setFilteredData(prevState =>
          prevState.map(colis => (colis.id === id ? updatedData : colis))
        );
      } else {
        console.error('Failed to update colis:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating colis:', error);
    }
  };

  const handleStatutChange = (id, newStatut) => {
    const colisToUpdate = filteredData.find(colis => colis.id === id);
    const updatedColis = { ...colisToUpdate, statut: newStatut };
    handleUpdate(id, updatedColis);
  };

  const handleSuiviChange = (id, newSuivi) => {
    const colisToUpdate = filteredData.find(colis => colis.id === id);
    const updatedColis = { ...colisToUpdate, suiviEmplacement: newSuivi };
    handleUpdate(id, updatedColis);
  };

  return (
    <div className="list-des-colis-container">
      <ListDesColisFilter onFilterChange={handleFilterChange} />
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
                <th>Suivi Emplacement</th> 
                <th>Statut</th>
                <th>Actions</th> 
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
                  <td>
                    <input
                      type="text"
                      value={colis.suiviEmplacement}
                      onChange={(e) => handleSuiviChange(colis.id, e.target.value)}
                    />
                  </td>
                  <td>
                    <select
                      value={colis.statut}
                      onChange={(e) => handleStatutChange(colis.id, e.target.value)}
                    >
                      <option value="livrais">Livrais</option>
                      <option value="en attente">En attente</option>
                      <option value="en cours">En cours</option>
                    </select>
                  </td>
                  <td>
                    <button className="edit-button-coliliv"
                      onClick={() => handleUpdate(colis.id, colis)}>
                        <MdEdit />
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

export default ListDesColis;
