import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  chatWithAI,
  getChatHistory,
  getChatById,
  deleteChat,
  clearChatHistory,
} from "../controllers/chatController.js";

const router = express.Router();

/* =====================================
   Protected Chat Routes
===================================== */

// Send Message to AI
router.post(
  "/",
  authMiddleware,
  chatWithAI
);

// Get All Chat History
router.get(
  "/",
  authMiddleware,
  getChatHistory
);

// Get Single Chat
router.get(
  "/:id",
  authMiddleware,
  getChatById
);

// Delete One Chat
router.delete(
  "/:id",
  authMiddleware,
  deleteChat
);

// Clear Entire Chat History
router.delete(
  "/",
  authMiddleware,
  clearChatHistory
);

export default router;