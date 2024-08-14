import React, { useState } from 'react';
import './PaimentCash.css'; // Assurez-vous d'importer le fichier CSS

const PaimentCash = () => {
  const [paymentMethod, setPaymentMethod] = useState('cash');

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Méthode de paiement sélectionnée : ${paymentMethod === 'cash' ? 'Paiement en espèces' : 'Paiement par carte (TPE)'}`);
  };

  return (
    <div className="payment-container">
      <h2 className="payment-title">Choisissez votre Méthode de Paiement</h2>
      <form onSubmit={handleSubmit} className="payment-form">
        <div className="payment-options">
          <div
            className={`payment-option ${paymentMethod === 'cash' ? 'active' : ''}`}
            onClick={() => handlePaymentMethodChange('cash')}
          >
            <input
              type="radio"
              id="cash"
              name="paymentMethod"
              checked={paymentMethod === 'cash'}
              onChange={() => handlePaymentMethodChange('cash')}
            />
            <label htmlFor="cash">Payer en Espèces</label>
          </div>
          <div
            className={`payment-option ${paymentMethod === 'card' ? 'active' : ''}`}
            onClick={() => handlePaymentMethodChange('card')}
          >
            <input
              type="radio"
              id="card"
              name="paymentMethod"
              checked={paymentMethod === 'card'}
              onChange={() => handlePaymentMethodChange('card')}
            />
            <label htmlFor="card">Payer par Carte (TPE lors de la livraison)</label>
          </div>
        </div>

        <button type="submit" className="submit-button">Confirmer la Méthode de Paiement</button>
      </form>
    </div>
  );
};

export default PaimentCash;
