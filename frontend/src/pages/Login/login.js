import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  const handleLogin = (event) => {
    event.preventDefault();
 
    navigate('/dashboard');
  };

  const handleSignUp = (event) => {
    event.preventDefault();

    navigate('/dashboard');
  };

  return (
    <div className="logins-pages">
      <div className="crd">
        <div className="formes-toggles">
          <button onClick={toggleForm} className={!isSignUp ? 'active' : ''}>Sign In</button>
          <button onClick={toggleForm} className={isSignUp ? 'active' : ''}>Sign Up</button>
        </div>
        <div className="formes-container">
          {!isSignUp ? (
            <form className="formes" onSubmit={handleLogin}>
              <h2>Sign In</h2>
              <input type="email" placeholder="Email" required />
              <input type="password" placeholder="Password" required />
              <button type="submit">Sign In</button>
            </form>
          ) : (
            <form className="formes" onSubmit={handleSignUp}>
              <h2>Sign Up</h2>
              <input type="text" placeholder="First Name" required />
              <input type="text" placeholder="Last Name" required />
              <input type="email" placeholder="Email" required />
              <input type="password" placeholder="Password" required />
              <input type="password" placeholder="Confirm Password" required />
              <button type="submit">Sign Up</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
