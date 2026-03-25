// server/vite.ts
import express from "express";
import type { Server as HttpServer } from "http";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}

// ❗ Nada de imports de 'vite' ni plugins arriba.
// Los cargamos sólo si estamos en desarrollo con import() dinámico.

export async function setupVite(app: express.Express, server: HttpServer) {
  if (process.env.NODE_ENV !== "development") return;

  // Carga perezosa de Vite y plugins SOLO en dev
  const { createServer } = await import("vite");
  const react = (await import("@vitejs/plugin-react")).default;
  const Windi = (await import("vite-plugin-windicss")).default;

  const vite = await createServer({
    appType: "custom",
    server: { middlewareMode: true, hmr: { server } },
    plugins: [react(), Windi()],
  });

  app.use(vite.middlewares);
}

export function serveStatic(app: express.Express) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const distPath = path.resolve(__dirname, "../dist/public");

  if (!fs.existsSync(distPath)) {
    log(`Static files not found at ${distPath}`, "static");
    return;
  }

  app.use(express.static(distPath));

  app.get("*", (_req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}
