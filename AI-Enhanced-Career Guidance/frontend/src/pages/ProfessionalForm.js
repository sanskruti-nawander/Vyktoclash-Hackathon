import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import FileUpload from './FileUpload';
import { 
  Container, 
  Box, 
  Typography, 
  Button, 
  Paper, 
  Grid, 
  TextField, 
  Grow, 
  InputAdornment, 
  MenuItem 
} from '@mui/material';
import {
  Person as PersonIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Work as WorkIcon,
  School as SchoolIcon,
  Category as CategoryIcon,
  Cake as CakeIcon,
  WorkOutline as WorkOutlineIcon
} from '@mui/icons-material';

const ResumeUploader = () => {
  const navigate = useNavigate();

  // Authentication check
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    dob: '',
    gender: 'Male',
    location: '',
    companyName: '',
    jobTitle: '',
    experience: '',
    skills: '',
    domainExpertise: '',
    coursesCertifications: '',
  });
  const [resumeFile, setResumeFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setResumeFile(file);

    const formData = new FormData();
    formData.append('resume', file);

    axios.post('http://localhost:3001/fetchDetails', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(response => {
      setFormData(response.data);
    })
    .catch(error => {
      console.error('Error fetching details:', error);
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveAndNext = async () => {
    try {
      if (!auth.currentUser) {
        throw new Error('User not authenticated');
      }

      const userId = auth.currentUser.uid;

      const requiredFields = ['firstName', 'lastName', 'phone', 'companyName'];
      const missingFields = requiredFields.filter(field => !formData[field]);
      
      if (missingFields.length > 0) {
        alert(`Please fill in the following fields: ${missingFields.join(', ')}`);
        return;
      }

      await setDoc(doc(db, 'professionalForms', userId), {
        ...formData,
        userId,
        timestamp: new Date().toISOString(),
        userType: 'professional'
      });

      navigate('/skill-question', { 
        state: { 
          job: formData,
          userType: 'professional' 
        } 
      });
    } catch (error) {
      console.error('Error saving details:', error);
      alert('Failed to save details: ' + error.message);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #d3c3e2 100%)'
    }}>
      <Grow in={true} timeout={800}>
        <Paper 
          elevation={12} 
          sx={{ 
            p: 4, 
            borderRadius: '16px', 
            background: 'rgba(255, 255, 255, 0.9)', 
            backdropFilter: 'blur(15px)',
            position: 'relative',
            overflow: 'hidden',
            maxWidth: '800px',
            width: '100%'
          }}
        >
          {/* Professional Image */}
          <Box 
            sx={{
              position: 'absolute',
              top: '-50px',
              right: '-50px',
              width: '200px',
              height: '200px',
              backgroundImage: 'url("/professional-illustration.svg")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.7,
              zIndex: 0
            }}
          />
          
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom 
            textAlign="center" 
            color="secondary" 
            sx={{ 
              mb: 3, 
              fontWeight: 'bold', 
              position: 'relative', 
              zIndex: 1,
              color: '#9C27B0' 
            }}
          >
            Professional Profile
          </Typography>

          <FileUpload handleFileChange={handleFileChange} />
          
          <Grid container spacing={3} mt={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon sx={{ color: '#9C27B0' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon sx={{ color: '#9C27B0' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon sx={{ color: '#9C27B0' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date of Birth"
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleChange}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CakeIcon sx={{ color: '#9C27B0' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                  }
                }}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationIcon sx={{ color: '#9C27B0' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Company Name"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <WorkIcon sx={{ color: '#9C27B0' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Job Title"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <WorkOutlineIcon sx={{ color: '#9C27B0' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Years of Experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                variant="outlined"
                type="number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CategoryIcon sx={{ color: '#9C27B0' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Skills"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                variant="outlined"
                multiline
                rows={2}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CategoryIcon sx={{ color: '#9C27B0' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Domain Expertise"
                name="domainExpertise"
                value={formData.domainExpertise}
                onChange={handleChange}
                variant="outlined"
                multiline
                rows={2}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SchoolIcon sx={{ color: '#9C27B0' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Courses & Certifications"
                name="coursesCertifications"
                value={formData.coursesCertifications}
                onChange={handleChange}
                variant="outlined"
                multiline
                rows={2}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SchoolIcon sx={{ color: '#9C27B0' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                  }
                }}
              />
            </Grid>
          </Grid>
          
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSaveAndNext}
            sx={{ 
              mt: 4, 
              width: '100%', 
              borderRadius: '12px', 
              padding: '12px', 
              fontSize: '1rem',
              background: 'linear-gradient(45deg, #9C27B0 30%, #BA68C8 90%)',
              boxShadow: '0 3px 5px 2px rgba(186, 104, 200, .3)',
              '&:hover': {
                background: 'linear-gradient(45deg, #9C27B0 10%, #BA68C8 90%)'
              }
            }}
          >
            Save and Continue
          </Button>
        </Paper>
      </Grow>
    </Container>
  );
};

export default ResumeUploader;