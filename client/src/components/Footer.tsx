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

  const footerSections = [
    {
      title: 'Servicios',
      links: [
        { label: 'Desarrollo Web & Móvil', href: '#servicios' },
        { label: 'Cloud & DevOps', href: '#servicios' },
        { label: 'AI & Data Analytics', href: '#servicios' },
        { label: 'Ciberseguridad', href: '#servicios' },
        { label: 'Consultoría Digital', href: '#servicios' },
        { label: 'IT Staffing', href: '#servicios' }
      ]
    },
    {
      title: 'Verticales',
      links: [
        { label: 'Retail & E-Commerce', href: '#verticales' },
        { label: 'Fintech', href: '#verticales' },
        { label: 'Healthcare', href: '#verticales' },
        { label: 'Manufactura', href: '#verticales' },
        { label: 'Educación', href: '#verticales' }
      ]
    }
  ];

  const contactItems = [
    { icon: 'mail-line', text: 'contacto@innovapyme.com', color: 'pink' },
    { icon: 'phone-line', text: '+52 (55) 1234-5678', color: 'pink' },
    { icon: 'map-pin-line', text: 'Torre Innovación, CDMX', color: 'pink' }
  ];

  return (
    <footer className="py-12 relative overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 bg-[#0A0A18] z-0"></div>
      
      <div className="container mx-auto px-6 md:px-16 relative z-10">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#00EEFF] neon-border-blue flex items-center justify-center">
                <span className="font-space font-bold text-[#050816]">IP</span>
              </div>
              <span className="font-space font-bold text-xl text-white">Jose Bustos</span>
            </div>
            <p className="text-[#CCCCCC] mb-6">
              Impulsando la transformación digital de pequeñas y medianas empresas con soluciones tecnológicas innovadoras.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-[#CCCCCC] hover:text-white transition-colors">
                <i className="ri-linkedin-fill text-lg"></i>
              </a>
              <a href="#" className="text-[#CCCCCC] hover:text-white transition-colors">
                <i className="ri-twitter-x-fill text-lg"></i>
              </a>
              <a href="#" className="text-[#CCCCCC] hover:text-white transition-colors">
                <i className="ri-instagram-fill text-lg"></i>
              </a>
              <a href="#" className="text-[#CCCCCC] hover:text-white transition-colors">
                <i className="ri-facebook-fill text-lg"></i>
              </a>
            </div>
          </motion.div>
          
          {footerSections.map((section, sectionIndex) => (
            <motion.div key={sectionIndex} variants={itemVariants}>
              <h4 className="font-space font-bold mb-6">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <motion.li 
                    key={linkIndex}
                    variants={itemVariants}
                    custom={linkIndex}
                  >
                    <a 
                      href={link.href} 
                      className="text-[#CCCCCC] hover:text-[#00EEFF] transition-colors"
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
          
          <motion.div variants={itemVariants}>
            <h4 className="font-space font-bold mb-6">Contacto</h4>
            <ul className="space-y-3">
              {contactItems.map((item, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-center text-[#CCCCCC]"
                  variants={itemVariants}
                  custom={index}
                >
                  <i className={`ri-${item.icon} mr-2 text-[#FF00A0]`}></i>
                  {item.text}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
          variants={itemVariants}
        >
          <p className="text-[#CCCCCC] text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Jose Bustos. Todos los derechos reservados.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-[#CCCCCC] hover:text-white text-sm transition-colors">Política de Privacidad</a>
            <a href="#" className="text-[#CCCCCC] hover:text-white text-sm transition-colors">Términos de Servicio</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
