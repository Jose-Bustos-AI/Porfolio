import { Router, Request, Response } from 'express';
import { verifyAdminPassword } from '../config/secrets';
import { createRateLimit } from '../middleware/security';

const router = Router();

// Enhanced rate limiting for auth attempts
const authLimiter = createRateLimit(
  15 * 60 * 1000, // 15 minutes
  5, // max 5 attempts per window
  'Too many authentication attempts. Please try again later.'
);

// Secure admin login endpoint
router.post('/admin/login', authLimiter, (req: Request, res: Response) => {
  try {
    const { password } = req.body;
    
    // Validate input
    if (!password || typeof password !== 'string') {
      console.warn(`[SECURITY] Invalid login attempt from IP: ${req.ip} - Missing or invalid password format`);
      return res.status(400).json({
        error: 'Invalid request format'
      });
    }
    
    // Verify password securely
    const isValid = verifyAdminPassword(password);
    
    if (!isValid) {
      // Log failed attempt without exposing sensitive data
      console.warn(`[SECURITY] Failed admin login attempt from IP: ${req.ip} at ${new Date().toISOString()}`);
      
      // Add delay to prevent brute force attacks
      setTimeout(() => {
        res.status(401).json({
          error: 'Invalid credentials'
        });
      }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
      
      return;
    }
    
    // Success - generate session token (simplified)
    const sessionToken = generateSessionToken();
    
    console.log(`[SECURITY] Successful admin login from IP: ${req.ip} at ${new Date().toISOString()}`);
    
    res.json({
      success: true,
      token: sessionToken,
      expiresIn: '24h'
    });
    
  } catch (error) {
    console.error('[SECURITY] Auth endpoint error:', error instanceof Error ? error.message : 'Unknown error');
    res.status(500).json({
      error: 'Authentication service temporarily unavailable'
    });
  }
});

// Generate secure session token
const generateSessionToken = (): string => {
  const timestamp = Date.now();
  const randomBytes = Math.random().toString(36).substring(2, 15);
  return `session_${timestamp}_${randomBytes}`;
};

// Logout endpoint
router.post('/admin/logout', (req: Request, res: Response) => {
  console.log(`[SECURITY] Admin logout from IP: ${req.ip} at ${new Date().toISOString()}`);
  res.json({ success: true });
});

export default router;