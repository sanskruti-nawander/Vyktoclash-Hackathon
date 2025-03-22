const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: `
    You are an expert Skill Gap Analyser. You will be given the JSON of the job description.
    \`\`\` JSON Format
    {
      title: 'Job title',
      company: 'Company name',
      description: 'Job description',
      requirements: [
        'Requirements',
        'Requirements',
        'Requirements',
      ],
    },
    \`\`\`
    \`\`\` Response JSON
    [
      {
        "question": "question"
      }
    ]
    Your task is to generate 5 Questions related to the job description in JSON format.
  `,
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function skillGapAnalysis(jobDescription) {
  const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          { text: JSON.stringify(jobDescription) },
        ],
      },
    ],
  });

  const result = await chatSession.sendMessage("Generate 5 Questions related to the job description");

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

module.exports = { skillGapAnalysis };