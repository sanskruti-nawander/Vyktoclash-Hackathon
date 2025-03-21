import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faMicrophoneSlash, faRedo, faVolumeUp, faVolumeMute } from '@fortawesome/free-solid-svg-icons';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './Interview.css';
import avatar from '../../../src/assets/images/Nigro.png'; // Add the path to your avatar image

const Interview = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { jobRole, techStack, experience } = state;
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState([]);
  const [marks, setMarks] = useState([]);
  const [error, setError] = useState(null);
  const [speaking, setSpeaking] = useState(false);
  const { transcript, resetTranscript, listening } = useSpeechRecognition();

  useEffect(() => {
    console.log('Sending request to backend with:', { jobRole, techStack, experience });
    axios.post('http://localhost:3001/generate-questions', { jobRole, techStack, experience })
      .then(response => {
        console.log('API response:', response.data);
        const generatedQuestions = response.data.questions.split('\n').filter(line => line.trim() !== '');
        setQuestions(generatedQuestions);
      })
      .catch(error => {
        console.error('Error fetching questions:', error);
        setError('Failed to generate questions. Please try again later.');
      });
  }, [jobRole, techStack, experience]);

  const readOutQuestion = (question) => {
    window.speechSynthesis.cancel(); // Cancel any ongoing speech
    const utterance = new SpeechSynthesisUtterance(question);
    utterance.onend = () => setSpeaking(false); // Reset speaking state when done
    window.speechSynthesis.speak(utterance);
    setSpeaking(true);
  };

  const toggleReading = () => {
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    } else {
      readOutQuestion(questions[currentQuestion]);
    }
  };

  const handleNext = () => {
    const mark = Math.floor(Math.random() * 11); // Random mark out of 10 for demo purposes
    setMarks([...marks, mark]);
    setResponses([...responses, transcript]);
    resetTranscript();
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      window.speechSynthesis.cancel(); // Cancel ongoing speech
      readOutQuestion(questions[currentQuestion + 1]);
    } else {
      navigate('/interview-results', { state: { responses, marks, questions } });
    }
  };

  const handleToggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening({ continuous: true });
    }
  };

  const handleResetTranscript = () => {
    resetTranscript();
    SpeechRecognition.stopListening();
  };

  return (
    <div className="outer-container">
      <img src={avatar} alt="Avatar" className="avatar" />
      <div className="container">
        <header>
          <h2>Mock Interview</h2>
        </header>
        {error ? (
          <p className="error">{error}</p>
        ) : (
          <>
            <h2>Question {currentQuestion + 1}</h2>
            {questions.length > 0 && (
              <div className="question-container">
                <p>{questions[currentQuestion]}</p>
                <FontAwesomeIcon
                  icon={speaking ? faVolumeMute : faVolumeUp}
                  className="icon"
                  onClick={toggleReading}
                />
              </div>
            )}
            <div className="transcript">
              <p>{transcript}</p>
            </div>
            <div className="controls">
              <button onClick={handleNext}>Next</button>
              <FontAwesomeIcon 
                icon={faRedo} 
                className="icon" 
                onClick={handleResetTranscript} 
              />
              <FontAwesomeIcon 
                icon={listening ? faMicrophoneSlash : faMicrophone} 
                className={`icon ${listening ? 'listening' : ''}`} 
                onClick={handleToggleListening} 
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Interview;
