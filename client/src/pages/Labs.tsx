import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, Variants } from 'framer-motion';
import ParticleBackground from '@/components/ParticleBackground';
import AdminAuthModal from '../components/AdminAuthModal';
import NewsletterModal from '../components/NewsletterModal';

// Definición del tipo para cada post
interface Post {
  id: string;
  title: string;
  content: string;
  image_url: string;
  video_url?: string;
  created_at: string;
}

const Labs: React.FC = () => {
  // Estado para almacenar los posts
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Estado para el modal de autenticación
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Estado para el modal de newsletter
  const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  
  const [, setLocation] = useLocation();

  // Verificar si el usuario ya está autenticado y/o suscrito al cargar la página
  useEffect(() => {
    const checkUserStatus = () => {
      // Verificar estado de administrador
      const adminStatus = localStorage.getItem('isAdmin');
      if (adminStatus === 'true') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
      
      // Verificar estado de suscripción al newsletter
      const subscriptionStatus = localStorage.getItem('newsletter_subscribed');
      if (subscriptionStatus === 'true') {
        setIsSubscribed(true);
      } else {
        setIsSubscribed(false);
      }
    };
    
    // Comprobar el estado al cargar la página
    checkUserStatus();
    
    // Añadir un event listener para el almacenamiento
    window.addEventListener('storage', checkUserStatus);
    
    // Crear un intervalo para comprobar periódicamente (por si acaso)
    const interval = setInterval(checkUserStatus, 1000);
    
    // Limpiar al desmontar
    return () => {
      window.removeEventListener('storage', checkUserStatus);
      clearInterval(interval);
    };
  }, []);

  // Obtener los posts de la API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/labs/posts');
        
        if (!response.ok) {
          throw new Error(`Error al cargar los posts: ${response.status}`);
        }
        
        const data = await response.json();
        setPosts(data);
        setLoading(false);
      } catch (err) {
        console.error('Error al cargar los posts:', err);
        setError('No pudimos cargar los posts. Por favor, intenta nuevamente más tarde.');
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Función para formatear fechas
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };
  
  // Función para manejar el clic en el botón de Admin
  const handleAdminClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isAdmin) {
      // Si ya está autenticado, redirigir directamente al panel de admin
      setLocation('/labs/admin');
    } else {
      // Si no está autenticado, mostrar el modal de autenticación
      setIsAuthModalOpen(true);
    }
  };
  
  // Función para manejar la autenticación exitosa
  const handleAuthenticated = () => {
    setIsAdmin(true);
    setLocation('/labs/admin');
  };
  
  // Función para cerrar sesión
  const handleLogout = () => {
    // Eliminar del localStorage
    localStorage.removeItem('isAdmin');
    
    // Actualizar el estado local
    setIsAdmin(false);
    
    // Disparar evento de storage para que otras pestañas detecten el cambio
    window.dispatchEvent(new Event('storage'));
    
    // Mensaje de confirmación opcional
    alert('Has cerrado sesión correctamente.');
  };

  // Función para crear resumen del contenido
  const createExcerpt = (content: string, maxLength: number = 150) => {
    // Eliminar etiquetas HTML
    const plainText = content.replace(/<[^>]+>/g, '');
    
    if (plainText.length <= maxLength) return plainText;
    
    // Cortar el texto y añadir puntos suspensivos
    return plainText.slice(0, maxLength) + '...';
  };

  // Animaciones para los elementos
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const titleVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: "easeOut" 
      } 
    }
  };

  // Scroll reveal effect
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
      const windowHeight = window.innerHeight;
      const revealPoint = 150;
      
      revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < windowHeight - revealPoint) {
          element.classList.add('visible');
        }
      });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check for elements in viewport
    
    return () => {
      window.removeEventListener('scroll', revealOnScroll);
    };
  }, []);

  // Efecto de hover para las tarjetas
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#030015] text-white overflow-hidden">
      {/* Fondo con partículas */}
      <div className="fixed inset-0 z-0">
        <ParticleBackground id="particle-background" connectLines glowEffect density={50} />
      </div>
      
      {/* Animated gradient overlay */}
      <div className="fixed inset-0 z-0 opacity-30">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-[#00EEFF]/10 via-[#BD00FF]/5 to-transparent blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-[#E65616]/10 via-[#62d957]/5 to-transparent blur-[100px]"></div>
      </div>
      
      {/* Grid pattern overlay */}
      <div className="fixed inset-0 z-0 opacity-5">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'linear-gradient(rgba(0,238,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0,238,255,0.2) 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }}></div>
      </div>

      {/* Header con navegación */}
      <header className="glass sticky top-0 z-50 backdrop-blur-md">
        <div className="container mx-auto px-4 md:px-8 py-6">
          <nav className="flex justify-between items-center">
            <Link href="/">
              <div className="text-lg font-bold text-white flex items-center cursor-pointer hover:text-[#E65616] transition-colors duration-300">
                <i className="ri-arrow-left-line mr-2"></i>
                Volver al inicio
              </div>
            </Link>
            <div className="flex items-center space-x-4">
              {/* Botón de Newsletter - solo visible si no está suscrito */}
              {!isSubscribed && (
                <button
                  onClick={() => setIsNewsletterModalOpen(true)}
                  className="text-white bg-gradient-to-r from-[#E65616] to-[#62d957] px-4 py-2 rounded-full text-sm font-medium flex items-center hover-shine"
                >
                  <i className="ri-mail-line mr-2"></i>
                  Suscribirse
                </button>
              )}
              
              <div className="text-white/80 flex items-center">
                {isAdmin ? (
                  <>
                    <a 
                      href="/labs/admin"
                      onClick={handleAdminClick}
                      className="hover:text-[#62d957] transition-colors duration-300 cursor-pointer flex items-center mr-4"
                    >
                      <i className="ri-add-circle-line mr-1"></i>
                      Admin
                    </a>
                    <button
                      onClick={handleLogout}
                      className="hover:text-[#E65616] transition-colors duration-300 cursor-pointer flex items-center"
                    >
                      <i className="ri-logout-box-line mr-1"></i>
                      Cerrar sesión
                    </button>
                  </>
                ) : (
                  <a 
                    href="#"
                    onClick={handleAdminClick}
                    className="hover:text-[#62d957] transition-colors duration-300 cursor-pointer flex items-center"
                  >
                    <i className="ri-shield-keyhole-line mr-1"></i>
                    Admin
                  </a>
                )}
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="container mx-auto px-4 md:px-8 pt-24 pb-20 relative z-10">
        {/* Título de sección */}
        <motion.div 
          className="text-center mb-20 reveal"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-space font-bold mb-6 text-white"
            variants={titleVariants}
          >
            Innovapymes <span className="text-gradient animate-glow-pulse">Labs</span>
          </motion.h1>
          <motion.p 
            className="text-xl text-[#CCCCCC] max-w-3xl mx-auto"
            variants={titleVariants}
          >
            Explorando nuevas ideas, tecnologías y soluciones para el futuro de la innovación digital
          </motion.p>
        </motion.div>

        {/* Contenido condicional basado en el estado de carga */}
        {loading ? (
          // Esqueleto de carga
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="glass rounded-xl overflow-hidden animate-pulse">
                <div className="h-60 bg-[#CCCCCC]/10"></div>
                <div className="p-6">
                  <div className="h-8 bg-[#CCCCCC]/10 rounded mb-4"></div>
                  <div className="h-4 bg-[#CCCCCC]/10 rounded mb-2"></div>
                  <div className="h-4 bg-[#CCCCCC]/10 rounded mb-2"></div>
                  <div className="h-4 bg-[#CCCCCC]/10 rounded mb-4"></div>
                  <div className="h-10 bg-[#CCCCCC]/10 rounded mt-6"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          // Mensaje de error
          <div className="text-center py-10">
            <i className="ri-error-warning-line text-5xl text-[#E65616] mb-4"></i>
            <h3 className="text-2xl font-bold mb-2">¡Ups! Algo salió mal</h3>
            <p className="text-[#CCCCCC] mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-6 py-3 bg-[#E65616] rounded-full hover:bg-[#E65616]/80 transition-colors"
            >
              Intentar nuevamente
            </button>
          </div>
        ) : (
          // Grid de tarjetas de posts
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-10 reveal"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {posts.map((post) => (
              <motion.div 
                key={post.id}
                className="glass rounded-xl overflow-hidden hover-shine card-3d flex flex-col h-[450px]"
                variants={itemVariants}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                onHoverStart={() => setHoveredCard(post.id)}
                onHoverEnd={() => setHoveredCard(null)}
                style={{ 
                  boxShadow: hoveredCard === post.id ? '0 10px 30px -5px rgba(0,0,0,0.3), 0 0 15px 2px rgba(230,86,22,0.3)' : 'none',
                  transition: 'box-shadow 0.3s ease, transform 0.3s ease',
                  borderImage: 'linear-gradient(45deg, rgba(230,86,22,0.5), transparent) 1',
                  borderWidth: '1px',
                  borderStyle: 'solid'
                }}
              >
                {/* Imagen con overlay de gradiente */}
                <div className="relative h-60 overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-gradient-to-t from-[#030015] to-transparent opacity-70 z-10"
                    style={{ backgroundImage: 'linear-gradient(to bottom, transparent, rgba(230,86,22,0.3), #030015)' }}
                  ></div>
                  <img 
                    src={post.image_url} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                  
                  {/* Indicador de video si existe */}
                  {post.video_url && (
                    <motion.div 
                      className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full flex items-center justify-center bg-[#E65616]/80"
                      animate={{ 
                        scale: hoveredCard === post.id ? [1, 1.1, 1] : 1
                      }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: hoveredCard === post.id ? Infinity : 0,
                        ease: "easeInOut"
                      }}
                    >
                      <i className="ri-video-line text-white text-xl"></i>
                    </motion.div>
                  )}
                </div>
                
                {/* Contenido de la tarjeta */}
                <div className="p-6 z-20 relative flex flex-col flex-grow">
                  {/* Fecha */}
                  <div className="text-[#CCCCCC] text-sm mb-2">
                    <i className="ri-calendar-line mr-1"></i> {formatDate(post.created_at)}
                  </div>
                  
                  {/* Título con efecto de línea brillante */}
                  <h3 className="text-2xl font-space font-bold mb-3 relative inline-block">
                    {post.title}
                    <motion.span 
                      className="absolute bottom-0 left-0 h-0.5 rounded-full bg-[#E65616]" 
                      initial={{ width: 0 }}
                      animate={{ width: hoveredCard === post.id ? '100%' : '40%' }}
                      transition={{ duration: 0.3 }}
                    ></motion.span>
                  </h3>
                  
                  {/* Extracto del contenido */}
                  <p className="text-[#CCCCCC] mb-6 flex-grow">
                    {createExcerpt(post.content)}
                  </p>
                  
                  {/* Botón "Leer más" */}
                  <Link href={`/labs/${post.id}`}>
                    <motion.div 
                      className="inline-flex items-center justify-center px-5 py-3 text-base font-medium rounded-full w-full relative overflow-hidden hover-shine cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Fondo con gradiente animado */}
                      <motion.div 
                        className="absolute inset-0 z-0"
                        style={{ 
                          background: 'linear-gradient(90deg, #E65616, #62d957, #E65616)',
                          backgroundSize: '200% 100%'
                        }}
                        animate={{ 
                          backgroundPosition: ['0% 0%', '100% 0%', '0% 0%']
                        }}
                        transition={{ 
                          duration: 3, 
                          ease: 'linear', 
                          repeat: Infinity 
                        }}
                      ></motion.div>
                      
                      <span className="relative z-10 font-bold text-black flex items-center">
                        <span>Leer más</span>
                        <motion.i 
                          className="ri-arrow-right-line ml-2"
                          animate={{ 
                            x: hoveredCard === post.id ? [0, 5, 0] : 0
                          }}
                          transition={{ 
                            duration: 1, 
                            repeat: hoveredCard === post.id ? Infinity : 0 
                          }}
                        ></motion.i>
                      </span>
                    </motion.div>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="glass border-t border-white/10 relative z-10">
        <div className="container mx-auto px-4 md:px-8 py-8">
          <div className="text-center text-gray-400">
            <p>© 2025 Innovapymes Labs. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Modal de autenticación de administrador */}
      <AdminAuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthenticated={handleAuthenticated}
      />
      
      {/* Modal de suscripción al newsletter */}
      <NewsletterModal
        isOpen={isNewsletterModalOpen}
        onClose={() => {
          setIsNewsletterModalOpen(false);
          // Verificar si el usuario se ha suscrito después de cerrar
          const subscriptionStatus = localStorage.getItem('newsletter_subscribed');
          if (subscriptionStatus === 'true') {
            setIsSubscribed(true);
          }
        }}
      />
    </div>
  );
};

export default Labs;