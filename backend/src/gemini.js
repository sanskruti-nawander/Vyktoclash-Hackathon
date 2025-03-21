const { GoogleGenerativeAI } = require('@google/generative-ai');

const apiKey = 'AIzaSyDhhJ6lI2EYc6EmqrvwCgkqPm_IAmeSYq0'; // Ensure this is correct
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: `You are conducting a job interview for a candidate. ...` // Your detailed instruction
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function generateQuestions(userDetails) {
  const chatSession = model.startChat({ generationConfig, history: [] });
  const result = await chatSession.sendMessage(`Generate 5 basic interview questions for the role: ${userDetails.jobRole}, skills: ${userDetails.skills}, experience: ${userDetails.experience}`);
  return result.response.text(); // Verify this response format
}

module.exports = generateQuestions;
