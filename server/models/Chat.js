import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    // User who owns this chat
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // User Message
    userMessage: {
      type: String,
      required: true,
      trim: true,
    },

    // AI Response
    aiResponse: {
      type: String,
      required: true,
      trim: true,
    },

    // Chat Category
    category: {
      type: String,
      enum: [
        "Emergency",
        "First Aid",
        "Hospital",
        "Blood Donation",
        "Medical Advice",
        "General",
      ],
      default: "General",
    },

    // AI Suggested Priority
    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Critical"],
      default: "Low",
    },

    // Conversation Status
    status: {
      type: String,
      enum: ["Active", "Closed"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;