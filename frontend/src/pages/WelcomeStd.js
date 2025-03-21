import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import applogo from '../assets/images/applogo.png';
import Sidebar from '../components/Sidebar';
 // Import Firebase Auth to get current user
import { getFirestore, doc, getDoc } from 'firebase/firestore';


const Welcome = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('Guest');
  const [user, setUser] = useState(null); // Add state for user
  const [aptitudeClicked, setAptitudeClicked] = useState(false);
    useEffect(() => {
    // Fetch the currently logged-in user's details from Firebase Authentication
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
      setUserName(userSnap.data().displayName);
    }
  };

  const handleAptitudeClick = () => {
    if (!aptitudeClicked) {
      setAptitudeClicked(true);
      // Pass only necessary user details to avoid cloning issues
      const userDetails = user ? { displayName: user.displayName, email: user.email, uid: user.uid } : null;
      // Redirect to /preaptitude with user details
      navigate('/preaptitude', { state: { user: userDetails } });
    }
  };

  return (
    <div style={styles.container}>
      <Sidebar />
      <div style={styles.content}>
        <img src={applogo} alt="App Logo" style={styles.logo} />
        <h1 style={styles.welcomeText}>Welcome, {userName}!</h1>
        <p style={styles.subText}>Let's get started to know more about you. Lets take your psycometric test</p>
        <button style={styles.button} onClick={handleAptitudeClick}>
          psycometric test
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

export default Welcome;