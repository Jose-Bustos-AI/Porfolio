import React from 'react';
import { motion } from 'framer-motion';
import joseBustosPhoto from '@assets/Diseño sin título_1753307523737.jpg';

const AboutSection: React.FC = () => {
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
  
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };
  
  const statBoxVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (index: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.4 + (index * 0.1),
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    hover: {
      y: -5,
      boxShadow: "0 0 25px 5px rgba(0, 238, 255, 0.7)",
      transition: { duration: 0.3 }
    }
  };
  
  const stats = [
    { value: "+10", label: "Soluciones SaaS y automatizaciones lanzadas", color: "blue" },
    { value: "100%", label: "Proyectos con impacto en facturación", color: "purple" },
    { value: "24/7", label: "Bots y sistemas trabajando para tu empresa", color: "pink" }
  ];

  return (
    <section id="quienes-somos" className="py-20 md:py-32 relative overflow-hidden z-10">
      {/* Background effect */}
      <div className="absolute inset-0 bg-[#0A0A18]/60 z-0"></div>
      <div className="absolute right-0 top-0 w-1/2 h-full bg-[#00EEFF]/5 blur-3xl z-0"></div>
      <div className="container mx-auto px-6 md:px-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div 
            className="reveal"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-space font-bold mb-6"
              variants={itemVariants}
            >
              Quién <span className="text-gradient">Soy</span>
            </motion.h2>
            
            <motion.p 
              className="text-[#CCCCCC] mb-6 text-lg font-semibold"
              variants={itemVariants}
            >
              No soy un programador más.
            </motion.p>
            
            <motion.p 
              className="text-[#CCCCCC] mb-6"
              variants={itemVariants}
            >
              Me dedico a transformar empresas con <span className="text-white font-semibold">inteligencia artificial aplicada</span> y <span className="text-white font-semibold">automatización real</span>, creando productos digitales que multiplican ventas y eliminan el trabajo repetitivo.
            </motion.p>
            
            <motion.p 
              className="text-[#CCCCCC] mb-6"
              variants={itemVariants}
            >
              No vas a encontrar aquí un desarrollador que solo escribe código: vas a encontrar un socio que convierte ideas en soluciones que facturan, procesos manuales en sistemas inteligentes y negocios tradicionales en máquinas digitales de crecimiento.
            </motion.p>
            
            <motion.p 
              className="text-[#CCCCCC] mb-6"
              variants={itemVariants}
            >
              Automatizo ventas, agilizo operaciones y te ayudo a capturar más clientes mientras otros siguen en la era del Excel.
            </motion.p>
            
            <motion.div 
              className="mb-6"
              variants={itemVariants}
            >
              <p className="text-[#CCCCCC] mb-4">
                Trabajo con empresas y emprendedores que quieren:
              </p>
              
              <ul className="text-[#CCCCCC] space-y-2 ml-4">
                <li className="flex items-start">
                  <span className="text-[#00EEFF] mr-3">•</span>
                  Aumentar sus ingresos
                </li>
                <li className="flex items-start">
                  <span className="text-[#BD00FF] mr-3">•</span>
                  Automatizar procesos clave
                </li>
                <li className="flex items-start">
                  <span className="text-[#FF00A0] mr-3">•</span>
                  Escalar operaciones sin límites
                </li>
                <li className="flex items-start">
                  <span className="text-[#62d957] mr-3">•</span>
                  Obtener resultados medibles desde el primer mes
                </li>
              </ul>
            </motion.div>
            
            <motion.p 
              className="text-[#CCCCCC] mb-8"
              variants={itemVariants}
            >No vendo promesas vacías: desarrollo soluciones que impactan tu cuenta bancaria, bots que trabajan 24/7 y sistemas de IA que te dan la ventaja que otros solo sueñan.</motion.p>
            
            {/* Stats with neon borders */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-10">
              {stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  className={`glass p-4 rounded-xl neon-border-${stat.color} reveal`}
                  custom={index}
                  variants={statBoxVariants}
                  whileHover="hover"
                >
                  <div className={`text-3xl font-space font-bold text-[${stat.color === 'blue' ? '#00EEFF' : stat.color === 'purple' ? '#BD00FF' : '#FF00A0'}]`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-[#CCCCCC] mt-2">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* About image with overlay effect */}
          <motion.div 
            className="relative reveal"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.div 
              className="relative rounded-2xl overflow-hidden group"
              variants={itemVariants}
            >
              <img 
                src={joseBustosPhoto} 
                alt="Jose Bustos en su estudio de desarrollo" 
                className="w-full h-auto rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050816]/80 to-transparent"></div>
              <motion.div 
                className="absolute inset-0 bg-[#00EEFF]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.3 }}
              ></motion.div>
            </motion.div>
            
            {/* Floating card on image */}
            <motion.div 
              className="glass absolute -bottom-10 -left-10 p-6 rounded-xl neon-border-blue max-w-xs"
              variants={itemVariants}
              animate={{ 
                y: [0, -15, 0], 
                transition: { 
                  duration: 6, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }
              }}
            >
              <div className="text-sm font-mono mb-2 text-[#00EEFF]">&lt;code&gt;</div>
              <div className="text-lg font-bold mb-2">Crecimiento garantizado</div>
              <p className="text-sm text-[#CCCCCC]">
                No solo implementamos tecnología, creamos soluciones vivas que evolucionan contigo y tu negocio.
              </p>
              <div className="text-sm font-mono mt-2 text-[#00EEFF]">&lt;/code&gt;</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
