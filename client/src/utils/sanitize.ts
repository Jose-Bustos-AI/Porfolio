import DOMPurify from 'dompurify';

// Configure DOMPurify for safe HTML rendering
const sanitizeConfig = {
  ALLOWED_TAGS: [
    'p', 'br', 'strong', 'em', 'u', 'i', 'b', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'ul', 'ol', 'li', 'blockquote', 'a', 'img', 'code', 'pre', 'span', 'div'
  ],
  ALLOWED_ATTR: [
    'href', 'src', 'alt', 'title', 'target', 'rel', 'class', 'id'
  ],
  ALLOW_DATA_ATTR: false,
  ADD_ATTR: ['target', 'rel'],
  FORBID_ATTR: ['style', 'onerror', 'onload', 'onclick'],
  FORBID_TAGS: ['script', 'object', 'embed', 'form', 'input', 'button'],
};

export const sanitizeHTML = (html: string): string => {
  if (!html) return '';
  
  // First pass: basic sanitization
  let clean = DOMPurify.sanitize(html, sanitizeConfig);
  
  // Second pass: ensure external links have proper attributes
  clean = clean.replace(
    /<a\s+([^>]*href\s*=\s*["'][^"']*["'][^>]*)>/gi,
    (match, attrs) => {
      if (attrs.includes('http') && !attrs.includes('target')) {
        return `<a ${attrs} target="_blank" rel="noopener noreferrer">`;
      }
      return match;
    }
  );
  
  // Third pass: add lazy loading to images
  clean = clean.replace(
    /<img\s+([^>]*)>/gi,
    (match, attrs) => {
      if (!attrs.includes('loading')) {
        return `<img ${attrs} loading="lazy">`;
      }
      return match;
    }
  );
  
  return clean;
};

export default sanitizeHTML;