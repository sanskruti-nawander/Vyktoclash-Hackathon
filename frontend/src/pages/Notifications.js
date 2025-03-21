import React from 'react';
import Sidebar from '../components/Sidebar'; // Adjust the path as necessary
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import { FaBell } from 'react-icons/fa';

const notifications = [
  {
    title: 'Latest Job Trends in Tech',
    date: '2023-10-01',
    content: 'The tech industry is seeing a surge in demand for AI and machine learning experts. Companies are also looking for skilled software developers with experience in cloud computing and cybersecurity.',
  },
  {
    title: 'Top Companies Hiring Now',
    date: '2023-09-25',
    content: 'Google, Amazon, and Microsoft are among the top companies currently hiring for various tech positions. Check out their career pages for more details.',
  },
  {
    title: 'Remote Work Opportunities',
    date: '2023-09-20',
    content: 'Many companies are now offering remote work opportunities. This trend is expected to continue as more organizations recognize the benefits of a remote workforce.',
  },
  {
    title: 'Upcoming Tech Conferences',
    date: '2023-09-15',
    content: 'Don\'t miss out on the upcoming tech conferences this year. These events are great opportunities to network and learn about the latest advancements in technology.',
  },
];

const Notifications = () => {
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
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#4c51bf',
      color: '#ffffff',
      padding: '0.5rem',
      borderRadius: '10px 10px 0 0',
    },
    cardContent: {
      padding: '1rem',
    },
    icon: {
      marginRight: '0.5rem',
    },
  };

  return (
    <div style={styles.container}>
      <Sidebar userName="Aryan Sikariya" />
      <div style={styles.content}>
        <Typography variant="h4" gutterBottom>
          Notifications
        </Typography>
        <Grid container spacing={3}>
          {notifications.map((notification, index) => (
            <Grid item xs={12} key={index}>
              <Card style={styles.card}>
                <div style={styles.cardHeader}>
                  <FaBell style={styles.icon} />
                  <Typography variant="h6">{notification.title}</Typography>
                </div>
                <CardContent style={styles.cardContent}>
                  <Typography variant="body2" color="textSecondary">
                    {notification.date}
                  </Typography>
                  <Typography variant="body2">
                    {notification.content}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default Notifications;