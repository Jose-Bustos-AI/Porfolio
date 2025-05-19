import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would send the data to the backend
    alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
    setFormData({
      name: '',
      email: '',
      company: '',
      service: '',
      message: ''
    });
  };
  
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
    }),
    focus: {
      scale: 1.01,
      borderColor: 'rgba(0, 238, 255, 0.8)',
      boxShadow: '0 0 15px 0 rgba(0, 238, 255, 0.4)'
    }
  };
  
  const contactInfo = [
    { icon: 'mail-line', title: 'Email', info: 'contacto@innovapyme.com', color: 'blue' },
    { icon: 'phone-line', title: 'Teléfono', info: '+52 (55) 1234-5678', color: 'purple' },
    { icon: 'map-pin-line', title: 'Oficinas', info: 'Torre Innovación, Piso 23\nCiudad de México, México', color: 'pink' }
  ];
  
  const socialLinks = [
    { icon: 'linkedin-fill', color: 'blue' },
    { icon: 'twitter-x-fill', color: 'purple' },
    { icon: 'instagram-fill', color: 'pink' },
    { icon: 'facebook-fill', color: 'blue' }
  ];

  return (
    <section id="contacto" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 bg-[#050816] z-0"></div>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-[#00EEFF]/5 via-[#BD00FF]/5 to-transparent blur-3xl z-0"></div>
      
      <div className="container mx-auto px-6 md:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
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
              ¿Listo para <span className="text-gradient">innovar</span>?
            </motion.h2>
            <motion.p 
              className="text-[#CCCCCC] mb-8"
              variants={itemVariants}
            >
              Conversemos sobre cómo podemos impulsar tu negocio con soluciones tecnológicas a la medida.
              Completa el formulario y nuestro equipo se pondrá en contacto contigo a la brevedad.
            </motion.p>
            
            {/* Contact info cards */}
            <motion.div 
              className="space-y-6 mb-8"
              variants={containerVariants}
            >
              {contactInfo.map((item, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-start"
                  variants={itemVariants}
                >
                  <div className={`w-12 h-12 rounded-full bg-[${item.color === 'blue' ? '#00EEFF' : item.color === 'purple' ? '#BD00FF' : '#FF00A0'}]/10 flex items-center justify-center flex-shrink-0`}>
                    <i className={`ri-${item.icon} text-xl text-[${item.color === 'blue' ? '#00EEFF' : item.color === 'purple' ? '#BD00FF' : '#FF00A0'}]`}></i>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold mb-1">{item.title}</h4>
                    <p className="text-[#CCCCCC] whitespace-pre-line">{item.info}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Social links */}
            <motion.div 
              className="flex space-x-4"
              variants={itemVariants}
            >
              {socialLinks.map((link, index) => (
                <motion.a 
                  key={index}
                  href="#" 
                  className={`w-10 h-10 rounded-full glass flex items-center justify-center hover:neon-border-${link.color} transition-all duration-300`}
                  whileHover={{ 
                    scale: 1.1,
                    transition: { duration: 0.2 }
                  }}
                >
                  <i className={`ri-${link.icon} text-lg`}></i>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Contact form with glassmorphism */}
          <motion.div 
            className="glass p-8 rounded-2xl neon-border-blue reveal"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div custom={0} variants={formFieldVariants}>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium">Nombre</label>
                  <motion.input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-[#050816]/50 border border-gray-700 rounded-lg py-3 px-4 focus:outline-none transition-all duration-300" 
                    placeholder="Tu nombre"
                    whileFocus="focus"
                    required
                  />
                </motion.div>
                <motion.div custom={1} variants={formFieldVariants}>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium">Email</label>
                  <motion.input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-[#050816]/50 border border-gray-700 rounded-lg py-3 px-4 focus:outline-none transition-all duration-300" 
                    placeholder="tu@email.com"
                    whileFocus="focus"
                    required
                  />
                </motion.div>
              </div>
              <motion.div custom={2} variants={formFieldVariants}>
                <label htmlFor="company" className="block mb-2 text-sm font-medium">Empresa</label>
                <motion.input 
                  type="text" 
                  id="company" 
                  name="company" 
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full bg-[#050816]/50 border border-gray-700 rounded-lg py-3 px-4 focus:outline-none transition-all duration-300" 
                  placeholder="Nombre de tu empresa"
                  whileFocus="focus"
                />
              </motion.div>
              <motion.div custom={3} variants={formFieldVariants}>
                <label htmlFor="service" className="block mb-2 text-sm font-medium">Servicio de interés</label>
                <motion.select 
                  id="service" 
                  name="service" 
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full bg-[#050816]/50 border border-gray-700 rounded-lg py-3 px-4 focus:outline-none transition-all duration-300"
                  whileFocus="focus"
                >
                  <option value="" disabled>Selecciona un servicio</option>
                  <option value="desarrollo">Desarrollo Web & Móvil</option>
                  <option value="cloud">Cloud & DevOps</option>
                  <option value="ai">AI & Data Analytics</option>
                  <option value="seguridad">Ciberseguridad</option>
                  <option value="consultoria">Consultoría Digital</option>
                  <option value="staffing">IT Staffing</option>
                </motion.select>
              </motion.div>
              <motion.div custom={4} variants={formFieldVariants}>
                <label htmlFor="message" className="block mb-2 text-sm font-medium">Mensaje</label>
                <motion.textarea 
                  id="message" 
                  name="message" 
                  rows={4} 
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-[#050816]/50 border border-gray-700 rounded-lg py-3 px-4 focus:outline-none transition-all duration-300" 
                  placeholder="Cuéntanos sobre tu proyecto..."
                  whileFocus="focus"
                  required
                ></motion.textarea>
              </motion.div>
              <motion.button 
                type="submit" 
                className="w-full py-3 px-6 rounded-full bg-gradient-to-r from-[#00EEFF] via-[#BD00FF] to-[#FF00A0] hover:opacity-90 transition-all duration-300 font-semibold text-black"
                custom={5}
                variants={formFieldVariants}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Enviar Mensaje
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
