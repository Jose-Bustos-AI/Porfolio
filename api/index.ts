import 'dotenv/config';
import express, { type Request, type Response, type NextFunction } from "express";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import path from "path";
import fs from "fs";
import { addSecurityHeaders, sanitizeQueryParams } from "../server/middleware/security";
import portfolioRouter from '../server/routes/portfolio_router';
import uploadsRouter from '../server/routes/uploads';
import authRouter from '../server/routes/auth';

const app = express();

// Security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdn.jsdelivr.net"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
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

app.use(compression());
app.use(addSecurityHeaders);
app.use(sanitizeQueryParams);

// Rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', apiLimiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));

// API Routes
app.use('/api/portfolio', portfolioRouter);
app.use('/api/uploads', uploadsRouter);
app.use('/api/auth', authRouter);

// Serve uploaded files
app.use('/uploads', (req, res, next) => {
  const uploadsPath = path.join(process.cwd(), 'public', 'uploads');
  return express.static(uploadsPath)(req, res, next);
});

// Data files endpoint
app.get('/data/posts.json', (req: Request, res: Response) => {
  try {
    const postsFilePath = path.join(process.cwd(), 'data', 'posts.json');
    if (fs.existsSync(postsFilePath)) {
      const postsData = fs.readFileSync(postsFilePath, 'utf8');
      res.setHeader('Content-Type', 'application/json');
      res.send(postsData);
    } else {
      res.status(404).json({ error: 'Archivo de posts no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al cargar los posts' });
  }
});

// Error handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  res.status(status).json({ error: err.message || 'Internal Server Error' });
});

export default app;
