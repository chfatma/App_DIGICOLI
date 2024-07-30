// src/components/Login/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        // Store user data, including role
        sessionStorage.setItem('user', JSON.stringify(data.user));
        // Redirect based on role
        switch (data.role) {
          case 'admin':
            navigate('/DashboardAdmin');
            break;
          case 'client':
            navigate('/MenuClient');
            break;
          case 'super_admin':
            navigate('/DashboardAdmin');
            break;
          case 'livreur':
            navigate('/MenuLivreur');
            break;
          default:
            navigate('/dashboard');
        }
      } else {
        console.error('Login failed:', data.message);
        alert('Login failed. Please check your credentials and try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An unexpected error occurred. Please try again later.');
    }
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, firstName, lastName }),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Registration successful! Please login.');
        setIsSignUp(false);
      } else {
        alert('Registration failed. Please check your inputs.');
      }
    } catch (error) {
      console.error('Error during sign-up:', error);
    }
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
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
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
              <button type="submit">Sign Up</button>
            </form>
          )}
        </div>
        <div className="form-toggle-renamed">
          <button onClick={toggleForm} className={!isSignUp ? 'active-renamed' : ''}>Sign In</button>
          <button onClick={toggleForm} className={isSignUp ? 'active-renamed' : ''}>Sign Up</button>
        </div>
      </div>
      <FooterSection />
    </div>
  );
};

const FooterSection = () => {
  return (
    <div className="footerr">
      <p>&copy; 2024 Digicoli. All rights reserved.</p>
    </div>
  );
}

export default Login;
