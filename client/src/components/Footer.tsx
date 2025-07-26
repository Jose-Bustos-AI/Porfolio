import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <footer className="py-12 relative overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 bg-[#0A0A18] z-0"></div>
      
      <div className="container mx-auto px-6 md:px-16 relative z-10">
        <motion.div 
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#00EEFF] neon-border-blue flex items-center justify-center">
                <span className="font-space font-bold text-[#050816]">JB</span>
              </div>
              <span className="font-space font-bold text-xl text-white">Jose Bustos</span>
            </div>
            <p className="text-[#CCCCCC] mb-4 text-lg">
              Automatiza, Escala y Gana
            </p>
            <p className="text-[#CCCCCC] mb-6">
              bustos@innovapymes.ai
            </p>
            <div className="flex justify-center space-x-6 mb-8">
              <a href="https://www.linkedin.com/in/jose-bustos-ai/" target="_blank" rel="noopener noreferrer" className="text-[#CCCCCC] hover:text-[#00EEFF] transition-colors">
                <i className="ri-linkedin-fill text-xl"></i>
              </a>
              <a href="https://x.com/JoseBustosAI" target="_blank" rel="noopener noreferrer" className="text-[#CCCCCC] hover:text-[#BD00FF] transition-colors">
                <i className="ri-twitter-x-fill text-xl"></i>
              </a>
              <a href="https://www.instagram.com/jose_bustos_ai/" target="_blank" rel="noopener noreferrer" className="text-[#CCCCCC] hover:text-[#FF00A0] transition-colors">
                <i className="ri-instagram-fill text-xl"></i>
              </a>
              <a href="https://www.youtube.com/@JoseBustosAI" target="_blank" rel="noopener noreferrer" className="text-[#CCCCCC] hover:text-[#E65616] transition-colors">
                <i className="ri-youtube-fill text-xl"></i>
              </a>
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="border-t border-[#BD00FF]/20 pt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-[#CCCCCC]">© 2025 Jose Bustos. Todos los derechos reservados.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;