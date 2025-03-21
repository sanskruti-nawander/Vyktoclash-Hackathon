const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

async function generateSpatialReasoningQuestions(type, language) {
  console.log(type);
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: `Generate 5 Questions for conducting an aptitude assessment for the difficulty level of a ${type} student.
Category: Spatial Reasoning
The response should follow this JSON format:
\`\`\`json
[
  {
    "question": "<question text goes here>",
    "options": [
      "A) <option A text goes here>",
      "B) <option B text goes here>",
      "C) <option C text goes here>",
      "D) <option D text goes here>"
    ],
    "correctAnswer": "<correct option (A/B/C/D)>",
    "marks": 10
  }
]
\`\`\`
Generate 5 creative Reasoning questions in JSON format, ensuring they progressively increase in difficulty.Generate ques in verbal form only dont use images. Each question should be detailed, requiring careful analysis, with thoughtfully crafted answer options that encourage thorough evaluation. Remember the questions should be in increasing level of difficulty. You should generate questions in the language specified by the user. Supported languages are English, Hindi, Marathi, Malayalam, and Bengali.`,
    });

    const chatSession = model.startChat({
      generationConfig,
    });
    const result = await chatSession.sendMessage(
      `Generate 5 Questions for ${type} in ${language}: spatial-reasoning in increasing level of difficulty`
    );
    return { response: result.response.text(), context: chatSession.history };
  } catch (error) {
    throw new Error(`Error generating question: ${error.message}`);
  }
}

module.exports = { generateSpatialReasoningQuestions };
