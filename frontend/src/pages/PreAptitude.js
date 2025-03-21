import React from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useLocation and useNavigate from react-router-dom

import Footer from "../components/Footer.js"; // Correct the Footer component path
import StudentImage from "../assets/images/stu.png"; // Correct the image path
import UndergradImage from "../assets/images/underg.png"; // Correct the image path

const PreAptitude = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user;

  const handleCardClick = (userType) => {
    navigate(`/aptitude/${userType}`, { state: { userType, user } });
  };

  const styles = {
    container: {
      background: "linear-gradient(to right, #ebf8ff, #c3dafe)",
      color: "#2d3748",
      minHeight: "100vh",
      margin: 0,
      padding: 0,
      display: "flex",
      flexDirection: "column",
    },
    mainContent: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "2rem",
    },
    cardContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "40px", // Increased gap between cards
      width: "100%",
      maxWidth: "800px", // Adjusted width for two cards
    },
    card: {
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      backdropFilter: "blur(10px)",
      boxShadow:
        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      borderRadius: "0.5rem",
      padding: "2rem",
      textAlign: "center",
      flex: "1 1 45%", // Adjusted flex basis for two cards
      transition: "transform 0.3s ease",
      height: "550px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    cardContent: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
    },
    cardTitle: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      marginBottom: "1rem",
      color: "#4a5568",
    },
    cardDescription: {
      fontSize: "1rem",
      color: "#4a5568",
      marginBottom: "1rem",
    },
    button: {
      backgroundColor: "#4c51bf",
      color: "#ffffff",
      padding: "0.75rem 1.5rem",
      borderRadius: "0.5rem",
      cursor: "pointer",
      border: "none",
      fontSize: "1rem",
    },
    image: {
      width: "100%",
      height: "auto",
      marginBottom: "1rem",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.mainContent}>
        <div style={styles.cardContainer}>
          <div
            style={styles.card}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.1)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            onClick={() => handleCardClick("10th-grade-student")}
          >
            <div style={styles.cardContent}>
              <img src={StudentImage} alt="Student" style={styles.image} />
              <h3 style={styles.cardTitle}> Highly Suggested for Students</h3>
              <p style={styles.cardDescription}>
                Psychometric tests for 10th-passed students help identify their
                strengths, interests, and aptitudes, guiding them in selecting
                the right academic stream based on their abilities.
              </p>
              <button style={styles.button}>Give Aptitude Test</button>
            </div>
          </div>
          <div
            style={styles.card}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.1)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            onClick={() => handleCardClick("calculas-Student")}
          >
            <div style={styles.cardContent}>
              <img
                src={UndergradImage}
                alt="Undergraduate"
                style={styles.image}
              />
              <h3 style={styles.cardTitle}>
                Highly Suggested for Undergraduates
              </h3>
              <p style={styles.cardDescription}>
                Career fit assessments for graduates match their skills and
                interests with suitable job roles or internships, helping them
                find the best career opportunities.
              </p>
              <button style={styles.button}>Give Aptitude Test</button>
            </div>
          </div>
        </div>
      </div>
      <Footer /> {/* Use the Footer component */}
    </div>
  );
};

export default PreAptitude;
