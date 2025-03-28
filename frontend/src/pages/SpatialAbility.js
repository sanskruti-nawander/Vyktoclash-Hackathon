import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Box,
  LinearProgress,
  Grid,
  Chip,
} from '@mui/material';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Ensure you have the correct path to your firebase configuration

const SpatialAbility = () => {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [markedQuestions, setMarkedQuestions] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes for the test
  const navigate = useNavigate();
  const location = useLocation();
  const { user, scores, language, userType } = location.state;

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0) setTimeLeft(timeLeft - 1);
      else handleSubmit();
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const fetchQuestions = async () => {
    try {
      console.log('Fetching questions for spatial reasoning');
      const response = await axios.post('http://localhost:3001/generateSpatial', { type: userType, language });
      console.log('Questions fetched:', response.data.response);
      setQuestions(JSON.parse(response.data.response));
    } catch (error) {
      console.error('Error fetching spatial reasoning questions:', error);
      console.error('Error details:', error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [userType, language]);

  const handleAnswerChange = (index, answer) => {
    console.log(`Setting answer for question ${index + 1}: ${answer}`);
    setUserAnswers({ ...userAnswers, [index]: answer });
  };

  const markForReview = (index) => {
    setMarkedQuestions({ ...markedQuestions, [index]: !markedQuestions[index] });
  };

  const handleSubmit = async () => {
    const score = 2; // Set the score to 2 regardless of the user's answers
    console.log('Current score:', score); // Log the current score

    // Save the result to Firestore
    try {
      if (!user || !user.uid) {
        throw new Error('User with valid UID is required');
      }
      const docRef = doc(db, 'spatialResults', user.uid);
      await setDoc(docRef, {
        user: {
          displayName: user.displayName,
          email: user.email,
          uid: user.uid,
        },
        score: score,
        answers: userAnswers,
        timestamp: new Date(),
      });
      console.log('Result saved to Firestore');
    } catch (error) {
      console.error('Error saving result to Firestore:', error);
    }

    // Navigate to the next page with user details and scores
    navigate('/results', { state: { user, scores: { ...scores, spatial: score } } });
  };

  return (
    <Box display="flex" minHeight="100vh">
      <Box width="20%" bgcolor="primary.light" p={2}>
        <Typography variant="h6">Question Navigation</Typography>
        <Grid container spacing={1}>
          {questions.map((_, i) => (
            <Grid item xs={4} key={i}>
              <Chip
                label={i + 1}
                color={userAnswers[i] !== undefined ? 'success' : markedQuestions[i] ? 'warning' : 'default'}
                onClick={() => setCurrentQuestionIndex(i)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box flex={1} p={4}>
        <Typography variant="h5">Spatial Reasoning Test</Typography>
        <Typography>Time Remaining: {Math.floor(timeLeft / 60)}m {timeLeft % 60}s</Typography>
        <LinearProgress variant="determinate" value={(timeLeft / 1800) * 100} />
        {questions.length > 0 && (
          <Card>
            <CardContent>
              <Typography>Question {currentQuestionIndex + 1}: {questions[currentQuestionIndex].question}</Typography>
              <RadioGroup value={userAnswers[currentQuestionIndex] || ''} onChange={(e) => handleAnswerChange(currentQuestionIndex, e.target.value)}>
                {questions[currentQuestionIndex].options.map((opt, idx) => (
                  <FormControlLabel key={idx} value={String.fromCharCode(65 + idx)} control={<Radio />} label={`${String.fromCharCode(65 + idx)}) ${opt}`} />
                ))}
              </RadioGroup>
            </CardContent>
            <Box display="flex" justifyContent="space-between" p={2}>
              <Button onClick={() => setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0))} disabled={currentQuestionIndex === 0}>Previous</Button>
              <Button onClick={() => markForReview(currentQuestionIndex)} color="warning">{markedQuestions[currentQuestionIndex] ? 'Unmark' : 'Mark'}</Button>
              <Button onClick={() => currentQuestionIndex < questions.length - 1 ? setCurrentQuestionIndex((prev) => prev + 1) : handleSubmit()}>{currentQuestionIndex < questions.length - 1 ? 'Next' : 'Submit'}</Button>
            </Box>
          </Card>
        )}
      </Box>
    </Box>
  );
};

export default SpatialAbility;