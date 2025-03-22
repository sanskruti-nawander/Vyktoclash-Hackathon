const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");
const { GoogleAIFileManager } = require("@google/generative-ai/server");
require('dotenv').config();

const apiKey = process.env.GEMINI_API_KEY;
const genai = new GoogleGenerativeAI(apiKey);
const fileManager = new GoogleAIFileManager(apiKey);

const model = genai.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: `
    You are an experienced career advisor with expertise in analyzing individual aptitude, skills, and interests. The user will provide a detailed report containing the following parameters:

1. Aptitude Scores: Numerical Ability, Verbal Ability, Logical Reasoning.
2. Skills: Specific technical or soft skills the user possesses.
3. Aspirations: The user's career goals or ambitions.
4. Abilities: Strengths and proficiencies beyond skills.
5. Hobbies and Passions: Activities the user enjoys and is passionate about.

Based on this report, your role is to analyze the data and provide personalized career recommendations. For each recommended career, generate/assign them a suitability numerical rating according to user on an account of 0-10 and reason explaining how it aligns with the user's unique attributes.The output should be in the following JSON format:
{
  "career_recommendations": [
    {
      "career": "<Career Option>",
      "reason": "<Reason why the user should consider this career>"
      "role": "<Role of the user>"
      "gender" : "girl"
      "Rating": "<Rating>"
    },
    {
      "career": "<Career Option>",
      "reason": "<Reason why the user should consider this career>"
      "role": "<Role of the user>"
      "gender": "girl"
      "Rating": "<Rating>"
    }
  ]
}
Ensure that the recommendations are logical and ratings are suitable, data-driven, and tailored to the user’s context provided in the report.Make sure to add rating for the career 
the role will be graduate/undergraduate or 10th grade student take that reference from the pdf and just add that role to json
also among the recommendations also recommend the most suitable career path for user on basis of highest rating.generate only 3 career recommendations.
    `,
});

// Optimize configuration for faster responses
const generationConfig = {
    temperature: 0.4,   // Reduced temperature for more deterministic responses
    topP: 0.85,        // Reduced topP for a narrower response distribution
    topK: 50,          // Reduced topK to consider fewer options
    maxOutputTokens: 1024, // Reduced tokens to speed up the response
    responseMimeType: "text/plain",
};

async function uploadToGemini(path, mimeType) {
    const uploadResult = await fileManager.uploadFile(path, {
        mimeType,
        displayName: path,
    });
    const file = uploadResult.file;
    console.log(`Uploaded file: ${file.displayName} as: ${file.name}`);
    return file;
}

async function generateRecommendations(filePath, mimeType) {
    const files = [
      await uploadToGemini(filePath, mimeType),
    ];
  
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {
              fileData: {
                mimeType: files[0].mimeType,
                fileUri: files[0].uri,
              },
            },
          ],
        },
      ],
    });

    const result = await chatSession.sendMessage("generate career recommendations.");

    // Extract JSON from response text
    const jsonResponse = result.response.text().match(/\{[\s\S]*\}/);
    if (!jsonResponse) {
        throw new Error("Invalid JSON response");
    }

    return JSON.parse(jsonResponse[0]);
}

module.exports = { generateRecommendations };