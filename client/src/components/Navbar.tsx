import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [location] = useLocation();
  const { scrollY } = useScroll();
  
  // Track scroll position for nav style changes
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 100);
    
    // Only track sections if we're on the home page
    if (location === '/') {
      const sections = ["hero", "quienes-somos", "servicios", "verticales", "contacto"];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (!element) continue;
        
        const rect = element.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveItem(`#${section}`);
          break;
        }
      }
    } else {
      // Set active item based on current route
      setActiveItem(location);
    }
  });

  // Set active item on location change
  useEffect(() => {
    setActiveItem(location);
  }, [location]);

  // Animation variants
  const navbarVariants = {
    initial: { opacity: 0, y: -25 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    scrolled: { 
      backdropFilter: "blur(20px)",
      boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.3)" 
    }
  };
  
  const logoVariants = {
    initial: { opacity: 0, scale: 0.8, rotate: -10 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      rotate: 0,
      transition: {
        delay: 0.2,
        duration: 0.5,
        type: "spring",
        stiffness: 200
      }
    },
    hover: {
      scale: 1.1,
      rotate: [0, -5, 5, 0],
      transition: {
        duration: 0.6,
        ease: "easeInOut"
      }
    }
  };
  
  const textVariants = {
    initial: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        delay: 0.3,
        duration: 0.4
      }
    }
  };
  
  const menuItemVariants = {
    initial: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2 + (i * 0.1),
        duration: 0.4,
        ease: "easeOut"
      }
    }),
    hover: {
      y: -3,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    }
  };
  
  const mobileMenuVariants = {
    closed: { 
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: { 
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.4,
        ease: "easeInOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };
  
  const mobileItemVariants = {
    closed: { opacity: 0, y: 20, x: -10 },
    open: (i: number) => ({
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
        ease: "easeOut"
      }
    })
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Navigation items array with colors and styling info
  const navItems = [
    { label: "Servicios", href: "/servicios", color: "purple" },
    { label: "Verticales", href: "/verticales", color: "orange" },
    { label: "Labs", href: "/labs", color: "green" }
  ];
  
  // Generate dynamic style for menu underline based on color
  const getUnderlineStyle = (color: string) => {
    const colorMap: any = {
      blue: '#00EEFF',
      purple: '#BD00FF',
      pink: '#FF00A0',
      orange: '#E65616',
      green: '#62d957'
    };
    
    return {
      background: `linear-gradient(90deg, transparent, ${colorMap[color]}, transparent)`,
      boxShadow: `0 0 10px ${colorMap[color]}40`
    };
  };

  return (
    <motion.nav 
      className="fixed top-0 left-0 w-full z-50"
      initial="initial"
      animate="visible"
      variants={navbarVariants}
    >
      <motion.div 
        className={`backdrop-blur-xl py-4 px-6 md:px-16 border-b border-white/5 
                   transition-all duration-500 relative z-10`}
        animate={isScrolled ? "scrolled" : "visible"}
        variants={navbarVariants}
      >
        {/* Glass effect overlay */}
        <div className="absolute inset-0 bg-[#050816]/60 z-0"></div>
        
        {/* Animated gradient border */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-[1px] z-0"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(0, 238, 255, 0.8), rgba(189, 0, 255, 0.8), rgba(255, 0, 160, 0.8), transparent)"
          }}
          animate={{
            backgroundPosition: ["0% 0%", "100% 0%"],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <div className="container mx-auto flex justify-between items-center relative z-10">
          {/* Logo with animation */}
          <Link href="/">
            <motion.div 
              className="flex items-center gap-2 cursor-pointer"
              initial="initial"
              animate="visible"
              whileHover="hover"
            >
              <motion.div 
                className="w-12 h-12 flex items-center justify-center relative"
                variants={logoVariants}
              >
                <svg 
                  viewBox="0 0 200 200" 
                  className="w-full h-full"
                >
                  <defs>
                    <linearGradient id="blueRingMain" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00EEFF" />
                      <stop offset="100%" stopColor="#0088FF" />
                    </linearGradient>
                    <linearGradient id="greenRingMain" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#62d957" />
                      <stop offset="100%" stopColor="#3fa832" />
                    </linearGradient>
                    <linearGradient id="orangeRingMain" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#E65616" />
                      <stop offset="100%" stopColor="#cc4915" />
                    </linearGradient>
                  </defs>
                  
                  {/* Robot head */}
                  <rect x="70" y="70" width="60" height="60" rx="8" fill="url(#blueRingMain)" />
                  
                  {/* Eyes */}
                  <circle cx="85" cy="90" r="4" fill="#030015" />
                  <circle cx="115" cy="90" r="4" fill="#030015" />
                  
                  {/* Mouth */}
                  <rect x="90" y="105" width="20" height="3" rx="1.5" fill="#030015" />
                  
                  {/* Antenna */}
                  <circle cx="100" cy="60" r="3" fill="url(#blueRingMain)" />
                  <rect x="99" y="60" width="2" height="10" fill="url(#blueRingMain)" />
                  
                  {/* Orbital rings */}
                  <g fill="none" strokeWidth="6" strokeLinecap="round">
                    <motion.path 
                      d="M 50 100 A 50 50 0 1 1 150 100" 
                      stroke="url(#blueRingMain)" 
                      opacity="0.8"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.path 
                      d="M 30 100 A 70 70 0 0 1 170 100" 
                      stroke="url(#greenRingMain)" 
                      opacity="0.7"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    />
                    <motion.path 
                      d="M 170 100 A 70 70 0 0 1 30 100" 
                      stroke="url(#orangeRingMain)" 
                      opacity="0.6"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    />
                  </g>
                </svg>
                
                {/* Glow effect */}
                <motion.div 
                  className="absolute inset-0 blur-lg opacity-30 z-0"
                  style={{
                    background: "radial-gradient(circle, rgba(98, 217, 87, 0.6) 0%, rgba(230, 86, 22, 0.6) 100%)"
                  }}
                  animate={{ 
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    ease: "easeInOut" 
                  }}
                />
              </motion.div>
              
              <motion.span 
                className="font-space font-bold text-xl md:text-2xl text-white"
                variants={textVariants}
              >
                Innovapymes
              </motion.span>
            </motion.div>
          </Link>
          
          {/* Mobile menu button with animation */}
          <motion.button 
            className="md:hidden relative z-20 w-10 h-10 flex items-center justify-center focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <div className="w-6 flex flex-col items-end">
              <motion.span 
                className="bg-white h-0.5 rounded-full block"
                initial={{ width: '100%' }}
                animate={{ 
                  width: mobileMenuOpen ? '100%' : '70%',
                  rotate: mobileMenuOpen ? 45 : 0,
                  y: mobileMenuOpen ? 6 : 0
                }}
                style={{ transformOrigin: 'center' }}
                transition={{ duration: 0.3 }}
              ></motion.span>
              <motion.span 
                className="bg-white h-0.5 rounded-full my-1.5 block"
                initial={{ width: '100%' }}
                animate={{ 
                  width: '100%',
                  opacity: mobileMenuOpen ? 0 : 1
                }}
                transition={{ duration: 0.3 }}
              ></motion.span>
              <motion.span 
                className="bg-white h-0.5 rounded-full block"
                initial={{ width: '50%' }}
                animate={{ 
                  width: mobileMenuOpen ? '100%' : '50%',
                  rotate: mobileMenuOpen ? -45 : 0,
                  y: mobileMenuOpen ? -6 : 0
                }}
                style={{ transformOrigin: 'center' }}
                transition={{ duration: 0.3 }}
              ></motion.span>
            </div>
          </motion.button>
          
          {/* Desktop navigation with animated reveal */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => {
              const isActive = activeItem === item.href;
              
              return (
                <Link key={index} href={item.href}>
                  <motion.div 
                    className={`py-2 relative overflow-hidden cursor-pointer ${isActive ? `neon-text-${item.color}` : 'text-[#CCCCCC]'}`}
                    variants={menuItemVariants}
                    custom={index}
                    initial="initial"
                    animate="visible"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    {/* Text with hover effect */}
                    <span className="relative z-10">{item.label}</span>
                    
                    {/* Animated underline effect */}
                    <motion.span 
                      className="absolute bottom-0 left-0 w-full h-0.5 opacity-80"
                      style={getUnderlineStyle(item.color)}
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: isActive ? 1 : 0, opacity: isActive ? 0.8 : 0 }}
                      whileHover={{ scaleX: 1, opacity: 0.8 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                </Link>
              )
            })}
            
            {/* Contact CTA button with glow effect */}
            {location === '/' ? (
              <motion.a 
                href="#contacto" 
                className="ml-4 px-6 py-2 rounded-full bg-[#0A0A18] neon-border-blue hover-shine relative overflow-hidden"
                variants={menuItemVariants}
                custom={navItems.length}
                initial="initial"
                animate="visible"
                whileHover="hover"
                whileTap="tap"
              >
                <span className="relative z-10">Contáctanos</span>
                
                {/* Glow effect on hover */}
                <motion.div 
                  className="absolute inset-0 bg-[#00EEFF]/10 rounded-full z-0"
                  initial={{ opacity: 0 }}
                  whileHover={{ 
                    opacity: [0, 0.2, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.a>
            ) : (
              <Link href="/#contacto">
                <motion.div 
                  className="ml-4 px-6 py-2 rounded-full bg-[#0A0A18] neon-border-blue hover-shine relative overflow-hidden cursor-pointer"
                  variants={menuItemVariants}
                  custom={navItems.length}
                  initial="initial"
                  animate="visible"
                  whileHover="hover"
                  whileTap="tap"
                >
                  <span className="relative z-10">Contáctanos</span>
                  
                  {/* Glow effect on hover */}
                  <motion.div 
                    className="absolute inset-0 bg-[#00EEFF]/10 rounded-full z-0"
                    initial={{ opacity: 0 }}
                    whileHover={{ 
                      opacity: [0, 0.2, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
              </Link>
            )}
          </div>
        </div>
      </motion.div>
      
      {/* Mobile menu with animated transition */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden backdrop-blur-xl border-b border-white/5 overflow-hidden"
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="absolute inset-0 bg-[#050816]/90 z-0"></div>
            
            <div className="flex flex-col space-y-4 py-6 px-6 relative z-10">
              {navItems.map((item, index) => (
                <Link key={index} href={item.href}>
                  <motion.div
                    custom={index}
                    variants={mobileItemVariants}
                    className={`text-white py-3 pl-4 border-l-2 cursor-pointer ${item.color === 'blue' ? 'border-[#00EEFF]' : item.color === 'purple' ? 'border-[#BD00FF]' : item.color === 'orange' ? 'border-[#E65616]' : item.color === 'green' ? 'border-[#62d957]' : 'border-[#FF00A0]'}`}
                    onClick={() => setMobileMenuOpen(false)}
                    whileHover={{ x: 5, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span className={`neon-text-${item.color}`}>{item.label}</span>
                  </motion.div>
                </Link>
              ))}
              {location === '/' ? (
                <motion.a
                  href="#contacto"
                  custom={navItems.length}
                  variants={mobileItemVariants}
                  className="mt-4 px-6 py-3 rounded-full glass neon-border-blue text-center hover-shine"
                  onClick={() => setMobileMenuOpen(false)}
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Contáctanos
                </motion.a>
              ) : (
                <Link href="/#contacto">
                  <motion.div
                    custom={navItems.length}
                    variants={mobileItemVariants}
                    className="mt-4 px-6 py-3 rounded-full glass neon-border-blue text-center hover-shine cursor-pointer"
                    onClick={() => setMobileMenuOpen(false)}
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Contáctanos
                  </motion.div>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
