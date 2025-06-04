import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';

const GlobalNavbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const navItems = [
    { label: "Servicios", href: "/servicios", color: "purple" },
    { label: "Verticales", href: "/verticales", color: "orange" },
    { label: "Labs", href: "/labs", color: "green" }
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const getColorClass = (color: string) => {
    const colorMap: { [key: string]: string } = {
      purple: 'text-[#BD00FF]',
      orange: 'text-[#E65616]',
      green: 'text-[#62d957]'
    };
    return colorMap[color] || 'text-white';
  };

  const getBorderClass = (color: string) => {
    const colorMap: { [key: string]: string } = {
      purple: 'border-[#BD00FF]',
      orange: 'border-[#E65616]',
      green: 'border-[#62d957]'
    };
    return colorMap[color] || 'border-white';
  };

  return (
    <motion.nav 
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-[#050816]/80 border-b border-white/5"
      initial={{ opacity: 0, y: -25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 md:px-16 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <motion.div 
              className="flex items-center gap-2 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div 
                className="w-12 h-12 flex items-center justify-center"
                animate={{ 
                  filter: [
                    "drop-shadow(0 0 10px rgba(98, 217, 87, 0.5))",
                    "drop-shadow(0 0 20px rgba(230, 86, 22, 0.5))",
                    "drop-shadow(0 0 10px rgba(98, 217, 87, 0.5))"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <img 
                  src="/innova-logo.png" 
                  alt="Innovapymes Logo" 
                  className="w-full h-full object-contain"
                />
              </motion.div>
              <span className="font-bold text-xl md:text-2xl text-white">
                Innovapymes
              </span>
            </motion.div>
          </Link>

          {/* Mobile menu button */}
          <button 
            className="md:hidden w-10 h-10 flex items-center justify-center focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <div className="w-6 flex flex-col items-end">
              <span 
                className={`bg-white h-0.5 rounded-full block transition-all duration-300 ${
                  mobileMenuOpen ? 'rotate-45 translate-y-1.5 w-full' : 'w-full'
                }`}
              />
              <span 
                className={`bg-white h-0.5 rounded-full my-1.5 block transition-all duration-300 ${
                  mobileMenuOpen ? 'opacity-0' : 'w-full'
                }`}
              />
              <span 
                className={`bg-white h-0.5 rounded-full block transition-all duration-300 ${
                  mobileMenuOpen ? '-rotate-45 -translate-y-1.5 w-full' : 'w-1/2'
                }`}
              />
            </div>
          </button>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => {
              const isActive = location === item.href;
              
              return (
                <Link key={index} href={item.href}>
                  <motion.div 
                    className={`py-2 px-4 relative cursor-pointer transition-colors duration-300 ${
                      isActive ? getColorClass(item.color) : 'text-[#CCCCCC] hover:text-white'
                    }`}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div 
                        className={`absolute bottom-0 left-0 w-full h-0.5 ${
                          item.color === 'purple' ? 'bg-[#BD00FF]' : 
                          item.color === 'orange' ? 'bg-[#E65616]' : 'bg-[#62d957]'
                        }`}
                        layoutId="activeTab"
                      />
                    )}
                  </motion.div>
                </Link>
              );
            })}
            
            {/* Contact button */}
            {location === '/' ? (
              <a 
                href="#contacto" 
                className="ml-4 px-6 py-2 rounded-full bg-gradient-to-r from-[#00EEFF] to-[#0088FF] text-black font-medium hover:from-[#00CCDD] hover:to-[#0066DD] transition-all duration-300"
              >
                Contáctanos
              </a>
            ) : (
              <Link href="/#contacto">
                <div className="ml-4 px-6 py-2 rounded-full bg-gradient-to-r from-[#00EEFF] to-[#0088FF] text-black font-medium hover:from-[#00CCDD] hover:to-[#0066DD] transition-all duration-300 cursor-pointer">
                  Contáctanos
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden backdrop-blur-xl bg-[#050816]/90 border-b border-white/5"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col space-y-4 py-6 px-6">
              {navItems.map((item, index) => (
                <Link key={index} href={item.href}>
                  <div
                    className={`text-white py-3 pl-4 border-l-2 cursor-pointer ${getBorderClass(item.color)}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className={getColorClass(item.color)}>{item.label}</span>
                  </div>
                </Link>
              ))}
              {location === '/' ? (
                <a
                  href="#contacto"
                  className="mt-4 px-6 py-3 rounded-full bg-gradient-to-r from-[#00EEFF] to-[#0088FF] text-black text-center font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contáctanos
                </a>
              ) : (
                <Link href="/#contacto">
                  <div
                    className="mt-4 px-6 py-3 rounded-full bg-gradient-to-r from-[#00EEFF] to-[#0088FF] text-black text-center font-medium cursor-pointer"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Contáctanos
                  </div>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default GlobalNavbar;