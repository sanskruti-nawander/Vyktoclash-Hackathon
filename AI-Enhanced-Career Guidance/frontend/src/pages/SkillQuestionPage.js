import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { ClipLoader } from 'react-spinners'; // Import the spinner component

const SkillQuestionPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const job = location.state?.job;
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false); // State to track loading

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.post('http://localhost:3001/career-advancement', job);
        setQuestions(response.data.questions);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, [job]);

  const handleAnswerChange = (index, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [index]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true); // Set loading to true when submit is clicked
    const answeredQuestions = questions.map((question, index) => ({
      ...question,
      answer: answers[index] || '',
    }));

    try {
      const response = await axios.post('http://localhost:3001/getCareerAdvice', {
        resumeInfo: job,
        answers: answeredQuestions,
      });
      setAnalysis(response.data.analysis);
    } catch (error) {
      console.error('Error submitting answers:', error);
    } finally {
      setLoading(false); // Set loading to false when response is received
    }
  };

  const handleGenerateRoadmap = async () => {
    try {
      const response = await axios.post('http://localhost:3001/generateRoadmap', {
        advancement: analysis,
      });
      navigate('/career-roadmap', { state: { roadmap: response.data.roadmap } });
    } catch (error) {
      console.error('Error generating roadmap:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-center">Skill Gap Test</h1>
      <div className="w-full max-w-6xl flex flex-wrap justify-between">
        <div className="w-full md:w-1/2 bg-white shadow-lg rounded-lg p-8 mb-4 md:mb-0">
          {questions.map((question, index) => (
            <div key={index} className="mb-4">
              <p className="text-lg font-semibold">{question.question}</p>
              <textarea
                className="w-full p-2 border border-gray-300 rounded-lg mt-2"
                rows="4"
                value={answers[index] || ''}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
              />
            </div>
          ))}
          <button
            onClick={handleSubmit}
            className="mt-4 py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            disabled={loading} // Disable button while loading
          >
            {loading ? <ClipLoader size={20} color={"#fff"} /> : "Submit Answers"}
          </button>
        </div>
        {analysis && (
          <div className="w-full md:w-1/2 bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Skill Gap Analysis</h2>
            <ReactMarkdown className="bg-gray-100 p-4 rounded-lg">{typeof analysis === 'string' ? analysis : JSON.stringify(analysis)}</ReactMarkdown>
            <button
              onClick={handleGenerateRoadmap}
              className="mt-4 py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300"
            >
              Generate Roadmap
            </button>
          </div>
        )}
      </div>
      <button
        onClick={() => navigate(-1)}
        className="mt-4 py-2 px-4 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-300"
      >
        Close
      </button>
    </div>
  );
};

export default SkillQuestionPage;