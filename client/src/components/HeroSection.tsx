import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimationControls } from 'framer-motion';
import ParticleBackground from './ParticleBackground';

/**
 * GlitchText - Component for creating cyberpunk-style glitch text effect
 */
const GlitchText: React.FC<{ text: string; className?: string }> = ({ text, className = "" }) => {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative inline-block">
        {text}
        {/* Glitch layers */}
        <span className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-[#00EEFF] opacity-70 glitch-layer-1" aria-hidden="true">
          {text}
        </span>
        <span className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-[#FF00A0] opacity-70 glitch-layer-2" aria-hidden="true">
          {text}
        </span>
      </span>
    </span>
  );
};

/**
 * RotatingText - Component for cycling through different words with animation
 */
const RotatingText: React.FC<{ words: string[]; interval?: number }> = ({ words, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const controls = useAnimationControls();

  useEffect(() => {
    const timer = setInterval(() => {
      controls.start({
        opacity: 0,
        y: 20,
        transition: { duration: 0.3 }
      }).then(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
        controls.start({
          opacity: 1,
          y: 0,
          transition: { duration: 0.3 }
        });
      });
    }, interval);

    return () => clearInterval(timer);
  }, [words.length, interval, controls]);

  return (
    <motion.span 
      animate={controls}
      initial={{ opacity: 1, y: 0 }}
      className="text-[#FF00A0] inline-block min-w-[160px]"
    >
      {words[currentIndex]}
    </motion.span>
  );
};

/**
 * ParticleButton - Button with particle emission effect on hover/click
 */
const ParticleButton: React.FC<{
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  delay?: number;
}> = ({ href, children, variant = 'primary', delay = 0 }) => {
  const [isEmitting, setIsEmitting] = useState(false);

  const emitParticles = () => {
    setIsEmitting(true);
    setTimeout(() => setIsEmitting(false), 500);
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.4 + delay,
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: variant === 'primary' 
        ? '0 0 25px 5px rgba(0, 238, 255, 0.7)' 
        : 'none',
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    }
  };

  const primaryClass = "px-8 py-4 rounded-full bg-[#0A0A18] neon-border-blue text-lg font-semibold relative overflow-hidden";
  const secondaryClass = "px-8 py-4 rounded-full bg-transparent border border-white/20 hover:border-white/80 text-lg font-semibold relative overflow-hidden";

  return (
    <motion.div className="relative">
      <motion.a 
        href={href} 
        className={variant === 'primary' ? primaryClass : secondaryClass}
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        onHoverStart={emitParticles}
        onClick={emitParticles}
      >
        {children}
        
        {/* Particle container */}
        <AnimatePresence>
          {isEmitting && (
            <>
              {[...Array(20)].map((_, i) => {
                const angle = Math.random() * Math.PI * 2;
                const speed = Math.random() * 100 + 50;
                const size = Math.random() * 8 + 4;
                const duration = Math.random() * 0.8 + 0.5;
                const color = variant === 'primary' 
                  ? ['#00EEFF', '#BD00FF', '#FFFFFF'][Math.floor(Math.random() * 3)] 
                  : ['#FFFFFF', '#CCCCCC', '#FF00A0'][Math.floor(Math.random() * 3)];
                
                return (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full pointer-events-none"
                    style={{ backgroundColor: color }}
                    initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                    animate={{
                      scale: size,
                      x: Math.cos(angle) * speed,
                      y: Math.sin(angle) * speed,
                      opacity: 0
                    }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ duration }}
                  />
                );
              })}
            </>
          )}
        </AnimatePresence>
      </motion.a>
    </motion.div>
  );
};

/**
 * FloatingObject - 3D-style floating object with effects
 */
const FloatingObject: React.FC<{
  size?: number;
  position?: { top?: string; left?: string; right?: string; bottom?: string };
  color?: string;
}> = ({ 
  size = 100, 
  position = { top: '20%', right: '15%' },
  color = '#00EEFF'
}) => {
  return (
    <motion.div
      className="absolute z-10 perspective-[800px]"
      style={{ ...position }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ 
          rotateX: [0, 10, -10, 0],
          rotateY: [0, 15, -15, 0],
          scale: [1, 1.05, 0.95, 1]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 8,
          ease: "easeInOut"
        }}
      >
        {/* Cube */}
        <motion.div
          className={`w-[${size}px] h-[${size}px] relative transform-style-3d`}
          style={{ width: size, height: size }}
          animate={{ rotate: 360 }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        >
          {/* Cube faces */}
          <div className={`absolute w-full h-full bg-[${color}]/10 border border-[${color}]/30 backdrop-blur-sm transform rotateY(0deg) translateZ(${size/2}px)`}></div>
          <div className={`absolute w-full h-full bg-[${color}]/10 border border-[${color}]/30 backdrop-blur-sm transform rotateY(180deg) translateZ(${size/2}px)`}></div>
          <div className={`absolute w-full h-full bg-[${color}]/10 border border-[${color}]/30 backdrop-blur-sm transform rotateY(90deg) translateZ(${size/2}px)`}></div>
          <div className={`absolute w-full h-full bg-[${color}]/10 border border-[${color}]/30 backdrop-blur-sm transform rotateY(-90deg) translateZ(${size/2}px)`}></div>
          <div className={`absolute w-full h-full bg-[${color}]/10 border border-[${color}]/30 backdrop-blur-sm transform rotateX(90deg) translateZ(${size/2}px)`}></div>
          <div className={`absolute w-full h-full bg-[${color}]/10 border border-[${color}]/30 backdrop-blur-sm transform rotateX(-90deg) translateZ(${size/2}px)`}></div>
          
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-full bg-transparent box-shadow-[0_0_40px_10px_rgba(0,238,255,0.3)] opacity-70"></div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const HeroSection: React.FC = () => {
  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };
  
  const circleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i: number) => ({
      scale: 1, 
      opacity: 0.1,
      transition: {
        delay: 0.2 * i,
        duration: 1.5,
        ease: "easeOut"
      }
    })
  };
  
  // Rotating words to show different technologies/concepts
  const rotatingWords = [
    "Impulso",
    "Transformo",
    "Potencio"
  ];

  return (
    <section id="hero" className="min-h-screen relative flex items-center justify-center overflow-hidden pt-20">
      {/* Enhanced particle effect with more density and glow */}
      <ParticleBackground 
        density={150} 
        glowEffect={true} 
        connectLines={true}
      />
      
      {/* Advanced geometric shapes with depth effects */}
      <motion.div 
        className="absolute w-[30vw] h-[30vw] max-w-[600px] max-h-[600px] bg-[#00EEFF]/10 rounded-full filter blur-[100px] top-1/2 left-[20%] transform -translate-x-1/2 -translate-y-1/2 parallax"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0.05, 0.2, 0.05],
          scale: [0.8, 1, 0.8],
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute w-[25vw] h-[25vw] max-w-[500px] max-h-[500px] bg-[#BD00FF]/10 rounded-full filter blur-[80px] top-1/3 right-[20%] transform translate-x-1/2 -translate-y-1/2 parallax"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0.05, 0.15, 0.05],
          scale: [1, 0.9, 1],
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      
      <motion.div 
        className="absolute w-[20vw] h-[20vw] max-w-[400px] max-h-[400px] bg-[#FF00A0]/10 rounded-full filter blur-[60px] bottom-[20%] left-[30%] transform -translate-x-1/2 parallax"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0.05, 0.1, 0.05],
          scale: [0.9, 1.1, 0.9],
        }}
        transition={{ 
          duration: 12, 
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      
      {/* 3D Floating objects */}
      <FloatingObject 
        size={80} 
        position={{ top: '25%', right: '15%' }} 
        color="#00EEFF"
      />
      
      <FloatingObject 
        size={60} 
        position={{ bottom: '30%', left: '12%' }} 
        color="#FF00A0"
      />
      
      {/* Enhanced rotating circles with glow */}
      {[600, 500, 400].map((size, i) => {
        const colors = ['#00EEFF', '#BD00FF', '#FF00A0'];
        return (
          <motion.div 
            key={i}
            className="absolute border rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-20 z-0 overflow-hidden"
            custom={i}
            initial="hidden"
            animate="visible"
            variants={circleVariants}
            style={{ 
              width: size, 
              height: size, 
              borderColor: `${colors[i]}50`,
              boxShadow: `0 0 30px 5px ${colors[i]}20`
            }}
          >
            {/* Animated dot moving along circle */}
            <motion.div 
              className="absolute w-3 h-3 rounded-full bg-white"
              style={{ 
                top: '0%', 
                left: '50%', 
                marginLeft: '-6px', 
                marginTop: '-6px',
                boxShadow: `0 0 10px 2px ${colors[i]}`,
                originX: "50%",
                originY: `${size/2 + 6}px`
              }}
              animate={{
                rotate: 360
              }}
              transition={{
                duration: 8 + i * 4,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </motion.div>
        );
      })}
      
      {/* Main rotating circles */}
      <motion.div 
        className="absolute w-[600px] h-[600px] border border-[#00EEFF]/20 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-20 z-0"
        animate={{ rotate: 360 }}
        transition={{ 
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <motion.div 
        className="absolute w-[500px] h-[500px] border border-[#BD00FF]/20 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-20 z-0"
        animate={{ rotate: -360 }}
        transition={{ 
          duration: 25,
          repeat: Infinity,
          ease: "linear" 
        }}
      />
      
      <motion.div 
        className="absolute w-[400px] h-[400px] border border-[#FF00A0]/20 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-20 z-0"
        animate={{ rotate: 360 }}
        transition={{ 
          duration: 20,
          repeat: Infinity,
          ease: "linear" 
        }}
      />
      
      <div className="container mx-auto px-6 md:px-16 relative z-10">
        <motion.div 
          className="text-center max-w-5xl mx-auto reveal"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
        >
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-space font-bold mb-6"
            variants={textVariants}
          >
            <span className="relative">
              <RotatingText words={rotatingWords} />
            </span> el <span className="inline-block mx-2 bg-gradient-to-r from-[#00EEFF] to-[#62d957] bg-clip-text text-transparent font-bold">futuro</span><br />
            de tu empresa
          </motion.h1>
          
          <motion.p 
            className="text-[#CCCCCC] text-lg md:text-xl mb-12 max-w-3xl mx-auto backdrop-blur-sm bg-[#050816]/50 py-2 rounded-lg"
            variants={textVariants}
          >
            Soy Jose Bustos, experto en Inteligencia Artificial. Creo soluciones que multiplican tus ventas, automatizan tu negocio y te ponen por delante de la competencia.
          </motion.p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <ParticleButton href="#servicios" variant="primary">
              Explora mis servicios
            </ParticleButton>
            
            <ParticleButton href="#contacto" variant="secondary" delay={0.1}>
              Hablemos
            </ParticleButton>
          </div>
        </motion.div>
        
        {/* Enhanced scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ 
            y: [0, 10, 0],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <motion.div 
            className="w-8 h-8 rounded-full border border-white/50 flex items-center justify-center"
            animate={{
              boxShadow: ['0 0 0px 0px rgba(255,255,255,0.3)', '0 0 10px 2px rgba(255,255,255,0.5)', '0 0 0px 0px rgba(255,255,255,0.3)'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <i className="ri-arrow-down-line text-xl text-white"></i>
          </motion.div>
        </motion.div>
      </div>
      

    </section>
  );
};

export default HeroSection;
