import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, signInWithEmailAndPassword } from '../firebase';
import HeroBgImage from '../assets/images/herobg.png';
import appLogo from '../assets/images/daan.png';

// Loader styles
const loaderStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 2000,
};

const spinnerStyle = {
  width: '3rem',
  height: '3rem',
  border: '4px solid rgba(76, 81, 191, 0.3)',
  borderTop: '4px solid #4c51bf',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
};

// Add keyframes for animation in the same file
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`, styleSheet.cssRules.length);

const headerStyle = {
  backgroundColor: 'rgba(76, 81, 191, 0.3)',
  backdropFilter: 'blur(10px)',
  color: '#ffffff',
  padding: '1rem',
  position: 'fixed',
  top: 1,
  width: '100%',
  zIndex: 1000,
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Show loader

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      setSuccess('Login successful!');
      setError('');
      setIsLoading(false); // Hide loader
      navigate('/dashboard', { state: { userId: user.uid } });
    } catch (error) {
      setError('Login failed. Please try again.');
      setSuccess('');
      setIsLoading(false); // Hide loader
    }
  };

  return (
    <div style={{ background: 'linear-gradient(to right, #ebf8ff, #c3dafe)', color: '#2d3748', minHeight: '100vh', margin: 0, padding: 0 }}>
      {/* Loader */}
      {isLoading && (
        <div style={loaderStyle}>
          <div style={spinnerStyle}></div>
        </div>
      )}

      <header style={headerStyle}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={appLogo} alt="Udaan Logo" style={{ width: '100px', height: 'auto', marginRight: '1rem' }} />
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>उड़ान</h1>
        </div>
        <nav style={{ display: 'flex', gap: '1.5rem' }}>
          <span
            style={{
              textDecoration: 'none',
              color: '#ffffff',
              position: 'relative',
              padding: '0.5rem 1rem',
              borderRadius: '5px',
              transition: 'background-color 0.3s ease, transform 0.3s ease',
              cursor: 'pointer',
            }}
            onClick={() => handleNavigation('/ExploreCareerOptions')}
          >
            Career Library
          </span>
          <span
            style={{
              textDecoration: 'none',
              color: '#ffffff',
              position: 'relative',
              padding: '0.5rem 1rem',
              borderRadius: '5px',
              transition: 'background-color 0.3s ease, transform 0.3s ease',
              cursor: 'pointer',
            }}
            onClick={() => handleNavigation('/contact')}
          >
            Contact
          </span>
        </nav>
      </header>

      <section
        style={{
          textAlign: 'center',
          background: `url(${HeroBgImage}) no-repeat center center/cover`,
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            borderRadius: '10px',
            padding: '2rem',
            width: '100%',
            maxWidth: '400px',
            margin: '0 auto',
          }}
        >
          <h2
            style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              marginBottom: '1.5rem',
              color: '#2d3748',
            }}
          >
            Login to Your Account
          </h2>

          {error && (
            <div
              style={{
                backgroundColor: '#FED7D7',
                color: '#9B2C2C',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                marginBottom: '1rem',
              }}
            >
              {error}
            </div>
          )}

          {success && (
            <div
              style={{
                backgroundColor: '#C6F6D5',
                color: '#22543D',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                marginBottom: '1rem',
              }}
            >
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                marginBottom: '1rem',
                border: '1px solid #CBD5E0',
                borderRadius: '0.5rem',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
              }}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                marginBottom: '1rem',
                border: '1px solid #CBD5E0',
                borderRadius: '0.5rem',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
              }}
              required
            />
            <button
              type="submit"
              style={{
                backgroundColor: '#4c51bf',
                color: '#ffffff',
                padding: '0.75rem 2rem',
                borderRadius: '0.5rem',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                cursor: 'pointer',
                fontSize: '1rem',
                width: '100%',
                transition: 'transform 0.2s',
              }}
            >
              Login
            </button>
          </form>
          <p
            style={{
              marginTop: '1rem',
              fontSize: '0.875rem',
              color: '#4A5568',
              textAlign: 'center',
            }}
          >
            Don't have an account?
            <span
              onClick={() => handleNavigation('/signup')}
              style={{
                color: '#4c51bf',
                marginLeft: '0.5rem',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
            >
              Sign Up
            </span>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Login;
