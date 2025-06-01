import React from 'react';
import { motion, Variants } from 'framer-motion';
import ParticleBackground from '../components/ParticleBackground';
import { Link } from 'wouter';

// Definimos la estructura de un servicio
interface Servicio {
  id: string;
  titulo: string;
  descripcion: string;
  icono: string;
  color: 'naranja' | 'verde' | 'azul' | 'morado' | 'rosa';
}

const Servicios: React.FC = () => {
  // Array con los datos de los servicios
  const servicios: Servicio[] = [
    {
      id: 'automatizacion',
      titulo: 'Automatización con IA',
      descripcion: 'Optimización de tareas, bots inteligentes, workflows con n8n, IA generativa para mejorar la productividad de tu negocio.',
      icono: 'ri-robot-line',
      color: 'azul'
    },
    {
      id: 'desarrollo-web',
      titulo: 'Desarrollo Web a Medida',
      descripcion: 'Aplicaciones empresariales, PWAs, portales personalizados y paneles de administración adaptados a tus necesidades específicas.',
      icono: 'ri-code-s-slash-line',
      color: 'naranja'
    },
    {
      id: 'integracion-apis',
      titulo: 'Integración de APIs y Plataformas',
      descripcion: 'Conexión entre herramientas como Stripe, WhatsApp, Google, OpenAI y otras plataformas para optimizar tus procesos.',
      icono: 'ri-link-m',
      color: 'verde'
    },
    {
      id: 'reservas',
      titulo: 'Sistemas de Reservas Inteligentes',
      descripcion: 'Para restaurantes, gimnasios y otros negocios físicos, con pago, calendario y lógica de negocio personalizada.',
      icono: 'ri-calendar-check-line',
      color: 'morado'
    },
    {
      id: 'entrenamiento-ia',
      titulo: 'Entrenamiento de IA Personalizada',
      descripcion: 'Creación de agentes inteligentes entrenados con datos propios, personalizados para cada cliente y sector.',
      icono: 'ri-brain-line',
      color: 'rosa'
    },
    {
      id: 'soporte',
      titulo: 'Acompañamiento y Soporte Técnico',
      descripcion: 'Formación, asesoría, tutoriales, y soporte para cada cliente con sus desarrollos tecnológicos.',
      icono: 'ri-customer-service-2-line',
      color: 'azul'
    }
  ];

  // Animaciones con Framer Motion
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const titleVariants: Variants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const cardContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 20
      }
    },
    hover: {
      y: -10,
      scale: 1.02,
      boxShadow: "0 20px 30px -10px rgba(0, 0, 0, 0.2)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 15
      }
    }
  };

  const buttonVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 1.2,
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.95
    }
  };

  // Función para renderizar el color de la tarjeta según el tipo
  const getCardGradient = (color: string) => {
    switch (color) {
      case 'naranja':
        return 'from-[#E65616]/20 to-[#E65616]/5';
      case 'verde':
        return 'from-[#62d957]/20 to-[#62d957]/5';
      case 'azul':
        return 'from-[#00EEFF]/20 to-[#00EEFF]/5';
      case 'morado':
        return 'from-[#BD00FF]/20 to-[#BD00FF]/5';
      case 'rosa':
        return 'from-[#FF00A0]/20 to-[#FF00A0]/5';
      default:
        return 'from-[#00EEFF]/20 to-[#00EEFF]/5';
    }
  };

  // Función para obtener el color del icono
  const getIconColor = (color: string) => {
    switch (color) {
      case 'naranja':
        return 'text-[#E65616]';
      case 'verde':
        return 'text-[#62d957]';
      case 'azul':
        return 'text-[#00EEFF]';
      case 'morado':
        return 'text-[#BD00FF]';
      case 'rosa':
        return 'text-[#FF00A0]';
      default:
        return 'text-[#00EEFF]';
    }
  };

  // Función para obtener el borde brillante según el color
  const getBorderGlow = (color: string) => {
    switch (color) {
      case 'naranja':
        return 'neon-border-orange';
      case 'verde':
        return 'neon-border-green';
      case 'azul':
        return 'neon-border-blue';
      case 'morado':
        return 'neon-border-purple';
      case 'rosa':
        return 'neon-border-pink';
      default:
        return 'neon-border-blue';
    }
  };

  return (
    <div className="bg-[#030015] min-h-screen text-white relative overflow-hidden">
      {/* Fondo de partículas */}
      <ParticleBackground 
        density={60} 
        connectLines={true} 
        glowEffect={true}
        className="fixed inset-0 z-0" 
      />
      
      {/* Contenido principal */}
      <div className="container mx-auto px-4 pt-32 pb-28 md:pt-40 md:pb-32 relative z-10">
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Título principal */}
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#E65616] via-[#62d957] to-[#00EEFF]"
            variants={titleVariants}
          >
            Soluciones que transforman negocios
          </motion.h1>
          
          {/* Subtítulo */}
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto"
            variants={titleVariants}
          >
            Desarrollamos tecnología real para problemas reales. Estas son las áreas donde podemos ayudarte:
          </motion.p>
        </motion.div>
        
        {/* Cuadrícula de servicios */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          variants={cardContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {servicios.map((servicio) => (
            <motion.div
              key={servicio.id}
              className={`glass rounded-xl p-6 md:p-8 h-full backdrop-blur-xl bg-gradient-to-br ${getCardGradient(servicio.color)} ${getBorderGlow(servicio.color)} relative overflow-hidden`}
              variants={cardVariants}
              whileHover="hover"
            >
              {/* Efecto brillante en la esquina */}
              <div className="absolute -top-10 -right-10 w-20 h-20 rounded-full blur-xl opacity-30 bg-white"></div>
              
              {/* Icono */}
              <div className={`text-4xl mb-4 ${getIconColor(servicio.color)}`}>
                <i className={servicio.icono}></i>
              </div>
              
              {/* Título */}
              <h3 className="text-2xl font-bold mb-3">{servicio.titulo}</h3>
              
              {/* Descripción */}
              <p className="text-gray-300">{servicio.descripcion}</p>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Botón de CTA */}
        <div className="text-center">
          <motion.a 
            href="#contacto"
            className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-[#E65616] to-[#62d957] text-white font-bold shadow-xl hover-shine relative overflow-hidden"
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap="tap"
          >
            Solicitar una consultoría gratuita
            <motion.div 
              className="absolute inset-0 bg-white opacity-10"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </motion.a>
        </div>
      </div>
    </div>
  );
};

export default Servicios;