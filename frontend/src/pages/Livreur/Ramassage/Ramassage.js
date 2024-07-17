
import React from 'react';
import './Ramassage.css';

const Ramassage = () => {
  const pickups = [
    { client: 'test', date: '12/03/24', totalColis: 1, livreur: 'abir' },
    { client: 'test', date: '12/03/24', totalColis: 2, livreur: 'fatma' },
    { client: 'test', date: '12/03/24', totalColis: 8, livreur: 'test' },
    { client: 'test', date: '12/03/24', totalColis: 6, livreur: 'test' },
    { client: 'test', date: '12/03/24', totalColis: 36, livreur: 'test' },
     { client: 'test', date: '12/03/24', totalColis: 8, livreur: 'test' },
    { client: 'test', date: '12/03/24', totalColis: 6, livreur: 'test' },
    { client: 'test', date: '12/03/24', totalColis: 36, livreur: 'test' },
    
  ];

  return (
    <div className="ramassage-container">
      <h2>Ajouter PIKUP</h2>
      <div className="cards-container">
        <div className="form-card">
          <form>
            <div className="form-row">
              <div className="form-group">
                <label>CLIENT</label>
                <select>
                  <option value="fashion store">test</option>
                  <option value="bio products">test</option>
                </select>
              </div>
              <div className="form-group">
                <label>DATE</label>
                <input type="date" />
              </div>
              <div className="form-group">
                <label>TOTAL COLIS</label>
                <input type="number" />
              </div>
              <div className="form-group">
                <label>LIVREUR</label>
                <select>
                  <option value="ahmed">abir</option>
                  <option value="sami">fatma</option>
                
                </select>
              </div>
            </div>
            <button type="submit">Ajouter</button>
          </form>
        </div>
      </div>
      <h2>Liste des PIKUPS</h2>
      <div className="cards-container">
   
        <div className="table-card">
        <h2>PIKUPS</h2>
          <table>
            <thead>
              <tr>
                <th>Client</th>
                <th>Date</th>
                <th>Total Colis</th>
                <th>Livreur</th>
              </tr>
            </thead>
            <tbody>
              {pickups.map((pickup, index) => (
                <tr key={index}>
                  <td>{pickup.client}</td>
                  <td>{pickup.date}</td>
                  <td>{pickup.totalColis}</td>
                  <td>{pickup.livreur}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Ramassage;
