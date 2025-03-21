import React from 'react';
import { Timeline, TimelineItem, TimelineSeparator, TimelineDot, TimelineConnector, TimelineContent } from '@mui/lab';
import { Typography, Card, CardContent, Box, Link } from '@mui/material';

const CareerRoadmapTimeline = ({ roadmap, career, resources = [] }) => {
  // Process roadmap into key milestones
  const processMilestones = (roadmapText) => {
    return roadmapText.split('\n')
      .map(step => step.replace(/^-\s*/, '').trim())
      .filter(step => step && step.length > 0);
  };

  const milestones = processMilestones(roadmap);
  const colors = [
    { primary: '#6a5acd', secondary: '#483d8b' },   // Slate Blue
    { primary: '#1e90ff', secondary: '#4169e1' },   // Royal Blue
    { primary: '#2ecc71', secondary: '#27ae60' },   // Emerald Green
    { primary: '#f39c12', secondary: '#d35400' },   // Orange
    { primary: '#e74c3c', secondary: '#c0392b' },   // Vibrant Red
  ];

  return (
    <Box sx={styles.container}>
      <Typography 
        variant="h3" 
        sx={styles.careerHeader}
      >
        🚀 {career} Career Journey
      </Typography>
      
      {/* Resources Section */}
      {resources.length > 0 && (
        <Box sx={styles.resourcesContainer}>
          <Typography variant="h5" sx={styles.resourcesHeader}>
            Recommended Resources
          </Typography>
          <Box sx={styles.resourceLinks}>
            {resources.map((resource, index) => (
              <Link 
                key={index} 
                href={resource.url} 
                target="_blank" 
                rel="noopener noreferrer"
                sx={styles.resourceLink}
              >
                {resource.name}
              </Link>
            ))}
          </Box>
        </Box>
      )}

      <Card sx={styles.card}>
        <CardContent sx={styles.cardContent}>
          <Timeline sx={styles.timeline}>
            {milestones.map((milestone, index) => {
              const { primary, secondary } = colors[index % colors.length];
              const isLeft = index % 2 === 0;
              
              return (
                <TimelineItem 
                  key={index} 
                  sx={{
                    ...styles.timelineItem,
                    flexDirection: isLeft ? 'row' : 'row-reverse',
                  }}
                >
                  <TimelineSeparator sx={styles.timelineSeparator}>
                    <TimelineDot 
                      sx={{
                        ...styles.timelineDot,
                        backgroundColor: primary,
                        border: `2px solid ${secondary}`,
                      }} 
                    />
                    {index < milestones.length - 1 && (
                      <TimelineConnector 
                        sx={{
                          ...styles.timelineConnector,
                          background: `linear-gradient(to bottom, ${primary}, ${secondary})`,
                        }} 
                      />
                    )}
                  </TimelineSeparator>
                  <TimelineContent 
                    sx={{
                      ...styles.timelineContent,
                      textAlign: isLeft ? 'left' : 'right',
                      paddingLeft: isLeft ? 2 : 0,
                      paddingRight: isLeft ? 0 : 2,
                    }}
                  >
                    <Card 
                      sx={{
                        ...styles.milestoneCard,
                        borderLeft: isLeft ? `5px solid ${primary}` : 'none',
                        borderRight: !isLeft ? `5px solid ${primary}` : 'none',
                        background: 'linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(240,240,240,0.8) 100%)',
                        '&:hover': {
                          transform: 'scale(1.03)',
                          boxShadow: `0 6px 20px rgba(${hexToRgb(primary)}, 0.3)`,
                          background: `linear-gradient(145deg, rgba(${hexToRgb(primary)}, 0.1) 0%, rgba(${hexToRgb(secondary)}, 0.1) 100%)`,
                        }
                      }}
                    >
                      <CardContent>
                        <Typography 
                          variant="h6" 
                          sx={{
                            ...styles.milestoneTitle,
                            color: secondary,
                          }}
                        >
                          Step {index + 1}
                        </Typography>
                        <Typography 
                          variant="body1" 
                          sx={styles.milestoneText}
                        >
                          {milestone}
                        </Typography>
                      </CardContent>
                    </Card>
                  </TimelineContent>
                </TimelineItem>
              );
            })}
          </Timeline>
        </CardContent>
      </Card>
    </Box>
  );
};

// Utility function to convert hex to RGB
const hexToRgb = (hex) => {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `${r}, ${g}, ${b}`;
};

const styles = {
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2rem',
    padding: '2rem 0',
  },
  careerHeader: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#4a5568',
    marginBottom: '1rem',
    textTransform: 'capitalize',
    letterSpacing: '1px',
  },
  resourcesContainer: {
    width: '100%',
    maxWidth: '800px',
    textAlign: 'center',
    marginBottom: '1.5rem',
  },
  resourcesHeader: {
    color: '#4a5568',
    marginBottom: '1rem',
    fontWeight: 'bold',
  },
  resourceLinks: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  resourceLink: {
    textDecoration: 'none',
    color: '#3182ce',
    fontWeight: 'bold',
    padding: '0.5rem 1rem',
    borderRadius: '20px',
    background: 'rgba(49, 130, 206, 0.1)',
    transition: 'all 0.3s ease',
    '&:hover': {
      background: 'rgba(49, 130, 206, 0.2)',
      transform: 'translateY(-3px)',
    }
  },
  card: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '15px',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '800px',
    overflow: 'hidden',
  },
  cardContent: {
    padding: '2rem',
  },
  timeline: {
    padding: 0,
    margin: 0,
    position: 'relative',
  },
  timelineItem: {
    minHeight: '120px',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  timelineSeparator: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  timelineDot: {
    width: '30px',
    height: '30px',
    boxShadow: '0 0 0 4px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
  },
  timelineConnector: {
    width: '4px',
    opacity: 0.7,
    transition: 'background 0.3s ease',
  },
  timelineContent: {
    py: 1,
    px: 2,
    flex: 1,
  },
  milestoneCard: {
    background: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '10px',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    width: '100%',
    maxWidth: '400px',
  },
  milestoneTitle: {
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  milestoneText: {
    color: '#333',
    fontWeight: 500,
  },
};

export default CareerRoadmapTimeline;