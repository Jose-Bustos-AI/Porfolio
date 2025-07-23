// Performance optimization utilities

/**
 * Debounce function to limit function calls
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Throttle function to limit function calls
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * Preload critical resources
 */
export const preloadResource = (href: string, as: string = 'fetch', crossorigin?: string) => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  if (crossorigin) {
    link.crossOrigin = crossorigin;
  }
  document.head.appendChild(link);
};

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Get device performance tier (experimental)
 */
export const getPerformanceTier = (): 'low' | 'medium' | 'high' => {
  // Check for navigator.deviceMemory (Chrome only)
  const deviceMemory = (navigator as any).deviceMemory;
  const hardwareConcurrency = navigator.hardwareConcurrency || 1;
  
  if (deviceMemory) {
    if (deviceMemory >= 8) return 'high';
    if (deviceMemory >= 4) return 'medium';
    return 'low';
  }
  
  // Fallback to CPU cores
  if (hardwareConcurrency >= 8) return 'high';
  if (hardwareConcurrency >= 4) return 'medium';
  return 'low';
};

/**
 * Measure and log performance metrics
 */
export const measurePerformance = (name: string, fn: () => void) => {
  const start = performance.now();
  fn();
  const end = performance.now();
  console.log(`${name} took ${end - start} milliseconds`);
};

/**
 * Create a performance observer for monitoring
 */
export const observePerformance = () => {
  if ('PerformanceObserver' in window) {
    // Observe paint timing
    const paintObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        console.log(`${entry.name}: ${entry.startTime}ms`);
      });
    });
    paintObserver.observe({ entryTypes: ['paint'] });
    
    // Observe navigation timing
    const navObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        const nav = entry as PerformanceNavigationTiming;
        console.log(`DOM Content Loaded: ${nav.domContentLoadedEventEnd - nav.domContentLoadedEventStart}ms`);
        console.log(`Load Complete: ${nav.loadEventEnd - nav.loadEventStart}ms`);
      });
    });
    navObserver.observe({ entryTypes: ['navigation'] });
  }
};

export default {
  debounce,
  throttle,
  preloadResource,
  prefersReducedMotion,
  getPerformanceTier,
  measurePerformance,
  observePerformance
};