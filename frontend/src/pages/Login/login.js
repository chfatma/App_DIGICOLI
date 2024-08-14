import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, motdepasse: password }), // Ensure field name matches backend
      });
      const data = await response.json();
  
      if (response.ok) {
        // Store user details in local storage
        localStorage.setItem('userId', data.user.id);
        localStorage.setItem('userRole', data.user.role);
        
        localStorage.setItem('userNom', data.user.nom);  // Add this line
        localStorage.setItem('userEmail', data.user.email); // Add this line



        // Store specific IDs for each role
        if (data.user.role === 'Superadmin') {
          localStorage.setItem('superadminId', data.user.superadminId);
          localStorage.removeItem('adminId');
          localStorage.removeItem('livreurId');
          localStorage.removeItem('clientId');
        } else if (data.user.role === 'Admin') {
          localStorage.setItem('adminId', data.user.adminId);
          localStorage.removeItem('superadminId');
          localStorage.removeItem('livreurId');
          localStorage.removeItem('clientId');
        } else if (data.user.role === 'Livreur') {
          localStorage.setItem('livreurId', data.user.livreurId);
          localStorage.removeItem('superadminId');
          localStorage.removeItem('adminId');
          localStorage.removeItem('clientId');
        } else if (data.user.role === 'Client') {
          localStorage.setItem('clientId', data.user.clientId);
          localStorage.removeItem('superadminId');
          localStorage.removeItem('adminId');
          localStorage.removeItem('livreurId');
        }
  
        // Verify stored values
        console.log('Stored userId:', localStorage.getItem('userId'));
        console.log('Stored userRole:', localStorage.getItem('userRole'));
        console.log('Stored superadminId:', localStorage.getItem('superadminId'));
        console.log('Stored adminId:', localStorage.getItem('adminId'));
        console.log('Stored livreurId:', localStorage.getItem('livreurId'));
        console.log('Stored clientId:', localStorage.getItem('clientId'));
  
        onLogin(data.user.role); // Pass the user role to parent component
        switch (data.user.role) {
          case 'Superadmin':
            navigate('/DashboardAdmin');
            break;
          case 'Admin':
            navigate('/dashboard');
            break;
          case 'Livreur':
            navigate('/DashboardLivreur');
            break;
          case 'Client':
            navigate('/DashboardClient');
            break;
          default:
            alert('Unknown role');
        }
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert('An error occurred during login. Please try again.');
    }
  };
  
  const handleSignUp = async (event) => {
    event.preventDefault();
    // Placeholder for sign-up action
    alert('Registration successful (placeholder action)');
    setIsSignUp(false);
  };

  return (
    <div className="login-page-renamed">
      <div className="card-renamed">
        <div className="form-container-renamed">
          {!isSignUp ? (
            <form className="form-renamed" onSubmit={handleLogin}>
              <h2>Sign In</h2>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <a href="/forgot-password" className="forgot-password-renamed">Forgot Password?</a>
              <button type="submit">Sign In</button>
            </form>
          ) : (
            <form className="form-renamed" onSubmit={handleSignUp}>
              <h2>Sign Up</h2>
              {/* Include sign-up fields here */}
              <button type="submit">Sign Up</button>
            </form>
          )}
        </div>
        <div className="form-toggle-renamed">
          <button onClick={toggleForm} className={!isSignUp ? 'active-renamed' : ''}>Sign In</button>
          <button onClick={toggleForm} className={isSignUp ? 'active-renamed' : ''}>Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
