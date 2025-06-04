import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Link } from 'wouter';
import ParticleBackground from '@/components/ParticleBackground';

// Definición del tipo para cada vertical
interface Vertical {
  id: string;
  name: string;
  description: string;
  image: string;
  url: string;
  color: 'blue' | 'purple' | 'pink' | 'orange' | 'green';
  icon?: string;
}

const Verticales: React.FC = () => {
  // Lista de verticales con sus datos
  const verticales: Vertical[] = [
    {
      id: 'innovagastro',
      name: 'InnovaGastro',
      description: 'Soluciones tecnológicas diseñadas para propietarios y gerentes de restaurantes, catering y negocios gastronómicos que buscan optimizar su gestión y ofrecer una experiencia excepcional a sus clientes.',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
      icon: 'restaurant-line',
      url: 'https://innovagastro.innovapyme.ai',
      color: 'orange'
    },
    {
      id: 'innovabeauty',
      name: 'InnovaBeauty',
      description: 'Soluciones tecnológicas para salones de belleza, spas y centros estéticos que quieren modernizar su operación, aumentar la fidelidad de sus clientes y destacar en un mercado competitivo.',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
      icon: 'scissors-cut-line',
      url: 'https://innovabeauty.innovapyme.ai',
      color: 'purple'
    },
    {
      id: 'innovatattoo',
      name: 'InnovaTattoo',
      description: 'Soluciones tecnológicas pensadas para estudios de tatuajes y artistas que necesitan profesionalizar la gestión de su negocio y potenciar su talento, convirtiendo cada cita en una oportunidad de crecimiento.',
      image: 'https://images.unsplash.com/photo-1581731353551-c6bdd6fe9472?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
      icon: 'ink-bottle-line',
      url: 'https://innovatattoo.innovapyme.ai',
      color: 'pink'
    },
    {
      id: 'innovafit',
      name: 'InnovaFit',
      description: 'Soluciones tecnológicas para gimnasios, centros de fitness y entrenadores personales que buscan crear comunidad, aumentar la retención de clientes y diferenciarse en el mundo del bienestar.',
      image: 'https://images.unsplash.com/photo-1571019613914-85f342c6a11e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
      icon: 'run-line',
      url: 'https://innovafit.innovapyme.ai',
      color: 'blue'
    },
    {
      id: 'innovarealty',
      name: 'InnovaRealty',
      description: 'Soluciones tecnológicas para agencias inmobiliarias, corredores y agentes que desean centralizar la gestión de propiedades, mejorar la atención al cliente y cerrar más operaciones con confianza.',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
      icon: 'home-line',
      url: 'https://innovarealty.innovapyme.ai',
      color: 'green'
    },
    {
      id: 'innovalogic',
      name: 'InnovaLogic',
      description: 'Soluciones tecnológicas para empresas que buscan automatizar procesos clave, mejorar la eficiencia operativa y ahorrar tiempo, permitiéndoles enfocarse en hacer crecer su negocio.',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
      icon: 'truck-line',
      url: 'https://innovalogic.innovapyme.ai',
      color: 'orange'
    },
  ];

  // Estado para el hover
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Animaciones para los elementos
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const titleVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: "easeOut" 
      } 
    }
  };

  // Scroll reveal effect usando useEffect
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
      const windowHeight = window.innerHeight;
      const revealPoint = 150;
      
      revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < windowHeight - revealPoint) {
          element.classList.add('visible');
        }
      });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check for elements in viewport
    
    return () => {
      window.removeEventListener('scroll', revealOnScroll);
    };
  }, []);

  // Función para obtener valores de colores según la especificación
  const getColorValues = (color: Vertical['color']) => {
    switch(color) {
      case 'blue':
        return {
          primary: '#00EEFF',
          secondary: '#00EEFF'
        };
      case 'purple':
        return {
          primary: '#BD00FF',
          secondary: '#BD00FF'
        };
      case 'pink':
        return {
          primary: '#FF00A0',
          secondary: '#FF00A0'
        };
      case 'orange':
        return {
          primary: '#E65616',
          secondary: '#E65616'
        };
      case 'green':
        return {
          primary: '#62d957',
          secondary: '#62d957'
        };
      default:
        return {
          primary: '#00EEFF',
          secondary: '#00EEFF'
        };
    }
  };

  return (
    <div className="min-h-screen bg-[#030015] text-white overflow-hidden">
      {/* Fondo con partículas */}
      <div className="fixed inset-0 z-0">
        <ParticleBackground id="particle-background" connectLines glowEffect density={50} />
      </div>
      
      {/* Animated gradient overlay */}
      <div className="fixed inset-0 z-0 opacity-30">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-[#00EEFF]/10 via-[#BD00FF]/5 to-transparent blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-[#E65616]/10 via-[#62d957]/5 to-transparent blur-[100px]"></div>
      </div>
      
      {/* Grid pattern overlay */}
      <div className="fixed inset-0 z-0 opacity-5">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'linear-gradient(rgba(0,238,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0,238,255,0.2) 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }}></div>
      </div>

      {/* Header con navegación */}
      <header className="glass sticky top-0 z-50 backdrop-blur-md">
        <div className="container mx-auto px-4 md:px-8 py-6">
          <nav className="flex justify-between items-center">
            <Link href="/">
              <div className="text-lg font-bold text-white flex items-center cursor-pointer hover:text-[#E65616] transition-colors duration-300">
                <i className="ri-arrow-left-line mr-2"></i>
                Volver al inicio
              </div>
            </Link>
            <div className="text-white/80">
              <a 
                href="https://innovapyme.ai" 
                className="hover:text-[#00EEFF] transition-colors duration-300"
                target="_blank"
                rel="noreferrer"
              >
                innovapyme.ai
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="container mx-auto px-4 md:px-8 pt-24 pb-20 relative z-10">
        {/* Título de sección */}
        <motion.div 
          className="text-center mb-20 reveal"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-space font-bold mb-6 text-white"
            variants={titleVariants}
          >
            Nuestras <span className="text-gradient animate-glow-pulse">Verticales</span>
          </motion.h1>
          <motion.p 
            className="text-xl text-[#CCCCCC] max-w-3xl mx-auto"
            variants={titleVariants}
          >
            Soluciones tecnológicas especializadas para diferentes sectores e industrias con enfoque en innovación, rendimiento y resultados.
          </motion.p>
        </motion.div>

        {/* Grid de tarjetas */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 reveal"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {verticales.map((vertical) => {
            const colorValues = getColorValues(vertical.color);
            
            return (
              <motion.div 
                key={vertical.id}
                className="glass rounded-xl overflow-hidden hover-shine card-3d"
                variants={itemVariants}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                onHoverStart={() => setHoveredCard(vertical.id)}
                onHoverEnd={() => setHoveredCard(null)}
                style={{ 
                  boxShadow: hoveredCard === vertical.id ? `0 10px 30px -5px rgba(0,0,0,0.3), 0 0 15px 2px ${colorValues.primary}30` : 'none',
                  transition: 'box-shadow 0.3s ease, transform 0.3s ease',
                  borderImage: `linear-gradient(45deg, ${colorValues.primary}50, transparent) 1`,
                  borderWidth: '1px',
                  borderStyle: 'solid'
                }}
              >
                {/* Imagen con overlay de gradiente */}
                <div className="relative h-48 overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-gradient-to-t from-[#030015] to-transparent opacity-70 z-10"
                    style={{ backgroundImage: `linear-gradient(to bottom, transparent, ${colorValues.primary}50, #030015)` }}
                  ></div>
                  <img 
                    src={vertical.image} 
                    alt={vertical.name} 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                  
                  {/* Icono superpuesto */}
                  <motion.div 
                    className="absolute top-4 right-4 z-20 w-12 h-12 rounded-full flex items-center justify-center" 
                    style={{ 
                      backgroundColor: `${colorValues.primary}30`,
                      boxShadow: `0 0 15px ${colorValues.primary}50` 
                    }}
                    animate={{ 
                      rotate: hoveredCard === vertical.id ? 360 : 0,
                      scale: hoveredCard === vertical.id ? 1.1 : 1
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <i className={`ri-${vertical.icon} text-2xl`} style={{ color: colorValues.primary }}></i>
                  </motion.div>
                </div>
                
                {/* Contenido de la tarjeta */}
                <div className="p-6 z-20 relative">
                  {/* Efecto de línea brillante bajo el título */}
                  <h3 className="text-2xl font-space font-bold mb-2 relative inline-block">
                    {vertical.name}
                    <motion.span 
                      className="absolute bottom-0 left-0 h-0.5 rounded-full" 
                      style={{ backgroundColor: colorValues.primary }}
                      initial={{ width: 0 }}
                      animate={{ width: hoveredCard === vertical.id ? '100%' : '40%' }}
                      transition={{ duration: 0.3 }}
                    ></motion.span>
                  </h3>
                  <p className="text-[#CCCCCC] mb-6 min-h-[80px]">{vertical.description}</p>
                  
                  {/* Botón con efecto hover */}
                  <motion.a 
                    href={vertical.url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center justify-center px-5 py-3 text-base font-medium rounded-full w-full relative overflow-hidden hover-shine"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Fondo con gradiente animado */}
                    <motion.div 
                      className="absolute inset-0 z-0"
                      style={{ 
                        background: `linear-gradient(90deg, ${colorValues.primary}, ${colorValues.secondary}, ${colorValues.primary})`,
                        backgroundSize: '200% 100%'
                      }}
                      animate={{ 
                        backgroundPosition: ['0% 0%', '100% 0%', '0% 0%']
                      }}
                      transition={{ 
                        duration: 3, 
                        ease: 'linear', 
                        repeat: Infinity 
                      }}
                    ></motion.div>
                    
                    <span className="relative z-10 font-bold text-black flex items-center">
                      <span>Saber más</span>
                      <motion.i 
                        className="ri-arrow-right-line ml-2"
                        animate={{ 
                          x: hoveredCard === vertical.id ? [0, 5, 0] : 0
                        }}
                        transition={{ 
                          duration: 1, 
                          repeat: hoveredCard === vertical.id ? Infinity : 0 
                        }}
                      ></motion.i>
                    </span>
                  </motion.a>
                </div>
                
                {/* Efecto de luz al pasar el ratón */}
                <motion.div 
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: hoveredCard === vertical.id ? 0.1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  style={{ 
                    background: `radial-gradient(circle at 50% 50%, ${colorValues.primary}, transparent 70%)`,
                    zIndex: 5
                  }}
                ></motion.div>
              </motion.div>
            );
          })}
        </motion.div>
        
        {/* CTA para contacto */}
        <motion.div 
          className="mt-20 text-center reveal"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-2xl md:text-3xl font-space font-bold mb-6">
            ¿Interesado en nuestras soluciones?
          </h2>
          <Link href="/#contacto">
            <motion.div 
              className="inline-block py-4 px-8 rounded-full relative overflow-hidden cursor-pointer hover-shine"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Gradient background */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-[#00EEFF] via-[#BD00FF] to-[#E65616]"
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] 
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                style={{ backgroundSize: '200% 200%' }}
              ></motion.div>
              
              <span className="relative z-10 font-bold text-black flex items-center">
                <span>Contactar ahora</span>
                <motion.i 
                  className="ri-arrow-right-line ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    repeatDelay: 0.5 
                  }}
                ></motion.i>
              </span>
            </motion.div>
          </Link>
        </motion.div>
        
        {/* Partículas decorativas */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(10)].map((_, index) => (
            <motion.div
              key={index}
              className="absolute w-2 h-2 rounded-full"
              initial={{ 
                x: Math.random() * 100 + '%', 
                y: Math.random() * 100 + '%',
                opacity: 0.1,
                scale: Math.random() * 0.5 + 0.5
              }}
              animate={{ 
                y: [0, -50],
                opacity: [0.2, 0.8, 0],
                scale: [0.5, 1.5]
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: 'loop',
                delay: Math.random() * 5
              }}
              style={{ 
                backgroundColor: index % 3 === 0 ? '#00EEFF' : 
                                index % 3 === 1 ? '#BD00FF' : 
                                '#E65616',
                filter: `blur(${Math.random() + 1}px)`
              }}
            />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="glass border-t border-white/10 relative z-10">
        <div className="container mx-auto px-4 md:px-8 py-8">
          <div className="text-center text-gray-400">
            <p>© 2025 Innovapymes. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Verticales;