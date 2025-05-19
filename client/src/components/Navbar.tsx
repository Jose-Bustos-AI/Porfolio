import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 100);
  });

  const navbarVariants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: -25 }
  };
  
  const menuItemVariants = {
    closed: { opacity: 0, y: 20 },
    open: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3
      }
    })
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navItems = [
    { label: "Quiénes Somos", href: "#quienes-somos", color: "blue" },
    { label: "Servicios", href: "#servicios", color: "purple" },
    { label: "Verticales", href: "#verticales", color: "pink" }
  ];

  return (
    <motion.nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500`}
      initial="visible"
      animate="visible"
      variants={navbarVariants}
    >
      <div className={`glass py-4 px-6 md:px-16 ${isScrolled ? 'bg-[#050816]/80 shadow-lg' : ''}`}>
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo space */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-[#00EEFF] neon-border-blue flex items-center justify-center">
              <span className="font-space font-bold text-[#050816]">IP</span>
            </div>
            <span className="font-space font-bold text-xl md:text-2xl text-white">Innovapyme</span>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <i className={`ri-${mobileMenuOpen ? 'close' : 'menu'}-line text-2xl`}></i>
          </button>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <a 
                key={index}
                href={item.href} 
                className="text-[#CCCCCC] hover:text-white transition-colors py-2 relative overflow-hidden group"
              >
                {item.label}
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-[${item.color === 'blue' ? '#00EEFF' : item.color === 'purple' ? '#BD00FF' : '#FF00A0'}] group-hover:w-full transition-all duration-300`}></span>
              </a>
            ))}
            <a 
              href="#contacto" 
              className="ml-4 px-6 py-2 rounded-full bg-[#0A0A18] neon-border-blue hover:animate-pulse-glow transition-all duration-300"
            >
              Contáctanos
            </a>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <motion.div
        className={`md:hidden glass mt-2 py-4 px-6 ${mobileMenuOpen ? 'block' : 'hidden'}`}
        initial="closed"
        animate={mobileMenuOpen ? "open" : "closed"}
      >
        <div className="flex flex-col space-y-4">
          {navItems.map((item, index) => (
            <motion.a
              key={index}
              href={item.href}
              custom={index}
              variants={menuItemVariants}
              className="text-white py-2 border-b border-gray-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </motion.a>
          ))}
          <motion.a
            href="#contacto"
            custom={navItems.length}
            variants={menuItemVariants}
            className="px-6 py-2 rounded-full bg-[#0A0A18] neon-border-blue text-center"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contáctanos
          </motion.a>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
