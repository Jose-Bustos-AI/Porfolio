import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewsletterModal: React.FC<NewsletterModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Validar el formato de email
  const isValidEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  
  // Manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar el nombre
    if (!name.trim()) {
      setError('Por favor, introduce tu nombre');
      return;
    }
    
    // Validar el email
    if (!email || !isValidEmail(email)) {
      setError('Por favor, introduce un email válido');
      return;
    }
    
    try {
      setIsSubmitting(true);
      setError(null);
      
      // Enviar datos al webhook
      const response = await fetch('https://n8n-n8ninnovagastro.zk6hny.easypanel.host/webhook/2370dd42-5567-4b2c-b25a-52b672565f00', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          name,
          email,
          source: 'labs_newsletter',
          timestamp: new Date().toISOString()
        }),
      });
      
      if (!response.ok) {
        throw new Error('Error al enviar los datos. Por favor, inténtalo de nuevo.');
      }
      
      // Guardar en localStorage que el usuario ya se ha suscrito
      localStorage.setItem('newsletter_subscribed', 'true');
      
      // Mostrar mensaje de éxito
      setSuccess(true);
      
      // Cerrar el modal después de 2 segundos
      setTimeout(() => {
        onClose();
        // Resetear estado para futuras aperturas
        setTimeout(() => {
          setSuccess(false);
          setEmail('');
        }, 500);
      }, 2000);
      
    } catch (err) {
      console.error('Error al suscribirse:', err);
      setError(err instanceof Error ? err.message : 'Ha ocurrido un error. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="glass rounded-xl overflow-hidden shadow-2xl border border-white/10 relative p-6 mx-4 md:mx-0">
              {/* Gradiente de fondo */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#030015] to-[#0A0A18] opacity-90 z-0"></div>
              
              {/* Efectos luminosos */}
              <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#62d957] blur-3xl opacity-10 z-0"></div>
              <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-[#E65616] blur-3xl opacity-10 z-0"></div>
              
              <div className="relative z-10">
                {/* Encabezado */}
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl md:text-2xl font-bold text-white">
                    {success ? '¡Suscripción completada!' : 'Suscríbete a nuestro Newsletter'}
                  </h3>
                  <button 
                    onClick={onClose}
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label="Cerrar"
                  >
                    <i className="ri-close-line text-xl"></i>
                  </button>
                </div>
                
                {/* Contenido condicional */}
                {success ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-8"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#62d957]/20 text-[#62d957] mb-4">
                      <i className="ri-mail-check-line text-3xl"></i>
                    </div>
                    <h4 className="text-xl font-semibold mb-2 text-white">Gracias por suscribirte 💙</h4>
                    <p className="text-gray-300">
                      Te mantendremos informado de todas las novedades y contenidos exclusivos.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                      <p className="text-gray-300 mb-4">
                        Suscríbete para recibir las últimas novedades, artículos y recursos directamente en tu email.
                      </p>
                      <div className="space-y-4">
                        {/* Campo de nombre */}
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                            Nombre <span className="text-[#E65616]">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              id="name"
                              value={name}
                              onChange={(e) => {
                                setName(e.target.value);
                                setError(null); // Limpiar error al escribir
                              }}
                              className="w-full bg-[#030015]/50 border border-gray-700 rounded-lg py-3 px-4 focus:outline-none focus:border-[#62d957] transition-all duration-300 pr-10"
                              placeholder="Tu nombre"
                              required
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                              <i className="ri-user-line text-gray-400"></i>
                            </div>
                          </div>
                        </div>
                        
                        {/* Campo de email */}
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                            Email <span className="text-[#E65616]">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type="email"
                              id="email"
                              value={email}
                              onChange={(e) => {
                                setEmail(e.target.value);
                                setError(null); // Limpiar error al escribir
                              }}
                              className="w-full bg-[#030015]/50 border border-gray-700 rounded-lg py-3 px-4 focus:outline-none focus:border-[#62d957] transition-all duration-300 pr-10"
                              placeholder="tu@email.com"
                              required
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                              <i className="ri-mail-line text-gray-400"></i>
                            </div>
                          </div>
                          
                          {/* Mensaje de error */}
                          <AnimatePresence>
                            {error && (
                              <motion.p 
                                className="text-[#E65616] text-sm mt-2 flex items-center"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                              >
                                <i className="ri-error-warning-line mr-1"></i>
                                {error}
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg text-gray-300 hover:text-white mr-3"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#E65616] to-[#62d957] text-white font-medium relative overflow-hidden"
                      >
                        <span className="relative z-10 flex items-center">
                          {isSubmitting ? (
                            <>
                              <i className="ri-loader-4-line animate-spin mr-2"></i>
                              Enviando...
                            </>
                          ) : (
                            <>
                              <i className="ri-notification-3-line mr-2"></i>
                              Recibir novedades
                            </>
                          )}
                        </span>
                        
                        {/* Efecto hover */}
                        <motion.div 
                          className="absolute inset-0 bg-white opacity-0"
                          whileHover={{ opacity: 0.2 }}
                          transition={{ duration: 0.3 }}
                        />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NewsletterModal;