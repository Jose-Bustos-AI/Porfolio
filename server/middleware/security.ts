import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';

// Input validation middleware
export const validateInput = (allowedFields: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
      const requestFields = Object.keys(req.body);
      const invalidFields = requestFields.filter(field => !allowedFields.includes(field));
      
      if (invalidFields.length > 0) {
        return res.status(400).json({
          error: 'Invalid fields detected',
          invalidFields
        });
      }
    }
    next();
  };
};

// SQL injection prevention for query parameters
export const sanitizeQueryParams = (req: Request, res: Response, next: NextFunction) => {
  const dangerousPatterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION|SCRIPT)\b)/gi,
    /(--|\/\*|\*\/|;|'|"|`)/g,
    /(\bOR\b.*=.*\bOR\b|\bAND\b.*=.*\bAND\b)/gi
  ];
  
  for (const [key, value] of Object.entries(req.query)) {
    if (typeof value === 'string') {
      for (const pattern of dangerousPatterns) {
        if (pattern.test(value)) {
          return res.status(400).json({
            error: 'Invalid characters detected in query parameters'
          });
        }
      }
    }
  }
  
  next();
};

// File upload security middleware
export const validateFileUpload = (req: Request, res: Response, next: NextFunction) => {
  if (req.file) {
    const allowedMimeTypes = [
      'image/jpeg',
      'image/jpg', 
      'image/png',
      'image/gif',
      'image/webp'
    ];
    
    const maxFileSize = 5 * 1024 * 1024; // 5MB
    
    if (!allowedMimeTypes.includes(req.file.mimetype)) {
      return res.status(400).json({
        error: 'Invalid file type. Only images are allowed.'
      });
    }
    
    if (req.file.size > maxFileSize) {
      return res.status(400).json({
        error: 'File too large. Maximum size is 5MB.'
      });
    }
    
    // Check for potential malicious file names
    const filename = req.file.originalname;
    const dangerousPatterns = [
      /\.(php|js|html|htm|asp|jsp|cgi|pl)$/i,
      /[<>:"/\\|?*]/,
      /^\./,
      /\.\./
    ];
    
    for (const pattern of dangerousPatterns) {
      if (pattern.test(filename)) {
        return res.status(400).json({
          error: 'Invalid filename detected'
        });
      }
    }
  }
  
  next();
};

// Admin authentication middleware
export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  // Simple authentication check - in production, use proper JWT or session management
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      error: 'Authentication required'
    });
  }
  
  // Verify token without exposing sensitive data in logs
  const token = authHeader.substring(7);
  const isValidToken = verifyAuthToken(token);
  
  if (!isValidToken) {
    // Log security attempt without exposing the actual token
    console.warn(`[SECURITY] Invalid authentication attempt from IP: ${req.ip} at ${new Date().toISOString()}`);
    return res.status(403).json({
      error: 'Invalid authentication'
    });
  }
  
  next();
};

// Secure token verification function
const verifyAuthToken = (token: string): boolean => {
  try {
    // In production, this should verify a JWT or check against a secure hash
    const EXPECTED_TOKEN = process.env.ADMIN_TOKEN || process.env.ADMIN_PASSWORD || 'defaultPassword123';
    return token === EXPECTED_TOKEN;
  } catch (error) {
    // Never log the actual token or sensitive data
    console.error('[SECURITY] Token verification error:', error instanceof Error ? error.message : 'Unknown error');
    return false;
  }
};

// Enhanced rate limiting for different endpoints
export const createRateLimit = (windowMs: number, max: number, message?: string) => {
  return rateLimit({
    windowMs,
    max,
    message: message || 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
      res.status(429).json({
        error: 'Rate limit exceeded',
        retryAfter: Math.round(windowMs / 1000)
      });
    }
  });
};

// Content Security Policy headers
export const addSecurityHeaders = (req: Request, res: Response, next: NextFunction) => {
  // Prevent clickjacking
  res.setHeader('X-Frame-Options', 'DENY');
  
  // Prevent MIME sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');
  
  // XSS Protection
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  // Referrer Policy
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Permissions Policy
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  
  next();
};

export default {
  validateInput,
  sanitizeQueryParams,
  validateFileUpload,
  requireAdmin,
  createRateLimit,
  addSecurityHeaders
};