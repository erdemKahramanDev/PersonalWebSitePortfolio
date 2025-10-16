import type { Plugin } from "vite";
import path from "path";
import fs from "fs";
import { createServer } from "../server";

export function expressPlugin(): Plugin {
  return {
    name: "express-plugin",
    apply: "serve", 
    configureServer(server) {
      const app = createServer();

      server.middlewares.use(app);
      server.middlewares.use(async (req, res, next) => {
        try {
          const url = req.url || "/";
          const isGet = req.method === "GET";
          const isApi = url.startsWith("/api/");
          const isViteInternal = url.startsWith("/@") || url.startsWith("/__vite");
          const isHtml = url.endsWith(".html");
          const isAsset = /\.(?!html$)[a-zA-Z0-9]+($|\?)/.test(url);
          const isRoot = url === "/";

          const shouldServeSpa404 =
            isGet &&
            !isApi &&
            !isViteInternal &&
            (
              (!isAsset && !isRoot) ||
              (isHtml && url !== "/index.html")
            );

          if (shouldServeSpa404) {
            const indexPath = path.resolve(process.cwd(), "index.html");
            let html = fs.readFileSync(indexPath, "utf-8");
            html = await server.transformIndexHtml(url, html);
            res.statusCode = 404;
            res.setHeader("Content-Type", "text/html");
            res.end(html);
            return;
          }
        } catch (e) {
          // Silently continue on errors
        }
        next();
      });
    },
  };
}