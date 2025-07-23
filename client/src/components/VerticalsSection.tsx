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
            alt={`Innovapymes soluciones para ${title}`} 
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
  const [activeTab, setActiveTab] = useState('llm');
  
  const tabs = [
    { id: 'llm', label: 'LLM', color: 'blue' },
    { id: 'automation', label: 'Automatización', color: 'purple' },
    { id: 'voice', label: 'Agentes de Voz', color: 'pink' },
    { id: 'development', label: 'Desarrollo', color: 'orange' },
    { id: 'database', label: 'Database', color: 'green' },
    { id: 'tools', label: 'Otras Herramientas', color: 'blue' }
  ];
  
  const tabContentMap: Record<string, IndustryContentProps> = {
    llm: {
      title: 'LLM',
      description: 'Integración y personalización de modelos de lenguaje grandes para automatizar tareas cognitivas complejas y mejorar la productividad empresarial.',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      features: [
        {
          icon: 'brain-line',
          title: 'Chatbots Inteligentes',
          description: 'Asistentes virtuales con IA avanzada que entienden contexto, resuelven consultas complejas y aprenden de cada interacción para mejorar continuamente.',
          color: 'blue'
        },
        {
          icon: 'file-text-line',
          title: 'Generación de Contenido',
          description: 'Automatización de creación de textos, emails, reportes y documentos personalizados usando tu tono de voz y estilo específico.',
          color: 'purple'
        },
        {
          icon: 'search-line',
          title: 'Análisis de Datos',
          description: 'Procesamiento inteligente de información empresarial para extraer insights valiosos y generar reportes automatizados.',
          color: 'pink'
        }
      ]
    },
    automation: {
      title: 'Automatización',
      description: 'Flujos de trabajo inteligentes que eliminan tareas repetitivas y conectan tus herramientas existentes para maximizar la eficiencia operativa.',
      image: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      features: [
        {
          icon: 'settings-3-line',
          title: 'Flujos Personalizados',
          description: 'Automatización de procesos específicos de tu negocio con integración completa entre todas tus plataformas y herramientas.',
          color: 'purple'
        },
        {
          icon: 'smartphone-line',
          title: 'WhatsApp Business',
          description: 'Bots avanzados para WhatsApp que gestionan consultas, procesan pedidos y mantienen conversaciones naturales con tus clientes.',
          color: 'green'
        },
        {
          icon: 'mail-line',
          title: 'Email Marketing',
          description: 'Campañas automatizadas inteligentes que se adaptan al comportamiento del usuario y optimizan las conversiones automáticamente.',
          color: 'blue'
        }
      ]
    },
    voice: {
      title: 'Agentes de Voz',
      description: 'Asistentes virtuales por voz que manejan llamadas, reservas y atención al cliente 24/7 con tecnología de reconocimiento avanzado.',
      image: 'https://images.unsplash.com/photo-1589254066213-a0c7dc853511?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      features: [
        {
          icon: 'phone-line',
          title: 'Atención Telefónica',
          description: 'Asistentes que responden llamadas, gestionan citas y resuelven consultas frecuentes con voz natural y comprensión contextual.',
          color: 'pink'
        },
        {
          icon: 'calendar-line',
          title: 'Reservas por Voz',
          description: 'Sistema completo de gestión de citas que permite a los clientes reservar, modificar o cancelar mediante comandos de voz naturales.',
          color: 'orange'
        },
        {
          icon: 'customer-service-2-line',
          title: 'Soporte Multiidioma',
          description: 'Agentes que hablan múltiples idiomas y se adaptan al acento local para brindar una experiencia personalizada a cada cliente.',
          color: 'blue'
        }
      ]
    },
    development: {
      title: 'Desarrollo',
      description: 'Aplicaciones web y móviles a medida con tecnologías modernas, diseño responsivo y funcionalidades específicas para tu modelo de negocio.',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      features: [
        {
          icon: 'code-line',
          title: 'Apps Personalizadas',
          description: 'Desarrollo completo de aplicaciones web y móviles con funcionalidades específicas, diseño único y total adaptación a tus procesos.',
          color: 'orange'
        },
        {
          icon: 'smartphone-line',
          title: 'PWA & Mobile',
          description: 'Aplicaciones progresivas que funcionan como apps nativas en cualquier dispositivo, con notificaciones push y trabajo offline.',
          color: 'blue'
        },
        {
          icon: 'global-line',
          title: 'APIs & Integraciones',
          description: 'Conexión perfecta entre sistemas existentes y nuevas funcionalidades mediante APIs robustas y documentación completa.',
          color: 'green'
        }
      ]
    },
    database: {
      title: 'Database',
      description: 'Gestión inteligente de datos con bases de datos optimizadas, análisis en tiempo real y sistemas de backup automático.',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      features: [
        {
          icon: 'database-2-line',
          title: 'Optimización BD',
          description: 'Estructuras de datos eficientes, índices optimizados y consultas de alto rendimiento para manejar grandes volúmenes de información.',
          color: 'green'
        },
        {
          icon: 'bar-chart-line',
          title: 'Analytics Avanzado',
          description: 'Paneles de control interactivos con métricas en tiempo real, tendencias predictivas y reportes automatizados personalizables.',
          color: 'purple'
        },
        {
          icon: 'shield-line',
          title: 'Seguridad & Backup',
          description: 'Sistemas de respaldo automático, encriptación avanzada y protocolos de seguridad que garantizan la integridad de tus datos.',
          color: 'blue'
        }
      ]
    },
    tools: {
      title: 'Otras Herramientas',
      description: 'Suite completa de herramientas especializadas para optimizar procesos específicos y mejorar la productividad empresarial.',
      image: 'https://images.unsplash.com/photo-1572177812156-58036aae439c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      features: [
        {
          icon: 'image-line',
          title: 'IA Generativa',
          description: 'Herramientas para generar imágenes, videos y contenido visual personalizado usando inteligencia artificial avanzada.',
          color: 'pink'
        },
        {
          icon: 'file-pdf-line',
          title: 'Automatización Docs',
          description: 'Generación automática de contratos, facturas, reportes y documentos legales con plantillas inteligentes y datos dinámicos.',
          color: 'orange'
        },
        {
          icon: 'links-line',
          title: 'Scraping & APIs',
          description: 'Extracción automatizada de datos web, monitoreo de competencia y sincronización con plataformas externas.',
          color: 'green'
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
            Mi Stack <span className="text-gradient">Tecnológico</span>
          </motion.h2>
          <motion.p 
            className="text-[#CCCCCC]"
            variants={titleVariants}
          >
            Domino estas tecnologías y herramientas para crear soluciones completas que transforman tu negocio.
            Cada proyecto combina lo mejor de cada área para maximizar resultados.
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
