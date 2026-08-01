import Chat from "../models/Chat.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Gemini Configuration
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

/* =====================================
   Send Message to AI
===================================== */

export const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required.",
      });
    }

    const prompt = `
You are LifeLine AI.

Rules:
- Help users during medical emergencies.
- Give only basic first-aid advice.
- If the situation is serious, tell the user to contact emergency services immediately.
- Never provide dangerous medical advice.
- Keep responses clear and concise.

User:
${message}
`;

    const result = await model.generateContent(prompt);
    const aiReply = result.response.text();

    const chat = await Chat.create({
      user: req.user._id,
      userMessage: message,
      aiResponse: aiReply,
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully.",
      chat,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =====================================
   Get Chat History
===================================== */

export const getChatHistory = async (req, res) => {
  try {
    const chats = await Chat.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: chats.length,
      chats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =====================================
   Get Single Chat
===================================== */

export const getChatById = async (req, res) => {
  try {
    const chat = await Chat.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found.",
      });
    }

    res.status(200).json({
      success: true,
      chat,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =====================================
   Delete One Chat
===================================== */

export const deleteChat = async (req, res) => {
  try {
    const chat = await Chat.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found.",
      });
    }

    await chat.deleteOne();

    res.status(200).json({
      success: true,
      message: "Chat deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =====================================
   Clear Chat History
===================================== */

export const clearChatHistory = async (req, res) => {
  try {
    await Chat.deleteMany({
      user: req.user._id,
    });

    res.status(200).json({
      success: true,
      message: "Chat history cleared successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};