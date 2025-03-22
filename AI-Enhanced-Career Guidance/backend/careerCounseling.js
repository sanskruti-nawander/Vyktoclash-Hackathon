const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: `
You are a career counselor. You are talking to a person who want to gain more insights about his career path who can be a student, undergraduate, graduate or a professional and is confused about what to do. Ask up to 5 questions to understand his/her interests. Provide a summary of the conversation in JSON format.
  `,
});

async function careerCounseling(input, context) {
    try {
        console.log('Starting career counseling session...');
        console.log('Input:', input);
        console.log('Context:', context);

        // Ensure context is initialized
        if (!context) context = [];

        const chatSession = model.startChat({
            generationConfig: {
                temperature: 1,
                topP: 0.95,
                topK: 40,
                maxOutputTokens: 8192,
                responseMimeType: "text/plain",
            },
            history: context.map(msg => ({
                role: msg.user ? "user" : "model",
                parts: [{ text: msg.user || msg.gemini }],
            })),
        });

        const result = await chatSession.sendMessage(input);
        const responseText = result.response.text();
        console.log('Response:', responseText);

        // Update context
        context.push({ user: input, gemini: responseText });

        // Check if we have reached the 5-question limit
        if (context.length >= 5) {
            // Generate a summary of the session
            const summary = {
                conversation: context,
                suggestion: "Based on the interaction, here is the recommended career path.",
            };

            console.log('Final Summary:', summary);

            // Save the summary to a JSON file
            const filePath = './AI-Enhanced-Learning-Platform/frontend/src/data/results.json';
            fs.writeFileSync(filePath, JSON.stringify(summary, null, 2));
            console.log(`Summary saved to ${filePath}`);
            
            return { response: "The counseling session is complete. Summary saved.", summary };
        }

        return { response: responseText, context };
    } catch (error) {
        console.error('Error in career counseling:', error);
        throw new Error(`Error in career counseling: ${error.message}`);
    }
}

module.exports = { careerCounseling };
