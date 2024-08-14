import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Paiement.css';

const Paiement = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState(null);

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    if (method === 'cash') {
      navigate('/PaiementCash');
    } else if (method === 'card') {
      navigate('/PaiementCarte');
    }
  };

  return (
    <div className="payment-container">
      <h2 className="payment-title">Choisissez votre méthode de paiement</h2>
      <div className="payment-options">
        <button className="payment-option cash-option" onClick={() => handlePaymentMethodChange('cash')}>
          <i className="fas fa-dollar-sign"></i>
          <div className="payment-description1">
            <p>Cash on delivery</p>
            <p>Vous payez lors de la livraison de votre commande</p>
          </div>
          Paiement comptant à la livraison
        </button>
        <button className="payment-option card-option" onClick={() => handlePaymentMethodChange('card')}>
          <i className="fas fa-credit-card"></i>
          <div className="payment-description2">
            <p>Paiement en ligne par votre carte</p>
          </div>
          Paiement par Carte
          <i className="fas fa-chevron-right arrow-icon"></i> {/* Arrow icon added */}
        </button>
      </div>
      <footer className="payment-footer">
        © 1996-2024, DigiColi, Inc. ou ses affiliés
      </footer>
    </div>
  );
};

export default Paiement;
