import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

/* =====================================
   General AI Chat
===================================== */

export const generateAIResponse = async (message) => {
  try {
    const prompt = `
You are LifeLine AI.

Rules:
- Help users during medical emergencies.
- Provide only basic first-aid guidance.
- Recommend contacting emergency services for serious situations.
- Never prescribe medicines.
- Keep responses short, clear, and easy to understand.

User:
${message}
`;

    const result = await model.generateContent(prompt);

    return result.response.text();
  } catch (error) {
    throw new Error(error.message);
  }
};

/* =====================================
   Detect Emergency Severity
===================================== */

export const analyzeEmergency = async (description) => {
  try {
    const prompt = `
Analyze this emergency.

Return ONLY valid JSON.

{
  "priority":"Low | Medium | High | Critical",
  "firstAid":"...",
  "ambulanceNeeded":true,
  "hospitalNeeded":true
}

Emergency:
${description}
`;

    const result = await model.generateContent(prompt);

    return result.response.text();
  } catch (error) {
    throw new Error(error.message);
  }
};

/* =====================================
   First Aid Suggestion
===================================== */

export const generateFirstAid = async (injury) => {
  try {
    const prompt = `
Provide first-aid instructions for:

${injury}

Rules:
- Maximum 150 words
- Easy language
- Safe advice only
`;

    const result = await model.generateContent(prompt);

    return result.response.text();
  } catch (error) {
    throw new Error(error.message);
  }
};