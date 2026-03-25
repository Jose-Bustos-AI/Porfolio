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
    { id: 'imagevideo', label: 'Imagen & Video IA', color: 'orange' },
    { id: 'development', label: 'Desarrollo', color: 'green' },
    { id: 'database', label: 'Database', color: 'blue' },
    { id: 'tools', label: 'Otras Herramientas', color: 'purple' }
  ];

  const tabContentMap: Record<string, IndustryContentProps> = {
    llm: {
      title: 'LLM',
      description: 'No adapto tu negocio a un modelo: elijo el LLM perfecto para tu caso, garantizando siempre la mejor solución en rendimiento, precio y resultados.',
      image: '/images/llm.jpg',
      features: [
        {
          icon: 'openai-line',
          title: 'OpenAI (GPT-4o / o3)',
          description: 'El estándar del sector para chatbots, asistentes y automatización de conversaciones. Calidad y naturalidad del lenguaje insuperables para el cliente final.',
          color: 'blue'
        },
        {
          icon: 'cpu-line',
          title: 'Anthropic (Claude)',
          description: 'Líder en razonamiento complejo, análisis de documentos largos y generación de código. Mi elección cuando el proyecto requiere precisión y contexto extenso.',
          color: 'purple'
        },
        {
          icon: 'google-line',
          title: 'Gemini 2.5 (Google)',
          description: 'Multimodal nativo con la ventana de contexto más larga del mercado. Ideal para análisis de documentos, búsqueda aumentada y proyectos que combinan texto, imagen y audio.',
          color: 'pink'
        },
        {
          icon: 'code-s-slash-line',
          title: 'DeepSeek',
          description: 'La revolución del open source en 2025. Rendimiento comparable a los modelos top a una fracción del coste, ideal para despliegues propios y proyectos que requieren control total de datos.',
          color: 'green'
        },
        {
          icon: 'meta-line',
          title: 'Llama (Meta)',
          description: 'El open source de referencia. Flexible, potente y gratuito para ejecutar localmente o en infraestructura propia, perfecto para soluciones donde la privacidad es crítica.',
          color: 'orange'
        }
      ]
    },
    automation: {
      title: 'Automatización',
      description: 'Elijo la herramienta de automatización que más te hace ganar: máxima eficiencia, cero complicaciones.',
      image: '/images/automation.jpg',
      features: [
        {
          icon: 'node-tree',
          title: 'n8n',
          description: 'Automatización visual, flexible y escalable. La herramienta que más uso: conecta cualquier app, admite código personalizado y se puede desplegar en tu propio servidor.',
          color: 'purple'
        },
        {
          icon: 'puzzle-line',
          title: 'Make',
          description: 'Automatiza tareas y conecta plataformas fácilmente, con plantillas listas y control total de cada paso. Ideal para equipos no técnicos.',
          color: 'blue'
        },
        {
          icon: 'flashlight-line',
          title: 'Zapier',
          description: 'La forma más rápida de automatizar tareas entre cientos de servicios. Perfecto para empezar a automatizar sin fricción.',
          color: 'orange'
        },
        {
          icon: 'links-line',
          title: 'LangChain / LangGraph',
          description: 'El framework de referencia para orquestar agentes IA. Encadeno LLMs, herramientas y memoria para construir flujos de trabajo inteligentes y autónomos.',
          color: 'green'
        },
        {
          icon: 'team-line',
          title: 'CrewAI',
          description: 'Sistemas multiagente donde cada IA tiene un rol específico. Ideal para proyectos que requieren investigación, análisis y ejecución coordinada de forma autónoma.',
          color: 'pink'
        }
      ]
    },
    voice: {
      title: 'Agentes de Voz',
      description: 'Elijo la herramienta de voz ideal para que tu negocio venda, atienda y cierre clientes aunque tú estés durmiendo.',
      image: '/images/voice-agent.jpg',
      features: [
        {
          icon: 'phone-line',
          title: 'Vapi',
          description: 'La plataforma líder para agentes de voz telefónicos. Construyo call centers inteligentes que atienden, reservan y venden de forma totalmente autónoma 24/7.',
          color: 'pink'
        },
        {
          icon: 'mic-line',
          title: 'ElevenLabs',
          description: 'Síntesis de voz ultra realista e indetectable. Clono voces, genero locuciones y creo experiencias de audio premium que nadie distingue de una voz humana.',
          color: 'purple'
        },
        {
          icon: 'play-circle-line',
          title: 'Play.ai',
          description: 'Agentes de voz conversacionales con latencia mínima. Respuestas naturales y fluidas en tiempo real, perfecto para atención al cliente y asistentes interactivos.',
          color: 'blue'
        },
        {
          icon: 'emotion-line',
          title: 'Hume AI',
          description: 'La primera IA con inteligencia emocional en la voz. Detecta y responde al estado emocional del usuario, llevando la experiencia de atención a otro nivel.',
          color: 'orange'
        },
        {
          icon: 'sound-module-line',
          title: 'Whisper (OpenAI)',
          description: 'Transcripción de audio a texto con precisión quirúrgica en cualquier idioma. La base de todo pipeline de voz que construyo.',
          color: 'green'
        }
      ]
    },
    imagevideo: {
      title: 'Imagen & Video IA',
      description: 'Especializado en modelos generativos de última generación. Genero, entreno y despliego soluciones de imagen y vídeo IA a medida, tanto con modelos comerciales como open source.',
      image: '/images/llm.jpg',
      features: [
        {
          icon: 'image-line',
          title: 'FLUX (Black Forest Labs)',
          description: 'El modelo de imagen open source más avanzado del mercado. Entreno LoRAs personalizadas sobre FLUX para crear estilos visuales únicos, personajes y productos a medida.',
          color: 'orange'
        },
        {
          icon: 'film-line',
          title: 'Wan 2.2',
          description: 'Generación de vídeo de alta calidad con LoRAs propias entrenadas. Creo contenido de vídeo IA personalizado con consistencia de personaje y estilo para proyectos creativos.',
          color: 'pink'
        },
        {
          icon: 'flow-chart',
          title: 'ComfyUI',
          description: 'El workflow open source de referencia para generación de imagen y vídeo. Construyo pipelines complejos, encadeno modelos y automatizo la producción visual a escala.',
          color: 'purple'
        },
        {
          icon: 'server-flash-line',
          title: 'fal.ai',
          description: 'Inferencia serverless de modelos IA de imagen y vídeo a escala. Despliego y llamo a modelos como FLUX, Wan o LoRAs propias mediante API sin gestionar infraestructura.',
          color: 'blue'
        },
        {
          icon: 'cpu-line',
          title: 'RunPod',
          description: 'GPU serverless para entrenar y ejecutar modelos pesados. Uso RunPod para entrenamiento de LoRAs, despliegue de ComfyUI en producción y workloads de alta demanda.',
          color: 'green'
        },
        {
          icon: 'brain-line',
          title: 'LoRA Training',
          description: 'Fine-tuning de modelos de imagen y vídeo con conjuntos de datos propios. Especialidad clave para crear estilos, personajes o productos únicos con coherencia visual total.',
          color: 'orange'
        }
      ]
    },
    development: {
      title: 'Desarrollo',
      description: 'Utilizo el stack más moderno y probado para que tu producto salga al mercado antes que nadie y empiece a facturar desde el primer día.',
      image: '/images/development.jpg',
      features: [
        {
          icon: 'terminal-box-line',
          title: 'Claude Code',
          description: 'El agente de desarrollo IA más potente del momento. Lo uso para construir, refactorizar y desplegar proyectos completos con una velocidad y precisión imposibles de alcanzar manualmente.',
          color: 'purple'
        },
        {
          icon: 'cursor-line',
          title: 'Cursor',
          description: 'Editor potenciado por IA que acelera el desarrollo, detecta errores en tiempo real y sugiere código de forma proactiva. Mi entorno principal para proyectos complejos.',
          color: 'blue'
        },
        {
          icon: 'heart-line',
          title: 'Lovable',
          description: 'Genera apps full-stack funcionales desde una descripción en lenguaje natural. Ideal para prototipar rápido y validar ideas con el cliente antes de desarrollar.',
          color: 'pink'
        },
        {
          icon: 'flashlight-line',
          title: 'Bolt.new',
          description: 'Crea aplicaciones web completas en segundos directamente en el navegador. Perfecto para MVPs y demostraciones rápidas con stack moderno listo para producción.',
          color: 'orange'
        },
        {
          icon: 'magic-line',
          title: 'v0 (Vercel)',
          description: 'Generación de interfaces de usuario con IA. Convierto diseños y descripciones en componentes React de calidad producción en cuestión de segundos.',
          color: 'green'
        },
        {
          icon: 'layout-line',
          title: 'Next.js',
          description: 'Framework de referencia para apps web escalables, rápidas y SEO-optimizadas. Base de casi todos mis proyectos de producción.',
          color: 'blue'
        },
        {
          icon: 'reactjs-line',
          title: 'React',
          description: 'La librería de UI más usada del mundo. Construyo interfaces dinámicas, mantenibles y de alto rendimiento que escalan con el negocio.',
          color: 'cyan'
        },
        {
          icon: 'code-s-slash-line',
          title: 'Vite',
          description: 'Entorno de desarrollo ultrarrápido con Hot Module Replacement instantáneo. Hace que el ciclo de desarrollo sea significativamente más ágil.',
          color: 'yellow'
        }
      ]
    },
    database: {
      title: 'Bases de Datos',
      description: 'Elijo la base de datos correcta para cada proyecto. Desde PostgreSQL clásico hasta vectorial para IA, siempre con el mejor equilibrio entre rendimiento, coste y escalabilidad.',
      image: '/images/database.jpg',
      features: [
        {
          icon: 'database-2-line',
          title: 'PostgreSQL',
          description: 'El motor relacional más robusto y versátil. Mi primera opción para proyectos que requieren integridad de datos, transacciones complejas y escalabilidad a largo plazo.',
          color: 'blue'
        },
        {
          icon: 'cloud-line',
          title: 'Supabase',
          description: 'PostgreSQL con autenticación, storage y API REST listos. La solución ideal para lanzar SaaS y apps web rápidamente sin gestionar infraestructura.',
          color: 'green'
        },
        {
          icon: 'database-line',
          title: 'Turso',
          description: 'SQLite serverless distribuido globalmente. Latencia mínima, coste cero en el free tier y perfecto para apps JAMstack y portfolios como este mismo.',
          color: 'orange'
        },
        {
          icon: 'fire-line',
          title: 'Firebase',
          description: 'Base de datos en tiempo real de Google. Ideal para apps móviles con sincronización instantánea, autenticación y notificaciones push.',
          color: 'pink'
        },
        {
          icon: 'search-eye-line',
          title: 'Pinecone',
          description: 'Base de datos vectorial para IA. Esencial para construir sistemas RAG, búsqueda semántica y aplicaciones que necesitan memoria a largo plazo sobre documentos propios.',
          color: 'purple'
        }
      ]
    },
    tools: {
      title: 'Otras Herramientas',
      description: 'El ecosistema completo que rodea mis proyectos: pagos, despliegue, APIs y infraestructura cloud de primer nivel.',
      image: '/images/tools.jpg',
      features: [
        {
          icon: 'bank-card-line',
          title: 'Stripe',
          description: 'La plataforma de pagos más fiable del mercado. Implemento cobros únicos, suscripciones recurrentes y marketplaces con total seguridad y cumplimiento normativo.',
          color: 'purple'
        },
        {
          icon: 'container-line',
          title: 'Docker',
          description: 'Contenedores para empaquetar y desplegar cualquier proyecto con consistencia garantizada entre entornos. Indispensable para producción seria.',
          color: 'blue'
        },
        {
          icon: 'rocket-line',
          title: 'Vercel',
          description: 'El estándar para despliegue de apps Next.js y React. CI/CD automático, CDN global y preview deployments que aceleran el ciclo de desarrollo.',
          color: 'pink'
        },
        {
          icon: 'global-line',
          title: 'Cloudflare',
          description: 'CDN global, protección DDoS y Workers serverless en el edge. Uso Cloudflare para maximizar rendimiento y seguridad en cualquier proyecto.',
          color: 'orange'
        },
        {
          icon: 'server-line',
          title: 'Railway',
          description: 'Despliegue de backends, bases de datos y servicios sin fricción. La alternativa moderna a Heroku con mejor precio y experiencia de developer.',
          color: 'green'
        },
        {
          icon: 'mail-send-line',
          title: 'Resend',
          description: 'Emails transaccionales con la API más limpia del mercado. Onboarding, notificaciones y comunicaciones automáticas con entregabilidad garantizada.',
          color: 'blue'
        },
        {
          icon: 'api-line',
          title: 'Integraciones API',
          description: 'Conecto cualquier sistema mediante APIs REST, GraphQL o webhooks. Si tiene API, lo integro: CRMs, ERPs, plataformas de pago, redes sociales y más.',
          color: 'cyan'
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
