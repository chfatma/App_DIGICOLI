import React, { useState } from 'react';
import './profil.css';

const Profil = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
    profileImage: 'profile-image-url' 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, profileImage: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  
  };

  return (
    <div className="profil-container">
      <h2>Modifier le Profil</h2>
      <form onSubmit={handleSubmit}>
        <div className="profile-image">
          <img src={formData.profileImage} alt="Profile" className="profile-image" />
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        <div className="form-group">
          <label>Prénom</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Nom</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Numéro de téléphone</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Adresse</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Mot de passe actuel</label>
          <input type="password" name="currentPassword" value={formData.currentPassword} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Nouveau mot de passe</label>
          <input type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Confirmer le nouveau mot de passe</label>
          <input type="password" name="confirmNewPassword" value={formData.confirmNewPassword} onChange={handleChange} />
        </div>
        <button type="submit" className="btn-save">Enregistrer</button>
      </form>
    </div>
  );
};

export default Profil;
