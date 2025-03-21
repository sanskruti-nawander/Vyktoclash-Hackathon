import React from 'react';
import Header from '../components/Navbar.js'; // Correct the Header component path
import Footer from '../components/Footer.js'; 
export default function StudentDashboard () {
    const styles = {
        dashboard: {
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          fontFamily: 'Arial, sans-serif',
          margin: 0,
        },
        mainContentWrapper: {
          display: 'flex',
          flex: 1,
        },
        sidebar: {
          backgroundColor: '#f4f4fc',
          padding: '20px',
          width: '250px',
        },
        appTitle: {
          fontSize: '24px',
          color: '#6c63ff',
          marginBottom: '20px',
        },
        menu: {
          listStyle: 'none',
          padding: 0,
        },
        menuItem: {
          margin: '15px 0',
          cursor: 'pointer',
          color: '#333',
        },
        mainContent: {
          flex: 1,
          backgroundColor: '#ffffff',
          padding: '30px',
        },
        header: {
          textAlign: 'center',
          marginBottom: '30px',
        },
        headerTitle: {
          color: '#6c63ff',
        },
        content: {
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px',
        },
        section: {
          backgroundColor: '#f4f4fc',
          padding: '20px',
          borderRadius: '10px',
        },
        progressBarContainer: {
          backgroundColor: '#e0e0e0',
          borderRadius: '5px',
          height: '10px',
          width: '100%',
          marginBottom: '10px',
        },
        progress: {
          backgroundColor: '#6c63ff',
          height: '100%',
          borderRadius: '5px',
          width: '70%',
        },
        link: {
          color: '#6c63ff',
          textDecoration: 'none',
        },
        linkHover: {
          textDecoration: 'underline',
        },
      };
    
      return (
        <div style={styles.dashboard}>
          <Header /> {/* Use the Header component */}
          <div style={styles.mainContentWrapper}>
            {/* Sidebar */}
            <div style={styles.sidebar}>
              <h1 style={styles.appTitle}>CareerPath</h1>
              <ul style={styles.menu}>
                <li style={styles.menuItem}>Dashboard</li>
                <li style={styles.menuItem}>Aptitude Test</li>
                <li style={styles.menuItem}>Recommendations</li>
                <li style={styles.menuItem}>Resources</li>
                <li style={styles.menuItem}>Settings</li>
                <li style={styles.menuItem}>Help</li>
              </ul>
            </div>
    
            {/* Main Content */}
            <div style={styles.mainContent}>
              <div style={styles.header}>
                <h2 style={styles.headerTitle}>Welcome, Student!</h2>
                <p>Empowering you to make informed career decisions.</p>
              </div>
    
              <div style={styles.content}>
                {/* Activity and Progress Section */}
                <div style={styles.section}>
                  <h3 style={styles.headerTitle}>Your Progress</h3>
                  <div style={styles.progressBarContainer}>
                    <div style={styles.progress}></div>
                  </div>
                  <p>70% Aptitude Test Completed</p>
                </div>
    
                {/* Recommendations */}
                <div style={styles.section}>
                  <h3 style={styles.headerTitle}>Stream and Career Recommendations</h3>
                  <ul>
                    <li>Stream: Science</li>
                    <li>Potential Careers: Data Scientist, Doctor, Engineer</li>
                    <li>Skill-Building: Python Programming, Biology Research</li>
                  </ul>
                </div>
    
                {/* Learning Resources */}
                <div style={styles.section}>
                  <h3 style={styles.headerTitle}>Learning Resources</h3>
                  <ul>
                    <li>
                      <a
                        href="https://www.khanacademy.org/"
                        target="_blank"
                        rel="noreferrer"
                        style={styles.link}
                      >
                        Khan Academy
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.coursera.org/"
                        target="_blank"
                        rel="noreferrer"
                        style={styles.link}
                      >
                        Coursera
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.edx.org/"
                        target="_blank"
                        rel="noreferrer"
                        style={styles.link}
                      >
                        edX
                      </a>
                    </li>
                  </ul>
                </div>
    
                {/* Future Outlook */}
                <div style={styles.section}>
                  <h3 style={styles.headerTitle}>Future Outlook</h3>
                  <p>
                    Careers like Data Science require expertise in programming,
                    statistics, and machine learning. Invest time in skill-building
                    courses to prepare for these roles.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <Footer /> {/* Use the Footer component */}
        </div>
      );
    }
