import React from 'react';
import Sidebar from '../components/Sidebar'; // Adjust the path as necessary
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const ResultsPage = () => {
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
    },
    card: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: '10px',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      marginBottom: '1rem',
      padding: '1rem',
    },
    cardHeader: {
      backgroundColor: '#4c51bf',
      color: '#ffffff',
      padding: '0.5rem',
      borderRadius: '10px 10px 0 0',
    },
    cardContent: {
      padding: '1rem',
    },
  };

  const renderTestResults = (title, timeSpent, totalQuestions, answeredQuestions, correctAnswers, wrongAnswers, timePerQuestion) => {
    const barData = [
      { name: 'Correct', value: correctAnswers },
      { name: 'Wrong', value: wrongAnswers },
    ];

    const lineData = timePerQuestion.map((time, index) => ({
      name: `Q${index + 1}`,
      value: time,
    }));

    return (
      <Grid item xs={12} md={6}>
        <Card style={styles.card}>
          <div style={styles.cardHeader}>
            <Typography variant="h6">{title}</Typography>
          </div>
          <CardContent style={styles.cardContent}>
            <Typography variant="body2">Time Spent: {timeSpent} minutes</Typography>
            <Typography variant="body2">Total Questions: {totalQuestions}</Typography>
            <Typography variant="body2">Questions Answered: {answeredQuestions}</Typography>
            <Box mt={2}>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
            <Box mt={2}>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    );
  };

  return (
    <div>
             <div>
              <Grid>
          {renderTestResults('Verbal Test', 25, 40, 35, 30, 5, [1.2, 2.1, 1.3, 2.4, 3.1, 1.2, 2.1, 1.3, 2.4, 3.1, 1.2, 2.1, 1.3, 2.4, 3.1, 1.2, 2.1, 1.3, 2.4, 3.1, 1.2, 2.1, 1.3, 2.4, 3.1, 1.2, 2.1, 1.3, 2.4, 3.1, 1.2, 2.1, 1.3, 2.4, 3.1, 1.2, 2.1, 1.3, 2.4, 3.1])}
          {renderTestResults('Spatial Awareness Test', 20, 30, 28, 25, 3, [1.5, 2.2, 1.4, 2.3, 3.2, 1.5, 2.2, 1.4, 2.3, 3.2, 1.5, 2.2, 1.4, 2.3, 3.2, 1.5, 2.2, 1.4, 2.3, 3.2, 1.5, 2.2, 1.4, 2.3, 3.2, 1.5, 2.2, 1.4, 2.3, 3.2])}
          {renderTestResults('Numerical Ability Test', 35, 60, 55, 50, 5, [1.1, 2.3, 1.2, 2.6, 3.3, 1.1, 2.3, 1.2, 2.6, 3.3, 1.1, 2.3, 1.2, 2.6, 3.3, 1.1, 2.3, 1.2, 2.6, 3.3, 1.1, 2.3, 1.2, 2.6, 3.3, 1.1, 2.3, 1.2, 2.6, 3.3, 1.1, 2.3, 1.2, 2.6, 3.3, 1.1, 2.3, 1.2, 2.6, 3.3, 1.1, 2.3, 1.2, 2.6, 3.3, 1.1, 2.3, 1.2, 2.6, 3.3])}
        </Grid>
      </div>
    </div>
  );
};

export default ResultsPage;