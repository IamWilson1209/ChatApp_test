import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import userRoutes from "./routes/user.route.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";

// const app = express();

dotenv.config(); // Load environment variables from.env file
const PORT = process.env.PORT || 8000; // Set the port to 3000 or the environment variable PORT if defined

app.use(express.json()); // Middleware to Parse JSON request bodies
app.use(cookieParser()); // Middleware to parse cookies

// Create routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server running on port ${PORT}`);
});
