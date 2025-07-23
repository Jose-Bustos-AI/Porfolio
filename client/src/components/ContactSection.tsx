import React from 'react';
import { motion } from 'framer-motion';

const ContactSection: React.FC = () => {
  // Animation variants
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
  
  // Dynamic color maps
  const colorMap = {
    blue: '#00EEFF',
    purple: '#BD00FF',
    pink: '#FF00A0',
    orange: '#E65616'
  };
  
  // Contact info and social links with enhanced styling
  const contactInfo = [
    { icon: 'mail-line', title: 'Email', info: 'bustos@innovapymes.ai', color: 'blue' },
    { icon: 'phone-line', title: 'Teléfono / WhatsApp', info: '+34 611 30 12 64', color: 'purple' }
  ];
  
  const socialLinks = [
    { icon: 'linkedin-fill', color: 'blue', label: 'LinkedIn' },
    { icon: 'twitter-x-fill', color: 'purple', label: 'X (Twitter)' },
    { icon: 'instagram-fill', color: 'pink', label: 'Instagram' },
    { icon: 'youtube-fill', color: 'orange', label: 'YouTube' }
  ];

  return (
    <section id="contacto" className="py-20 md:py-32 relative overflow-hidden">
      {/* Enhanced background effects with animated gradients */}
      <div className="absolute inset-0 bg-[#050816] z-0"></div>
      
      {/* Multiple blurred gradient spots with animation */}
      <motion.div 
        className="absolute top-0 right-0 w-2/3 h-2/3 bg-gradient-to-bl from-[#00EEFF]/10 via-[#BD00FF]/5 to-transparent blur-[100px] z-0"
        animate={{ 
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.1, 1],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      
      <motion.div 
        className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-[#FF00A0]/10 via-[#BD00FF]/5 to-transparent blur-[100px] z-0"
        animate={{ 
          opacity: [0.2, 0.5, 0.2],
          scale: [1, 1.2, 1],
          rotate: [0, -5, 0]
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 5
        }}
      />
      
      {/* Grid pattern overlay with glow */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'linear-gradient(rgba(0,238,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,238,255,0.1) 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }}></div>
      </div>
      
      <div className="container mx-auto px-6 md:px-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.h2 
            className="text-4xl md:text-6xl font-space font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            ¿Quieres <span className="text-gradient animate-glow-pulse">hablar conmigo?</span>
          </motion.h2>
          
          <motion.p 
            className="text-[#CCCCCC] text-lg md:text-xl max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Escríbeme y uno de mis agentes de IA te responde al instante…
          </motion.p>
        </div>

        {/* Contact info cards grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {contactInfo.map((item, index) => {
            const bgColor = colorMap[item.color as keyof typeof colorMap];
            return (
              <motion.div 
                key={index} 
                className="flex flex-col items-center text-center card-3d hover-shine p-8 rounded-2xl glass animate-morph"
                variants={itemVariants}
                whileHover={{ 
                  y: -10, 
                  boxShadow: `0 20px 40px -10px rgba(0,0,0,0.3), 0 0 20px 5px ${bgColor}20` 
                }}
                style={{
                  borderImage: `linear-gradient(45deg, ${bgColor}70, transparent) 1`,
                  borderWidth: '1px',
                  borderStyle: 'solid'
                }}
              >
                <motion.div 
                  className={`w-20 h-20 rounded-full mb-6 flex items-center justify-center animate-pulse-glow`}
                  style={{ 
                    background: `radial-gradient(circle, ${bgColor}30 0%, ${bgColor}10 50%, transparent 70%)`,
                    boxShadow: `0 0 20px 0 ${bgColor}40`,
                  }}
                  whileHover={{ 
                    rotate: 360,
                    scale: 1.1,
                    transition: { duration: 0.7 }
                  }}
                >
                  <i className={`ri-${item.icon} text-4xl`} style={{ color: bgColor }}></i>
                </motion.div>
                
                <h3 className="text-2xl font-space font-bold mb-4" style={{ color: bgColor }}>
                  {item.title}
                </h3>
                
                <p className="text-[#CCCCCC] text-lg whitespace-pre-line">
                  {item.info}
                </p>
                
                {/* Animated light streak */}
                <motion.div 
                  className="absolute inset-0 overflow-hidden opacity-0 z-0 rounded-2xl"
                  style={{ background: 'linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent)' }}
                  animate={{ left: ['-100%', '200%'], opacity: [0, 0.3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }}
                ></motion.div>
              </motion.div>
            )
          })}
        </motion.div>
        
        {/* Social media with enhanced animations */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-2xl font-space font-bold mb-8 text-gradient">Sígueme en redes</h3>
          
          <div className="flex flex-wrap justify-center gap-8">
            {socialLinks.map((link, index) => {
              const bgColor = colorMap[link.color as keyof typeof colorMap];
              return (
                <motion.a 
                  key={index}
                  href="#" 
                  className="relative group"
                  whileHover={{ scale: 1.15, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div 
                    className="w-16 h-16 rounded-full glass flex items-center justify-center relative overflow-hidden"
                    style={{ boxShadow: `0 0 15px 0 ${bgColor}30` }}
                    animate={{ 
                      boxShadow: [`0 0 15px 0 ${bgColor}30`, `0 0 25px 5px ${bgColor}50`, `0 0 15px 0 ${bgColor}30`] 
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <i className={`ri-${link.icon} text-3xl`} style={{ color: bgColor }}></i>
                    
                    {/* Background glow effect on hover */}
                    <motion.div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
                      style={{ background: `radial-gradient(circle at center, ${bgColor}40 0%, transparent 70%)` }}
                    ></motion.div>
                  </motion.div>
                  
                  {/* Tooltip on hover */}
                  <motion.span 
                    className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-sm px-3 py-1 rounded glass opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap"
                    style={{ boxShadow: `0 0 10px 0 ${bgColor}30` }}
                  >
                    {link.label}
                  </motion.span>
                </motion.a>
              )
            })}
          </div>
        </motion.div>
        
        {/* Call to action button */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.p 
            className="text-[#CCCCCC] text-lg mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            ¿Tienes un reto o idea? Escríbeme y en menos de 24h tienes respuesta. Si buscas resultados de verdad, hablamos.
          </motion.p>
          
          <motion.a 
            href="mailto:bustos@innovapymes.ai"
            className="inline-block py-5 px-8 rounded-full relative overflow-hidden hover-shine"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.97 }}
          >
            {/* Gradient background with animation */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-[#00EEFF] via-[#BD00FF] to-[#FF00A0]"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] 
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              style={{ backgroundSize: '200% 200%' }}
            ></motion.div>
            
            <span className="relative z-10 font-bold text-black text-xl flex items-center justify-center gap-2">
              <span>Escríbeme</span>
              <motion.i 
                className="ri-mail-send-line ml-1"
                animate={{ 
                  x: [0, 5, 0],
                  y: [0, -3, 0]
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  repeatDelay: 1 
                }}
              ></motion.i>
            </span>
          </motion.a>
        </motion.div>
        
        {/* Decorative elements */}
        <div className="pointer-events-none">
          {[1, 2, 3, 4, 5].map((_, i) => (
            <motion.div 
              key={i}
              className="absolute w-2 h-2 rounded-full"
              initial={{ 
                x: Math.random() * 100 - 50 + "%", 
                y: Math.random() * 100 - 50 + "%", 
                opacity: 0.2,
                scale: Math.random() * 0.5 + 0.5
              }}
              animate={{ 
                y: [0, Math.random() * -30 - 10],
                opacity: [0.2, 0.8, 0],
                scale: [Math.random() * 0.5 + 0.5, Math.random() * 1 + 1]
              }}
              transition={{ 
                duration: Math.random() * 5 + 5, 
                repeat: Infinity,
                delay: Math.random() * 5
              }}
              style={{ 
                left: Math.random() * 100 + "%",
                top: Math.random() * 100 + "%",
                background: [colorMap.blue, colorMap.purple, colorMap.pink][Math.floor(Math.random() * 3)]
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
