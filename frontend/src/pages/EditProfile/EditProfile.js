import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './EditProfile.css';

const EditProfile = () => {
  const { role, id } = useParams();  // eslint-disable-line no-unused-vars
  const [userDetails, setUserDetails] = useState(null);
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [motdepasse, setMotdepasse] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/auth/profile/${id}`, {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();
        if (response.ok) {
          setUserDetails(data);
          setNom(data.nom);
          setEmail(data.email);
        } else {
          alert(data.message);
        }
      } catch (error) {
        alert('An error occurred while fetching profile details.');
      }
    };

    fetchUserDetails();
  }, [id]);

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/api/auth/profile/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ nom, email, motdepasse }),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Profile updated successfully.');
        navigate('/Dashboard');
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert('An error occurred while updating profile details.');
    }
  };

  if (userDetails === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="edit-profile">
      <h2>Edit Profile</h2>
      <form onSubmit={handleUpdate}>
        <label>
          Name:
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={motdepasse}
            onChange={(e) => setMotdepasse(e.target.value)}
          />
        </label>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditProfile;
