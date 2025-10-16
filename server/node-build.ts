import path from "path";
import { createServer } from "./index";
import * as express from "express";

const app = createServer();
const port = process.env.PORT || 3000;

// In production, serve the built SPA files
const __dirname = import.meta.dirname;
const distPath = path.join(__dirname, "../spa");

// Serve static files
app.use(express.static(distPath));

app.use((req, res, next) => {
  if (
    req.method === "GET" &&
    !req.path.startsWith("/api/") &&
    !req.path.startsWith("/health")
  ) {
    const isRoot = req.path === "/";
    const isIndexHtml = req.path === "/index.html";
    if (!isRoot && !isIndexHtml) {
      res.status(404);
    }
  }
  next();
});

app.get("/(.*)", (req, res) => {
// Serve index.html for any GET that isn't an API or health check (Express v5 safe: no path pattern)
app.use((req, res, next) => {
  if (req.method === "GET") {
    const isApi = req.path.startsWith("/api/");
    const isHealth = req.path.startsWith("/health");
    if (!isApi && !isHealth) {
      return res.sendFile(path.join(distPath, "index.html"));
    }
  }
  next();
});
  console.log(`🚀 Fusion Starter server running on port ${port}`);
  console.log(`📱 Frontend: http://localhost:${port}`);
  console.log(`🔧 API: http://localhost:${port}/api`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("🛑 Received SIGTERM, shutting down gracefully");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("🛑 Received SIGINT, shutting down gracefully");
  process.exit(0);
});
