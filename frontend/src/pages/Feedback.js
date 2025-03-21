import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from '@mui/material';

const FeedbackForm = () => {
  const [responses, setResponses] = useState({
    numericalTest: '',
    verbalTest: '',
    mockInterview: '',
    skillGapAnalysis: '',
    careerGuidance: '',
  });

  const [comments, setComments] = useState('');

  const handleChange = (field, value) => {
    setResponses((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    // Submit responses to the server or process as needed
    console.log('Feedback submitted:', { responses, comments });
    alert('Thank you for your feedback!');
    setResponses({
      numericalTest: '',
      verbalTest: '',
      mockInterview: '',
      skillGapAnalysis: '',
      careerGuidance: '',
    });
    setComments('');
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f3e8ff',
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      <Card
        style={{
          maxWidth: '600px',
          width: '100%',
          padding: '20px',
          borderRadius: '12px',
          backgroundColor: '#ffffff',
          boxShadow: '0 8px 16px rgba(76, 81, 191, 0.3)',
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              color: '#5a00a1',
              marginBottom: '20px',
            }}
          >
            Feedback Form
          </Typography>

          <Typography style={{ marginBottom: '10px', color: '#4a4a4a' }}>
            1. How's the numerical ability test?
          </Typography>
          <FormControl fullWidth style={{ marginBottom: '20px' }}>
            <InputLabel id="numerical-test-label">Rating</InputLabel>
            <Select
              labelId="numerical-test-label"
              value={responses.numericalTest}
              onChange={(e) => handleChange('numericalTest', e.target.value)}
            >
              <MenuItem value="Excellent">Excellent</MenuItem>
              <MenuItem value="Good">Good</MenuItem>
              <MenuItem value="Average">Average</MenuItem>
              <MenuItem value="Poor">Poor</MenuItem>
            </Select>
          </FormControl>

          <Typography style={{ marginBottom: '10px', color: '#4a4a4a' }}>
            2. Questions on verbal ability (scale of 10)?
          </Typography>
          <TextField
            type="number"
            value={responses.verbalTest}
            onChange={(e) => handleChange('verbalTest', e.target.value)}
            fullWidth
            variant="outlined"
            style={{ marginBottom: '20px', backgroundColor: '#fafafa', borderRadius: '8px' }}
            inputProps={{ min: 0, max: 10 }}
          />

          <Typography style={{ marginBottom: '10px', color: '#4a4a4a' }}>
            3. Reviews on mock interview
          </Typography>
          <TextField
            value={responses.mockInterview}
            onChange={(e) => handleChange('mockInterview', e.target.value)}
            fullWidth
            variant="outlined"
            style={{ marginBottom: '20px', backgroundColor: '#fafafa', borderRadius: '8px' }}
            placeholder="Write your review here..."
          />

          <Typography style={{ marginBottom: '10px', color: '#4a4a4a' }}>
            4. Skill gap analysis (scale of 10)?
          </Typography>
          <TextField
            type="number"
            value={responses.skillGapAnalysis}
            onChange={(e) => handleChange('skillGapAnalysis', e.target.value)}
            fullWidth
            variant="outlined"
            style={{ marginBottom: '20px', backgroundColor: '#fafafa', borderRadius: '8px' }}
            inputProps={{ min: 0, max: 10 }}
          />

          <Typography style={{ marginBottom: '10px', color: '#4a4a4a' }}>
            5. Career guidance and roadmap
          </Typography>
          <TextField
            value={responses.careerGuidance}
            onChange={(e) => handleChange('careerGuidance', e.target.value)}
            fullWidth
            variant="outlined"
            style={{ marginBottom: '20px', backgroundColor: '#fafafa', borderRadius: '8px' }}
            placeholder="Share your thoughts here..."
          />

          <Typography style={{ marginBottom: '10px', color: '#4a4a4a' }}>
            Additional Comments
          </Typography>
          <TextField
            multiline
            rows={4}
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            fullWidth
            variant="outlined"
            style={{ marginBottom: '20px', backgroundColor: '#fafafa', borderRadius: '8px' }}
            placeholder="Any additional feedback..."
          />

          <Box display="flex" justifyContent="center">
            <Button
              variant="contained"
              onClick={handleSubmit}
              style={{
                padding: '10px 20px',
                fontSize: '16px',
                borderRadius: '8px',
                backgroundColor: '#5a00a1',
                color: '#ffffff',
                boxShadow: '0 4px 8px rgba(76, 81, 191, 0.2)',
                transition: 'transform 0.2s',
              }}
              onMouseOver={(e) => (e.target.style.transform = 'scale(1.05)')}
              onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
            >
              Submit Feedback
            </Button>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeedbackForm;
