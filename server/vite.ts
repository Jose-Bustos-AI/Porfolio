// server/vite.ts
import type express from "express";
import type { Server as HttpServer } from "http";

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

export function serveStatic(_app: express.Express) {
  // Producción: sirves estáticos desde /dist (si ya lo hacías en otro sitio, déjalo igual)
  // Aquí no cargamos Vite.
}
