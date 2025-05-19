import React from 'react';
import { motion } from 'framer-motion';

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  features: string[];
  color: 'blue' | 'purple' | 'pink';
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, features, color, index }) => {
  const bgColor = color === 'blue' ? '#00EEFF' : color === 'purple' ? '#BD00FF' : '#FF00A0';
  const borderClass = `neon-border-${color}`;
  
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
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div 
      className={`glass rounded-xl p-6 group transition-all duration-300 reveal ${borderClass}`}
      variants={cardVariants}
      custom={index}
      whileHover="hover"
    >
      <div className={`w-14 h-14 rounded-full bg-[${bgColor}]/10 flex items-center justify-center mb-6 group-hover:bg-[${bgColor}]/20 transition-colors duration-300`}>
        <i className={`ri-${icon} text-2xl text-[${bgColor}]`}></i>
      </div>
      <h3 className="text-xl font-space font-bold mb-3">{title}</h3>
      <p className="text-[#CCCCCC] mb-4">
        {description}
      </p>
      <ul className="space-y-2 mb-6">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center text-sm">
            <i className={`ri-check-line text-[${bgColor}] mr-2`}></i>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <a href="#contacto" className={`inline-flex items-center text-[${bgColor}] group-hover:underline`}>
        Saber más <i className="ri-arrow-right-line ml-1 group-hover:ml-2 transition-all duration-300"></i>
      </a>
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
