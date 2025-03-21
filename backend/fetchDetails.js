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
    You are an intelligent resume parser. Your task is to extract specific details from resumes uploaded in PDF format. Analyze the content and output the required details in a structured JSON format. Do not include metadata or references. The JSON structure must follow the format below:

    {
      "firstName": "First Name",
      "lastName": "Last Name",
      "phone": "Phone Number",
      "dob": "Date of Birth",
      "gender": "Gender",
      "location": "Location",
      "companyName": "Company Name",
      "jobTitle": "Job Title",
      "experience": "Experience",
      "skills": "Skills",
      "domainExpertise": "Domain Expertise",
      "coursesCertifications": "Courses and Certifications"
    }

    Parsing Instructions:
    1. Extract only the information specified in the JSON format.
    2. If a section is missing in the resume, omit it from the JSON output.
    3. Ensure all extracted information is accurate and properly formatted.
    4. Avoid adding any details that are not explicitly mentioned in the resume.
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

async function fetchDetails(filePath, mimeType) {
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

    const result = await chatSession.sendMessage("fetch the details from the resume");

    // Extract JSON from response text
    const jsonResponse = result.response.text().match(/\{[\s\S]*\}/);
    if (!jsonResponse) {
        throw new Error("Invalid JSON response");
    }

    return JSON.parse(jsonResponse[0]);
}

module.exports = { fetchDetails };