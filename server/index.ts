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


app.use(cors({
  origin: ["https://aekahraman.com", "https://localhost:8080"],
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
}));

app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

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
