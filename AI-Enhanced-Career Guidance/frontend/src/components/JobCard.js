import React from 'react';
import { 
  Card, 
  CardMedia, 
  CardContent, 
  CardActions, 
  Typography, 
  Button 
} from '@mui/material';
import { WorkOutline as WorkIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';

const JobCard = ({ job, onViewDetails }) => {
  return (
    <motion.div
      whileHover={{ 
        scale: 1.05, 
        boxShadow: '0 12px 24px rgba(0,0,0,0.15)' 
      }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 10 
      }}
    >
      <Card 
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '16px',
          transition: 'all 0.3s ease',
          background: 'linear-gradient(145deg, #f0f4f8 0%, #ffffff 100%)',
          boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
          '&:hover': {
            transform: 'translateY(-10px)',
            boxShadow: '0 12px 24px rgba(0,0,0,0.15)'
          }
        }}
      >
        <CardMedia
          component="img"
          height="200"
          image={job.image}
          alt={job.title}
          sx={{
            height: '200px',
            objectFit: 'cover',
            borderTopLeftRadius: '16px',
            borderTopRightRadius: '16px'
          }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography 
            gutterBottom 
            variant="h5" 
            component="div" 
            color="primary"
            sx={{ 
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <WorkIcon /> {job.title}
          </Typography>
          <Typography 
            variant="subtitle1" 
            color="text.secondary" 
            sx={{ mb: 1 }}
          >
            {job.company}
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical'
            }}
          >
            {job.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button 
            size="small" 
            color="primary" 
            variant="contained"
            onClick={() => onViewDetails(job)}
            sx={{
              borderRadius: '8px',
              textTransform: 'none',
              width: '100%',
              py: 1,
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #2196F3 10%, #21CBF3 90%)'
              }
            }}
          >
            View Details
          </Button>
        </CardActions>
      </Card>
    </motion.div>
  );
};

export default JobCard;