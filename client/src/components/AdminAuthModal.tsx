import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticated: () => void;
}

const AdminAuthModal: React.FC<AdminAuthModalProps> = ({ isOpen, onClose, onAuthenticated }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Contraseña correcta
  const correctPassword = 'innova2024';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    // Simulamos un pequeño retraso para la verificación
    setTimeout(() => {
      if (password === correctPassword) {
        // Guardamos en localStorage
        localStorage.setItem('isAdmin', 'true');
        onAuthenticated();
        onClose();
      } else {
        setError('Contraseña incorrecta. Por favor, inténtalo de nuevo.');
      }
      setIsLoading(false);
    }, 800); // Simulamos una pequeña demora para que parezca que está verificando
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay oscuro */}
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
            <div className="glass rounded-xl overflow-hidden shadow-2xl border border-white/10 relative">
              {/* Gradiente de fondo */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#030015] to-[#0A0A18] opacity-90 z-0"></div>
              
              {/* Efectos luminosos */}
              <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#62d957] blur-3xl opacity-10 z-0"></div>
              <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-[#00EEFF] blur-3xl opacity-10 z-0"></div>
              
              <div className="relative z-10 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl md:text-2xl font-bold text-white">Acceso Administrativo</h3>
                  <button 
                    onClick={onClose}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <i className="ri-close-line text-xl"></i>
                  </button>
                </div>
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                      Contraseña de Administrador
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-[#030015]/50 border border-gray-700 rounded-lg py-3 px-4 focus:outline-none focus:border-[#62d957] transition-all duration-300 pr-10"
                        placeholder="Ingresa la contraseña"
                        required
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <i className="ri-lock-2-line text-gray-400"></i>
                      </div>
                    </div>
                    
                    {/* Mensaje de error */}
                    <AnimatePresence>
                      {error && (
                        <motion.p 
                          className="text-[#E65616] text-sm mt-2"
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
                      disabled={isLoading}
                      className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#62d957] to-[#00EEFF] text-white font-medium relative overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center">
                        {isLoading ? (
                          <>
                            <i className="ri-loader-4-line animate-spin mr-2"></i>
                            Verificando...
                          </>
                        ) : (
                          <>
                            <i className="ri-shield-check-line mr-2"></i>
                            Acceder
                          </>
                        )}
                      </span>
                      
                      {/* Efecto hover */}
                      <motion.div 
                        className="absolute inset-0 bg-white opacity-0 hover:opacity-20 transition-opacity"
                        whileHover={{ opacity: 0.2 }}
                        transition={{ duration: 0.3 }}
                      />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AdminAuthModal;