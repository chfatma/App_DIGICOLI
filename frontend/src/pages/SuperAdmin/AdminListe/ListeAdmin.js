import React, { useState, useEffect } from 'react';

const ListeAdmin = () => {
  const [admins, setAdmins] = useState([]);
  const [superadmins, setSuperadmins] = useState([]);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    dateDeNaissance: '',
    telephone: '',
    email: '',
    adresse: '',
    gouvernorat: '',
    role: 'admin',
    motdepasse: '',
    superadminId: ''
  });

  useEffect(() => {
    const fetchSuperadmins = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/superadmins');
        if (response.ok) {
          const data = await response.json();
          setSuperadmins(data);
        } else {
          console.error('Failed to fetch superadmins');
        }
      } catch (error) {
        console.error('Error fetching superadmins:', error);
      }
    };

    fetchSuperadmins();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const adminData = { ...formData, motdepasse: formData.nom + formData.telephone };

    try {
      const response = await fetch('http://localhost:3001/api/admins', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(adminData),
      });

      if (response.ok) {
        const newAdmin = await response.json();
        setAdmins([...admins, newAdmin]);
        setFormData({
          nom: '',
          prenom: '',
          dateDeNaissance: '',
          telephone: '',
          email: '',
          adresse: '',
          gouvernorat: '',
          role: 'admin',
          motdepasse: '',
          superadminId: ''
        });
      } else {
        const errorData = await response.json();
        console.error('Error from Backend:', errorData);
        if (errorData.error && errorData.error.errors) {
          errorData.error.errors.forEach(err => {
            console.error(`Validation error: ${err.message}`);
          });
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="admin-container">
      <div className="form-card">
        <div className="form-title">Ajouter Admin</div>
        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="grid-container">
            {/* Other form fields */}
            <div className="form-group">
              <label htmlFor="superadminId" className="form-label">Superadmin</label>
              <select
                id="superadminId"
                name="superadminId"
                value={formData.superadminId}
                onChange={handleChange}
                className="form-input"
                required
              >
                <option value="">Select Superadmin</option>
                {superadmins.map(superadmin => (
                  <option key={superadmin.id} value={superadmin.id}>
                    {superadmin.name}
                  </option>
                ))}
              </select>
            </div>
            {/* Other form fields */}
          </div>
          <button type="submit" className="submit-button">Ajouter</button>
        </form>
      </div>

      <div className="admin-list">
        {/* Display the list of admins */}
        {admins.map(admin => (
          <div key={admin.id} className="admin-item">
            {admin.nom} {admin.prenom}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListeAdmin;
