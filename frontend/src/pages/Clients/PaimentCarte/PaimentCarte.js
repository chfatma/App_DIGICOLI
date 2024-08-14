import React from 'react';
import './PaimentCarte.css'; // Assurez-vous d'importer le fichier CSS

const PaimentCarte = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Méthode de paiement sélectionnée : Paiement par carte');
  };

  return (
    <div className="payment-container">
      <h2 className="payment-title">Payer par Carte</h2>
      <form onSubmit={handleSubmit} className="payment-form">
        <div className="card-details">
          <label htmlFor="cardNumber">Numéro de Carte</label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            placeholder="•••• •••• •••• ••••"
            required
          />
          <div className="card-expiry-cvv">
            <div className="card-expiry">
              <label htmlFor="expiryDate">Date d'Expiration</label>
              <input
                type="text"
                id="expiryDate"
                name="expiryDate"
                placeholder="MM/AA"
                required
              />
            </div>
            <div className="card-cvv">
              <label htmlFor="cvv">CVV</label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                placeholder="•••"
                required
              />
            </div>
          </div>
        </div>

        <button type="submit" className="submit-button">Confirmer le Paiement</button>
      </form>
    </div>
  );
};

export default PaimentCarte;
