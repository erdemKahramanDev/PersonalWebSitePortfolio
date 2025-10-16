import path from "path";
import { createServer } from "./index";
import express from "express";

const app = createServer();
const port = process.env.PORT || 3000;

// In production, serve the built SPA files
const __dirname = import.meta.dirname;
const distPath = path.join(__dirname, "../spa");

// Serve static files
app.use(express.static(distPath));

// Mark non-API, non-health GETs (except / and /index.html) with 404 status for SPA devtools clarity
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

// Express v5-safe SPA fallback: no path pattern, just a global middleware
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

app.listen(port, () => {
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
