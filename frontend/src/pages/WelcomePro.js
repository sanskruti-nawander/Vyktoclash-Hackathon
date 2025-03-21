import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import appLogo from '../assets/images/daan.png';

const ProfessionalWelcome = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('Guest');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      setUser(currentUser);
      fetchUserName(currentUser.uid);
    }
  }, []);

  const fetchUserName = async (uid) => {
    const db = getFirestore();
    const userDoc = doc(db, 'users', uid);
    const userSnap = await getDoc(userDoc);
    if (userSnap.exists()) {
      setUserName(userSnap.data().displayName || userSnap.data().email);
    }
  };

  const handleGetStartedClick = () => {
    navigate('/professional-form');
  };

  return (
    <div style={styles.container}>
      <Sidebar />
      <div style={styles.content}>
        <img src={appLogo} alt="App Logo" style={styles.logo} />
        <h1 style={styles.welcomeText}>Welcome, {userName}!</h1>
        <p style={styles.subText}>Let's get started to explore your professional journey. Kindly upload resume to begin</p>
        <button style={styles.button} onClick={handleGetStartedClick}>
          Get Started
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    backgroundColor: '#f0f4f8',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    fontFamily: "'Roboto', sans-serif",
    textAlign: 'center',
    marginLeft: '250px', // Adjust margin to account for the sidebar
    width: '100%',
  },
  logo: {
    width: '120px',
    marginBottom: '20px',
  },
  welcomeText: {
    fontSize: '2rem',
    fontWeight: 'bold',
    margin: '10px 0',
    color: '#333',
  },
  subText: {
    fontSize: '1.2rem',
    color: '#555',
    marginBottom: '20px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
};

export default ProfessionalWelcome;