import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProfileEdit.css'; // Ensure this CSS file aligns with Navbar styles

const ProfileEdit = () => {
  const [user, setUser] = useState({
    nom: '',
    email: '',
    motdepasse: ''
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch user data from local storage
    const storedName = localStorage.getItem('userNom');
    const storedEmail = localStorage.getItem('userEmail');
    const storedPassword = ''; // Assuming password is not stored

    setUser({
      nom: storedName || '',
      email: storedEmail || '',
      motdepasse: storedPassword
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');
    try {
      const response = await axios.put(`http://localhost:3001/api/auth/profile`, {
        id: userId,
        nom: user.nom,
        email: user.email,
        motdepasse: user.motdepasse,
        role: localStorage.getItem('userRole').toLowerCase()
      });

      if (response.status === 200) {
        alert('Profile updated successfully');
      }
    } catch (error) {
      setError('An error occurred while updating profile');
    }
  };

  return (
    <div className="edit-client">
      <div className="edit-client-container">
        <div className="section-title">Edit Profile</div>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="input-group">
              <label htmlFor="nom">Nom:</label>
              <input
                type="text"
                id="nom"
                name="nom"
                value={user.nom}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={user.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="second-row">
            <div className="input-group">
              <label htmlFor="motdepasse">Password:</label>
              <input
                type="password"
                id="motdepasse"
                name="motdepasse"
                value={user.motdepasse}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEdit;
