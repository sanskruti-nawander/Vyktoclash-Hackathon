import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroBgImage from '../../assets/images/herobg.png';
import MockInterviewImage from '../../assets/images/mockinterview.png'; // New mock interview image
import Footer from '../../components/Footer.js';
import appLogo from '../../assets/images/daan.png';

// Reusing styles from LandingPage
const headerStyle = {
  backgroundColor: 'rgba(76, 81, 191, 0.3)',
  backdropFilter: 'blur(10px)',
  color: '#ffffff',
  padding: '1rem',
  position: 'fixed',
  top: 0,
  width: '100%',
  zIndex: 1000,
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const navStyle = {
  display: 'flex',
  gap: '1.5rem',
};

const linkStyle = {
  textDecoration: 'none',
  color: '#ffffff',
  position: 'relative',
  padding: '0.5rem 1rem',
  borderRadius: '5px',
  transition: 'background-color 0.3s ease, transform 0.3s ease',
  cursor: 'pointer',
};

const linkHoverStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.4)',
  transform: 'scale(1.05)',
};

const heroSectionStyle = {
  textAlign: 'center',
  background: `url(${HeroBgImage}) no-repeat center center/cover`,
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const frostedGlassStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  backdropFilter: 'blur(10px)',
  borderRadius: '10px',
  padding: '2rem',
  maxWidth: '800px',
  margin: '0 auto',
};

const inputStyle = {
  width: '100%',
  padding: '0.75rem',
  marginBottom: '1rem',
  border: '1px solid #4c51bf',
  borderRadius: '0.5rem',
  fontSize: '1rem',
};

const buttonStyle = {
  backgroundColor: '#4c51bf',
  color: '#ffffff',
  padding: '0.75rem 2rem',
  borderRadius: '0.5rem',
  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  cursor: 'pointer',
  fontSize: '1rem',
  transition: 'transform 0.2s',
  width: '100%',
  border: 'none',
};

const Home = () => {
  const [jobRole, setJobRole] = useState('');
  const [techStack, setTechStack] = useState('');
  const [experience, setExperience] = useState('');
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/interview-questions', { 
      state: { 
        jobRole, 
        techStack, 
        experience 
      } 
    });
  };

  return (
    <div style={{ background: 'linear-gradient(to right, #ebf8ff, #c3dafe)', color: '#2d3748', minHeight: '100vh', margin: 0, padding: 0 }}>
      <header style={headerStyle}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={appLogo} alt="Udaan Logo" style={{ width: '100px', height: 'auto', marginRight: '1rem' }} />
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>उड़ान</h1>
        </div>
        <nav style={navStyle}>
          <span
            style={linkStyle}
            onClick={() => handleNavigation('/ExploreCareerOptions')}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = linkHoverStyle.backgroundColor;
              e.currentTarget.style.transform = linkHoverStyle.transform;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.transform = 'none';
            }}
          >
            Career Library
          </span>
          <span
            style={linkStyle}
            onClick={() => handleNavigation('/contact')}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = linkHoverStyle.backgroundColor;
              e.currentTarget.style.transform = linkHoverStyle.transform;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.transform = 'none';
            }}
          >
            Contact
          </span>
          <span
            style={linkStyle}
            onClick={() => handleNavigation('/login')}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = linkHoverStyle.backgroundColor;
              e.currentTarget.style.transform = linkHoverStyle.transform;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.transform = 'none';
            }}
          >
            Login
          </span>
        </nav>
      </header>

      <section style={heroSectionStyle}>
        <div style={frostedGlassStyle}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
            <img 
              src={MockInterviewImage} 
              alt="Mock Interview" 
              style={{ width: '150px', height: '150px', marginRight: '2rem' }} 
            />
            <div>
              <h2 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                Mock Interview Simulator
              </h2>
              <p style={{ fontSize: '1.125rem', color: '#2d3748', fontWeight: 'bold' }}>
                Prepare for your dream job with personalized interview practice
              </p>
            </div>
          </div>
          
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Job Role (e.g., Software Engineer)"
              value={jobRole}
              onChange={(e) => setJobRole(e.target.value)}
              required
              style={inputStyle}
            />
            <input
              type="text"
              placeholder="Tech Stack (e.g., React, Python)"
              value={techStack}
              onChange={(e) => setTechStack(e.target.value)}
              required
              style={inputStyle}
            />
            <input
              type="number"
              placeholder="Experience (years)"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              required
              style={inputStyle}
            />
            <button 
              type="submit" 
              style={{
                ...buttonStyle,
                ':hover': {
                  transform: 'scale(1.05)',
                }
              }}
            >
              Start Mock Interview
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;