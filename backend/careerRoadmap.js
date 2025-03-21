const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: `
    You are an AI designed to generate personalized roadmaps for career advancement. You will receive career advancement suggestions as input.
    Your task is to:
    Break down each suggestion into actionable steps.
    Assign a timeline (in months) for completing each step.
    Return the roadmap as a structured JSON object with a clear timeline and recommended resources.
    \`\`\` json response
    {
      "roadmap": [
        {
          "phase": "Month 1–2",
          "steps": [
            "Complete the Advanced Data Cleaning Techniques course.",
            "Practice applying imputation methods on real-world datasets."
          ],
          "resources": ["https://example.com/advanced-data-cleaning"]
        },
        {
          "phase": "Month 3–4",
          "steps": [
            "Enroll in a machine learning course for predictive analytics.",
            "Work on a hands-on project involving a predictive model (e.g., sales forecasting)."
          ],
          "resources": ["https://example.com/machine-learning-course"]
        },
        {
          "phase": "Month 5–6",
          "steps": [
            "Earn a certification in Google BigQuery or AWS Redshift.",
            "Implement a data pipeline project using cloud tools to gain hands-on experience."
          ],
          "resources": ["https://example.com/cloud-certification"]
        }
      ]
    }
    \`\`\`
    strictly follow the above roadmap format in json.
  `,
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function generateRoadmap(advancement) {
  const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          { text: advancement },
        ],
      },
    ],
  });

  const result = await chatSession.sendMessage("Generate a roadmap for the given career advancement suggestions.");

  // Extract JSON from response text
  const jsonResponse = result.response.text().match(/\{[\s\S]*\}/);
  if (!jsonResponse) {
    throw new Error("Invalid JSON response");
  }

  try {
    const roadmap = JSON.parse(jsonResponse[0]);
    return roadmap;
  } catch (error) {
    console.error("Error parsing JSON response:", error);
    throw new Error("Failed to parse JSON response");
  }
}

module.exports = { generateRoadmap };