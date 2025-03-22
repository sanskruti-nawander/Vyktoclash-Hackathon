import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import { Button, Typography, Box } from '@mui/material';

const TestReport = () => {
  const location = useLocation();
  const { user, scores } = location.state;

  useEffect(() => {
    generatePDF();
  }, []);

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text('Aptitude Test Results', 20, 20);

    doc.setFontSize(16);
    doc.text('Scores:', 20, 50);

    doc.setFontSize(12);
    doc.text(`Numerical Ability: ${scores.numerical}`, 20, 60);
    doc.text(`Verbal Ability: ${scores.verbal}`, 20, 70);
    doc.text(`Logical Reasoning: ${scores.logicalReasoning}`, 20, 80);

    doc.save('Aptitude_Test_Results.pdf');
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
      <Typography variant="h4" gutterBottom>
        Aptitude Test Results
      </Typography>
      <Typography variant="h6">
        Numerical Ability: {scores.numerical}
      </Typography>
      <Typography variant="h6">
        Verbal Ability: {scores.verbal}
      </Typography>
      <Typography variant="h6">
        Logical Reasoning: {scores.logicalReasoning}
      </Typography>
      <Button variant="contained" color="primary" onClick={generatePDF} style={{ marginTop: '20px' }}>
        Download PDF
      </Button>
    </Box>
  );
};

export default TestReport;