import React, { useState, useEffect } from 'react';
import careersData from '../assets/json/200_careers_dataset.json'; // Adjust the path as necessary
import { FaSearch, FaTimes } from 'react-icons/fa';

const ExploreCareerOptions = () => {
  const [careers, setCareers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBarVisible, setSearchBarVisible] = useState(false);

  useEffect(() => {
    // Fetch the careers data from the JSON file
    setCareers(careersData);
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const toggleSearchBar = () => {
    setSearchBarVisible(!searchBarVisible);
  };

  const filteredCareers = careers.filter((career) =>
    career.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const styles = {
    container: {
      padding: '2rem',
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: '10px',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      margin: '2rem auto',
      maxWidth: '1200px',
      fontFamily: 'Arial, sans-serif',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2rem',
    },
    searchBar: {
      display: searchBarVisible ? 'block' : 'none',
      position: 'absolute',
      right: '2rem',
      top: '2rem',
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: '10px',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      padding: '0.5rem',
    },
    searchInput: {
      border: 'none',
      outline: 'none',
      padding: '0.5rem',
      borderRadius: '5px',
      width: '200px',
    },
    searchIcon: {
      cursor: 'pointer',
      marginLeft: '1rem',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '2rem',
    },
    careerCard: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: '10px',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      padding: '1rem',
      cursor: 'pointer',
      transition: 'transform 0.3s ease, background-color 0.3s ease',
    },
    careerCardHover: {
      transform: 'scale(1.05)',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    careerDetails: {
      display: 'none',
      transition: 'display 0.3s ease',
    },
    careerDetailsHover: {
      display: 'block',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Explore Career Options</h1>
        <FaSearch style={styles.searchIcon} onClick={toggleSearchBar} />
      </div>
      <div style={styles.searchBar}>
        <FaTimes style={styles.searchIcon} onClick={toggleSearchBar} />
        <input
          type="text"
          placeholder="Search careers..."
          value={searchTerm}
          onChange={handleSearch}
          style={styles.searchInput}
        />
      </div>
      <div style={styles.grid}>
        {filteredCareers.map((career) => (
          <div
            key={career.id}
            style={styles.careerCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = styles.careerCardHover.transform;
              e.currentTarget.style.backgroundColor = styles.careerCardHover.backgroundColor;
              e.currentTarget.querySelector('.career-details').style.display = styles.careerDetailsHover.display;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.querySelector('.career-details').style.display = styles.careerDetails.display;
            }}
          >
            <h2>{career.name}</h2>
            <div className="career-details" style={styles.careerDetails}>
              <p><strong>Scope:</strong> {career.scope}</p>
              <p><strong>Skills Required:</strong> {career.skills_required ? career.skills_required.join(', ') : 'N/A'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreCareerOptions;