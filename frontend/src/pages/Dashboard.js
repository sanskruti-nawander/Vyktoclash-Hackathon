import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar'; // Adjust the path as necessary
import { Card, Grid, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend } from 'chart.js';
import { getAuth } from 'firebase/auth'; // Import Firebase Auth to get current user
import { getFirestore, doc, getDoc } from 'firebase/firestore'; // Import Firestore functions
import { motion } from 'framer-motion';
import { Tilt } from 'react-tilt';
import dbmockImage from '../assets/images/mobutton.png';
import dbcommImage from '../assets/images/cummbutton.png';
import skillButtonImage from '../assets/images/scolarshipbg2.jpg';
import appLogo from '../assets/images/applogo.png';
import ChatBot from '../components/Chatbot';

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend);

const getDaysInMonth = (month, year) => {
  const date = new Date(year, month, 1);
  const days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [aptitudeClicked, setAptitudeClicked] = useState(false);
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState('Guest');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true); // Add state for sidebar collapsed

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

  const styles = {
    container: {
      display: 'flex',
      background: 'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)',
      minHeight: '100vh',
    },
    sidebarContainer: {
      flexShrink: 0,
      width: isSidebarCollapsed ? '80px' : '250px',
      transition: 'width 0.3s ease-in-out',
    },
    contentContainer: {
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
      padding: '2.5rem',
      margin: '2rem',
      marginLeft: isSidebarCollapsed ? '2rem' : '0', // Add left margin when collapsed
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '20px',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
      transition: 'all 0.3s ease-in-out',
      width: isSidebarCollapsed 
        ? 'calc(100% - 80px - 4rem)' 
        : 'calc(100% - 250px - 4rem)', // Adjust width based on sidebar state
    },
    card: {
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '16px',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      marginBottom: '1rem',
      cursor: 'pointer',
      transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
      '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: '0 12px 48px rgba(59, 130, 246, 0.15)',
      },
      position: 'relative',
      paddingBottom: '56.25%', // 16:9 aspect ratio
      height: 0,
    },
    appCardContent: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '1rem',
    },
    appLogo: {
      width: '50%',
      height: 'auto',
      marginBottom: '1rem',
    },
    mockInterviewCard: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: `url(${dbmockImage}) no-repeat center center`,
      backgroundSize: 'cover',
      borderRadius: '16px',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      marginBottom: '1rem',
      cursor: 'pointer',
      transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
      '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: '0 12px 48px rgba(59, 130, 246, 0.15)',
      },
      position: 'relative',
      paddingBottom: '56.25%', // 16:9 aspect ratio
      height: 0,
    },
    communityCard: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: `url(${dbcommImage}) no-repeat center center`,
      backgroundSize: 'cover',
      borderRadius: '16px',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      marginBottom: '1rem',
      cursor: 'pointer',
      transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
      '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: '0 12px 48px rgba(59, 130, 246, 0.15)',
      },
      position: 'relative',
      paddingBottom: '56.25%', // 16:9 aspect ratio
      height: 0,
    },
    skillGapCard: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: `url(${skillButtonImage}) no-repeat center center`,
      backgroundSize: 'cover',
      borderRadius: '16px',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      marginBottom: '1rem',
      cursor: 'pointer',
      transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
      '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: '0 12px 48px rgba(59, 130, 246, 0.15)',
      },
      position: 'relative',
      paddingBottom: '56.25%', // 16:9 aspect ratio
      height: 0,
    },
    infoContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '1rem',
    },
    infoText: {
      textAlign: 'center',
      color: '#1F2937',
      marginTop: '1rem',
    },
  };

  const handleCareerAnalysisClick = () => {
    navigate('/community');
  };

  const handleMockInterviewClick = () => {
    navigate('/interview-landing');
  };

  const handleResultsClick = () => {
    navigate('/ResultsPage');
  };

  const handleSkillGapTestClick = () => {
    const userDetails = user ? { displayName: user.displayName, email: user.email, uid: user.uid } : null;
    navigate('/scholarship', { state: { user: userDetails } });
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebarContainer}>
        <Sidebar 
          userName={userName} 
          isCollapsed={isSidebarCollapsed} 
          setIsCollapsed={setIsSidebarCollapsed} 
        />
      </div>
      <div style={styles.contentContainer}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: '#1F2937' }}>
          Dashboard
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Card style={styles.communityCard} onClick={handleCareerAnalysisClick} />
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Card style={styles.mockInterviewCard} onClick={handleMockInterviewClick} />
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Card style={styles.skillGapCard} onClick={handleSkillGapTestClick} />
            </motion.div>
          </Grid>
        </Grid>
      </div>
      <ChatBot />
    </div>
  );
};

export default Dashboard;