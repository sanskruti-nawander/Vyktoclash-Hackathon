import React, { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { CircularProgress, TextField, Button, Box, Typography } from '@mui/material';

const ScholarshipForm = () => {
  const [formData, setFormData] = useState({
    academic_performance: '',
    financial_background: '',
    gender: '',
    field_of_study: '',
    state_of_residence: '',
    extracurricular: '',
  });
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setRecommendations('');

    try {
      const response = await axios.post('http://localhost:3001/recommend-scholarships', formData);
      setRecommendations(response.data.recommendations);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      setRecommendations('Failed to fetch recommendations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
      <Typography variant="h4" gutterBottom>
        Scholarship Recommendation Form
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '600px' }}>
        <TextField
          label="Academic Performance (Percentage/CGPA)"
          name="academic_performance"
          type="number"
          value={formData.academic_performance}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Financial Background (Annual Family Income in INR)"
          name="financial_background"
          type="text"
          value={formData.financial_background}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Gender"
          name="gender"
          type="text"
          value={formData.gender}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Field of Study"
          name="field_of_study"
          type="text"
          value={formData.field_of_study}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="State of Residence"
          name="state_of_residence"
          type="text"
          value={formData.state_of_residence}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Extracurricular Activities"
          name="extracurricular"
          type="text"
          value={formData.extracurricular}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <Box display="flex" justifyContent="center" mt={2}>
          <Button variant="contained" color="primary" type="submit" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Submit'}
          </Button>
        </Box>
      </form>
      {recommendations && (
        <Box mt={4} p={2} border={1} borderColor="grey.300" borderRadius={4} width="100%" maxWidth="600px">
          <ReactMarkdown>{recommendations}</ReactMarkdown>
        </Box>
      )}
    </Box>
  );
};

export default ScholarshipForm;