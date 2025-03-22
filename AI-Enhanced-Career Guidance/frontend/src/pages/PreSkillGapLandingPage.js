import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, Typography, Grid, Box, Button, Grow, CardMedia } from '@mui/material';
import { ArrowForward, ArrowBack } from '@mui/icons-material';
import UndergradImage from '../assets/images/underg.png';
import WorkingProfessionalImage from '../assets/images/workingp.png';

const PreSkillGapLandingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user;

  const handleProfessionalClick = () => {
    navigate('/professional-form', { state: { user, userType: 'Professional' } });
  };

  const handleGraduateClick = () => {
    navigate('/graduate-skill-gap', { state: { user, userType: 'Graduate' } });
  };

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #6dd5ed, #2193b0)',
      padding: '2rem',
    },
    card: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      margin: '1rem',
      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
      borderRadius: '12px',
      backgroundColor: '#ffffff',
      textAlign: 'center',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      '&:hover': {
        transform: 'translateY(-10px)',
        boxShadow: '0 12px 30px rgba(0, 0, 0, 0.3)',
      },
    },
    media: {
      height: 200,
      width: '100%',
      objectFit: 'cover',
      borderRadius: '8px 8px 0 0',
    },
    arrowButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '1.5rem',
      textTransform: 'uppercase',
      fontWeight: 'bold',
      '&:hover': {
        backgroundColor: '#ff8c00',
        color: '#fff',
      },
    },
  };

  return (
    <Box style={styles.container}>
      <Grid container spacing={4} justifyContent="center">
        <Grow in={true} timeout={800}>
          <Grid item xs={12} md={6}>
            <Card sx={styles.card}>
              <CardMedia
                component="img"
                image={WorkingProfessionalImage}
                alt="Professional"
                sx={styles.media}
              />
              <CardContent>
                <Typography variant="h5" gutterBottom color="primary">
                  Professional
                </Typography>
                <Typography variant="body1">
                  Click here if you are a professional looking to assess your skill gaps.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={styles.arrowButton}
                  onClick={handleProfessionalClick}
                  endIcon={<ArrowForward />}
                >
                  Professional
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grow>
        <Grow in={true} timeout={1000}>
          <Grid item xs={12} md={6}>
            <Card sx={styles.card}>
              <CardMedia
                component="img"
                image={UndergradImage}
                alt="Graduate"
                sx={styles.media}
              />
              <CardContent>
                <Typography variant="h5" gutterBottom color="secondary">
                  Graduate
                </Typography>
                <Typography variant="body1">
                  Click here if you are a graduate looking to assess your skill gaps.
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={styles.arrowButton}
                  onClick={handleGraduateClick}
                  endIcon={<ArrowBack />}
                >
                  Graduate
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grow>
      </Grid>
    </Box>
  );
};

export default PreSkillGapLandingPage;