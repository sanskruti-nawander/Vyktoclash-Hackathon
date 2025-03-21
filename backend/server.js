const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
require('dotenv').config();

const { generateRecommendations } = require('./generateRecommendations');
// const { startInterview } = require('./mockinterview');
const { generateLogicalQuestions } = require('./generateLogical');
const { generateVerbalQuestions } = require('./generateVerbal');
const { generateNumericalQuestions } = require('./generateNumerical');
const { skillGapAnalysis } = require('./skillGap');
const { fetchDetails } = require('./fetchDetails');
const { careerCounseling } = require('./careerCounseling'); // Adjust the path as necessary
const { getSkillGap } = require('./getSkillGap');
const { careerAdvancement } = require('./careerAdvancement');
const { careerSuggestion } = require('./careerSuggestions');
const { generateRoadmap } = require('./careerRoadmap');
const generateQuestions = require('./src/gemini');
const { generateRoadmapStudent } = require('./generateRoadmapStudent');
const { generateRoadmapGraduate } = require('./generateRoadmapGraduate');
const { generateSpatialReasoningQuestions } = require('./generateSpatial');
const { getScholarshipRecommendations } = require('./scholarshipRecommendation');

const app = express();
const port = 3001;

const upload = multer({ dest: 'uploads/' });

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// Mock Interview Route 
/*app.post('/start-interview', async (req, res) => {
    try {
        const userInput = req.body.userInput;
        if (!userInput) {
            return res.status(400).json({ error: 'User input is required' });
        }

        const interviewResponse = await startInterview(userInput);
        res.json({ interviewResponse });
    } catch (error) {
        console.error('Error in /start-interview:', error);
        res.status(500).json({ error: 'Interview failed' });
    }
});*/

// Other routes and logic
app.post('/counseling', async (req, res) => {
  const { input, context } = req.body;

  if (!input || !context) {
      return res.status(400).json({ error: 'Input and context are required' });
  }

  try {
      console.log('Received /counseling request:', req.body);
      const result = await careerCounseling(input, context);
      res.json(result);
  } catch (error) {
      console.error('Error in /counseling:', error);
      res.status(500).json({ error: 'Failed to perform career counseling' });
  }
});

app.post('/recommend-scholarships', async (req, res) => {
  try {
    const userInput = req.body;
    const recommendations = await getScholarshipRecommendations(userInput);
    res.json({ recommendations });
  } catch (error) {
    console.error('Error getting scholarship recommendations:', error);
    res.status(500).json({ error: 'Failed to get scholarship recommendations' });
  }
});

app.post('/generateNumerical', async (req, res) => {
    const { type, language } = req.body;

    try {
        console.log('Received /generateNumerical request:', req.body);
        const result = await generateNumericalQuestions(type, language);
        console.log('Numerical questions:', result);
        res.json(result);
    } catch (error) {
        console.error('Error in /generateNumerical:', error.message);
        res.status(500).send(error.message);
    }    
});



app.post('/generateSpatial', async (req, res) => {
  const { type, language } = req.body;

  try {
    const result = await generateSpatialReasoningQuestions(type, language);
    res.json(result);
  } catch (error) {
    console.error('Error generating spatial reasoning questions:', error);
    res.status(500).json({ error: error.message });
  }
});



app.post('/generateVerbal', async (req, res) => {
  const { type, language } = req.body;

  try {
    console.log('Received /generateVerbal request:', req.body);
    const result = await generateVerbalQuestions(type, language);
    console.log('Verbal questions:', result);
    res.json(result);
  } catch (error) {
    console.error('Error in /generateVerbal:', error.message);
    res.status(500).send(error.message);
  }
});


app.post('/generateLogical', async (req, res) => {
    const { type, language } = req.body;

    try {
        console.log('Received /generateLogical request:', req.body);
        const result = await generateLogicalQuestions(type, language);
        console.log('Logical questions:', result);
        res.json(result);
    } catch (error) {
        console.error('Error in /generateLogical:', error.message);
        res.status(500).send(error.message);
    }    
});

app.post('/generateRecommendations', upload.single('report'), async (req, res) => {
    try {
        console.log('Received /generateRecommendations request:', req.file);
        const filePath = req.file.path;
        const mimeType = req.file.mimetype;
        const recommendations = await generateRecommendations(filePath, mimeType);
        console.log('Career recommendations:', recommendations);
        res.status(200).json(recommendations);
    } catch (error) {
        console.error('Error generating recommendations:', error);
        res.status(500).send({ error: 'An error occurred while generating recommendations.' });
    }
});

app.post('/fetchDetails', upload.single('resume'), async (req, res) => {
    try {
        console.log('Received /fetchDetails request:', req.file);
        const filePath = req.file.path;
        const mimeType = req.file.mimetype;
        const details = await fetchDetails(filePath, mimeType);
        console.log('Details fetched:', details);
        res.status(200).json(details);
    } catch (error) {
        console.error('Error fetching details:', error);
        res.status(500).send({ error: 'An error occurred while fetching details.' });
    }
});

app.post('/getSkillGap', async (req, res) => {
    try {
      const { jobDescription, answers } = req.body;
      const analysisResult = await getSkillGap(jobDescription, answers);
      res.status(200).json({ analysis: analysisResult });
    } catch (error) {
      console.error('Error performing skill gap analysis:', error);
      res.status(500).send({ error: 'An error occurred while performing skill gap analysis.' });
    }
  });


app.post('/skillgap', async (req, res) => {
    try {
      const jobDescription = req.body;
      const analysisResult = await skillGapAnalysis(jobDescription);
      res.status(200).json(analysisResult);
    } catch (error) {
      console.error('Error performing skill gap analysis:', error);
      res.status(500).send({ error: 'An error occurred while performing skill gap analysis.' });
    }
});

app.post('/career-advancement', async (req, res) => {
    try {
      const resumeInfo = req.body;
      const analysisResult = await careerAdvancement(resumeInfo);
      res.status(200).json(analysisResult);
    } catch (error) {
      console.error('Error performing career advancement analysis:', error);
      res.status(500).send({ error: 'An error occurred while performing career advancement analysis.' });
    }
  });
  
  app.post('/getCareerAdvice', async (req, res) => {
    try {
      const { resumeInfo, answers } = req.body;
      const analysisResult = await careerSuggestion(resumeInfo, answers);
      res.status(200).json({ analysis: analysisResult });
    } catch (error) {
      console.error('Error in /getCareerAdvice:', error);
      res.status(500).send({ error: 'Failed to get career advice' });
    }
  });

  app.post('/generateRoadmap', async (req, res) => {
    try {
      const { advancement } = req.body;
      const roadmap = await generateRoadmap(advancement);
      res.status(200).json({ roadmap: roadmap });
    } catch (error) {
      console.error('Error in /generateRoadmap:', error);
      res.status(500).send({ error: 'Failed to generate roadmap' });
    }
  });  

  app.post('/generate-roadmap-student', async (req, res) => {
    try {
      const input = req.body;
      const roadmap = await generateRoadmapStudent(input);
      res.status(200).json({ roadmap });
    } catch (error) {
      console.error('Error generating roadmap:', error);
      res.status(500).json({ error: 'Failed to generate roadmap' });
    }
  });
  
  app.post('/generate-roadmap-graduate', async (req, res) => {
    try {
      const input = req.body;
      const roadmap = await generateRoadmapGraduate(input);
      res.status(200).json({ roadmap });
    } catch (error) {
      console.error('Error generating roadmap:', error);
      res.status(500).json({ error: 'Failed to generate roadmap' });
    }
  });
  
  //generate questions for mock interview
  app.post('/generate-questions', async (req, res) => {
    const { jobRole, techStack, experience } = req.body;
    const userDetails = { jobRole, skills: techStack, experience };
  
    console.log('Received data:', userDetails);
  
    try {
      const questions = await generateQuestions(userDetails);
      console.log('Generated questions:', questions);
      res.json({ questions });
    } catch (error) {
      console.error('Error generating questions:', error.stack);
      res.status(500).json({ error: error.message });
    }
  });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const testUserDetails = {
  jobRole: "Senior Software Engineer",
  skills: "React, Node.js, MongoDB",
  experience: "6 years"
};

generateQuestions(testUserDetails)
  .then(questions => console.log('Test questions:', questions))
  .catch(error => console.error('Test error:', error.stack));




