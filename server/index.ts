
/**
 * Express Server Configuration
 * 
 * Main server setup with API routes
 * CORS enabled, JSON parsing middleware
 * 
 * @author Ahmed Erdem Kahraman
 * @date 2025
 */

import dotenv from "dotenv";
dotenv.config(); 

import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleMail } from "./routes/mail";
import { handleNotFound } from "./routes/not-found";

export function createServer() {
  const app = express();

  // Production-ready CORS configuration
  const allowedOrigins = [
    "https://aekahraman.com",
    "https://www.aekahraman.com",
    ...(process.env.NODE_ENV === "development" ? ["http://localhost:8080", "http://localhost:3000"] : [])
  ];

  app.use(cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, Postman, etc.)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true
  }));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ 
      status: "ok", 
      timestamp: new Date().toISOString(),
      env: process.env.NODE_ENV || "production"
    });
  });

  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);
  app.post("/api/contact", handleMail);

  app.use("/api", handleNotFound);

  app.use((req, res, next) => {
    if (
      req.method === "GET" &&
      req.path !== "/" &&
      !req.path.startsWith("/api/")
    ) {
      res.status(404);
    }
    next();
  });

  return app;
}