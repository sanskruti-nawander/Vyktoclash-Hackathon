const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: `
  
    Given the following user profile: {resume_info} in json format, generate 5 personalized questions to assess the user's proficiency in their current role and suggest career advancement. Include questions that evaluate technical, problem-solving, and communication skills. Return the questions as a JSON object.
    \`\`\` JSON question 
    [
      {
        question: question
        ...
      } 
    ]
    \`\`\`
    generate questions in the above json format only no other format is accepted.
  `,
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function careerAdvancement(resumeInfo) {
  const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          { text: JSON.stringify(resumeInfo) },
        ],
      },
    ],
  });

  const result = await chatSession.sendMessage("Generate 5 Questions related to the information extracted from the resume");

  // Extract JSON from response text
  const jsonResponse = result.response.text().match(/\[[\s\S]*\]/);
  if (!jsonResponse) {
    throw new Error("Invalid JSON response");
  }
  try {
    const questionsArray = JSON.parse(jsonResponse[0]);
    return { questions: questionsArray };
  } catch (error) {
    console.error("Error parsing JSON response:", error);
    throw new Error("Failed to parse JSON response");
  }
}

module.exports = { careerAdvancement };