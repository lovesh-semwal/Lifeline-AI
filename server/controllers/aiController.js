import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `
You are LifeLine AI, an emergency and first-aid assistant.

Give simple, clear, safe emergency guidance.

Rules:
- For life-threatening situations, tell the user to call emergency services immediately.
- In India, mention 112 when appropriate.
- Do not claim to be a doctor.
- Give practical first-aid steps.
- Do not provide dangerous or uncertain medical instructions.
- Keep responses easy to understand.
- Tell users to seek professional medical help when necessary.
          `,
        },
        {
          role: "user",
          content: message,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.3,
      max_tokens: 500,
    });

    const aiResponse = completion.choices[0].message.content;

    res.status(200).json({
      success: true,
      response: aiResponse,
    });
  } catch (error) {
    console.error("AI Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get AI response",
    });
  }
};