import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Depot.css';

const states = [
  'Ariana', 'Beja', 'Ben Arous', 'Bizerte', 'Gabes', 'Gafsa', 'Jendouba', 'Kairouan',
  'Kasserine', 'Kebili', 'La Manouba', 'Mahdia', 'Manouba', 'Mednine', 'Medenine', 'Monastir',
  'Nabeul', 'Sfax', 'Sidi Bouzid', 'Siliana', 'Sousse', 'Tataouine', 'Tozeur', 'Tunis'
];

const apiBaseUrl = 'http://localhost:3001'; 

const Depot = () => {
  const [packageCounts, setPackageCounts] = useState(
    states.reduce((acc, state) => ({ ...acc, [state]: '' }), {})
  );


  useEffect(() => {
    const fetchPackageCounts = async () => {
      try {
        console.log('Fetching package counts');
        const adminId = localStorage.getItem('adminId');
        console.log('Admin ID:', adminId);

        const promises = states.map(async (state) => {
          const response = await axios.get(`${apiBaseUrl}/api/colis/admin/depot/count`, {
            params: { adminId, depot: state }
          });
          return { state, count: response.data.count };
        });

        const results = await Promise.all(promises);
        const counts = results.reduce((acc, { state, count }) => ({ ...acc, [state]: count }), {});
        setPackageCounts(counts);
      } catch (error) {
        console.error('Error fetching package counts:', error);
      }
    };

    fetchPackageCounts();
  }, []);

  return (
    <div className="depot-container">
      <h1 className="depot-heading">Dépot - Nombre de colis</h1>
      <div className="depot-cards">
        {states.map(state => (
          <div key={state} className="state-card">
            <h2 className="state-title">{state}</h2>
            <input
              type="number"
              value={packageCounts[state] ? packageCounts[state] : ''}
              placeholder={packageCounts[state] ? '' : 'Vide'}
              className="state-input"
              readOnly
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Depot;
