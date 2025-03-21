const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};

async function generateLogicalQuestions(type, language) {
    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: `Generate 5 Questions for an Aptitude Assessment for the difficulty level of a ${type} student.
Category: Logical Ability
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
Generate 5 Logical Ability questions in JSON format, ensuring they progressively increase in difficulty. Each question should be detailed, requiring careful analysis, with thoughtfully crafted answer options that encourage thorough evaluation. Include a mix of question types, such as reading comprehension, sentence correction, vocabulary, and verbal reasoning. Remember the questions should be in increasing level of difficulty. You should generate questions in the language specified by the user. Supported languages are English, Hindi, Marathi, Malayalam, and Bengali.`,
        });
        

        const chatSession = model.startChat({
            generationConfig
        });
        const result = await chatSession.sendMessage(`Generate 5 Questions for ${type} in ${language}: logical-reasoning in increasing level of difficulty`);
        return { response: result.response.text(), context: chatSession.history };
    } catch (error) {
        throw new Error(`Error generating question: ${error.message}`);
    }
}

module.exports = { generateLogicalQuestions };