import React from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Grid, 
  Typography, 
  CardMedia, 
  Button, 
  Box,
  IconButton,
  Slide 
} from '@mui/material';
import { 
  WorkOutline as WorkIcon, 
  Close as CloseIcon, 
  DesignServices as DesignIcon 
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const JobDetails = ({ job, onClose }) => {
  const navigate = useNavigate();

  const handleStartSkillTest = () => {
    navigate('/skill-gap-test', { state: { job } });
  };

  return (
    <Dialog
      open={true}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      aria-describedby="job-details-description"
      maxWidth="md"
      fullWidth
    >
      <DialogTitle 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
          color: 'white'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <DesignIcon />
          <Typography variant="h6">{job.title} at {job.company}</Typography>
        </Box>
        <IconButton onClick={onClose} sx={{ color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <CardMedia
              component="img"
              height="300"
              image={job.image}
              alt={job.title}
              sx={{
                borderRadius: '12px',
                mb: 2,
                maxHeight: '300px',
                objectFit: 'cover'
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Job Description
            </Typography>
            <Typography variant="body1" paragraph>
              {job.description}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Requirements
            </Typography>
            {job.requirements.map((req, index) => (
              <Typography 
                key={index} 
                variant="body2" 
                paragraph 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <WorkIcon fontSize="small" color="primary" />
                {req}
              </Typography>
            ))}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={handleStartSkillTest}
          color="primary" 
          variant="contained"
          sx={{
            borderRadius: '8px',
            textTransform: 'none',
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            '&:hover': {
              background: 'linear-gradient(45deg, #2196F3 10%, #21CBF3 90%)'
            }
          }}
        >
          Check Skill Gap
        </Button>
        <Button 
          onClick={onClose} 
          color="secondary" 
          variant="outlined"
          sx={{
            borderRadius: '8px',
            textTransform: 'none'
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default JobDetails;