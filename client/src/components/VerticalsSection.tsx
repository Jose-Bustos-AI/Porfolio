import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TabProps {
  id: string;
  label: string;
  active: boolean;
  onClick: () => void;
  color: string;
}

const Tab: React.FC<TabProps> = ({ id, label, active, onClick, color }) => {
  const activeClass = active ? `neon-border-${color}` : '';
  
  return (
    <button 
      className={`px-6 py-3 rounded-full glass hover:neon-border-${color} transition-all duration-300 ${activeClass}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

interface FeatureProps {
  icon: string;
  title: string;
  description: string;
  color: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description, color }) => {
  const colorClass = color === 'blue' 
    ? 'bg-[#00EEFF]/10 text-[#00EEFF]' 
    : color === 'purple' 
      ? 'bg-[#BD00FF]/10 text-[#BD00FF]' 
      : 'bg-[#FF00A0]/10 text-[#FF00A0]';
  
  return (
    <div className="flex items-start">
      <div className={`mt-1 w-8 h-8 rounded-full ${colorClass} flex items-center justify-center flex-shrink-0`}>
        <i className={`ri-${icon} text-lg`}></i>
      </div>
      <div className="ml-4">
        <h4 className="font-semibold mb-1">{title}</h4>
        <p className="text-sm text-[#CCCCCC]">{description}</p>
      </div>
    </div>
  );
};

interface IndustryContentProps {
  title: string;
  description: string;
  image: string;
  features: {
    icon: string;
    title: string;
    description: string;
    color: string;
  }[];
}

const IndustryContent: React.FC<IndustryContentProps> = ({ title, description, image, features }) => {
  const containerVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    exit: { opacity: 0, x: -20 }
  };
  
  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div variants={itemVariants}>
        <div className="rounded-xl overflow-hidden">
          <img 
            src={image} 
            alt={`Innovapyme soluciones para ${title}`} 
            className="w-full h-auto object-cover rounded-xl transition-transform duration-500 hover:scale-105"
          />
        </div>
      </motion.div>
      <div>
        <motion.h3 
          className="text-2xl font-space font-bold mb-4"
          variants={itemVariants}
        >
          {title}
        </motion.h3>
        <motion.p 
          className="text-[#CCCCCC] mb-6"
          variants={itemVariants}
        >
          {description}
        </motion.p>
        <motion.ul 
          className="space-y-4"
          variants={containerVariants}
        >
          {features.map((feature, index) => (
            <motion.li key={index} variants={itemVariants}>
              <Feature 
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                color={feature.color}
              />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.div>
  );
};

const VerticalsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('retail');
  
  const tabs = [
    { id: 'retail', label: 'Retail', color: 'blue' },
    { id: 'fintech', label: 'Fintech', color: 'purple' },
    { id: 'health', label: 'Healthcare', color: 'pink' },
    { id: 'manufacturing', label: 'Manufactura', color: 'blue' },
    { id: 'education', label: 'Educación', color: 'purple' }
  ];
  
  const tabContentMap: Record<string, IndustryContentProps> = {
    retail: {
      title: 'Retail & E-Commerce',
      description: 'Transformamos la experiencia de compra integrando tecnologías de vanguardia que unen los mundos físico y digital.',
      image: 'https://images.unsplash.com/photo-1572584642822-6f8de0243c93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600',
      features: [
        {
          icon: 'store-3-line',
          title: 'Omnicanalidad',
          description: 'Experiencias de compra fluidas entre canales físicos y digitales.',
          color: 'blue'
        },
        {
          icon: 'customer-service-2-line',
          title: 'Personalización',
          description: 'Motores de recomendación basados en IA para mejorar las ventas.',
          color: 'purple'
        },
        {
          icon: 'bar-chart-box-line',
          title: 'Analítica avanzada',
          description: 'Insights de comportamiento de clientes y optimización de inventario.',
          color: 'pink'
        }
      ]
    },
    fintech: {
      title: 'Fintech',
      description: 'Impulsamos la innovación financiera con plataformas seguras, eficientes y centradas en la experiencia del usuario.',
      image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600',
      features: [
        {
          icon: 'bank-line',
          title: 'Banca digital',
          description: 'Plataformas bancarias modernas con experiencias fluidas e intuitivas.',
          color: 'blue'
        },
        {
          icon: 'secure-payment-line',
          title: 'Pagos innovadores',
          description: 'Soluciones de pago seguras, rápidas y compatibles con múltiples canales.',
          color: 'purple'
        },
        {
          icon: 'shield-check-line',
          title: 'Seguridad avanzada',
          description: 'Protección contra fraudes con tecnología blockchain y biometría.',
          color: 'pink'
        }
      ]
    },
    health: {
      title: 'Healthcare',
      description: 'Desarrollamos soluciones que mejoran la atención médica, optimizan procesos clínicos y potencian la investigación.',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600',
      features: [
        {
          icon: 'heart-pulse-line',
          title: 'Telemedicina',
          description: 'Plataformas de consulta virtual seguras y accesibles para pacientes y médicos.',
          color: 'blue'
        },
        {
          icon: 'file-list-3-line',
          title: 'Historial médico digital',
          description: 'Sistemas EHR intuitivos con altos estándares de seguridad y privacidad.',
          color: 'purple'
        },
        {
          icon: 'microscope-line',
          title: 'IA diagnóstica',
          description: 'Algoritmos de inteligencia artificial para asistencia en diagnósticos médicos.',
          color: 'pink'
        }
      ]
    },
    manufacturing: {
      title: 'Manufactura',
      description: 'Digitalizamos procesos industriales para aumentar la eficiencia, reducir costos y mejorar la calidad.',
      image: 'https://images.unsplash.com/photo-1565043589221-5a61f4de5ecd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600',
      features: [
        {
          icon: 'robot-line',
          title: 'Industria 4.0',
          description: 'Implementación de IoT industrial para monitoreo en tiempo real de maquinaria.',
          color: 'blue'
        },
        {
          icon: 'dashboard-3-line',
          title: 'Gestión inteligente',
          description: 'Dashboards y análisis predictivo para optimización de la producción.',
          color: 'purple'
        },
        {
          icon: 'tools-line',
          title: 'Mantenimiento predictivo',
          description: 'Algoritmos que predicen fallos de equipos antes de que ocurran.',
          color: 'pink'
        }
      ]
    },
    education: {
      title: 'Educación',
      description: 'Creamos plataformas educativas que transforman el aprendizaje haciéndolo más accesible, interactivo y personalizado.',
      image: 'https://images.unsplash.com/photo-1522661067900-ab829854a57f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600',
      features: [
        {
          icon: 'book-open-line',
          title: 'E-learning adaptativo',
          description: 'Plataformas que se adaptan al ritmo y estilo de aprendizaje de cada estudiante.',
          color: 'blue'
        },
        {
          icon: 'virtual-reality-line',
          title: 'Realidad aumentada',
          description: 'Experiencias inmersivas que enriquecen el aprendizaje teórico-práctico.',
          color: 'purple'
        },
        {
          icon: 'test-tube-line',
          title: 'Analítica educativa',
          description: 'Medición y optimización de resultados de aprendizaje con datos en tiempo real.',
          color: 'pink'
        }
      ]
    }
  };
  
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
    <section id="verticales" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 bg-[#0A0A18] z-0"></div>
      
      {/* Animated background lines */}
      <div className="absolute inset-0 z-0 opacity-10">
        {[0, 25, 50, 75, 100].map((pos, i) => (
          <div 
            key={`h-${i}`}
            className={`absolute top-[${pos}%] left-0 w-full h-px bg-gradient-to-r from-transparent via-[${i % 2 === 0 ? '#00EEFF' : '#BD00FF'}] to-transparent`}
            style={{ top: `${pos}%` }}
          ></div>
        ))}
        
        {[0, 25, 50, 75, 100].map((pos, i) => (
          <div 
            key={`v-${i}`}
            className={`absolute top-0 left-[${pos}%] w-px h-full bg-gradient-to-b from-transparent via-[${i % 2 === 0 ? '#00EEFF' : '#FF00A0'}] to-transparent`}
            style={{ left: `${pos}%` }}
          ></div>
        ))}
      </div>
      
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
            Verticales de <span className="text-gradient">Especialización</span>
          </motion.h2>
          <motion.p 
            className="text-[#CCCCCC]"
            variants={titleVariants}
          >
            Tenemos experiencia profunda en diversos sectores, lo que nos permite
            entender los desafíos específicos de tu industria y ofrecer soluciones adaptadas.
          </motion.p>
        </motion.div>
        
        {/* Industry sectors tabs */}
        <motion.div 
          className="max-w-5xl mx-auto mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-10 reveal"
            variants={containerVariants}
          >
            {tabs.map((tab) => (
              <Tab
                key={tab.id}
                id={tab.id}
                label={tab.label}
                active={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                color={tab.color}
              />
            ))}
          </motion.div>
          
          {/* Tab content */}
          <div className="verticals-content-container reveal">
            <AnimatePresence mode="wait">
              {Object.keys(tabContentMap).map(key => (
                key === activeTab && (
                  <IndustryContent
                    key={key}
                    title={tabContentMap[key].title}
                    description={tabContentMap[key].description}
                    image={tabContentMap[key].image}
                    features={tabContentMap[key].features}
                  />
                )
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VerticalsSection;
