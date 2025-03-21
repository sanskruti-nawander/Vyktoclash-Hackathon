import React from 'react';
import loadingVideo from '../assets/Animations/LoadinAnimation1.mp4'; // Correct the path to your MP4 video file

const LoadingAnimation = () => {
  const styles = {
    video: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100vw',
      position: 'fixed',
      top: 0,
      left: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: Add a semi-transparent background
      zIndex: 1000, // Ensure the loading animation is on top
    },
  };

  return (
    <div style={styles.container}>
      <video style={styles.video} src={loadingVideo} autoPlay loop muted />
    </div>
  );
};

export default LoadingAnimation;