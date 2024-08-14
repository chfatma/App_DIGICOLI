import React, { useState } from 'react';
/*import './PaiementCarte.css';*/

const PaimentCarte = () => {
  const [paymentMethod, setPaymentMethod] = useState('card');

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    alert(`Payment method selected: ${paymentMethod}`);
  };

  return (
    <div className="payment-container">
      <h2 className="payment-title">Select Payment Method</h2>
      <form onSubmit={handleSubmit} className="payment-form">
        <div className="payment-options">
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
            <label htmlFor="card">Pay by Card</label>
          </div>
          {paymentMethod === 'card' && (
            <div className="card-details">
              <label htmlFor="cardNumber">Card Number</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                placeholder="• • • •  • • • •  • • • •  • • • •"
                required
              />
              <div className="card-expiry-cvv">
                <div className="card-expiry">
                  <label htmlFor="expiryDate">Expiry Date</label>
                  <input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    placeholder="MM/YY"
                    required
                  />
                </div>
                <div className="card-cvv">
                  <label htmlFor="cvv">CVV</label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    placeholder="• • •"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          <div
            className={`payment-option ${paymentMethod === 'payOnPlace' ? 'active' : ''}`}
            onClick={() => handlePaymentMethodChange('payOnPlace')}
          >
            <input
              type="radio"
              id="payOnPlace"
              name="paymentMethod"
              checked={paymentMethod === 'payOnPlace'}
              onChange={() => handlePaymentMethodChange('payOnPlace')}
            />
            <label htmlFor="payOnPlace">Pay on Place (Cash on Delivery)</label>
          </div>
        </div>

        <button type="submit" className="submit-button">Confirm Payment</button>
      </form>
    </div>
  );
};
export default PaimentCarte;
