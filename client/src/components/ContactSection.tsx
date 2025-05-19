import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ContactSection: React.FC = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: ''
  });
  
  // Field focus states
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  
  // Refs for label animations
  const labelRefs = useRef<{ [key: string]: HTMLLabelElement | null }>({
    name: null,
    email: null,
    company: null,
    service: null,
    message: null
  });
  
  // Input change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Form submission handler with animation
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsFormSubmitted(true);
    
    // Reset form after showing success state
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        company: '',
        service: '',
        message: ''
      });
      setIsFormSubmitted(false);
    }, 3000);
  };
  
  // Focus & blur handlers for enhanced input animations
  const handleFocus = (field: string) => {
    setFocusedField(field);
  };
  
  const handleBlur = () => {
    setFocusedField(null);
  };
  
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
  
  const formFieldVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.1 * i,
        duration: 0.5
      }
    })
  };
  
  const successMessageVariants = {
    hidden: { opacity: 0, y: 20, height: 0 },
    visible: { 
      opacity: 1, 
      y: 0, 
      height: 'auto',
      transition: { 
        duration: 0.4,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      height: 0,
      transition: { duration: 0.3 }
    }
  };
  
  // Dynamic color maps
  const colorMap = {
    blue: '#00EEFF',
    purple: '#BD00FF',
    pink: '#FF00A0'
  };
  
  // Contact info and social links with enhanced styling
  const contactInfo = [
    { icon: 'mail-line', title: 'Email', info: 'contacto@innovapyme.com', color: 'blue' },
    { icon: 'phone-line', title: 'Teléfono', info: '+52 (55) 1234-5678', color: 'purple' },
    { icon: 'map-pin-line', title: 'Oficinas', info: 'Torre Innovación, Piso 23\nCiudad de México, México', color: 'pink' }
  ];
  
  const socialLinks = [
    { icon: 'linkedin-fill', color: 'blue', label: 'LinkedIn' },
    { icon: 'twitter-x-fill', color: 'purple', label: 'Twitter' },
    { icon: 'instagram-fill', color: 'pink', label: 'Instagram' },
    { icon: 'facebook-fill', color: 'blue', label: 'Facebook' }
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact info section with enhanced animations */}
          <motion.div 
            className="reveal"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.h2 
              className="text-3xl md:text-5xl font-space font-bold mb-6"
              variants={itemVariants}
            >
              ¿Listo para <span className="text-gradient animate-glow-pulse">innovar</span>?
            </motion.h2>
            
            <motion.p 
              className="text-[#CCCCCC] mb-10 text-lg backdrop-blur-sm bg-[#050816]/30 p-4 rounded-lg"
              variants={itemVariants}
            >
              Conversemos sobre cómo podemos impulsar tu negocio con soluciones tecnológicas a la medida.
              Completa el formulario y nuestro equipo se pondrá en contacto contigo a la brevedad.
            </motion.p>
            
            {/* Contact info cards with enhanced 3D effect */}
            <motion.div 
              className="space-y-6 mb-12"
              variants={containerVariants}
            >
              {contactInfo.map((item, index) => {
                const bgColor = colorMap[item.color as keyof typeof colorMap];
                return (
                  <motion.div 
                    key={index} 
                    className="flex items-start card-3d hover-shine p-4 rounded-lg glass"
                    variants={itemVariants}
                    whileHover={{ 
                      y: -5, 
                      boxShadow: `0 10px 25px -5px rgba(0,0,0,0.3), 0 0 15px 2px ${bgColor}30` 
                    }}
                  >
                    <motion.div 
                      className={`w-12 h-12 rounded-full bg-[${bgColor}]/10 flex items-center justify-center flex-shrink-0 animate-pulse-glow`}
                      style={{ 
                        boxShadow: `0 0 15px 0 ${bgColor}40`,
                        borderColor: bgColor
                      }}
                      whileHover={{ 
                        rotate: [0, -10, 10, -10, 0],
                        scale: 1.1,
                        transition: { duration: 0.5 }
                      }}
                    >
                      <i className={`ri-${item.icon} text-xl`} style={{ color: bgColor }}></i>
                    </motion.div>
                    
                    <div className="ml-4">
                      <h4 className="font-semibold mb-1 text-white">{item.title}</h4>
                      <p className="text-[#CCCCCC] whitespace-pre-line">{item.info}</p>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
            
            {/* Social links with floating tooltip effect */}
            <motion.div 
              className="flex space-x-4"
              variants={itemVariants}
            >
              {socialLinks.map((link, index) => {
                const bgColor = colorMap[link.color as keyof typeof colorMap];
                return (
                  <motion.a 
                    key={index}
                    href="#" 
                    className="relative group"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div 
                      className="w-12 h-12 rounded-full glass flex items-center justify-center relative overflow-hidden"
                      style={{ boxShadow: `0 0 10px 0 ${bgColor}30` }}
                    >
                      <i className={`ri-${link.icon} text-lg`} style={{ color: bgColor }}></i>
                      
                      {/* Background glow effect on hover */}
                      <motion.div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
                        style={{ background: `radial-gradient(circle at center, ${bgColor}30 0%, transparent 70%)` }}
                      ></motion.div>
                    </motion.div>
                    
                    {/* Tooltip on hover */}
                    <motion.span 
                      className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs px-2 py-1 rounded glass opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap"
                      style={{ boxShadow: `0 0 10px 0 ${bgColor}30` }}
                    >
                      {link.label}
                    </motion.span>
                  </motion.a>
                )
              })}
            </motion.div>
          </motion.div>
          
          {/* Contact form with enhanced glassmorphism and animations */}
          <motion.div 
            className="relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.div 
              className="glass backdrop-blur-sm p-8 rounded-2xl relative z-10 overflow-hidden animate-morph"
              style={{ 
                borderImage: 'linear-gradient(45deg, #00EEFF, #BD00FF, #FF00A0) 1',
                borderWidth: '2px',
                borderStyle: 'solid'
              }}
              animate={{ boxShadow: ['0 0 20px 0 rgba(0, 238, 255, 0.3)', '0 0 30px 5px rgba(189, 0, 255, 0.3)', '0 0 20px 0 rgba(255, 0, 160, 0.3)'] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Animated light streak effect */}
              <motion.div 
                className="absolute inset-0 overflow-hidden opacity-30 z-0"
                style={{ background: 'linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent)' }}
                animate={{ left: ['-100%', '200%'] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
              ></motion.div>
              
              {/* Success message animation */}
              <AnimatePresence>
                {isFormSubmitted && (
                  <motion.div 
                    className="absolute inset-0 flex flex-col items-center justify-center bg-[#050816]/95 backdrop-blur-sm z-20 rounded-2xl"
                    variants={successMessageVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <motion.div 
                      className="w-20 h-20 rounded-full bg-gradient-to-r from-[#00EEFF] to-[#BD00FF] flex items-center justify-center mb-6"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <i className="ri-check-line text-4xl text-white"></i>
                    </motion.div>
                    <motion.h3 
                      className="text-2xl font-space font-bold mb-2 text-gradient"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 }}
                    >
                      ¡Mensaje Enviado!
                    </motion.h3>
                    <motion.p 
                      className="text-white text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 }}
                    >
                      Gracias por contactarnos.<br/>Te responderemos a la brevedad.
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name field with floating label animation */}
                  <motion.div custom={0} variants={formFieldVariants} className="relative">
                    <motion.label 
                      ref={el => labelRefs.current.name = el}
                      htmlFor="name" 
                      className={`absolute text-sm font-medium transition-all duration-300 pointer-events-none
                             ${(focusedField === 'name' || formData.name) ? 'text-[#00EEFF] -top-6 left-0 text-xs' : 'text-[#CCCCCC] top-3 left-4'}`}
                    >
                      Nombre
                    </motion.label>
                    <motion.input 
                      type="text" 
                      id="name" 
                      name="name" 
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => handleFocus('name')}
                      onBlur={handleBlur}
                      className="w-full bg-[#050816]/50 border border-gray-700 rounded-lg py-3 px-4 focus:outline-none transition-all duration-300
                               text-white focus:border-[#00EEFF] focus:ring-1 focus:ring-[#00EEFF] hover:border-gray-500" 
                      placeholder={focusedField === 'name' ? "Tu nombre" : ""}
                      required
                    />
                    <motion.div 
                      className="absolute bottom-0 left-0 h-0.5 bg-[#00EEFF] rounded"
                      initial={{ width: '0%' }}
                      animate={{ width: focusedField === 'name' ? '100%' : '0%' }}
                      transition={{ duration: 0.3 }}
                    ></motion.div>
                  </motion.div>
                  
                  {/* Email field with floating label animation */}
                  <motion.div custom={1} variants={formFieldVariants} className="relative">
                    <motion.label 
                      ref={el => labelRefs.current.email = el}
                      htmlFor="email" 
                      className={`absolute text-sm font-medium transition-all duration-300 pointer-events-none
                             ${(focusedField === 'email' || formData.email) ? 'text-[#BD00FF] -top-6 left-0 text-xs' : 'text-[#CCCCCC] top-3 left-4'}`}
                    >
                      Email
                    </motion.label>
                    <motion.input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => handleFocus('email')}
                      onBlur={handleBlur}
                      className="w-full bg-[#050816]/50 border border-gray-700 rounded-lg py-3 px-4 focus:outline-none transition-all duration-300
                               text-white focus:border-[#BD00FF] focus:ring-1 focus:ring-[#BD00FF] hover:border-gray-500" 
                      placeholder={focusedField === 'email' ? "tu@email.com" : ""}
                      required
                    />
                    <motion.div 
                      className="absolute bottom-0 left-0 h-0.5 bg-[#BD00FF] rounded"
                      initial={{ width: '0%' }}
                      animate={{ width: focusedField === 'email' ? '100%' : '0%' }}
                      transition={{ duration: 0.3 }}
                    ></motion.div>
                  </motion.div>
                </div>
                
                {/* Company field with animation */}
                <motion.div custom={2} variants={formFieldVariants} className="relative">
                  <motion.label 
                    ref={el => labelRefs.current.company = el}
                    htmlFor="company" 
                    className={`absolute text-sm font-medium transition-all duration-300 pointer-events-none
                          ${(focusedField === 'company' || formData.company) ? 'text-[#FF00A0] -top-6 left-0 text-xs' : 'text-[#CCCCCC] top-3 left-4'}`}
                  >
                    Empresa
                  </motion.label>
                  <motion.input 
                    type="text" 
                    id="company" 
                    name="company" 
                    value={formData.company}
                    onChange={handleChange}
                    onFocus={() => handleFocus('company')}
                    onBlur={handleBlur}
                    className="w-full bg-[#050816]/50 border border-gray-700 rounded-lg py-3 px-4 focus:outline-none transition-all duration-300
                            text-white focus:border-[#FF00A0] focus:ring-1 focus:ring-[#FF00A0] hover:border-gray-500" 
                    placeholder={focusedField === 'company' ? "Nombre de tu empresa" : ""}
                  />
                  <motion.div 
                    className="absolute bottom-0 left-0 h-0.5 bg-[#FF00A0] rounded"
                    initial={{ width: '0%' }}
                    animate={{ width: focusedField === 'company' ? '100%' : '0%' }}
                    transition={{ duration: 0.3 }}
                  ></motion.div>
                </motion.div>
                
                {/* Service dropdown with animation */}
                <motion.div custom={3} variants={formFieldVariants} className="relative">
                  <motion.label 
                    ref={el => labelRefs.current.service = el}
                    htmlFor="service" 
                    className={`absolute text-sm font-medium transition-all duration-300 pointer-events-none
                          ${(focusedField === 'service' || formData.service) ? 'text-[#00EEFF] -top-6 left-0 text-xs' : 'text-[#CCCCCC] top-3 left-4'}`}
                  >
                    Servicio de interés
                  </motion.label>
                  <motion.select 
                    id="service" 
                    name="service" 
                    value={formData.service}
                    onChange={handleChange}
                    onFocus={() => handleFocus('service')}
                    onBlur={handleBlur}
                    className="w-full bg-[#050816]/50 border border-gray-700 rounded-lg py-3 px-4 focus:outline-none transition-all duration-300
                           text-white focus:border-[#00EEFF] focus:ring-1 focus:ring-[#00EEFF] hover:border-gray-500 appearance-none"
                  >
                    <option value="" disabled></option>
                    <option value="desarrollo">Desarrollo Web & Móvil</option>
                    <option value="cloud">Cloud & DevOps</option>
                    <option value="ai">AI & Data Analytics</option>
                    <option value="seguridad">Ciberseguridad</option>
                    <option value="consultoria">Consultoría Digital</option>
                    <option value="staffing">IT Staffing</option>
                  </motion.select>
                  
                  {/* Custom select arrow */}
                  <div className="absolute top-1/2 right-4 transform -translate-y-1/2 pointer-events-none">
                    <motion.i 
                      className="ri-arrow-down-s-line text-lg text-[#CCCCCC]"
                      animate={{ y: focusedField === 'service' ? [0, 3, 0] : 0 }}
                      transition={{ duration: 1, repeat: focusedField === 'service' ? Infinity : 0, repeatDelay: 0.5 }}
                    ></motion.i>
                  </div>
                  
                  <motion.div 
                    className="absolute bottom-0 left-0 h-0.5 bg-[#00EEFF] rounded"
                    initial={{ width: '0%' }}
                    animate={{ width: focusedField === 'service' ? '100%' : '0%' }}
                    transition={{ duration: 0.3 }}
                  ></motion.div>
                </motion.div>
                
                {/* Message textarea with animation */}
                <motion.div custom={4} variants={formFieldVariants} className="relative">
                  <motion.label 
                    ref={el => labelRefs.current.message = el}
                    htmlFor="message" 
                    className={`absolute text-sm font-medium transition-all duration-300 pointer-events-none
                          ${(focusedField === 'message' || formData.message) ? 'text-[#BD00FF] -top-6 left-0 text-xs' : 'text-[#CCCCCC] top-3 left-4'}`}
                  >
                    Mensaje
                  </motion.label>
                  <motion.textarea 
                    id="message" 
                    name="message" 
                    rows={4} 
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => handleFocus('message')}
                    onBlur={handleBlur}
                    className="w-full bg-[#050816]/50 border border-gray-700 rounded-lg py-3 px-4 focus:outline-none transition-all duration-300
                           text-white focus:border-[#BD00FF] focus:ring-1 focus:ring-[#BD00FF] hover:border-gray-500" 
                    placeholder={focusedField === 'message' ? "Cuéntanos sobre tu proyecto..." : ""}
                    required
                  ></motion.textarea>
                  <motion.div 
                    className="absolute bottom-0 left-0 h-0.5 bg-[#BD00FF] rounded"
                    initial={{ width: '0%' }}
                    animate={{ width: focusedField === 'message' ? '100%' : '0%' }}
                    transition={{ duration: 0.3 }}
                  ></motion.div>
                </motion.div>
                
                {/* Submit button with advanced hover and click animations */}
                <motion.button 
                  type="submit" 
                  className="w-full py-4 px-6 rounded-full relative overflow-hidden hover-shine"
                  custom={5}
                  variants={formFieldVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isFormSubmitted}
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
                  
                  <span className="relative z-10 font-bold text-black flex items-center justify-center gap-2">
                    <span>Enviar Mensaje</span>
                    <motion.i 
                      className="ri-send-plane-fill ml-1"
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
                </motion.button>
              </form>
            </motion.div>
            
            {/* Decorative floating elements */}
            <motion.div 
              className="absolute -top-10 -right-10 w-20 h-20 opacity-50 z-0 animate-float"
              style={{ 
                background: 'radial-gradient(circle, rgba(0,238,255,0.3) 0%, rgba(0,238,255,0) 70%)',
                borderRadius: '50%'
              }}
            ></motion.div>
            
            <motion.div 
              className="absolute -bottom-10 -left-10 w-24 h-24 opacity-50 z-0 animate-float"
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 45, 0]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              style={{ 
                background: 'radial-gradient(circle, rgba(255,0,160,0.3) 0%, rgba(255,0,160,0) 70%)',
                borderRadius: '50%'
              }}
            ></motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
