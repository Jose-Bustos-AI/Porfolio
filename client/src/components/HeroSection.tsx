import React from 'react';
import { motion } from 'framer-motion';
import ParticleBackground from './ParticleBackground';

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
  
  const buttonVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.4 + (i * 0.1),
        duration: 0.6,
        ease: "easeOut"
      }
    }),
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
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

  return (
    <section id="hero" className="min-h-screen relative flex items-center justify-center overflow-hidden pt-20">
      {/* Particle effect */}
      <ParticleBackground />
      
      {/* Geometric shapes */}
      <motion.div 
        className="absolute w-80 h-80 md:w-96 md:h-96 bg-[#00EEFF]/10 rounded-full filter blur-3xl top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 parallax"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1.5 }}
      />
      
      <motion.div 
        className="absolute w-80 h-80 md:w-96 md:h-96 bg-[#BD00FF]/10 rounded-full filter blur-3xl top-1/3 right-1/4 transform translate-x-1/2 -translate-y-1/2 parallax"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1.5, delay: 0.3 }}
      />
      
      {/* Rotating circles */}
      {[600, 500, 400].map((size, i) => (
        <motion.div 
          key={i}
          className={`absolute w-[${size}px] h-[${size}px] border border-[${i === 0 ? '#00EEFF' : i === 1 ? '#BD00FF' : '#FF00A0'}]/20 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-20 z-0`}
          custom={i}
          initial="hidden"
          animate="visible"
          variants={circleVariants}
          style={{ width: size, height: size }}
        />
      ))}
      
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
        animate={{ rotate: 360 }}
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
            <span className="text-gradient">Transformamos</span> el futuro<br />de tu empresa
          </motion.h1>
          
          <motion.p 
            className="text-[#CCCCCC] text-lg md:text-xl mb-12 max-w-3xl mx-auto"
            variants={textVariants}
          >
            En <span className="font-bold text-white">Innovapyme</span> creamos soluciones tecnológicas disruptivas que impulsan 
            el crecimiento de pequeñas y medianas empresas.
          </motion.p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <motion.a 
              href="#servicios" 
              className="px-8 py-4 rounded-full bg-[#0A0A18] neon-border-blue hover:animate-pulse-glow transition-all duration-300 text-lg font-semibold"
              custom={0}
              variants={buttonVariants}
              whileHover="hover"
            >
              Explorar Servicios
            </motion.a>
            
            <motion.a 
              href="#contacto" 
              className="px-8 py-4 rounded-full bg-transparent border border-white/20 hover:border-white/80 transition-all duration-300 text-lg font-semibold"
              custom={1}
              variants={buttonVariants}
              whileHover="hover"
            >
              Contáctanos
            </motion.a>
          </div>
        </motion.div>
        
        {/* Scroll indicator */}
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
          <i className="ri-arrow-down-line text-2xl text-white/70"></i>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
