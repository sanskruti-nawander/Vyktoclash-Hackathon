import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const styles = {
    header: {
      backgroundColor: 'rgba(76, 81, 191, 0.3)', // Purple shade for the background color
      backdropFilter: 'blur(10px)',
      color: '#ffffff',
      padding: '1rem',
      position: 'fixed',
      top: 0,
      width: '100%',
      zIndex: 1000,
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 1.5rem',
    },
    title: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
    },
    nav: {
      display: 'flex',
      gap: '1.5rem',
    },
    link: {
      textDecoration: 'none',
      color: '#ffffff',
      position: 'relative',
      padding: '0.5rem 1rem',
      borderRadius: '5px',
      transition: 'background-color 0.3s ease, transform 0.3s ease',
      cursor: 'pointer',
    },
    linkHover: {
      backgroundColor: 'rgba(255, 255, 255, 0.4)', // Darker shade for the hover effect
      transform: 'scale(1.05)',
    },
    '@media (max-width: 768px)': {
      container: {
        flexDirection: 'column',
        alignItems: 'flex-start',
      },
      nav: {
        flexDirection: 'column',
        gap: '1rem',
      },
    },
  };

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <h1 style={styles.title}>Career Pathfinder AI</h1>
        <nav>
          <ul style={styles.nav}>
            <li>
              <span
                style={styles.link}
                onClick={() => handleNavigation('/career-library')}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = styles.linkHover.backgroundColor;
                  e.currentTarget.style.transform = styles.linkHover.transform;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                Career Library
              </span>
            </li>
            <li>
              <span
                style={styles.link}
                onClick={() => handleNavigation('/contact')}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = styles.linkHover.backgroundColor;
                  e.currentTarget.style.transform = styles.linkHover.transform;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                Contact
              </span>
            </li>
            <li>
              <span
                style={styles.link}
                onClick={() => handleNavigation('/login')}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = styles.linkHover.backgroundColor;
                  e.currentTarget.style.transform = styles.linkHover.transform;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                Login
              </span>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}