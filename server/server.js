import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";

import app from "./app.js";
import connectDB from "./config/db.js";
import initializeSocket from "./sockets/socket.js";

// Load Environment Variables
dotenv.config();


console.log(
  "Gemini Key Loaded:",
  process.env.GEMINI_API_KEY ? "YES" : "NO"
);

console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
/* =====================================
   Connect MongoDB
===================================== */

connectDB();

/* =====================================
   Create HTTP Server
===================================== */

const server = http.createServer(app);

/* =====================================
   Socket.IO Configuration
===================================== */

const allowedOrigins = [
  "http://localhost:5173",
  "https://lifeline-ai-by-lovesh.vercel.app"
];

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
  },
});

initializeSocket(io);

/* =====================================
   Start Server
===================================== */

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`
==========================================
🚑 LifeLine AI Server Started Successfully
==========================================

🌐 Server : http://localhost:${PORT}

📡 Socket.IO Enabled

🗄️ Database Connected

==========================================
`);
});

/* =====================================
   Handle Unhandled Promise Rejections
===================================== */

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err.message);

  server.close(() => {
    process.exit(1);
  });
});

/* =====================================
   Handle Uncaught Exceptions
===================================== */

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err.message);

  process.exit(1);
});

/* =====================================
   Graceful Shutdown
===================================== */

process.on("SIGINT", () => {
  console.log("\nShutting down server...");

  server.close(() => {
    console.log("Server stopped successfully.");
    process.exit(0);
  });
});