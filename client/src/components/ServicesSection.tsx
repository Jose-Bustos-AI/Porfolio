import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  features: string[];
  color: 'blue' | 'purple' | 'pink';
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, features, color, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const colorMap = {
    blue: '#00EEFF',
    purple: '#BD00FF',
    pink: '#FF00A0'
  };
  
  const bgColor = colorMap[color];
  const borderClass = `neon-border-${color}`;
  const textColorClass = `neon-text-${color}`;
  
  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.1 * i,
        duration: 0.6,
        ease: "easeOut"
      }
    }),
    hover: {
      y: -10,
      scale: 1.03,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };
  
  // Icon animation variants
  const iconVariants = {
    idle: { scale: 1 },
    hover: { 
      scale: 1.2,
      rotate: [0, 10, -10, 0]
    }
  };
  
  // Feature item variants for staggered animation
  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1, 
      x: 0,
      transition: { 
        delay: 0.05 * i,
        duration: 0.4
      }
    })
  };

  return (
    <motion.div 
      className={`glass rounded-xl p-6 group transition-all duration-300 reveal card-3d ${borderClass} hover-shine overflow-hidden`}
      variants={cardVariants}
      custom={index}
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Animated background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black to-transparent opacity-50"></div>
      
      {/* Animated glow spot that follows the card's movement */}
      <motion.div 
        className={`absolute w-40 h-40 rounded-full bg-[${bgColor}]/10 filter blur-xl opacity-20`}
        animate={{
          x: isHovered ? [null, -20, 20, -20, 0] : 0,
          y: isHovered ? [null, -20, 20, -20, 0] : 0,
          scale: isHovered ? [null, 1.2, 1.1, 1.2, 1] : 1
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
          times: [0, 0.25, 0.5, 0.75, 1],
        }}
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      />
      
      <div className="relative z-10">
        {/* Animated icon with glow effect */}
        <motion.div 
          className={`w-16 h-16 rounded-full bg-[${bgColor}]/10 flex items-center justify-center mb-6 group-hover:bg-[${bgColor}]/20 transition-colors duration-300 animate-glow-pulse`}
          animate={isHovered ? 
            { scale: 1.2, rotate: [0, 10, -10, 0] } : 
            { scale: 1 }
          }
          transition={{ 
            duration: 0.8,
            ease: "easeInOut" 
          }}
        >
          <i className={`ri-${icon} text-2xl ${textColorClass}`}></i>
          
          {/* Particle effect around icon on hover */}
          <AnimatePresence>
            {isHovered && (
              <>
                {[...Array(6)].map((_, i) => {
                  const angle = (Math.PI * 2 / 6) * i;
                  return (
                    <motion.div
                      key={`particle-${i}`}
                      className={`absolute w-1.5 h-1.5 rounded-full bg-[${bgColor}]`}
                      initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
                      animate={{ 
                        scale: [0, 1, 0],
                        x: [0, Math.cos(angle) * 30],
                        y: [0, Math.sin(angle) * 30],
                        opacity: [0, 0.8, 0]
                      }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.2 }}
                    />
                  );
                })}
              </>
            )}
          </AnimatePresence>
        </motion.div>
        
        {/* Title with neon glow effect */}
        <h3 className={`text-xl font-space font-bold mb-3 ${textColorClass} transition-all duration-300`}>
          {title}
        </h3>
        
        {/* Description with subtle animation */}
        <motion.p 
          className="text-[#CCCCCC] mb-4"
          animate={isHovered ? { opacity: [0.7, 1], y: [0, -2, 0] } : {}}
          transition={{ duration: 0.3 }}
        >
          {description}
        </motion.p>
        
        {/* Features list with staggered animations */}
        <motion.ul 
          className="space-y-2 mb-6"
          initial="hidden"
          animate={isHovered ? "visible" : "hidden"}
        >
          {features.map((feature, i) => (
            <motion.li 
              key={i} 
              className="flex items-center text-sm"
              variants={featureVariants}
              custom={i}
            >
              <i className={`ri-check-line text-[${bgColor}] mr-2`}></i>
              <span>{feature}</span>
            </motion.li>
          ))}
        </motion.ul>
        
        {/* Call to action with animation */}
        <motion.a 
          href="#contacto" 
          className={`inline-flex items-center text-[${bgColor}] relative`}
          whileHover={{ x: 5 }}
        >
          Saber más 
          <motion.i 
            className="ri-arrow-right-line ml-1"
            animate={isHovered ? { x: [0, 5, 0] } : {}}
            transition={{ duration: 0.6, repeat: Infinity }}
          />
          
          {/* Animated underline effect */}
          <motion.div 
            className={`absolute bottom-0 left-0 h-px bg-[${bgColor}]`}
            initial={{ width: 0 }}
            animate={isHovered ? { width: '100%' } : { width: 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.a>
      </div>
    </motion.div>
  );
};

const ServicesSection: React.FC = () => {
  const services = [
    {
      icon: "code-line",
      title: "Desarrollo Web & Móvil",
      description: "Creamos aplicaciones y sitios web personalizados con diseños responsive y experiencias de usuario excepcionales.",
      features: [
        "Aplicaciones web progresivas (PWA)",
        "Apps nativas para iOS y Android",
        "E-commerce y plataformas B2B"
      ],
      color: "blue" as const
    },
    {
      icon: "cloud-line",
      title: "Cloud & DevOps",
      description: "Modernizamos tu infraestructura digital con soluciones cloud escalables, seguras y eficientes.",
      features: [
        "Migración a la nube (AWS, Azure, GCP)",
        "Automatización de procesos (CI/CD)",
        "Arquitectura serverless"
      ],
      color: "purple" as const
    },
    {
      icon: "bar-chart-line",
      title: "AI & Data Analytics",
      description: "Convierte tus datos en información valiosa con nuestras soluciones de inteligencia artificial y analítica avanzada.",
      features: [
        "Business Intelligence personalizado",
        "Modelos predictivos y Machine Learning",
        "Automatización con IA"
      ],
      color: "pink" as const
    },
    {
      icon: "shield-keyhole-line",
      title: "Ciberseguridad",
      description: "Protegemos tus activos digitales con soluciones avanzadas de seguridad informática y prevención de riesgos.",
      features: [
        "Evaluaciones de vulnerabilidad",
        "Seguridad en la nube",
        "Cumplimiento normativo (GDPR, CCPA)"
      ],
      color: "blue" as const
    },
    {
      icon: "customer-service-line",
      title: "Consultoría Digital",
      description: "Asesoramos tu transformación digital con estrategias personalizadas que maximizan el valor de tu inversión tecnológica.",
      features: [
        "Roadmap de transformación digital",
        "Optimización de procesos IT",
        "Gestión del cambio tecnológico"
      ],
      color: "purple" as const
    },
    {
      icon: "team-line",
      title: "IT Staffing",
      description: "Refuerza tu equipo con profesionales tecnológicos de alto nivel, adaptados a tus necesidades específicas.",
      features: [
        "Developers full-stack, front-end, back-end",
        "Especialistas DevOps y Cloud",
        "Project managers y Scrum masters"
      ],
      color: "pink" as const
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const titleVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section id="servicios" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background effect */}
      <div className="absolute w-full h-full bg-[#050816] z-0"></div>
      <div className="absolute left-0 top-1/4 w-1/2 h-1/2 bg-[#BD00FF]/5 blur-3xl z-0"></div>
      
      <div className="container mx-auto px-6 md:px-16 relative z-10">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16 reveal"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-space font-bold mb-6"
            variants={titleVariants}
          >
            Nuestros <span className="text-gradient">Servicios</span>
          </motion.h2>
          <motion.p 
            className="text-[#CCCCCC]"
            variants={titleVariants}
          >
            Ofrecemos soluciones tecnológicas integrales adaptadas a las necesidades específicas de tu negocio,
            combinando innovación, calidad y resultados medibles.
          </motion.p>
        </motion.div>
        
        {/* Services Grid with glassmorphism cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              features={service.features}
              color={service.color}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
