import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
  alpha: number;
  minAlpha: number;
}

interface ParticleBackgroundProps {
  id?: string;
  className?: string;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ id = "particles-js", className = "" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<{ x: number | null, y: number | null }>({ x: null, y: null });
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size to match parent
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Create particles
    const createParticles = () => {
      const particleCount = 80;
      const particles: Particle[] = [];
      const colors = ['#00EEFF', '#BD00FF', '#FF00A0'];
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3,
          color: colors[Math.floor(Math.random() * colors.length)],
          speedX: (Math.random() - 0.5) * 2,
          speedY: (Math.random() - 0.5) * 2,
          alpha: Math.random() * 0.5 + 0.2,
          minAlpha: Math.random() * 0.1 + 0.1
        });
      }
      
      particlesRef.current = particles;
    };
    
    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };
    
    const handleMouseLeave = () => {
      mouseRef.current = { x: null, y: null };
    };
    
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    
    // Draw and update particles
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections
      ctx.strokeStyle = '#00EEFF';
      ctx.lineWidth = 0.5;
      ctx.globalAlpha = 0.2;
      
      for (let i = 0; i < particlesRef.current.length; i++) {
        const p1 = particlesRef.current[i];
        
        // Connect to nearby particles
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p2 = particlesRef.current[j];
          const distance = Math.sqrt(
            Math.pow(p1.x - p2.x, 2) + 
            Math.pow(p1.y - p2.y, 2)
          );
          
          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
        
        // Connect to mouse if nearby
        if (mouseRef.current.x !== null && mouseRef.current.y !== null) {
          const distance = Math.sqrt(
            Math.pow(p1.x - mouseRef.current.x, 2) + 
            Math.pow(p1.y - mouseRef.current.y, 2)
          );
          
          if (distance < 140) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
            ctx.stroke();
            
            // Push particle away from mouse slightly
            const angle = Math.atan2(p1.y - mouseRef.current.y, p1.x - mouseRef.current.x);
            p1.x += Math.cos(angle) * 0.5;
            p1.y += Math.sin(angle) * 0.5;
          }
        }
      }
      
      // Draw particles
      ctx.globalAlpha = 1;
      
      particlesRef.current.forEach(particle => {
        // Update
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX = -particle.speedX;
        }
        
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY = -particle.speedY;
        }
        
        // Pulsate opacity
        particle.alpha += Math.random() * 0.01 - 0.005;
        if (particle.alpha < particle.minAlpha) particle.alpha = particle.minAlpha;
        if (particle.alpha > 0.5) particle.alpha = 0.5;
        
        // Draw
        ctx.globalAlpha = particle.alpha;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      requestAnimationFrame(animate);
    };
    
    createParticles();
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef}
      id={id}
      className={`absolute inset-0 z-0 ${className}`}
    />
  );
};

export default ParticleBackground;
