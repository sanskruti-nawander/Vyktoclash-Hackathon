import React from 'react';
import Footer from '../components/Footer.js'; // Correct the Footer component path
import CareerCounsellingImage from '../assets/images/cc.png'; // Correct the image path
import SkillGapImage from '../assets/images/skillgap.png'; // Correct the image path
import MockInterviewImage from '../assets/images/mockinterview.png'; // Correct the image path
import ConnectionsImage from '../assets/images/connections.png'; // Correct the image path
import RoadmapBgImage from '../assets/images/roadmapbg.png'; // Correct the image path

const RoadMap = () => {
  const styles = {
    container: {
      background: 'linear-gradient(to right, #ebf8ff, #c3dafe)',
      color: '#2d3748',
      minHeight: '100vh',
      margin: 0,
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: 1,
      padding: '2rem',
      textAlign: 'center',
    },
    image: {
      maxWidth: '100%',
      height: 'auto',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1>Career Roadmap</h1>
        <p>Plan your career with our comprehensive roadmap.</p>
        <img src={RoadmapBgImage} alt="Roadmap Background" style={styles.image} />
        <div>
          <img src={CareerCounsellingImage} alt="Career Counselling" style={styles.image} />
          <img src={SkillGapImage} alt="Skill Gap Analysis" style={styles.image} />
          <img src={MockInterviewImage} alt="Mock Interviews" style={styles.image} />
          <img src={ConnectionsImage} alt="Connections" style={styles.image} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RoadMap;