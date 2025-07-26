import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import voiceAgentImage from '@assets/Diseño sin título (3)_1753520134636.jpg';
import databaseImage from '@assets/Diseño sin título (5)_1753520510195.jpg';

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
      description: 'No adapto tu negocio a un modelo: elijo el LLM perfecto para tu caso, garantizando siempre la mejor solución en rendimiento, precio y resultados.',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      features: [
        {
          icon: 'openai-line',
          title: 'OpenAI',
          description: 'Muy buena para generación de texto, automatización de conversaciones y respuestas fiables. Ideal para chatbots, asistentes y procesos donde la calidad y naturalidad del lenguaje es clave.',
          color: 'blue'
        },
        {
          icon: 'cpu-line',
          title: 'Anthropic',
          description: 'Perfecta para código, generación de documentos complejos y análisis profundo de información. Excelente para empresas que necesitan IA capaz de entender instrucciones largas, procesar datos o redactar informes y papers técnicos.',
          color: 'purple'
        },
        {
          icon: 'google-line',
          title: 'Gemini (Google)',
          description: 'Versátil y económica, funciona genial para tareas de análisis, búsqueda de información, generación de resúmenes y automatización ligera. Recomendada para proyectos donde la eficiencia y el coste son importantes.',
          color: 'pink'
        },
        {
          icon: 'code-s-slash-line',
          title: 'Mistral (Open Source)',
          description: 'Open source, rápida y gratuita. Ideal para soluciones a medida que requieren personalización total, despliegue propio o ahorro de costes a gran escala. Perfecta para empresas que quieren control absoluto sobre sus datos y modelos.',
          color: 'green'
        }
      ]
    },
    automation: {
      title: 'Automatización',
      description: 'Elijo la herramienta de automatización que más te hace ganar: máxima eficiencia, cero complicaciones.',
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      features: [
        {
          icon: 'node-tree',
          title: 'n8n',
          description: 'Automatización visual, flexible y escalable. Conecta cualquier app y crea flujos a medida sin límites.',
          color: 'purple'
        },
        {
          icon: 'puzzle-line',
          title: 'Make',
          description: 'Automatiza tareas y conecta plataformas fácilmente, con plantillas listas y control total de cada paso.',
          color: 'blue'
        },
        {
          icon: 'flashlight-line',
          title: 'Zapier',
          description: 'La forma más rápida de automatizar tareas entre cientos de servicios, ideal para empezar y escalar.',
          color: 'orange'
        },
        {
          icon: 'code-line',
          title: 'Pipedream',
          description: 'Automatización avanzada para integrar APIs y personalizar procesos con código, rápido y seguro.',
          color: 'green'
        },
        {
          icon: 'robot-line',
          title: 'RPA',
          description: 'Digitaliza procesos repetitivos y ahorra tiempo sin cambiar tu sistema actual.',
          color: 'pink'
        }
      ]
    },
    voice: {
      title: 'Agentes de Voz',
      description: 'Elijo la herramienta de voz ideal para que tu negocio venda, atienda y cierre clientes aunque tú estés durmiendo.',
      image: voiceAgentImage,
      features: [
        {
          icon: 'phone-line',
          title: 'Vapi',
          description: 'Convierte tu web o app en un call center inteligente: agentes de voz para atención, reservas y ventas automáticas, siempre activos.',
          color: 'pink'
        },
        {
          icon: 'customer-service-2-line',
          title: 'RetellAI',
          description: 'Asistentes de voz personalizados y accesibles para tu negocio, listos para atender y resolver sin complicaciones.',
          color: 'blue'
        },
        {
          icon: 'mic-line',
          title: 'ElevenLabs',
          description: 'Voces ultra realistas y naturales. Experiencia premium y humana en todos tus canales de voz.',
          color: 'purple'
        },
        {
          icon: 'google-line',
          title: 'Google Speech API',
          description: 'Reconocimiento de voz preciso para automatizar respuestas, analizar y entender llamadas.',
          color: 'orange'
        },
        {
          icon: 'sound-module-line',
          title: 'Whisper (OpenAI)',
          description: 'Transcribe audio a texto de forma rápida y precisa, perfecto para convertir llamadas y notas de voz en datos útiles.',
          color: 'green'
        }
      ]
    },
    development: {
      title: 'Desarrollo',
      description: 'Utilizo el stack más moderno y probado para que tu producto salga al mercado antes que nadie y empiece a facturar desde el primer día.',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      features: [
        {
          icon: 'window-line',
          title: 'Winsurf',
          description: 'Entorno moderno y ágil para crear aplicaciones web y móviles de forma rápida, eficiente y a medida.',
          color: 'blue'
        },
        {
          icon: 'cursor-line',
          title: 'Cursor',
          description: 'Editor inteligente potenciado por IA que acelera el desarrollo, ayuda a detectar errores y sugiere código de forma proactiva.',
          color: 'purple'
        },
        {
          icon: 'heart-line',
          title: 'Lovable',
          description: 'Plataforma perfecta para prototipar, validar y testear ideas de producto digital antes de pasar a desarrollo completo. Ideal para ahorrar tiempo y dinero.',
          color: 'pink'
        },
        {
          icon: 'refresh-line',
          title: 'Replicate',
          description: 'Integro modelos avanzados y APIs de inteligencia artificial en tus productos, facilitando funcionalidades IA de última generación en tus soluciones.',
          color: 'green'
        },
        {
          icon: 'cloud-line',
          title: 'Replit',
          description: 'Entorno colaborativo en la nube para desarrollar, probar y lanzar proyectos en cualquier lenguaje y desde cualquier lugar, ideal para equipos y MVPs rápidos.',
          color: 'orange'
        },
        {
          icon: 'layout-line',
          title: 'Next.js',
          description: 'Framework robusto para construir webs y apps escalables, ultra rápidas y optimizadas para SEO. Perfecto para proyectos modernos y profesionales.',
          color: 'blue'
        },
        {
          icon: 'reactjs-line',
          title: 'React',
          description: 'Librería líder en la industria para crear interfaces de usuario dinámicas, intuitivas y de alto rendimiento. Base de toda app moderna.',
          color: 'cyan'
        },
        {
          icon: 'flashlight-line',
          title: 'Vite',
          description: 'Entorno de desarrollo ultrarrápido, ideal para lanzar proyectos web con máxima eficiencia y una experiencia de desarrollo sin fricciones.',
          color: 'yellow'
        }
      ]
    },
    database: {
      title: 'Bases de Datos que manejo',
      description: 'Especializado en múltiples tecnologías de bases de datos para cubrir todas las necesidades de tu proyecto, desde aplicaciones web hasta sistemas empresariales complejos.',
      image: databaseImage,
      features: [
        {
          icon: 'cloud-line',
          title: 'Supabase',
          description: 'Base de datos moderna y cloud, ideal para apps web y SaaS; ofrece autenticación, storage y API RESTful sobre PostgreSQL.',
          color: 'green'
        },
        {
          icon: 'database-2-line',
          title: 'PostgreSQL',
          description: 'Motor relacional robusto y potente, perfecto para proyectos que requieren transacciones, integridad y consultas complejas.',
          color: 'blue'
        },
        {
          icon: 'fire-line',
          title: 'Firebase',
          description: 'Solución de Google para apps en tiempo real, notificaciones push y sincronización instantánea. Genial para proyectos móviles.',
          color: 'orange'
        },
        {
          icon: 'leaf-line',
          title: 'MongoDB',
          description: 'Base de datos NoSQL orientada a documentos, ideal para apps flexibles, escalables y con esquemas dinámicos.',
          color: 'green'
        },
        {
          icon: 'database-line',
          title: 'MySQL',
          description: 'Uno de los motores SQL más populares y fiables; perfecto para sitios web, plataformas de e-commerce y proyectos legacy.',
          color: 'blue'
        }
      ]
    },
    tools: {
      title: 'Otras Herramientas',
      description: 'Trabajo solo con herramientas de primer nivel para que tu negocio siempre esté listo para vender, escalar y adaptarse al futuro.',
      image: 'https://images.unsplash.com/photo-1572177812156-58036aae439c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      features: [
        {
          icon: 'bank-card-line',
          title: 'Stripe',
          description: 'Plataforma líder para gestionar cobros online y suscripciones de forma sencilla y segura.',
          color: 'purple'
        },
        {
          icon: 'container-line',
          title: 'Docker',
          description: 'Contenedores para desplegar y escalar proyectos fácilmente, con máxima seguridad y portabilidad.',
          color: 'blue'
        },
        {
          icon: 'flutter-line',
          title: 'Flutterflow',
          description: 'Plataforma visual para crear apps móviles y web de manera rápida y totalmente personalizable.',
          color: 'cyan'
        },
        {
          icon: 'bar-chart-box-line',
          title: 'ScoreApp',
          description: 'Desarrollo ágil de aplicaciones visuales, ideal para MVPs, prototipos o herramientas internas sin necesidad de programar.',
          color: 'orange'
        },
        {
          icon: 'api-line',
          title: 'APIs Personalizadas',
          description: 'Conecto y adapto cualquier sistema que ya uses, asegurando integraciones fluidas y automatización total.',
          color: 'green'
        },
        {
          icon: 'webhook-line',
          title: 'Webhooks',
          description: 'Automatiza la comunicación entre plataformas y activa procesos en tiempo real sin intervención manual.',
          color: 'pink'
        },
        {
          icon: 'rocket-line',
          title: 'Vercel',
          description: 'Despliegue de proyectos web en la nube, garantizando velocidad, seguridad y alta disponibilidad.',
          color: 'yellow'
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
    <section id="verticales" className="py-20 md:py-32 relative overflow-hidden z-10">
      {/* Background effect */}
      <div className="absolute inset-0 bg-[#0A0A18]/60 z-0"></div>
      
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
