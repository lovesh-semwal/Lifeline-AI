import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";

// Route Imports
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import hospitalRoutes from "./routes/hospitalRoutes.js";
import donorRoutes from "./routes/donorRoutes.js";
import emergencyRoutes from "./routes/emergencyRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

// Middleware
import errorMiddleware from "./middleware/errorMiddleware.js";

// Load Environment Variables
dotenv.config();

const app = express();

/* =====================================
   Middlewares
===================================== */

// Parse JSON
app.use(express.json());

// Parse Form Data
app.use(express.urlencoded({ extended: true }));

// Parse Cookies
app.use(cookieParser());

// Enable CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

// Logger
app.use(morgan("dev"));

/* =====================================
   Home Route
===================================== */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚑 Welcome to LifeLine AI API",
  });
});

/* =====================================
   API Routes
===================================== */

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/profile", profileRoutes);

app.use("/api/hospitals", hospitalRoutes);

app.use("/api/donors", donorRoutes);

app.use("/api/emergency", emergencyRoutes);

app.use("/api/ai", aiRoutes);

app.use("/api/chat", chatRoutes);

/* =====================================
   404 Route
===================================== */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

/* =====================================
   Global Error Handler
===================================== */

app.use(errorMiddleware);

export default app;