import React from 'react';
import { motion } from 'framer-motion';

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
    { value: "+500", label: "Proyectos Completados", color: "blue" },
    { value: "98%", label: "Clientes Satisfechos", color: "purple" },
    { value: "24/7", label: "Soporte Técnico", color: "pink" }
  ];

  return (
    <section id="quienes-somos" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 bg-[#0A0A18] z-0"></div>
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
              Quiénes <span className="text-gradient">Somos</span>
            </motion.h2>
            
            <motion.p 
              className="text-[#CCCCCC] mb-6 text-lg"
              variants={itemVariants}
            >
              Impulsamos el futuro de las pymes con <span className="text-white font-semibold">inteligencia artificial aplicada</span>, 
              <span className="text-white font-semibold"> automatización real</span> y soluciones digitales que generan resultados.
            </motion.p>
            
            <motion.p 
              className="text-[#CCCCCC] mb-8"
              variants={itemVariants}
            >
              En <span className="text-white font-semibold">Innovapyme</span> convertimos ideas en aplicaciones, 
              problemas en procesos automáticos y negocios tradicionales en empresas inteligentes. 
              Somos una compañía tecnológica con alma emprendedora, creada para revolucionar la forma 
              en la que operan las pequeñas y medianas empresas.
            </motion.p>
            
            <motion.p 
              className="text-[#CCCCCC] mb-8"
              variants={itemVariants}
            >
              Con años desarrollando soluciones a medida, hemos consolidado un ecosistema de productos 
              especializados, cada uno diseñado para sectores concretos.
            </motion.p>
            
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
                src="https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="Equipo de Innovapyme trabajando" 
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
              <div className="text-lg font-bold mb-2">Innovación constante</div>
              <p className="text-sm text-[#CCCCCC]">
                Adoptamos las últimas tecnologías para garantizar soluciones de vanguardia.
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
