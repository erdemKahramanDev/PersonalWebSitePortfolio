/**
 * Express Server Configuration
 * 
 * Main server setup with API routes
 * CORS enabled, JSON parsing middleware
 * 
 * @author Ahmed Erdem Kahraman
 * @date 2025
 */

import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleMail } from "./routes/mail";
import { handleNotFound } from "./routes/not-found";

export function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);
  app.post("/api/contact", handleMail);

  // 404 handler for all other /api routes - must be last!
  app.use("/api", handleNotFound);

  return app;
}
