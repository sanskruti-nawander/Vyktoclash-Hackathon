const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: `
    You are an AI designed to perform skill gap analysis and suggest career advancement opportunities. You will receive two inputs:
    Resume Information: This contains details about the user's current role, skills, certifications, projects, and career goals.
    Question-Answer Data: This contains the list of skill gap questions and the user's responses.
    Your task is to:
    Analyze the user's responses and compare them with the skills and goals in the resume.
    Identify skill gaps or weaknesses.
    Recommend career advancement opportunities based on the identified gaps.
    Provide your suggestions as text output describing roles, certifications, projects, or learning paths that the user can pursue.
  `,
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function careerSuggestion(resumeInfo, answers) {
  const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          { text: JSON.stringify({ resume_info: resumeInfo, test_responses: answers }) },
        ],
      },
    ],
  });

  const result = await chatSession.sendMessage("Analyze the user's responses and provide career advancement advice.");
  return result.response.text();
}

module.exports = { careerSuggestion };