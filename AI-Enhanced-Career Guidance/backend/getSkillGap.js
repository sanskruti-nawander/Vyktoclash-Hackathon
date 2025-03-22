const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: `
    You are an expert skill gap analysis test expert.
    You will be given the job description along with the questions and answers of the user.
    job description:
    \`\`\` json
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
    \`\`\` json 
    [
      {
        question: question,
        answer: answer,
      }
    ]
    \`\`\`
    Your job is to assess the user's answers and give a skill gap analysis to the user. Also, suggest/recommend courses to learn the skill.
  `,
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function getSkillGap(jobDescription, answers) {
  const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          { text: JSON.stringify(jobDescription) },
          { text: JSON.stringify(answers) },
        ],
      },
    ],
  });

  const result = await chatSession.sendMessage("Assess the user's answers and provide a skill gap analysis.");
  return result.response.text();
}

module.exports = { getSkillGap };