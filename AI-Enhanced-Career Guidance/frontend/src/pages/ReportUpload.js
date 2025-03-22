import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import Sidebar from '../components/Sidebar';
import CareerOpeepsImage from '../assets/images/CareerOpeeps.png';
import { CheckCircle } from 'lucide-react';

const ReportUpload = () => {
  const [file, setFile] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [roadmap, setRoadmap] = useState('');
  const [selectedRecommendation, setSelectedRecommendation] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    } else {
      alert('Please upload a PDF file.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('report', file);

    try {
      const response = await axios.post(
        'http://localhost:3001/generateRecommendations',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setRecommendations(response.data.career_recommendations);
    } catch (error) {
      console.error('Error uploading report:', error);
      alert('Error generating recommendations. Please try again.');
    }
  };

  const cleanJsonString = (jsonString) => {
    return jsonString
      .replace(/```json\n/g, '')
      .replace(/```/g, '')
      .replace(/\n/g, '');
  };

  const handlePursueCareer = async (rec) => {
    try {
      if (rec.role === '10th grade student') {
        const response = await axios.post('http://localhost:3001/generate-roadmap-student', {
          career: rec.career,
          role: rec.role,
          reason: rec.reason
        });

        if (!response.data || !response.data.roadmap) {
          throw new Error('No roadmap data received');
        }

        const roadmapData = response.data.roadmap;
        let parsedRoadmap;

        try {
          if (typeof roadmapData === 'string') {
            const cleanJson = cleanJsonString(roadmapData);
            parsedRoadmap = JSON.parse(cleanJson);
          } else {
            parsedRoadmap = roadmapData;
          }

          console.log('Parsed Roadmap:', parsedRoadmap);
          setRoadmap(parsedRoadmap);
          setSelectedRecommendation(rec);
        } catch (error) {
          console.error('Error parsing roadmap data:', error);
          alert('Error processing roadmap data. Please try again.');
        }
      } else if (rec.role === 'Graduate' || rec.role === 'Undergraduate') {
        const response = await axios.post('http://localhost:3001/generate-roadmap-graduate', {
          career: rec.career
        });

        const roadmapData = response.data.roadmap;
        let parsedRoadmap;

        try {
          if (typeof roadmapData === 'string') {
            const cleanJson = cleanJsonString(roadmapData);
            parsedRoadmap = JSON.parse(cleanJson);
          } else {
            parsedRoadmap = roadmapData;
          }

          console.log('Parsed Roadmap:', parsedRoadmap);
          setRoadmap(parsedRoadmap);
          setSelectedRecommendation(rec);
        } catch (error) {
          console.error('Error parsing roadmap data:', error);
          alert('Error processing roadmap data. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error generating roadmap:', error);
      alert('Error generating roadmap. Please try again.');
    }
  };

  // Find the highest rated career path
  const highestRatedCareer = recommendations.reduce((max, rec) => {
    return rec.Rating > max.Rating ? rec : max;
  }, { Rating: -1 });

  return (
    <div style={styles.container}>
      <Sidebar userName="User" />
      <div style={styles.content}>
        <Box gridColumn="1 / span 3">
          <img src={CareerOpeepsImage} alt="Career Options" style={styles.image} />
        </Box>
        <Box gridColumn="1 / span 3">
          <Card style={styles.card}>
            <div style={styles.cardHeader}>
              <Typography variant="h6" style={styles.careerName}>
                Upload Your Report
              </Typography>
            </div>
            <CardContent style={styles.cardContent}>
              <form onSubmit={handleSubmit}>
                <input type="file" accept="application/pdf" onChange={handleFileChange} />
                <Button type="submit" variant="contained" style={styles.button}>
                  Upload
                </Button>
              </form>
            </CardContent>
          </Card>
        </Box>
        {recommendations.map((rec, index) => (
          <Box key={index}>
            <Card style={styles.card}>
              <div style={styles.cardHeader}>
                <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
                  <Typography variant="h6" style={styles.careerName}>
                    {rec.career}
                  </Typography>
                  <Typography variant="body2" style={styles.rating}>
                    Rating: {rec.Rating}
                  </Typography>
                </Box>
              </div>
              <CardContent style={styles.cardContent}>
                <Typography variant="body2">{rec.reason}</Typography>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Button
                    variant="contained"
                    style={styles.button}
                    onClick={() => handlePursueCareer(rec)}
                  >
                    I want to pursue this career
                  </Button>
                  {rec.career === highestRatedCareer.career && (
                    <Typography variant="body2" style={styles.mostSuitable}>
                      Most Suitable Path
                    </Typography>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}
        {roadmap && selectedRecommendation && (
          <Box gridColumn="1 / span 3" width="100%">
            <Card style={styles.card}>
              <div style={styles.cardHeader}>
                <Typography variant="h6">Career Roadmap for {selectedRecommendation.career}</Typography>
              </div>
              <CardContent style={styles.cardContent}>
                {roadmap.careerRoadmap && roadmap.careerRoadmap.phases ? (
                  roadmap.careerRoadmap.phases.map((phase, index) => (
                    <div key={index} className="flex flex-col md:flex-row mb-8 border-b pb-8 last:border-b-0">
                      <div className="md:w-1/3 pr-4 mb-4 md:mb-0">
                        <div className="flex items-center">
                          <CheckCircle className="mr-3 text-blue-500" size={24} />
                          <h2 className="text-2xl font-semibold text-gray-800">
                            Stage {index + 1}: {phase.phaseName}
                          </h2>
                        </div>
                      </div>
                      <div className="md:w-2/3 pl-4 md:pl-8 border-l-2 border-blue-100">
                        {phase.steps.map((step, stepIndex) => (
                          <div key={stepIndex} className="mb-4 last:mb-0 relative pl-4 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-blue-500 before:rounded-full">
                            <p className="text-gray-700 text-base leading-relaxed">{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <Typography variant="body2" color="error">
                    Error loading roadmap data.
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Box>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: '2rem',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '10px',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    margin: '2rem',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '1rem',
    justifyItems: 'center',
    alignItems: 'center',
  },
  card: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '10px',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    padding: '1rem',
    width: '100%',
  },
  cardHeader: {
    backgroundColor: '#4c51bf',
    color: '#ffffff',
    padding: '0.5rem',
    borderRadius: '10px 10px 0 0',
  },
  careerName: {
    margin: 0,
  },
  rating: {
    fontWeight: 'bold',
    fontSize: '1rem',
    color: 'white',
  },
  cardContent: {
    padding: '1rem',
  },
  button: {
    marginTop: '1rem',
    backgroundColor: '#4c51bf',
    color: '#ffffff',
  },
  image: {
    width: '100%',
    borderRadius: '10px',
  },
  mostSuitable: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: '0.9rem',
    marginLeft: '1rem',
  },
};

export default ReportUpload;