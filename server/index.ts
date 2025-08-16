import 'dotenv/config'; // carga .env antes de cualquier uso de process.env
import express, { type Request, Response, NextFunction } from "express";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import path from "path";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { addSecurityHeaders, sanitizeQueryParams } from "./middleware/security";

// Sanitize sensitive data from logs
const sanitizeLogData = (data: any): any => {
  if (typeof data !== 'object' || data === null) return data;

  const sensitiveFields = ['password', 'token', 'authorization', 'auth', 'secret', 'key'];
  const sanitized = { ...data };

  for (const field of sensitiveFields) {
    if (field in sanitized) sanitized[field] = '[REDACTED]';
  }

  for (const key in sanitized) {
    if (typeof sanitized[key] === 'object' && sanitized[key] !== null) {
      sanitized[key] = sanitizeLogData(sanitized[key]);
    }
  }
  return sanitized;
};

const app = express();

// Security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdn.jsdelivr.net"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"], // unsafe-eval needed for Vite in dev
      imgSrc: ["'self'", "data:", "https:", "blob:"],
      connectSrc: ["'self'", "wss:", "ws:"],
      mediaSrc: ["'self'", "https:"],
      frameSrc: ["'self'", "https://www.youtube.com", "https://www.youtube-nocookie.com"],
      objectSrc: ["'none'"],
      baseUri: ["'self'"],
      formAction: ["'self'"],
      frameAncestors: ["'none'"],
    },
  },
  hsts: { maxAge: 31536000, includeSubDomains: true, preload: true }
}));

// Compression for better performance
app.use(compression());

// Additional security headers
app.use(addSecurityHeaders);

// Query parameter sanitization
app.use(sanitizeQueryParams);

// Rate limiting for API endpoints
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', apiLimiter);

// Parsing middleware with size limits
app.use(express.json({
  limit: '10mb',
  verify: (_req, _res, buf) => {
    try { JSON.parse(buf.toString()); } catch { throw new Error('Invalid JSON'); }
  }
}));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));

app.use((req, res, next) => {
  const start = Date.now();
  const p = req.path;
  let capturedJsonResponse: Record<string, any> | undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (p.startsWith("/api")) {
      let logLine = `${req.method} ${p} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        const sanitizedResponse = sanitizeLogData(capturedJsonResponse);
        logLine += ` :: ${JSON.stringify(sanitizedResponse)}`;
      }
      if (logLine.length > 80) logLine = logLine.slice(0, 79) + "…";
      log(logLine);
    }
  });

  next();
});

// Serve static files before Vite middleware
app.get('/cv-jose-bustos.pdf', (_req, res) => {
  const pdfPath = path.resolve(import.meta.dirname, '..', 'public', 'cv-jose-bustos.pdf');
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="Jose-Bustos-CV.pdf"');
  res.sendFile(pdfPath);
});

app.get('/favicon.png', (_req, res) => {
  const faviconPath = path.resolve(import.meta.dirname, '..', 'public', 'favicon.png');
  res.setHeader('Content-Type', 'image/png');
  res.setHeader('Cache-Control', 'public, max-age=31536000');
  res.sendFile(faviconPath);
});

app.get('/apple-touch-icon.png', (_req, res) => {
  const iconPath = path.resolve(import.meta.dirname, '..', 'public', 'apple-touch-icon.png');
  res.setHeader('Content-Type', 'image/png');
  res.setHeader('Cache-Control', 'public, max-age=31536000');
  res.sendFile(iconPath);
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    let message = "Internal Server Error";
    if (status === 400) message = "Bad Request";
    else if (status === 401) message = "Unauthorized";
    else if (status === 403) message = "Forbidden";
    else if (status === 404) message = "Not Found";
    else if (status === 429) message = "Too Many Requests";

    console.error(`[ERROR] ${status} - ${err.message} - IP: ${_req.ip} - Path: ${_req.path} - Method: ${_req.method}`);
    res.status(status).json({ error: message, timestamp: new Date().toISOString() });
  });

  // dev: Vite middlewares; prod: serve estáticos
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ======== LISTEN (compat Windows) ========
  const port = Number(process.env.PORT ?? 5000);
  const host = process.env.HOST ?? "0.0.0.0";

  if (process.platform === "win32") {
    // Windows no soporta reusePort
    server.listen(port, host, () => {
      log(`serving on port ${port}`);
    });
  } else {
    // En *nix podemos usar reusePort
    server.listen({ port, host, reusePort: true } as any, () => {
      log(`serving on port ${port}`);
    });
  }
})();
