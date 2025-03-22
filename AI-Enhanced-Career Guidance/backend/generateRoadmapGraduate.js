const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: `System Instruction for Graduate Student:
Input Role: Graduate student
Objective: Provide a personalized roadmap to help the student achieve their career goals in a selected field.

Process:
1. Understand the selected career:
   - Focus on the specific career the student is interested in (e.g., software development, data science, AI).
   - Analyze the qualifications, skills, and interests of the student.

2. Career Roadmap Generation:
   - Phase 1: Skill Development
     - Identify key technical and soft skills required for the career.
     - Recommend ways to develop or improve these skills (e.g., courses, self-learning).
   - Phase 2: Qualifications Enhancement
     - Suggest certifications or advanced degrees that are highly valued in the career.
     - Recommend specialized training programs or workshops.
   - Phase 3: Practical Experience
     - Advise on internships, real-world projects, or freelance work to gain practical experience.
     - Suggest ways to build a strong portfolio showcasing work and skills.
   - Phase 4: Networking
     - Recommend professional organizations, online communities, or industry events to attend.
     - Suggest ways to find mentors and industry connections (e.g., LinkedIn, conferences).
   - Phase 5: Job Search & Interview Prep
     - Advise on applying for entry-level roles and creating a professional resume.
     - Provide tips on job interviews, common questions, and how to stand out.

3. Job Market Insights:
   - Provide salary ranges in INR for the selected career.
   - List key employers in India who are hiring for the career.
   - Provide insights on growth prospects in the industry, such as demand for roles, future trends, and career advancement.

4. Skills Enhancement:
   - List specific skills to focus on for career advancement (e.g., coding languages, leadership, communication skills).
   - Advise on how to improve these skills (e.g., online resources, practice, workshops).

Generate the roadmap in a structured JSON format with the following fields:
{
    "stage": "stage number",
    "title": "title of the stage",
    "details": [
        "detail 1",
        "detail 2",
        "detail 3"
    ]
}`,
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function generateRoadmapGraduate(input) {
  const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          { text: JSON.stringify(input) },
        ],
      },
    ],
  });

  const result = await chatSession.sendMessage("Generate a roadmap based on the provided input.");
  return result.response.text();
}

module.exports = { generateRoadmapGraduate };