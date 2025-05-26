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
  const [activeTab, setActiveTab] = useState('gastro');
  
  const tabs = [
    { id: 'gastro', label: 'InnovaGastro', color: 'orange' },
    { id: 'beauty', label: 'InnovaBeauty', color: 'purple' },
    { id: 'tattoo', label: 'InnovaTattoo', color: 'pink' },
    { id: 'fit', label: 'InnovaFit', color: 'blue' },
    { id: 'realty', label: 'InnovaRealty', color: 'green' },
    { id: 'logic', label: 'InnovaLogic', color: 'orange' }
  ];
  
  const tabContentMap: Record<string, IndustryContentProps> = {
    gastro: {
      title: 'InnovaGastro',
      description: 'Soluciones tecnológicas avanzadas para restaurantes, catering y empresas del sector alimentario con gestión integral.',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      features: [
        {
          icon: 'smartphone-line',
          title: 'App Personalizada',
          description: 'Una app propia para fidelizar clientes, enviar notificaciones push y generar reseñas automáticas. Crea una comunidad alrededor de tu restaurante y mantén el contacto directo sin depender de terceros.',
          color: 'orange'
        },
        {
          icon: 'global-line',
          title: 'Web Inteligente',
          description: 'Web optimizada para SEO local que publica contenido automáticamente con IA. Aparece en Google, atrae clientes desde tu zona y convierte visitas en reservas reales.',
          color: 'blue'
        },
        {
          icon: 'settings-3-line',
          title: 'Automatización',
          description: 'Automatiza tareas repetitivas como promociones, reseñas o campañas sin esfuerzo. Ahorra tiempo y haz que tu restaurante trabaje incluso cuando tú no estás.',
          color: 'green'
        }
      ]
    },
    beauty: {
      title: 'InnovaBeauty',
      description: 'Solución digital para salones de belleza, uñas y estéticas que fideliza clientas, mejora la visibilidad online y automatiza tareas clave del negocio.',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      features: [
        {
          icon: 'smartphone-line',
          title: 'App Personalizada',
          description: 'Conecta con tus clientas desde el móvil: gestiona citas, envía notificaciones push y activa promociones desde tu propia app. Ideal para fidelizar sin depender de plataformas externas.',
          color: 'purple'
        },
        {
          icon: 'global-line',
          title: 'Web Inteligente',
          description: 'Tu web siempre actualizada con IA: muestra servicios, horarios, promociones y posiciona en Google para captar nuevas clientas. Publicación automática de contenido para mejorar el SEO local.',
          color: 'pink'
        },
        {
          icon: 'settings-3-line',
          title: 'Automatizaciones',
          description: 'Automatiza tareas como recordatorios de cita, envío de reseñas o campañas de fidelización sin hacer nada manual. Más tiempo para atender, menos tiempo gestionando.',
          color: 'blue'
        }
      ]
    },
    tattoo: {
      title: 'InnovaTattoo',
      description: 'La solución integral para estudios de tatuajes que quieren profesionalizar su negocio, automatizar su gestión y atraer más clientes sin depender de redes sociales ni agendas en papel.',
      image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      features: [
        {
          icon: 'smartphone-line',
          title: 'App Personalizada',
          description: 'Gestión completa de reservas desde el móvil, galería de diseños, notificaciones push y sistema de reseñas. Tu estudio digitalizado en una sola app, directa al cliente.',
          color: 'pink'
        },
        {
          icon: 'global-line',
          title: 'Web Inteligente',
          description: 'Publica diseños, ofertas y novedades de forma automática con IA para mejorar tu SEO local y aparecer en Google. Captación constante sin mover un dedo.',
          color: 'purple'
        },
        {
          icon: 'settings-3-line',
          title: 'Automatizaciones',
          description: 'Recordatorios de cita, seguimiento post-tatuaje y mensajes para generar reseñas automáticamente. Ahorra tiempo y mejora tu reputación online con cada sesión.',
          color: 'blue'
        }
      ]
    },
    fit: {
      title: 'InnovaFit',
      description: 'Soluciones tecnológicas para gimnasios, centros de fitness y entrenadores personales con seguimiento avanzado.',
      image: 'https://images.unsplash.com/photo-1571019613914-85f342c6a11e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      features: [
        {
          icon: 'run-line',
          title: 'Rutinas Personalizadas',
          description: 'Planes de entrenamiento adaptativos basados en objetivos individuales.',
          color: 'blue'
        },
        {
          icon: 'heart-pulse-line',
          title: 'Monitoreo de Salud',
          description: 'Seguimiento de progreso y métricas de rendimiento en tiempo real.',
          color: 'green'
        },
        {
          icon: 'trophy-line',
          title: 'Gamificación',
          description: 'Sistema de logros y desafíos para motivar a los usuarios.',
          color: 'orange'
        }
      ]
    },
    realty: {
      title: 'InnovaRealty',
      description: 'Plataforma inmobiliaria inteligente para agencias, corredores y gestión de propiedades con tours virtuales.',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      features: [
        {
          icon: 'home-line',
          title: 'Tours Virtuales',
          description: 'Recorridos inmersivos en 360° para propiedades residenciales y comerciales.',
          color: 'green'
        },
        {
          icon: 'map-pin-line',
          title: 'Geolocalización',
          description: 'Búsqueda avanzada por ubicación con análisis de mercado local.',
          color: 'blue'
        },
        {
          icon: 'file-text-line',
          title: 'Gestión Documental',
          description: 'Automatización de contratos y procesos legales inmobiliarios.',
          color: 'purple'
        }
      ]
    },
    logic: {
      title: 'InnovaLogic',
      description: 'Soluciones de automatización y logística inteligente para empresas con gestión de cadena de suministro optimizada.',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      features: [
        {
          icon: 'truck-line',
          title: 'Gestión de Rutas',
          description: 'Optimización inteligente de rutas de entrega con algoritmos avanzados.',
          color: 'orange'
        },
        {
          icon: 'dashboard-3-line',
          title: 'Control de Inventario',
          description: 'Seguimiento en tiempo real de stock y automatización de reposición.',
          color: 'blue'
        },
        {
          icon: 'global-line',
          title: 'Cadena de Suministro',
          description: 'Integración completa de proveedores y análisis predictivo de demanda.',
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
