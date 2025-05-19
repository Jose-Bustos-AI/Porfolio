import { useEffect, useState } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

/**
 * Hook to track mouse position for the light follow effect
 */
export function useMouseLight(): MousePosition {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  
  useEffect(() => {
    // Update mouse position on mouse move
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };
    
    // Add event listener for mouse movement
    window.addEventListener('mousemove', handleMouseMove);
    
    // Clean up event listener
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return mousePosition;
}

/**
 * Apply mouse light effect to an element
 * @param element DOM element to apply effect
 * @param mouseX X position of mouse
 * @param mouseY Y position of mouse
 */
export function applyMouseLightEffect(
  element: HTMLElement | null,
  mouseX: number,
  mouseY: number
) {
  if (!element) return;
  
  element.style.setProperty('--x', `${mouseX}px`);
  element.style.setProperty('--y', `${mouseY}px`);
}

/**
 * Calculate distance between mouse and element center
 * @param element DOM element
 * @param mouseX X position of mouse
 * @param mouseY Y position of mouse
 */
export function calculateMouseDistance(
  element: HTMLElement,
  mouseX: number,
  mouseY: number
): number {
  if (!element) return 0;
  
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  
  return Math.sqrt(
    Math.pow(mouseX - centerX, 2) + 
    Math.pow(mouseY - centerY, 2)
  );
}

/**
 * Hook that returns whether an element should be highlighted based on mouse proximity
 * @param ref React ref to DOM element
 * @param threshold Distance threshold in pixels
 */
export function useMouseProximity(
  ref: React.RefObject<HTMLElement>,
  threshold = 200
): boolean {
  const mousePosition = useMouseLight();
  const [isClose, setIsClose] = useState(false);
  
  useEffect(() => {
    if (!ref.current) return;
    
    const distance = calculateMouseDistance(
      ref.current,
      mousePosition.x,
      mousePosition.y
    );
    
    setIsClose(distance < threshold);
  }, [ref, mousePosition, threshold]);
  
  return isClose;
}
