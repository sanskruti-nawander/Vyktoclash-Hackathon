import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Button, Box, CircularProgress } from '@mui/material';
import Sidebar from '../components/Sidebar';
import CareerOpeepsImage from '../assets/images/CareerOpeeps.png';
import { CheckCircle } from 'lucide-react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const ReportUpload = () => {
  const [file, setFile] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [roadmap, setRoadmap] = useState([]);
  const [selectedRecommendation, setSelectedRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [roadmapLoading, setRoadmapLoading] = useState(false);

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
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const cleanJsonString = (jsonString) => {
    return jsonString
      .replace(/```json\n/g, '')
      .replace(/```/g, '')
      .replace(/\n/g, '');
  };

  const handlePursueCareer = async (rec) => {
    setRoadmapLoading(true);
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
    } finally {
      setRoadmapLoading(false);
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Career Path and Roadmap', 105, 20, { align: 'center' });

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');

    if (selectedRecommendation) {
      doc.text(`Career: ${selectedRecommendation.career}`, 20, 40);
      doc.text(`Role: ${selectedRecommendation.role}`, 20, 50);
      doc.text(`Reason: ${selectedRecommendation.reason}`, 20, 60);
    }

    if (roadmap.length > 0) {
      const roadmapData = roadmap.map((phase) => [
        `Stage ${phase.stage}: ${phase.title}`,
        ...phase.details.map((detail) => `- ${detail}`)
      ]);

      doc.autoTable({
        startY: 70,
        head: [['Stage', 'Details']],
        body: roadmapData,
        theme: 'grid',
        headStyles: { fillColor: [44, 62, 80], textColor: [255, 255, 255] },
        styles: { halign: 'left', fontSize: 10 },
        bodyStyles: { textColor: [0, 0, 0] },
      });
    }

    doc.save('Career-Path-and-Roadmap.pdf');
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
                <Button type="submit" variant="contained" style={styles.button} disabled={loading}>
                  {loading ? <CircularProgress size={24} style={{ color: 'white' }} /> : 'Upload'}
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
                    disabled={roadmapLoading}
                  >
                    {roadmapLoading ? <CircularProgress size={24} style={{ color: 'white' }} /> : 'I want to pursue this career'}
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
        {roadmap.length > 0 && selectedRecommendation && (
          <Box gridColumn="1 / span 3" width="100%">
            <Card style={styles.card}>
              <div style={styles.cardHeader}>
                <Typography variant="h6">Career Roadmap for {selectedRecommendation.career}</Typography>
              </div>
              <CardContent style={styles.cardContent}>
                {roadmap.map((phase, index) => (
                  <div key={index} className="flex flex-col md:flex-row mb-8 border-b pb-8 last:border-b-0">
                    <div className="md:w-1/3 pr-4 mb-4 md:mb-0">
                      <div className="flex items-center">
                        <CheckCircle className="mr-3 text-blue-500" size={24} />
                        <h2 className="text-2xl font-semibold text-gray-800">
                          Stage {phase.stage}: {phase.title}
                        </h2>
                      </div>
                    </div>
                    <div className="md:w-2/3 pl-4 md:pl-8 border-l-2 border-blue-100">
                      {phase.details.map((detail, detailIndex) => (
                        <div key={detailIndex} className="mb-4 last:mb-0 relative pl-4 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-blue-500 before:rounded-full">
                          <p className="text-gray-700 text-base leading-relaxed">{detail}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Button variant="contained" style={styles.button} onClick={downloadPDF}>
              Download PDF
            </Button>
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