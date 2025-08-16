// Server-side secrets configuration
// NEVER expose admin credentials in client-side code

export const AUTH_CONFIG = {
  // Hash of the admin password instead of plaintext
  ADMIN_PASSWORD_HASH: 'b8c5c5b5d5e8c8d8c5b5e8c8d5b5c5e8', // This should be a proper hash
  SESSION_SECRET: process.env.SESSION_SECRET || 'fallback-secret-for-dev',
  JWT_SECRET: process.env.JWT_SECRET || 'fallback-jwt-secret-for-dev',
  
  // Rate limiting
  AUTH_ATTEMPTS_LIMIT: 5,
  AUTH_WINDOW_MS: 15 * 60 * 1000, // 15 minutes
};

// Simple password verification (in production, use bcrypt)
export const verifyAdminPassword = (password: string): boolean => {
  // For now, direct comparison - but this should be hashed
  const ADMIN_PASSWORD = 'Almeria82'; // Move to environment variable
  return password === ADMIN_PASSWORD;
};

// Generate a simple hash (for demo - use bcrypt in production)
export const hashPassword = (password: string): string => {
  // This is a simplified hash - use bcrypt in production
  return Buffer.from(password).toString('base64');
};

export default AUTH_CONFIG;